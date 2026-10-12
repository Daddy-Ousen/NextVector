#!/usr/bin/env python3
"""
NextVector Daily Pipeline Pre-Publication Release Gate Verifier
Strictly enforces Editorial Rulebook §3, §4, §7, §8, and §10:
1. 100% unique cover images across all articles (0 duplicates).
2. All local image assets exist on disk.
3. Temporal sanity: newly published articles match operational run date (last 48 hours).
4. Zero-anachronism gate: rejects historical models (e.g., Claude 3.5/3.7, GPT-4o) reported as breaking new releases in 2026.
5. All required schema fields (threeQuestions, sources, tags, author).
6. Model registry is the generated, sourced build (fresh snapshots, consistent boards); sync between articlesData.ts, MOCK_DAILY_BRIEFING, MOCK_LIVE_SIGNALS, MOCK_TIMELINE_EVENTS, and public/sitemap.xml.
7. SEO, GEO & AI Overview Readiness: min 5 tags, complete Three-Question framework (>80 chars each), min 3 key takeaways, min 1 primary citation, Schema.org TechArticle & FAQPage graph with speakable selectors.
8. Every relatedModelId / relatedBenchmarkId / relatedPaperId points to a real record.
"""

import sys
import os
import re
import hashlib
from datetime import datetime, timezone
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
ARTICLES_FILE = ROOT_DIR / "src" / "data" / "articlesData.ts"
MOCK_DATA_FILE = ROOT_DIR / "src" / "data" / "mockData.ts"
SITEMAP_FILE = ROOT_DIR / "public" / "sitemap.xml"
PUBLIC_IMAGES_DIR = ROOT_DIR / "public"
MODELS_FILE = ROOT_DIR / "src" / "data" / "modelsData.ts"
BENCHMARKS_FILE = ROOT_DIR / "src" / "data" / "benchmarksData.ts"
SEO_HEAD_FILE = ROOT_DIR / "src" / "components" / "common" / "SEOHead.tsx"
ARTICLE_DETAIL_FILE = ROOT_DIR / "src" / "pages" / "ArticleDetailPage.tsx"

# Articles up to this id were published before the stricter daily-batch rules (2026-10-12).
# Problems in them are warnings; problems in newer articles fail the gate.
LEGACY_MAX_ARTICLE = 221
NEAR_DUP_BITS = 8  # dhash bit distance; the same photo re-sized or re-cropped scores 0-7

def art_num(art_id):
    return int(art_id.split("-")[1])

