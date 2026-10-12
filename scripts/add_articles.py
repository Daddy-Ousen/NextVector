#!/usr/bin/env python3
"""
NextVector daily batch writer.

The daily pipeline agent writes ONE JSON file (see pipeline_runs/TEMPLATE.json) and this script:
  1. Checks every field against the real Article / briefing / ticker types.
  2. Gives each new article the next free id (art-N) and the Robiul Hasan author.
  3. Downloads remote cover images into public/images/articles/art-N-<slug>.jpg (no hotlinking)
     and rejects any cover that is already used.
  4. Appends the articles to src/data/articlesData.ts and, if present, replaces
     MOCK_DAILY_BRIEFING and MOCK_LIVE_SIGNALS in src/data/mockData.ts.

Usage:
  python scripts/add_articles.py pipeline_runs/2026-10-12.json --check   # validate only, writes nothing
  python scripts/add_articles.py pipeline_runs/2026-10-12.json           # validate, then write

Exit code 0 = OK, 1 = problems found (nothing is written when any problem is found).
"""

import argparse
import difflib
import hashlib
import json
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_FILE = ROOT / "src" / "data" / "articlesData.ts"
MOCK_FILE = ROOT / "src" / "data" / "mockData.ts"
MODELS_FILE = ROOT / "src" / "data" / "modelsData.ts"
PUBLIC_DIR = ROOT / "public"
IMAGES_DIR = PUBLIC_DIR / "images" / "articles"

CATEGORIES = {"ai", "technology", "science", "research"}
ARTICLE_TYPES = {"breaking", "analysis", "deep-dive", "model-report", "benchmark-report",
                 "research-explained", "discovery", "industry-watch"}
URGENCIES = {"Critical Signal", "High Impact", "Notable Shift"}
HYPE_WORDS = ["game-changing", "game changer", "revolutionary", "mind-blowing", "insane", "unprecedented"]
PLACEHOLDER_HOSTS = ["example.com", "example.org", ".example/", "localhost", "placeholder", "your-url", "xxxx"]
REQUIRED_ARTICLE_FIELDS = ["slug", "title", "subtitle", "category", "articleType", "signalRating", "publishedAt",
                           "readTimeMinutes", "coverImage", "coverImageAlt", "tags", "threeQuestions",
                           "keyTakeaways", "content", "citations"]
ALLOWED_ARTICLE_FIELDS = set(REQUIRED_ARTICLE_FIELDS) | {"technicalSpecs", "relatedModelId", "relatedBenchmarkId",
                                                         "relatedPaperId", "isHero", "isFeatured"}
COVER_SLUG_CHARS = 50
MAX_COVER_WIDTH = 1600
MIN_COVER_WIDTH = 800
NEAR_DUP_BITS = 8          # dhash bit distance; the same photo re-sized or re-cropped scores 0-7
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) NextVectorPipeline/1.0"


class Problems(list):
    def add(self, where, msg):
        self.append(f"{where}: {msg}")


def is_str(v, min_len=1):
    return isinstance(v, str) and len(v.strip()) >= min_len


def check_url(url):
    return isinstance(url, str) and url.startswith("https://") and not any(h in url.lower() for h in PLACEHOLDER_HOSTS)


def existing_catalog():
    src = ARTICLES_FILE.read_text(encoding="utf-8")
    ids = [int(n) for n in re.findall(r'\bid:\s*"art-(\d+)"', src)]
    slugs = set(re.findall(r'\n\s*slug:\s*"([^"]+)"', src))
    titles = {t.lower() for t in re.findall(r'\n\s*title:\s*"((?:[^"\\]|\\.)*)"', src)}
    covers = set(re.findall(r'\n\s*coverImage:\s*"([^"]+)"', src))
    return src, ids, slugs, titles, covers


def image_hashes():
    return {hashlib.sha256(p.read_bytes()).hexdigest(): p.name for p in IMAGES_DIR.glob("*") if p.is_file()}