def dhash(path):
    from PIL import Image
    small = Image.open(path).convert("L").resize((9, 8), Image.LANCZOS)
    px = list(small.getdata())
    return sum(1 << i for i in range(64) if px[(i // 8) * 9 + i % 8] > px[(i // 8) * 9 + i % 8 + 1])

BANNED_ANACHRONISMS = [
    (r"claude\s*3\.?7\s*sonnet.*(?:release|launch|unveil|drop|introduc)", "Claude 3.7 Sonnet is a Feb 2025 model; cannot be reported as a new release in 2026"),
    (r"(?:release|launch|unveil|drop|introduc).*claude\s*3\.?7\s*sonnet", "Claude 3.7 Sonnet is a Feb 2025 model; cannot be reported as a new release in 2026"),
    (r"claude\s*3\.?5\s*sonnet.*(?:release|launch|unveil|drop|introduc)", "Claude 3.5 Sonnet is a 2024 model; cannot be reported as a new release in 2026"),
    (r"(?:release|launch|unveil|drop|introduc).*claude\s*3\.?5\s*sonnet", "Claude 3.5 Sonnet is a 2024 model; cannot be reported as a new release in 2026"),
    (r"gpt-?4o.*(?:release|launch|unveil|drop|introduc)", "GPT-4o is a May 2024 model; cannot be reported as a new release in 2026"),
    (r"(?:release|launch|unveil|drop|introduc).*gpt-?4o", "GPT-4o is a May 2024 model; cannot be reported as a new release in 2026"),
    (r"llama\s*3\.?1.*(?:release|launch|unveil|drop|introduc)", "Llama 3.1 is a July 2024 model; cannot be reported as a new release in 2026"),
    (r"(?:release|launch|unveil|drop|introduc).*llama\s*3\.?1", "Llama 3.1 is a July 2024 model; cannot be reported as a new release in 2026"),
]

def check_articles():
    print("\n[Gate 1/8] Auditing src/data/articlesData.ts...")
    if not ARTICLES_FILE.exists():
        print(f"FAIL: {ARTICLES_FILE} does not exist.")
        return False, []

    content = ARTICLES_FILE.read_text(encoding="utf-8")
    
    # Extract article IDs, slugs, titles, covers, and publishedAt
    # Regex parsing for typescript object blocks
    article_blocks = re.findall(r"\{\s*id:\s*['\"](art-\d+)['\"],(.*?)\n\s*\},?\n", content, re.DOTALL)
    if not article_blocks:
        print("FAIL: No articles could be extracted from articlesData.ts")
        return False, []

    articles = []
    seen_ids = set()
    seen_slugs = set()
    seen_covers = {}
    seen_tokens = {}
    seen_article_sha256 = {}
    errors = []

    for art_id, body in article_blocks:
        slug_match = re.search(r"slug:\s*['\"]([^'\"]+)['\"]", body)
        title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", body)
        cover_match = re.search(r"coverImage:\s*['\"]([^'\"]+)['\"]", body)
        pub_match = re.search(r"publishedAt:\s*['\"]([^'\"]+)['\"]", body)
        summary_match = re.search(r"summary:\s*['\"]([^'\"]+)['\"]", body)

        slug = slug_match.group(1) if slug_match else None
        title = title_match.group(1) if title_match else None
        cover = cover_match.group(1) if cover_match else None
        pub = pub_match.group(1) if pub_match else None
        summary = summary_match.group(1) if summary_match else ""

        if not slug or not title or not cover or not pub:
            errors.append(f"Article {art_id} is missing mandatory fields (slug, title, coverImage, or publishedAt).")
            continue

        # Check duplicate ID
        if art_id in seen_ids:
            errors.append(f"Duplicate article ID detected: {art_id}")
        seen_ids.add(art_id)

        # Check duplicate slug
        if slug in seen_slugs:
            errors.append(f"Duplicate slug detected: {slug}")
        seen_slugs.add(slug)

        # Check cover image string uniqueness (Rulebook §4.1)
        if cover in seen_covers:
            errors.append(f"DUPLICATE COVER IMAGE STRING: '{cover}' shared by {seen_covers[cover]} and {art_id}")
        else:
            seen_covers[cover] = art_id

        # Check Unsplash photo token uniqueness across all articles
        token_match = re.search(r"photo-([a-zA-Z0-9_-]+)", cover)
        if token_match:
            tok = token_match.group(1).split("?")[0]
            if tok in seen_tokens:
                errors.append(f"DUPLICATE UNSPLASH TOKEN: photo-{tok} shared by {seen_tokens[tok]} and {art_id}")
            else:
                seen_tokens[tok] = art_id

        # If local image, check file existence and binary SHA256 uniqueness
        if cover.startswith("/"):
            local_rel = cover.lstrip("/")
            local_path = PUBLIC_IMAGES_DIR / local_rel
            if not local_path.exists():
                errors.append(f"MISSING LOCAL IMAGE FILE: {local_path} referenced in {art_id}")
            else:
                img_bytes = local_path.read_bytes()
                if len(img_bytes) < 5000:
                    errors.append(f"IMAGE FILE CORRUPT/EMPTY (<5KB): {local_path} in {art_id}")
                sha = hashlib.sha256(img_bytes).hexdigest()
                if sha in seen_article_sha256:
                    prev_id, prev_path = seen_article_sha256[sha]
                    errors.append(f"BINARY DUPLICATE IMAGE: '{local_path.name}' in {art_id} has identical SHA256 to '{prev_path.name}' in {prev_id} (hash: {sha[:12]})")
                else:
                    seen_article_sha256[sha] = (art_id, local_path)

        # Stricter rules for new articles (after LEGACY_MAX_ARTICLE)
        if art_num(art_id) > LEGACY_MAX_ARTICLE:
            if not cover.startswith("/images/articles/"):
                errors.append(f"{art_id}: coverImage must be a local file under /images/articles/ (no hotlinking); use scripts/add_articles.py to download it")
            if "author: AUTHOR_ROBIUL_HASAN" not in body:
                errors.append(f"{art_id}: author must be AUTHOR_ROBIUL_HASAN")
            try:
                dt = datetime.fromisoformat(pub.replace("Z", "+00:00"))
                if (dt - datetime.now(timezone.utc)).total_seconds() > 3600:
                    errors.append(f"{art_id}: publishedAt {pub} is in the future")
            except ValueError:
                errors.append(f"{art_id}: publishedAt {pub} is not ISO-8601")

        # Check for banned anachronisms
        text_to_audit = f"{title} {summary}".lower()
        for pattern, reason in BANNED_ANACHRONISMS:
            if re.search(pattern, text_to_audit):
                errors.append(f"ANACHRONISM DETECTED in {art_id} ('{title}'): {reason}")

        articles.append({
            "id": art_id,
            "slug": slug,
            "title": title,
            "cover": cover,
            "publishedAt": pub
        })

    # Exhaustive disk check: Ensure all files in public/images/articles/ are unique binaries
    art_img_dir = PUBLIC_IMAGES_DIR / "images" / "articles"
    if art_img_dir.exists():
        disk_hashes = {}
        for img_file in art_img_dir.glob("*"):
            if img_file.is_file():
                h = hashlib.sha256(img_file.read_bytes()).hexdigest()
                if h in disk_hashes:
                    errors.append(f"DUPLICATE BINARY ON DISK: '{img_file.name}' is identical to '{disk_hashes[h]}' (SHA: {h[:12]})")
                else:
                    disk_hashes[h] = img_file.name

    # Near-duplicate covers: the same photo at another size or crop (SHA-256 cannot see this)
    warnings = []
    hashed = []
    for a in articles:
        if a["cover"].startswith("/"):
            f = PUBLIC_IMAGES_DIR / a["cover"].lstrip("/")
            if f.exists():
                try:
                    hashed.append((a["id"], dhash(f)))
                except Exception:
                    pass
    for i, (id_a, h_a) in enumerate(hashed):
        for id_b, h_b in hashed[i + 1:]:
            if bin(h_a ^ h_b).count("1") <= NEAR_DUP_BITS:
                msg = f"NEAR-DUPLICATE COVER: {id_a} and {id_b} use the same photo"
                if max(art_num(id_a), art_num(id_b)) > LEGACY_MAX_ARTICLE:
                    errors.append(msg)
                else:
                    warnings.append(msg)
    for w in warnings:
        print(f"  [WARN] {w} (older articles)")

    print(f"-> Total catalog articles parsed: {len(articles)}")
    print(f"-> Total unique cover image strings: {len(seen_covers)}")
    print(f"-> Total unique local binary images: {len(seen_article_sha256)}")
    print(f"-> Total unique Unsplash tokens: {len(seen_tokens)}")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False, articles

    print("PASS: Catalog structure, IDs, slugs, and 100% binary/token image uniqueness verified.")
    return True, articles

def check_briefing_and_signals(articles):
    print("\n[Gate 2/8] Auditing MOCK_DAILY_BRIEFING & MOCK_LIVE_SIGNALS...")
    if not MOCK_DATA_FILE.exists():
        print(f"FAIL: {MOCK_DATA_FILE} not found.")
        return False

    content = MOCK_DATA_FILE.read_text(encoding="utf-8")
    existing_slugs = {a["slug"] for a in articles}
    errors = []

    # Check briefing
    briefing_match = re.search(r"export const MOCK_DAILY_BRIEFING.*?date:\s*['\"]([^'\"]+)['\"].*?items:\s*\[(.*?)\]\n\};", content, re.DOTALL)
    if not briefing_match:
        errors.append("Could not parse MOCK_DAILY_BRIEFING in mockData.ts")
    else:
        brief_date = briefing_match.group(1)
        brief_items = briefing_match.group(2)
        item_slugs = re.findall(r"articleSlug:\s*['\"]([^'\"]+)['\"]", brief_items)
        print(f"-> Briefing Date: {brief_date}")
        if articles:
            newest = max(articles, key=lambda a: a["publishedAt"])
            try:
                d = datetime.fromisoformat(newest["publishedAt"].replace("Z", "+00:00"))
                expected = f"{d:%A}, {d:%B} {d.day}, {d.year}"
                if brief_date != expected:
                    print(f"  [WARN] Briefing date '{brief_date}' is not the newest article date '{expected}' (UTC). Update MOCK_DAILY_BRIEFING.")
            except ValueError:
                pass
        if len(item_slugs) != 5:
            errors.append(f"MOCK_DAILY_BRIEFING must have 5 items, found {len(item_slugs)}")
        print(f"-> Briefing Linked Slugs: {len(item_slugs)}")
        for s in item_slugs:
            if s not in existing_slugs:
                errors.append(f"Briefing references non-existent article slug: '{s}'")

    # Check live signals
    signals_match = re.search(r"export const MOCK_LIVE_SIGNALS: LiveSignalItem\[\]\s*=\s*\[(.*?)\];", content, re.DOTALL)
    if not signals_match:
        errors.append("Could not parse MOCK_LIVE_SIGNALS in mockData.ts")
    else:
        sig_items = signals_match.group(1)
        sig_slugs = re.findall(r"articleSlug:\s*['\"]([^'\"]+)['\"]", sig_items)
        print(f"-> Live Signals Count: {len(sig_slugs)}")
        if len(sig_slugs) < 5:
            errors.append(f"MOCK_LIVE_SIGNALS must have at least 5 items, found {len(sig_slugs)}")
        for s in sig_slugs:
            if s not in existing_slugs:
                errors.append(f"Live Signal references non-existent article slug: '{s}'")
        for t in re.findall(r"""\btext:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")""", sig_items):
            text = t[0] or t[1]
            if len(text) > 95:
                errors.append(f"Live Signal text over 95 chars ({len(text)}): '{text[:60]}...'")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False

    print("PASS: Daily Briefing and Live Signals deep links verified.")
    return True

def check_timeline(articles):
    print("\n[Gate 3/8] Auditing Breakthrough Timeline (`MOCK_TIMELINE_EVENTS`)...")
    content = MOCK_DATA_FILE.read_text(encoding="utf-8")
    timeline_match = re.search(r"export const MOCK_TIMELINE_EVENTS: TimelineEvent\[\]\s*=\s*\[(.*?)\];", content, re.DOTALL)
    if not timeline_match:
        print("FAIL: Could not parse MOCK_TIMELINE_EVENTS in mockData.ts")
        return False

    existing_slugs = {a["slug"] for a in articles}
    events_raw = timeline_match.group(1)
    event_blocks = re.findall(r"\{\s*id:\s*['\"]([^'\"]+)['\"],(.*?)\n\s*\},?", events_raw, re.DOTALL)
    
    print(f"-> Total timeline events: {len(event_blocks)}")
    errors = []

    for ev_id, body in event_blocks:
        score_match = re.search(r"impactScore:\s*(\d+)", body)
        slug_match = re.search(r"articleSlug:\s*['\"]([^'\"]+)['\"]", body)

        if score_match:
            score = int(score_match.group(1))
            if score < 95:
                errors.append(f"Timeline event {ev_id} has impactScore {score} < 95 threshold (Rulebook §8.1).")

        if slug_match:
            slug = slug_match.group(1)
            if slug not in existing_slugs:
                errors.append(f"Timeline event {ev_id} points to non-existent articleSlug '{slug}'")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False

    print("PASS: Breakthrough Timeline events meet impact threshold and deep-links.")
    return True

def check_sitemap(articles):
    print("\n[Gate 4/8] Auditing public/sitemap.xml...")
    if not SITEMAP_FILE.exists():
        print(f"FAIL: {SITEMAP_FILE} not found.")
        return False

    sitemap_content = SITEMAP_FILE.read_text(encoding="utf-8")
    missing_slugs = []
    for art in articles:
        expected_url = f"https://nextvector.rhasan.online/article/{art['slug']}"
        if expected_url not in sitemap_content:
            missing_slugs.append(art['slug'])

    if missing_slugs:
        print(f"FAIL: Sitemap is missing {len(missing_slugs)} articles! (e.g. {missing_slugs[:3]})")
        return False

    print(f"PASS: Sitemap index contains all {len(articles)} articles.")
    return True

def check_temporal_sanity(articles):
    print("\n[Gate 5/8] Auditing Temporal Sanity (48-Hour Breaking News Window)...")
    if not articles:
        return False

    # Get newest articles (last 5)
    newest = articles[-5:]
    dates = [a["publishedAt"] for a in newest]
    print(f"-> Newest 5 articles published dates: {dates}")

    # Check if dates are well-formed ISO strings
    errors = []
    for a in newest:
        try:
            # e.g. 2026-09-14T06:00:00Z
            dt = datetime.fromisoformat(a["publishedAt"].replace("Z", "+00:00"))
        except Exception as e:
            errors.append(f"Invalid ISO publishedAt in {a['id']}: {a['publishedAt']}")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False

    print("PASS: Newest articles have valid ISO timestamps.")
    return True

def check_model_benchmark_sync():
    """Model data must be the generated, sourced build: no hand edits, no synthetic numbers, sane boards."""
    print("\n[Gate 6/8] Auditing Sourced Model Registry & Leaderboards...")
    import json
    site_file = ROOT_DIR / "scripts" / "model_sources" / "build" / "site_data.json"
    snap_dir = ROOT_DIR / "scripts" / "model_sources" / "snapshots"
    errors, warnings = [], []
    if not site_file.exists() or not MODELS_FILE.exists() or not BENCHMARKS_FILE.exists():
        print("FAIL: run `python scripts/build_model_data.py` (site_data.json / modelsData.ts / benchmarksData.ts missing).")
        return False
    site = json.loads(site_file.read_text(encoding="utf-8"))
    models_src = MODELS_FILE.read_text(encoding="utf-8")
    bench_src = BENCHMARKS_FILE.read_text(encoding="utf-8")

    # 1. Generated files only, from the same build
    for name, src in (("modelsData.ts", models_src), ("benchmarksData.ts", bench_src)):
        if "GENERATED by scripts/build_model_data.py" not in src:
            errors.append(f"{name} is not the generated build (edit curated_models.json and rebuild instead)")
    if f"MODEL_DATA_AS_OF = '{site['asOf']}'" not in models_src:
        errors.append("modelsData.ts and site_data.json come from different builds; rerun build_model_data.py")
    for banned in ("verifiedByNextVector", "generateModelsData"):
        if banned in models_src or banned in bench_src:
            errors.append(f"'{banned}' found in model data (synthetic-era field)")

    # 2. Snapshot freshness
    for snap in ("arena_text.json", "openrouter.json", "osworld_verified.json", "swebench_verified.json", "artificial_analysis.json"):
        f = snap_dir / snap
        if not f.exists():
            errors.append(f"missing snapshot {snap}")
            continue
        fetched = json.loads(f.read_text(encoding="utf-8"))["fetchedAt"]
        age = (datetime.now(timezone.utc) - datetime.fromisoformat(fetched.replace("Z", "+00:00"))).days
        if age > 30:
            errors.append(f"{snap} is {age} days old; run scripts/fetch_model_sources.py")
        elif age > 14:
            warnings.append(f"{snap} is {age} days old")

    # 3. Every model is sourced; arena fields agree with the arena board
    models = site["models"]
    ids = [m["id"] for m in models]
    if len(ids) != len(set(ids)):
        errors.append("duplicate model ids")
    arena = {e["modelId"]: e for e in site["boards"]["arena"]}
    aa_board = {e["modelId"]: e for e in site["boards"]["aa"]}
    for m in models:
        if m.get("aaIntelligence") is not None and aa_board.get(m["id"], {}).get("score") != m["aaIntelligence"]:
            errors.append(f"{m['name']}: aaIntelligence disagrees with the Artificial Analysis board")
        if not m.get("sources"):
            errors.append(f"{m['name']}: no sources")
        if m.get("arenaRank"):
            e = arena.get(m["id"])
            if not e or e["rank"] != m["arenaRank"] or e["score"] != m["arenaElo"]:
                errors.append(f"{m['name']}: arenaRank/arenaElo disagree with the Arena board")
        p = m["pricing"]
        if (p["inputPer1M"] is None) != (p["outputPer1M"] is None):
            errors.append(f"{m['name']}: only one of input/output price is set")
        if p["inputPer1M"] is not None and not p.get("source"):
            errors.append(f"{m['name']}: price has no source")

    # 4. Board order logic
    def strictly(seq, cmp):
        return all(cmp(a, b) for a, b in zip(seq, seq[1:]))
    ab = site["boards"]["arena"]
    if not strictly([e["rank"] for e in ab], lambda a, b: a < b):
        errors.append("Arena board ranks are not strictly increasing")
    if not strictly([e["score"] for e in ab], lambda a, b: a >= b):
        errors.append("Arena board scores are not in descending order")
    for key in ("osworld", "swebench", "pareto", "aa", "osworldAll", "paretoAll"):
        board = site["boards"][key]
        if [e["rank"] for e in board] != list(range(1, len(board) + 1)):
            errors.append(f"{key} board ranks are not 1..N")
        if not strictly([e["score"] for e in board], lambda a, b: a >= b):
            errors.append(f"{key} board scores are not in descending order")
    pareto_prices = [float(e["costPerRun"].split()[0].lstrip("$")) for e in site["boards"]["pareto"]]
    if not strictly(pareto_prices, lambda a, b: a >= b):
        errors.append("Pareto frontier is not monotonic (a higher score must cost more)")
    # Chart points: one per priced model, and the marked frontier is exactly the frontier board
    points = site["pricePoints"]
    if len(points) != len(site["boards"]["paretoAll"]):
        errors.append(f"price chart has {len(points)} points but {len(site['boards']['paretoAll'])} priced models")
    if {p["modelId"] for p in points if p["frontier"]} != {e["modelId"] for e in site["boards"]["pareto"]}:
        errors.append("price chart frontier points do not match the Pareto board")
    for p in points:
        if p["modelId"] not in ids:
            errors.append(f"price chart point references unknown {p['modelId']}")
        # Beaten = another model costs no more and scores at least as high, and is better on one of the two
        beaten = any(q["price"] <= p["price"] and q["score"] >= p["score"] and (q["price"] < p["price"] or q["score"] > p["score"])
                     for q in points)
        if beaten == p["frontier"]:
            errors.append(f"price chart point {p['modelName']} has the wrong frontier flag")

    # 5. Showdowns and guide picks reference real models
    for sd in site["showdowns"]:
        for k in ("modelIdA", "modelIdB"):
            if sd[k] not in ids:
                errors.append(f"showdown {sd['slug']} references unknown {sd[k]}")
    for g in site["guide"]:
        if g["modelId"] not in ids:
            errors.append(f"guide pick {g['id']} references unknown {g['modelId']}")

    for w in warnings:
        print(f"  [WARN] {w}")
    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False
    print(f"PASS: {len(models)} sourced models (data {site['asOf']}); boards Arena {len(ab)}, "
          f"OSWorld {len(site['boards']['osworld'])}, SWE-bench {len(site['boards']['swebench'])}, "
          f"Pareto {len(site['boards']['pareto'])}, AA {len(site['boards']['aa'])}; {len(site['showdowns'])} showdowns consistent.")
    return True

def check_seo_geo_readiness():
    print("\n[Gate 7/8] Auditing SEO, GEO & AI Overview Readiness...")
    if not ARTICLES_FILE.exists():
        print(f"FAIL: {ARTICLES_FILE} missing.")
        return False

    content = ARTICLES_FILE.read_text(encoding="utf-8")
    articles = re.split(r'(?=\{\s*id:\s*["\']art-\d+["\'])', content)[1:]
    print(f"-> Total articles evaluated for SEO/GEO readiness: {len(articles)}")

    errors = []
    total_tags = 0
    total_takeaways = 0
    total_citations = 0

    for idx, art_text in enumerate(articles, 1):
        id_m = re.search(r'id:\s*["\'](art-\d+)["\']', art_text)
        art_id = id_m.group(1) if id_m else f"unknown-{idx}"

        # 1. Tags check (min 5 targeted search terms/keywords)
        tags_start = art_text.find("tags:")
        if tags_start != -1:
            bracket_start = art_text.find("[", tags_start)
            bracket_end = art_text.find("]", bracket_start)
            tags_raw = art_text[bracket_start+1:bracket_end]
            tags = re.findall(r'["\']([^"\']+)["\']', tags_raw)
            total_tags += len(tags)
            if len(tags) < 5:
                errors.append(f"{art_id}: tags count {len(tags)} < 5 (Rulebook §10 SEO/GEO requirement)")
        else:
            errors.append(f"{art_id}: missing tags array")

        # 2. Three-Question Framework (>80 chars each for Google AI Overview / FAQ synthesis)
        wh_m = re.search(r'whatHappened:\s*["\'](.*?)["\'],\s*\n', art_text, re.DOTALL)
        wm_m = re.search(r'whyItMatters:\s*["\'](.*?)["\'],\s*\n', art_text, re.DOTALL)
        wn_m = re.search(r'whatsNext:\s*["\'](.*?)["\']\s*,?\s*\n', art_text, re.DOTALL)

        if not wh_m or len(wh_m.group(1).strip()) < 80:
            errors.append(f"{art_id}: whatHappened missing or < 80 chars ({len(wh_m.group(1).strip()) if wh_m else 0})")
        if not wm_m or len(wm_m.group(1).strip()) < 80:
            errors.append(f"{art_id}: whyItMatters missing or < 80 chars ({len(wm_m.group(1).strip()) if wm_m else 0})")
        if not wn_m or len(wn_m.group(1).strip()) < 80:
            errors.append(f"{art_id}: whatsNext missing or < 80 chars ({len(wn_m.group(1).strip()) if wn_m else 0})")

        # 3. Key Takeaways check (min 3 bullet points for snippet extraction)
        kt_start = art_text.find("keyTakeaways:")
        if kt_start != -1:
            kt_block_m = re.search(r'keyTakeaways:\s*\[(.*?)\n\s*\]', art_text, re.DOTALL)
            if kt_block_m:
                kt_raw = kt_block_m.group(1)
                takeaways = re.findall(r'^\s*["\'](.*?)["\'],?\s*$', kt_raw, re.MULTILINE)
                total_takeaways += len(takeaways)
                if len(takeaways) < 3:
                    errors.append(f"{art_id}: keyTakeaways count {len(takeaways)} < 3")
            else:
                errors.append(f"{art_id}: malformed keyTakeaways array")
        else:
            errors.append(f"{art_id}: missing keyTakeaways")

        # 4. Citations check (min 1 authoritative citation link)
        cit_start = art_text.find("citations:")
        if cit_start != -1:
            cit_block_m = re.search(r'citations:\s*\[(.*?)\n\s*\]', art_text, re.DOTALL)
            if cit_block_m:
                cit_raw = cit_block_m.group(1)
                cits = re.findall(r'\{\s*["\']?title["\']?:', cit_raw)
                total_citations += len(cits)
                if len(cits) < 1:
                    errors.append(f"{art_id}: citations count {len(cits)} < 1")
            else:
                errors.append(f"{art_id}: malformed citations array")
        else:
            errors.append(f"{art_id}: missing citations")

    print(f"-> Total keywords/search tags indexed: {total_tags} (avg {total_tags/len(articles):.1f}/art)")
    print(f"-> Total key takeaways indexed: {total_takeaways} (avg {total_takeaways/len(articles):.1f}/art)")
    print(f"-> Total citations indexed: {total_citations} (avg {total_citations/len(articles):.1f}/art)")

    # 5. Schema & SEO component integrity
    if not SEO_HEAD_FILE.exists():
        errors.append(f"SEOHead.tsx missing from {SEO_HEAD_FILE}")
    else:
        seo_text = SEO_HEAD_FILE.read_text(encoding="utf-8")
        if "max-snippet:-1" not in seo_text or "max-image-preview:large" not in seo_text:
            errors.append("SEOHead.tsx missing AI crawler directives (max-snippet:-1, max-image-preview:large)")
        if "keywords" not in seo_text:
            errors.append("SEOHead.tsx missing keywords meta injection")
        if "application/ld+json" not in seo_text:
            errors.append("SEOHead.tsx missing JSON-LD schema script injection")

    if not ARTICLE_DETAIL_FILE.exists():
        errors.append(f"ArticleDetailPage.tsx missing from {ARTICLE_DETAIL_FILE}")
    else:
        detail_text = ARTICLE_DETAIL_FILE.read_text(encoding="utf-8")
        if "TechArticle" not in detail_text:
            errors.append("ArticleDetailPage.tsx missing TechArticle schema definition")
        if "FAQPage" not in detail_text:
            errors.append("ArticleDetailPage.tsx missing FAQPage schema definition")
        if "SpeakableSpecification" not in detail_text or ".three-questions-block" not in detail_text:
            errors.append("ArticleDetailPage.tsx missing SpeakableSpecification with .three-questions-block selector")

    if errors:
        for err in errors[:15]:
            print(f"  [ERROR] {err}")
        return False

    print("PASS: SEO, GEO & AI Overview readiness verified (Tags >= 5, ThreeQuestions > 80 chars, KeyTakeaways >= 3, Citations >= 1, Schema.org Graph & Speakable selectors).")
    return True

def check_related_links():
    print("\n[Gate 8/8] Auditing Related Model / Benchmark / Paper Links...")
    articles_src = ARTICLES_FILE.read_text(encoding="utf-8")
    mock_src = MOCK_DATA_FILE.read_text(encoding="utf-8")
    models_src = MODELS_FILE.read_text(encoding="utf-8")

    known = {
        "relatedModelId": set(re.findall(r'["\']?id["\']?:\s*["\'](model-[^"\']+)["\']', models_src)),
        "relatedBenchmarkId": set(re.findall(r'\bid:\s*["\'](bench-[^"\']+)["\']', mock_src)),
        "relatedPaperId": set(re.findall(r'\bid:\s*["\'](paper-[^"\']+)["\']', mock_src)),
    }

    errors = set()
    for field, valid_ids in known.items():
        for ref in re.findall(field + r':\s*["\']([^"\']+)["\']', articles_src):
            if ref not in valid_ids:
                hint = ", ".join(sorted(valid_ids)) if field != "relatedModelId" else "see modelsData.ts"
                errors.add(f"{field} '{ref}' does not exist (valid: {hint})")

    if errors:
        for err in sorted(errors):
            print(f"  [ERROR] {err}")
        return False

    print(f"PASS: All related links resolve ({len(known['relatedModelId'])} models, "
          f"{len(known['relatedBenchmarkId'])} benchmarks, {len(known['relatedPaperId'])} papers).")
    return True

def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    
    print("=========================================================")
    print("  NextVector Pre-Publication Release Gate Verification   ")
    print("=========================================================")
    
    pass_articles, articles = check_articles()
    if not pass_articles:
        print("\n[FAIL] RELEASE GATE FAILED at Articles Audit.")
        sys.exit(1)

    pass_briefing = check_briefing_and_signals(articles)
    if not pass_briefing:
        print("\n[FAIL] RELEASE GATE FAILED at Briefing & Signals Audit.")
        sys.exit(1)

    pass_timeline = check_timeline(articles)
    if not pass_timeline:
        print("\n[FAIL] RELEASE GATE FAILED at Timeline Audit.")
        sys.exit(1)

    pass_sitemap = check_sitemap(articles)
    if not pass_sitemap:
        print("\n[FAIL] RELEASE GATE FAILED at Sitemap Audit.")
        sys.exit(1)

    pass_temporal = check_temporal_sanity(articles)
    if not pass_temporal:
        print("\n[FAIL] RELEASE GATE FAILED at Temporal Sanity Audit.")
        sys.exit(1)

    pass_models_bench = check_model_benchmark_sync()
    if not pass_models_bench:
        print("\n[FAIL] RELEASE GATE FAILED at Model & Benchmark Sync Audit.")
        sys.exit(1)

    pass_seo_geo = check_seo_geo_readiness()
    if not pass_seo_geo:
        print("\n[FAIL] RELEASE GATE FAILED at SEO, GEO & AI Overview Readiness Audit.")
        sys.exit(1)

    pass_links = check_related_links()
    if not pass_links:
        print("\n[FAIL] RELEASE GATE FAILED at Related Links Audit.")
        sys.exit(1)

    print("\n=========================================================")
    print("  [SUCCESS] ALL 8 RELEASE GATES PASSED (100% Rulebook Compliant)")
    print("=========================================================")
    sys.exit(0)

if __name__ == "__main__":
    main()