def dhash(img_or_path):
    """64-bit difference hash: the same photo at another size or quality gives a near-equal hash."""
    from PIL import Image
    img = Image.open(img_or_path) if isinstance(img_or_path, Path) else img_or_path
    small = img.convert("L").resize((9, 8), Image.LANCZOS)
    px = list(small.getdata())
    return sum(1 << i for i in range(64) if px[(i // 8) * 9 + i % 8] > px[(i // 8) * 9 + i % 8 + 1])


def existing_dhashes():
    out = {}
    for f in IMAGES_DIR.glob("*"):
        try:
            out[f.name] = dhash(f)
        except Exception:
            pass
    return out


def fetch_cover(url):
    """Download a remote cover and return JPEG bytes (max 1600px wide)."""
    from PIL import Image
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        if resp.status != 200:
            raise ValueError(f"HTTP {resp.status}")
        data = resp.read()
    img = Image.open(BytesIO(data))
    img.load()
    if img.width < MIN_COVER_WIDTH:
        raise ValueError(f"image is only {img.width}px wide (need {MIN_COVER_WIDTH}+)")
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    if img.width > MAX_COVER_WIDTH:
        img = img.resize((MAX_COVER_WIDTH, round(img.height * MAX_COVER_WIDTH / img.width)), Image.LANCZOS)
    buf = BytesIO()
    img.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
    return buf.getvalue()


def validate_article(i, a, p, now, known_models, existing_slugs, existing_titles, existing_covers, batch_slugs):
    where = f"articles[{i}]" + (f" ({a.get('slug')})" if isinstance(a, dict) and a.get("slug") else "")
    if not isinstance(a, dict):
        p.add(where, "must be an object")
        return
    for f in REQUIRED_ARTICLE_FIELDS:
        if f not in a:
            p.add(where, f"missing field '{f}'")
    for f in a:
        if f not in ALLOWED_ARTICLE_FIELDS:
            hint = {"signalScore": "signalRating", "readTime": "readTimeMinutes", "sources": "citations",
                    "isLeadStory": "isHero", "summary": "subtitle", "id": "(remove it; ids are assigned)",
                    "author": "(remove it; author is always Robiul Hasan)"}.get(f)
            p.add(where, f"unknown field '{f}'" + (f" -> use {hint}" if hint else ""))

    slug = a.get("slug")
    if not (isinstance(slug, str) and re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug) and len(slug) <= 90):
        p.add(where, "slug must be lowercase kebab-case, max 90 chars")
    elif slug in existing_slugs or slug in batch_slugs:
        p.add(where, f"slug '{slug}' is already used")
    else:
        batch_slugs.add(slug)

    title = a.get("title")
    if not is_str(title, 20):
        p.add(where, "title must be a string of 20+ chars")
    elif title.lower() in existing_titles:
        p.add(where, "an article with this exact title already exists")
    for f in ("title", "subtitle"):
        text = str(a.get(f, "")).lower()
        for w in HYPE_WORDS:
            if w in text:
                p.add(where, f"{f} uses banned hype word '{w}'")
    if not is_str(a.get("subtitle"), 30):
        p.add(where, "subtitle must be 30+ chars")
    if a.get("category") not in CATEGORIES:
        p.add(where, f"category must be one of {sorted(CATEGORIES)}")
    if a.get("articleType") not in ARTICLE_TYPES:
        p.add(where, f"articleType must be one of {sorted(ARTICLE_TYPES)}")
    sr = a.get("signalRating")
    if not (isinstance(sr, int) and 70 <= sr <= 100):
        p.add(where, "signalRating must be a whole number 70-100")
    rt = a.get("readTimeMinutes")
    if not (isinstance(rt, int) and 1 <= rt <= 30):
        p.add(where, "readTimeMinutes must be a whole number 1-30")

    pub = a.get("publishedAt")
    if not (isinstance(pub, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z", pub)):
        p.add(where, "publishedAt must look like 2026-10-12T09:30:00Z (UTC, with Z)")
    else:
        dt = datetime.fromisoformat(pub.replace("Z", "+00:00"))
        if dt > now + timedelta(hours=1):
            p.add(where, f"publishedAt {pub} is in the future (now {now:%Y-%m-%dT%H:%M}Z)")
        if dt < now - timedelta(hours=48):
            p.add(where, f"publishedAt {pub} is older than 48 hours; use the time you publish")

    alt = a.get("coverImageAlt")
    if not is_str(alt, 30):
        p.add(where, "coverImageAlt must describe the image (30+ chars)")
    cover = a.get("coverImage")
    if not isinstance(cover, str) or not cover:
        p.add(where, "coverImage is required (https URL to download, or /images/articles/... file)")
    elif cover in existing_covers:
        p.add(where, f"coverImage '{cover}' is already used by another article")
    elif cover.startswith("/"):
        local = PUBLIC_DIR / cover.lstrip("/")
        if not cover.startswith("/images/articles/"):
            p.add(where, "local coverImage must be under /images/articles/")
        elif not local.exists():
            p.add(where, f"cover file not found: public{cover}")
        elif local.stat().st_size < 5000:
            p.add(where, f"cover file is under 5 KB: public{cover}")
    elif not check_url(cover):
        p.add(where, "coverImage URL must start with https://")
    else:
        tok = re.search(r"photo-([A-Za-z0-9_-]+)", cover)
        if tok and any(tok.group(1) in c for c in existing_covers):
            p.add(where, f"Unsplash photo-{tok.group(1)} is already used by another article")

    tags = a.get("tags")
    if not (isinstance(tags, list) and len(tags) >= 5 and all(is_str(t) for t in tags)):
        p.add(where, "tags must be a list of 5 or more strings")
    elif len({t.lower() for t in tags}) != len(tags):
        p.add(where, "tags has duplicates")

    tq = a.get("threeQuestions")
    if not isinstance(tq, dict):
        p.add(where, "threeQuestions must be an object")
    else:
        for k, wrong in (("whatHappened", None), ("whyItMatters", "whyDoesItMatter"), ("whatsNext", "whatCouldHappenNext")):
            if not is_str(tq.get(k), 81):
                p.add(where, f"threeQuestions.{k} must be more than 80 chars")
            if wrong and wrong in tq:
                p.add(where, f"threeQuestions.{wrong} is the wrong name -> use {k}")
        extra = set(tq) - {"whatHappened", "whyItMatters", "whatsNext", "whyDoesItMatter", "whatCouldHappenNext"}
        if extra:
            p.add(where, f"threeQuestions has unknown keys {sorted(extra)}")

    kt = a.get("keyTakeaways")
    if not (isinstance(kt, list) and len(kt) >= 3 and all(is_str(t, 10) for t in kt)):
        p.add(where, "keyTakeaways must be a list of 3 or more sentences")

    content = a.get("content")
    if not (isinstance(content, list) and len(content) >= 3 and all(is_str(c, 20) for c in content)):
        p.add(where, "content must be a list of 3 or more paragraph strings (not one long string)")
    elif isinstance(tq, dict):
        # No-Restating Rule (Rulebook 2.4): a body paragraph must not just repeat a Triad answer
        for n, para in enumerate(content):
            for k in ("whatHappened", "whyItMatters", "whatsNext"):
                ans = tq.get(k)
                if is_str(ans) and difflib.SequenceMatcher(None, para.lower(), ans.lower()).ratio() > 0.6:
                    p.add(where, f"content[{n}] repeats threeQuestions.{k} (Rulebook 2.4 No-Restating Rule)")

    specs = a.get("technicalSpecs")
    if specs is not None and not (isinstance(specs, dict) and all(is_str(k) and is_str(v) for k, v in specs.items())):
        p.add(where, "technicalSpecs must be an object of string -> string")

    cits = a.get("citations")
    if not (isinstance(cits, list) and cits):
        p.add(where, "citations must list at least 1 primary source")
    else:
        for n, c in enumerate(cits):
            if not (isinstance(c, dict) and is_str(c.get("title")) and is_str(c.get("source")) and check_url(c.get("url"))):
                p.add(where, f"citations[{n}] needs title, source and a real https:// url")
            elif set(c) - {"title", "url", "source"}:
                p.add(where, f"citations[{n}] may only have title, url, source")

    mid = a.get("relatedModelId")
    if mid is not None and mid not in known_models:
        p.add(where, f"relatedModelId '{mid}' is not in modelsData.ts")
    for f in ("isHero", "isFeatured"):
        if f in a and not isinstance(a[f], bool):
            p.add(where, f"{f} must be true or false")


def validate_briefing(b, p, all_slugs):
    if not isinstance(b, dict):
        p.add("briefing", "must be an object")
        return
    if not (isinstance(b.get("date"), str) and re.fullmatch(r"[A-Z][a-z]+day, [A-Z][a-z]+ \d{1,2}, \d{4}", b["date"])):
        p.add("briefing", "date must look like 'Monday, October 12, 2026'")
    if not is_str(b.get("summary"), 40):
        p.add("briefing", "summary must be 2 sentences")
    items = b.get("items")
    if not (isinstance(items, list) and len(items) == 5):
        p.add("briefing", "items must have exactly 5 entries")
        return
    for n, it in enumerate(items):
        w = f"briefing.items[{n}]"
        for f in ("headline", "summary", "whyItMatters"):
            if not is_str(it.get(f), 10):
                p.add(w, f"missing {f}")
        if it.get("category") not in CATEGORIES:
            p.add(w, f"category must be one of {sorted(CATEGORIES)}")
        if it.get("urgency") not in URGENCIES:
            p.add(w, f"urgency must be one of {sorted(URGENCIES)}")
        if it.get("articleSlug") not in all_slugs:
            p.add(w, f"articleSlug '{it.get('articleSlug')}' is not a real article")


def validate_signals(sigs, p, all_slugs):
    if not (isinstance(sigs, list) and len(sigs) == 5):
        p.add("signals", "must have exactly 5 entries")
        return
    for n, s in enumerate(sigs):
        w = f"signals[{n}]"
        if not is_str(s.get("tag")) or len(s["tag"].split()) > 4:
            p.add(w, "tag must be 1-4 words")
        if not is_str(s.get("text"), 20) or len(s["text"]) > 95:
            p.add(w, "text must be 20-95 chars")
        if s.get("articleSlug") not in all_slugs:
            p.add(w, f"articleSlug '{s.get('articleSlug')}' is not a real article")


def js(v):
    """A JSON string/value is a valid TypeScript literal."""
    return json.dumps(v, ensure_ascii=False)


def render_article(a):
    lines = ["  {", f'    id: "{a["id"]}",']
    for f in ("slug", "title", "subtitle", "category", "articleType"):
        lines.append(f"    {f}: {js(a[f])},")
    lines.append(f"    signalRating: {a['signalRating']},")
    lines.append("    author: AUTHOR_ROBIUL_HASAN,")
    lines.append(f"    publishedAt: {js(a['publishedAt'])},")
    lines.append(f"    readTimeMinutes: {a['readTimeMinutes']},")
    lines.append(f"    coverImage: {js(a['coverImage'])},")
    lines.append(f"    coverImageAlt: {js(a['coverImageAlt'])},")
    lines.append(f"    tags: [{', '.join(js(t) for t in a['tags'])}],")
    tq = a["threeQuestions"]
    lines.append("    threeQuestions: {")
    lines.append(f"      whatHappened: {js(tq['whatHappened'])},")
    lines.append(f"      whyItMatters: {js(tq['whyItMatters'])},")
    lines.append(f"      whatsNext: {js(tq['whatsNext'])}")
    lines.append("    },")
    lines.append("    keyTakeaways: [")
    lines.append(",\n".join(f"      {js(t)}" for t in a["keyTakeaways"]))
    lines.append("    ],")
    lines.append("    content: [")
    lines.append(",\n".join(f"      {js(c)}" for c in a["content"]))
    lines.append("    ],")
    if a.get("technicalSpecs"):
        lines.append("    technicalSpecs: {")
        lines.append(",\n".join(f"      {js(k)}: {js(v)}" for k, v in a["technicalSpecs"].items()))
        lines.append("    },")
    for f in ("relatedModelId", "relatedBenchmarkId", "relatedPaperId"):
        if a.get(f):
            lines.append(f"    {f}: {js(a[f])},")
    lines.append("    citations: [")
    cits = []
    for c in a["citations"]:
        cits.append("      {\n"
                    f"        title: {js(c['title'])},\n"
                    f"        url: {js(c['url'])},\n"
                    f"        source: {js(c['source'])}\n"
                    "      }")
    lines.append(",\n".join(cits))
    lines.append("    ],")
    lines.append(f"    isHero: {'true' if a.get('isHero') else 'false'},")
    lines.append(f"    isFeatured: {'true' if a.get('isFeatured') else 'false'}")
    lines.append("  }")
    return "\n".join(lines)


def render_briefing(b):
    items = []
    for n, it in enumerate(b["items"], 1):
        items.append("    {\n"
                     f"      id: 'brief-{n}',\n"
                     f"      headline: {js(it['headline'])},\n"
                     f"      category: {js(it['category'])} as const,\n"
                     f"      urgency: {js(it['urgency'])} as const,\n"
                     f"      summary: {js(it['summary'])},\n"
                     f"      whyItMatters: {js(it['whyItMatters'])},\n"
                     f"      articleSlug: {js(it['articleSlug'])}\n"
                     "    }")
    return ("export const MOCK_DAILY_BRIEFING = {\n"
            f"  date: {js(b['date'])},\n"
            f"  summary: {js(b['summary'])},\n"
            "  items: [\n" + ",\n".join(items) + "\n  ]\n};")


def render_signals(sigs):
    rows = []
    for n, s in enumerate(sigs, 1):
        rows.append("  {\n"
                    f"    id: 'sig-{n}',\n"
                    f"    tag: {js(s['tag'])},\n"
                    f"    text: {js(s['text'])},\n"
                    f"    articleSlug: {js(s['articleSlug'])}\n"
                    "  }")
    return "export const MOCK_LIVE_SIGNALS: LiveSignalItem[] = [\n" + ",\n".join(rows) + "\n];"


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Validate and add a daily batch of NextVector articles.")
    ap.add_argument("batch", help="path to the batch JSON file (see pipeline_runs/TEMPLATE.json)")
    ap.add_argument("--check", action="store_true", help="validate only; write nothing")
    args = ap.parse_args()

    try:
        batch = json.loads(Path(args.batch).read_text(encoding="utf-8"))
    except Exception as e:
        print(f"FAIL: cannot read {args.batch} as JSON: {e}")
        sys.exit(1)

    now = datetime.now(timezone.utc)
    src, ids, existing_slugs, existing_titles, existing_covers = existing_catalog()
    known_models = set(re.findall(r'["\']?id["\']?:\s*["\'](model-[^"\']+)["\']', MODELS_FILE.read_text(encoding="utf-8")))
    p = Problems()

    articles = batch.get("articles", [])
    if not isinstance(articles, list):
        p.add("articles", "must be a list")
        articles = []
    batch_slugs = set()
    for i, a in enumerate(articles):
        validate_article(i, a, p, now, known_models, existing_slugs, existing_titles, existing_covers, batch_slugs)
    covers_in_batch = [a.get("coverImage") for a in articles if isinstance(a, dict)]
    if len(covers_in_batch) != len(set(covers_in_batch)):
        p.add("articles", "two articles in this batch use the same coverImage")
    if sum(1 for a in articles if isinstance(a, dict) and a.get("isHero")) > 1:
        p.add("articles", "only one article per batch may have isHero: true (the lead story)")

    all_slugs = existing_slugs | batch_slugs
    if "briefing" in batch:
        validate_briefing(batch["briefing"], p, all_slugs)
    if "signals" in batch:
        validate_signals(batch["signals"], p, all_slugs)
    if not articles and "briefing" not in batch and "signals" not in batch:
        p.add("batch", "nothing to add (needs 'articles', 'briefing' or 'signals')")

    # Assign ids and resolve covers (download remote images; nothing is saved in --check mode)
    next_id = max(ids) + 1
    hashes = image_hashes()
    dhashes = None
    pending_images = []
    if not p:
        for n, a in enumerate(articles):
            a["id"] = f"art-{next_id + n}"
            cover = a["coverImage"]
            if cover.startswith("https://"):
                try:
                    data = fetch_cover(cover)
                except Exception as e:
                    p.add(a["slug"], f"cover download failed ({e}); pick another image URL")
                    continue
                sha = hashlib.sha256(data).hexdigest()
                if sha in hashes:
                    p.add(a["slug"], f"cover is identical to existing file {hashes[sha]}")
                    continue
                if dhashes is None:
                    dhashes = existing_dhashes()
                from PIL import Image
                h = dhash(Image.open(BytesIO(data)))
                near = [name for name, other in dhashes.items() if bin(h ^ other).count("1") <= NEAR_DUP_BITS]
                if near:
                    p.add(a["slug"], f"cover looks like the same photo as existing file {near[0]}; pick another image")
                    continue
                name = f"{a['id']}-{a['slug'][:COVER_SLUG_CHARS].rstrip('-')}.jpg"
                pending_images.append((IMAGES_DIR / name, data))
                hashes[sha] = name
                dhashes[name] = h
                a["coverImage"] = f"/images/articles/{name}"
            else:
                sha = hashlib.sha256((PUBLIC_DIR / cover.lstrip("/")).read_bytes()).hexdigest()
                owner = hashes.get(sha)
                if owner and f"/images/articles/{owner}" != cover:
                    p.add(a["slug"], f"cover is identical to existing file {owner}")

    if p:
        print(f"FAIL: {len(p)} problem(s). Nothing was written. Fix the JSON and run again.")
        for msg in p:
            print(f"  - {msg}")
        sys.exit(1)

    for a in articles:
        print(f"OK  {a['id']}  {a['slug']}  cover={a['coverImage']}")
    if "briefing" in batch:
        print(f"OK  briefing for {batch['briefing']['date']} (5 items)")
    if "signals" in batch:
        print("OK  live signals (5 items)")
    if args.check:
        print("CHECK PASSED. Nothing was written (--check). Run again without --check to write.")
        return

    for path, data in pending_images:
        path.write_bytes(data)
    if articles:
        end = src.rstrip().rfind("];")
        head = src[:end].rstrip()
        if not head.endswith("}"):
            print("FAIL: unexpected end of articlesData.ts; nothing written.")
            sys.exit(1)
        body = ",\n".join(render_article(a) for a in articles)
        ARTICLES_FILE.write_text(head + ",\n" + body + "\n\n];\n", encoding="utf-8", newline="\n")
    if "briefing" in batch or "signals" in batch:
        mock = MOCK_FILE.read_text(encoding="utf-8")
        if "briefing" in batch:
            mock, n = re.subn(r"export const MOCK_DAILY_BRIEFING = \{.*?\n\};", lambda m: render_briefing(batch["briefing"]), mock, count=1, flags=re.DOTALL)
            if n != 1:
                print("FAIL: MOCK_DAILY_BRIEFING not found in mockData.ts")
                sys.exit(1)
        if "signals" in batch:
            mock, n = re.subn(r"export const MOCK_LIVE_SIGNALS: LiveSignalItem\[\] = \[.*?\n\];", lambda m: render_signals(batch["signals"]), mock, count=1, flags=re.DOTALL)
            if n != 1:
                print("FAIL: MOCK_LIVE_SIGNALS not found in mockData.ts")
                sys.exit(1)
        MOCK_FILE.write_text(mock, encoding="utf-8", newline="\n")
    print(f"WRITTEN: {len(articles)} article(s), {len(pending_images)} cover image(s). Next: npm run images, npm run build, npm run verify.")


if __name__ == "__main__":
    main()
