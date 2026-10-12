#!/usr/bin/env python3
"""
NextVector Static Pre-Rendering (SSG) & GEO Optimization Pipeline
Generates standalone, SEO/GEO-optimized static HTML files for all articles,
models, core hubs, /faq, /contact, and the root homepage in dist/ after Vite build.
Also generates valid RSS 2.0 (rss.xml), the LLM files (llms.txt, llms-full.txt), the model picks in
ai-summary.json, and the <noscript> model list in index.html, all from site_data.json and articlesData.ts.
"""

import os
import sys
import re
import json
import html
import subprocess
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT_DIR / "dist"
PUBLIC_DIR = ROOT_DIR / "public"
INDEX_HTML = DIST_DIR / "index.html"
ARTICLES_FILE = ROOT_DIR / "src" / "data" / "articlesData.ts"
MODELS_FILE = ROOT_DIR / "src" / "data" / "modelsData.ts"
COMPARE_FILE = ROOT_DIR / "src" / "pages" / "ComparePage.tsx"

BASE_URL = "https://nextvector.rhasan.online"

# /subscriptions plan facts, copied from vendor pricing pages (keep in sync with src/components/models/SubscriptionGuide.tsx)
PLANS_CHECKED = "October 12, 2026"
PLAN_SUMMARIES = [
    ("Claude Pro — $20/mo", "Opus 5.5, Sonnet 5.5 and Haiku 5.5, plus Claude Code and Projects. Fable 5.1 costs extra usage credits. Best for writing, research and coding."),
    ("ChatGPT Plus — $20/mo", "GPT-6.1 Sol, GPT-6 Astra, GPT-6 Sol and GPT-5.6 Sol, Terra and Luna, plus voice chats, image creation, deep research and Codex. ChatGPT Go costs $8/mo."),
    ("Google AI Pro — $19.99/mo", "Gemini 3.8 Flash and Gemini 3.1 Pro, about 4x the Free usage, 5 TB of storage, Gemini in Gmail, Docs and Sheets. Best for Google users and families."),
    ("Cursor Pro — $20/mo", "A coding editor with models from Anthropic, OpenAI and Google (for example Claude Opus 5.5, GPT-5.6 Sol, Gemini 3.8 Flash). Best for software engineers."),
    ("$100-$200 plans", "ChatGPT Pro ($100, $200 or $500), Claude Max 5x ($100) or 20x ($200), Google AI Ultra ($100 or $200). Worth it only if you hit the $20 limits every day."),
    ("Pay-per-use API credits", "Developers can put $20-$200 into API credits instead and pay only for what they use. Cheap models such as DeepSeek cost a small fraction of the top models."),
]
DEFAULT_IMAGE = f"{BASE_URL}/brand/nextvector-brand-system.jpg"
LOGO_URL = f"{BASE_URL}/brand/nextvector-logo.jpg"

def escape(s):
    return html.escape(str(s or ""), quote=True)

_JS_ESCAPES = {'"': '"', "'": "'", "\\": "\\", "n": "\n", "t": "\t"}

def js_unescape(s):
    """Decode JS string escapes (\\u2019, \\", \\') so pages show ’ and — instead of the escape text."""
    return re.sub(r'\\(u[0-9a-fA-F]{4}|["\'\\nt])',
                  lambda m: chr(int(m.group(1)[1:], 16)) if m.group(1)[0] == "u" else _JS_ESCAPES[m.group(1)], s)

def parse_articles():
    content = ARTICLES_FILE.read_text(encoding="utf-8")
    blocks = re.split(r'(?=\{\s*id:\s*["\']art-\d+["\'])', content)[1:]
    articles = []

    def get_field(name, text):
        m = re.search(name + r':\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\')', text, re.DOTALL)
        if m:
            val = m.group(1) if m.group(1) is not None else m.group(2)
            return js_unescape(val)
        return None

    for b in blocks:
        id_m = re.search(r'id:\s*["\'](art-\d+)["\']', b)
        slug = get_field('slug', b)
        title = get_field('title', b)
        subtitle = get_field('subtitle', b) or ""
        category = get_field('category', b) or "ai"
        art_type = get_field('articleType', b) or "analysis"
        score_m = re.search(r'signalRating:\s*(\d+)', b)
        pub = get_field('publishedAt', b)
        read_m = re.search(r'readTimeMinutes:\s*(\d+)', b)
        cover = get_field('coverImage', b)
        cover_alt = get_field('coverImageAlt', b) or ""

        # Tags
        tags = []
        tags_start = b.find("tags:")
        if tags_start != -1:
            br_s = b.find("[", tags_start)
            br_e = b.find("]", br_s)
            tags = re.findall(r'["\']([^"\']+)["\']', b[br_s+1:br_e])

        # Three Questions
        wh = get_field('whatHappened', b) or ""
        wm = get_field('whyItMatters', b) or ""
        wn = get_field('whatsNext', b) or ""

        # Key Takeaways
        takeaways = []
        kt_start = b.find("keyTakeaways:")
        if kt_start != -1:
            kt_block_m = re.search(r'keyTakeaways:\s*\[(.*?)\n\s*\]', b, re.DOTALL)
            if kt_block_m:
                takeaways = [js_unescape(s) for s in re.findall(r'^\s*["\'](.*?)["\'],?\s*$', kt_block_m.group(1), re.MULTILINE)]

        # Content paragraphs
        content_paras = []
        c_start = b.find("content:")
        if c_start != -1:
            c_block_m = re.search(r'content:\s*\[(.*?)\n\s*\]', b, re.DOTALL)
            if c_block_m:
                content_paras = [js_unescape(s) for s in re.findall(r'^\s*["\'](.*?)["\'],?\s*$', c_block_m.group(1), re.MULTILINE)]

        # Citations
        citations = []
        cit_start = b.find("citations:")
        if cit_start != -1:
            cit_block_m = re.search(r'citations:\s*\[(.*?)\n\s*\]', b, re.DOTALL)
            if cit_block_m:
                for cm in re.finditer(r'\{\s*(?:title|url|source)[^}]*\}', cit_block_m.group(1), re.DOTALL):
                    c_txt = cm.group(0)
                    ct = re.search(r'title:\s*["\']([^"\']+)["\']', c_txt)
                    cu = re.search(r'url:\s*["\']([^"\']+)["\']', c_txt)
                    cs = re.search(r'source:\s*["\']([^"\']+)["\']', c_txt)
                    if ct and cu:
                        citations.append({
                            "title": ct.group(1),
                            "url": cu.group(1),
                            "source": cs.group(1) if cs else ""
                        })

        if slug and title:
            articles.append({
                "id": id_m.group(1) if id_m else "",
                "slug": slug,
                "title": title,
                "subtitle": subtitle,
                "category": category,
                "articleType": art_type,
                "signalRating": int(score_m.group(1)) if score_m else 90,
                "publishedAt": pub if pub else "2026-09-28T00:00:00Z",
                "readTimeMinutes": int(read_m.group(1)) if read_m else 5,
                "coverImage": cover if cover else "/brand/nextvector-brand-system.jpg",
                "coverImageAlt": cover_alt,
                "tags": tags,
                "threeQuestions": {
                    "whatHappened": wh.strip(),
                    "whyItMatters": wm.strip(),
                    "whatsNext": wn.strip()
                },
                "keyTakeaways": takeaways,
                "content": content_paras,
                "citations": citations
            })

    return articles

SITE_DATA_FILE = ROOT_DIR / "scripts" / "model_sources" / "build" / "site_data.json"
_SITE_DATA = None


def site_data():
    """Model registry, leaderboards, showdowns and guide picks written by scripts/build_model_data.py."""
    global _SITE_DATA
    if _SITE_DATA is None:
        _SITE_DATA = json.loads(SITE_DATA_FILE.read_text(encoding="utf-8"))
    return _SITE_DATA


def fmt_price(v):
    if v is None:
        return "Not public"
    digits = 3 if (v < 10 and abs(v * 100 - round(v * 100)) > 1e-9) else 2
    return f"${v:.{digits}f}"


def parse_models():
    models = []
    for m in site_data()["models"]:
        p = m["pricing"]
        models.append({
            "id": m["id"], "name": m["name"], "developer": m["developer"], "releaseDate": m["releaseDate"],
            "modelType": m["modelType"], "description": m.get("summary", ""), "parameters": m["parameters"],
            "contextWindow": m["contextWindow"], "license": m["license"],
            "arenaRank": m.get("arenaRank"), "arenaElo": m.get("arenaElo"), "arenaCI": m.get("arenaCI"),
            "inputPrice": p.get("inputPer1M"), "outputPrice": p.get("outputPer1M"),
            "priceText": f"{fmt_price(p.get('inputPer1M'))} / {fmt_price(p.get('outputPer1M'))}" if p.get("inputPer1M") is not None else "Not public",
            "sources": m.get("sources", []), "benchmarks": m.get("benchmarks", []),
        })
    return models


def parse_showdowns():
    """Head-to-head showdowns generated from registry data (see build_model_data.py)."""
    return [{
        "slug": sd["slug"], "name": sd["name"], "title": sd["seoTitle"], "description": sd["seoDescription"],
        "verdict": sd["executiveVerdict"], "faqs": sd.get("faqs", []),
    } for sd in site_data()["showdowns"]]


def board_top(board, n=3, unit=""):
    rows = site_data()["boards"][board][:n]
    return " | ".join(f"#{e['rank']} {escape(e['modelName'])} ({e['score']}{unit})" for e in rows)


def guide_line(pick_id):
    p = next((g for g in site_data()["guide"] if g["id"] == pick_id), None)
    return f"{p['modelName']} ({p['metric']}; {p['price']})" if p else "n/a"


_GIT_AVAILABLE = None

def git_last_modified(*rel_paths):
    """Last commit date (YYYY-MM-DD) touching any of the paths, or None when git history is unavailable."""
    global _GIT_AVAILABLE
    if _GIT_AVAILABLE is False:
        return None
    try:
        res = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", *rel_paths],
            cwd=ROOT_DIR, capture_output=True, text=True, timeout=15,
        )
    except Exception:
        _GIT_AVAILABLE = False
        return None
    if res.returncode != 0:
        _GIT_AVAILABLE = False
        return None
    _GIT_AVAILABLE = True
    return res.stdout.strip() or None

def generate_sitemap(articles, models, showdowns):
    """Builds sitemap.xml from the real catalog. Needs git history for honest lastmod dates;
    without it (e.g. CI clones with no .git) the committed public/sitemap.xml is kept as-is."""
    if git_last_modified("src/data/articlesData.ts") is None:
        print("Note: git history unavailable; keeping committed public/sitemap.xml unchanged.")
        return

    newest = articles[0]["publishedAt"][:10] if articles else None

    def newest_where(pred):
        for a in articles:
            if pred(a):
                return a["publishedAt"][:10]
        return newest

    def page_date(*paths):
        return git_last_modified(*paths) or newest

    models_date = page_date("src/data/modelsData.ts")
    entries = [
        ("/", newest, "daily", "1.0"),
        ("/models", models_date, "daily", "0.95"),
        ("/benchmarks", page_date("src/data/benchmarksData.ts", "src/data/modelsData.ts"), "daily", "0.95"),
        ("/briefing", page_date("src/data/mockData.ts"), "daily", "0.95"),
        ("/subscriptions", page_date("src/pages/SubscriptionsPage.tsx"), "weekly", "0.95"),
        ("/compare", page_date("src/pages/ComparePage.tsx"), "weekly", "0.95"),
        ("/timeline", page_date("src/data/mockData.ts"), "weekly", "0.85"),
        ("/research", page_date("src/pages/ResearchPage.tsx", "src/data/mockData.ts"), "weekly", "0.85"),
        ("/ai", newest_where(lambda a: a["category"] == "ai"), "daily", "0.90"),
        ("/technology", newest_where(lambda a: a["category"] == "technology"), "daily", "0.90"),
        ("/science", newest_where(lambda a: a["category"] == "science"), "daily", "0.90"),
        ("/analysis", newest_where(lambda a: a["articleType"] == "analysis"), "daily", "0.85"),
        ("/deep-dives", newest_where(lambda a: a["articleType"] == "deep-dive"), "daily", "0.85"),
        ("/archive", newest, "daily", "0.90"),
        ("/about", page_date("src/pages/AuthorPage.tsx"), "monthly", "0.80"),
        ("/faq", page_date("src/pages/FAQPage.tsx"), "weekly", "0.85"),
        ("/contact", page_date("src/pages/ContactPage.tsx"), "monthly", "0.80"),
    ]
    compare_date = page_date("src/pages/ComparePage.tsx")
    for i, sd in enumerate(showdowns):
        entries.append((f"/compare/{sd['slug']}", compare_date, "weekly", "0.95" if i < 3 else "0.90"))
    for a in articles:
        entries.append((f"/article/{a['slug']}", a["publishedAt"][:10], "weekly", "0.90"))
    for m in models:
        entries.append((f"/models/{m['id']}", models_date, "weekly", "0.80"))

    rows = []
    for path, lastmod, freq, prio in entries:
        loc = BASE_URL if path == "/" else f"{BASE_URL}{path}"
        rows.append(
            f"  <url>\n    <loc>{escape(loc)}</loc>\n    <lastmod>{lastmod}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n    <priority>{prio}</priority>\n  </url>"
        )
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + "\n".join(rows) + "\n</urlset>\n")
    (PUBLIC_DIR / "sitemap.xml").write_text(xml, encoding="utf-8")
    if DIST_DIR.exists():
        (DIST_DIR / "sitemap.xml").write_text(xml, encoding="utf-8")
    print(f"Generated sitemap.xml ({len(entries)} URLs) in public/ and dist/")

def build_not_found_page(template_html):
    """dist/404.html: served by the host for unknown URLs with a real 404 status."""
    body = """
    <main class="max-w-3xl mx-auto px-4 py-16 text-center">
      <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Error 404</div>
      <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight mb-4">Page not found</h1>
      <p class="text-zinc-400 mb-8">This page does not exist on NextVector.</p>
      <nav class="flex flex-wrap justify-center gap-4 text-sm font-mono">
        <a href="/" class="text-emerald-400 hover:underline">Home</a>
        <a href="/models" class="text-emerald-400 hover:underline">Model Directory</a>
        <a href="/archive" class="text-emerald-400 hover:underline">Complete Archive</a>
      </nav>
    </main>
    """
    meta = {
        "title": "Page Not Found",
        "description": "The page you requested does not exist on NextVector.",
        "keywords": "",
        "path": "/404",
    }
    out = build_prerendered_page(template_html, meta, body)
    out = re.sub(r'<meta name="robots"[^>]*>', '<meta name="robots" content="noindex, follow" />', out, count=1)
    out = re.sub(r'\s*<link rel="canonical"[^>]*>', '', out, count=1)
    (DIST_DIR / "404.html").write_text(out, encoding="utf-8")

def build_prerendered_page(template_html, page_meta, body_html):
    out = template_html
    full_title = f"{page_meta['title']} | NextVector" if "NextVector" not in page_meta['title'] else page_meta['title']
    canonical_path = page_meta.get('canonical', page_meta['path'])
    full_url = f"{BASE_URL}{canonical_path}" if canonical_path != "/" else f"{BASE_URL}/"
    img_url = page_meta.get('image', DEFAULT_IMAGE)
    if not img_url.startswith("http"):
        img_url = f"{BASE_URL}{img_url}"

    def safe_sub(pattern, replacement, text, count=0):
        return re.sub(pattern, lambda m: replacement, text, count=count)

    # Replace Title
    out = safe_sub(r'<title>.*?</title>', f'<title>{escape(full_title)}</title>', out, count=1)

    # Replace or insert Meta Description
    desc = escape(page_meta.get('description', ''))
    if '<meta name="description"' in out:
        out = safe_sub(r'<meta name="description"[^>]*>', f'<meta name="description" content="{desc}" />', out, count=1)

    # Replace or insert Keywords
    keywords = escape(page_meta.get('keywords', ''))
    if '<meta name="keywords"' in out:
        out = safe_sub(r'<meta name="keywords"[^>]*>', f'<meta name="keywords" content="{keywords}" />', out, count=1)

    # Insert/replace Canonical Link
    canonical_tag = f'<link rel="canonical" href="{full_url}" />'
    if '<link rel="canonical"' in out:
        out = safe_sub(r'<link rel="canonical"[^>]*>', canonical_tag, out, count=1)
    else:
        out = out.replace('</head>', f'  {canonical_tag}\n</head>')

    # Update OpenGraph
    out = safe_sub(r'<meta property="og:title"[^>]*>', f'<meta property="og:title" content="{escape(full_title)}" />', out)
    out = safe_sub(r'<meta property="og:description"[^>]*>', f'<meta property="og:description" content="{desc}" />', out)
    out = safe_sub(r'<meta property="og:url"[^>]*>', f'<meta property="og:url" content="{full_url}" />', out)
    out = safe_sub(r'<meta property="og:image"[^>]*>', f'<meta property="og:image" content="{img_url}" />', out)
    og_type = page_meta.get('ogType', 'website')
    out = safe_sub(r'<meta property="og:type"[^>]*>', f'<meta property="og:type" content="{og_type}" />', out)

    # Update Twitter
    out = safe_sub(r'<meta name="twitter:title"[^>]*>', f'<meta name="twitter:title" content="{escape(full_title)}" />', out)
    out = safe_sub(r'<meta name="twitter:description"[^>]*>', f'<meta name="twitter:description" content="{desc}" />', out)
    out = safe_sub(r'<meta name="twitter:image"[^>]*>', f'<meta name="twitter:image" content="{img_url}" />', out)

    # Replace existing JSON-LD or inject new
    if "schema" in page_meta and page_meta["schema"]:
        schema_json = json.dumps(page_meta["schema"], ensure_ascii=False, indent=2)
        schema_tag = f'<script type="application/ld+json" id="seo-jsonld">\n{schema_json}\n</script>'
        if '<script type="application/ld+json"' in out:
            out = re.sub(r'<script type="application/ld\+json"[^>]*>.*?</script>', schema_tag, out, flags=re.DOTALL, count=1)
        else:
            out = out.replace('</head>', f'  {schema_tag}\n</head>')

    # Inject static body content inside <div id="root">
    out = out.replace('<div id="root"></div>', f'<div id="root">\n{body_html}\n</div>')

    return out

def generate_rss_feed(articles):
    items_xml = []
    for art in articles[:60]:
        try:
            pub_dt = datetime.fromisoformat(art["publishedAt"].replace("Z", "+00:00"))
        except Exception:
            pub_dt = datetime.now(timezone.utc)
        rfc822_date = format_datetime(pub_dt)
        url = f"{BASE_URL}/article/{art['slug']}"
        items_xml.append(f"""    <item>
      <title>{escape(art['title'])}</title>
      <link>{url}</link>
      <guid isPermaLink="true">{url}</guid>
      <description>{escape(art['subtitle'])}</description>
      <category>{escape(art['category'].upper())}</category>
      <pubDate>{rfc822_date}</pubDate>
      <author>editor@nextvector.rhasan.online (Robiul Hasan)</author>
    </item>""")

    # Newest item date keeps the feed byte-identical between builds of the same content
    try:
        newest_dt = datetime.fromisoformat(articles[0]["publishedAt"].replace("Z", "+00:00"))
    except Exception:
        newest_dt = datetime.now(timezone.utc)
    now_rfc822 = format_datetime(newest_dt)
    rss_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NextVector — AI News, Frontier Model Benchmarks &amp; Intelligence</title>
    <link>{BASE_URL}</link>
    <description>Real-time AI news, sourced model benchmarks and prices, arena.ai rankings, model showdowns, and high-signal research.</description>
    <language>en-us</language>
    <lastBuildDate>{now_rfc822}</lastBuildDate>
    <atom:link href="{BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>{LOGO_URL}</url>
      <title>NextVector</title>
      <link>{BASE_URL}</link>
    </image>
{chr(10).join(items_xml)}
  </channel>
</rss>
"""
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    (PUBLIC_DIR / "rss.xml").write_text(rss_content, encoding="utf-8")
    if DIST_DIR.exists():
        (DIST_DIR / "rss.xml").write_text(rss_content, encoding="utf-8")
    print(f"Generated valid RSS 2.0 feed ({len(items_xml)} items) in public/rss.xml and dist/rss.xml")

def generate_llms_full(articles, models):
    sections = []
    sections.append("# NextVector — Complete Frontier AI Intelligence & Model Evaluation Corpus")
    sections.append("> High-signal, noise-filtered journalism and engineering intelligence covering foundation models, autonomous agents, enterprise cybersecurity, and scientific breakthroughs.")
    sections.append("Editorial Charter: Less noise. More signal. Sourced benchmarks over marketing claims. Edited by Robiul Hasan (https://rhasan.online).\n")
    
    sections.append("## Platform Overview & Methodology")
    sections.append("NextVector evaluates foundation models and technical breakthroughs through an empirical, primary-source framework. Every report answers three core questions: (1) What happened? (2) Why does it matter? (3) What could happen next? Stories are assigned a Signal Rating from 1 to 100 based on architectural novelty, benchmark verification, practical engineering utility, and source reliability.\n")

    sd = site_data()
    sections.append(f"## Model Decision Guide (data checked {sd['asOf']})")
    sections.append("Each pick comes from a stated rule over public data: arena.ai text leaderboard, OSWorld-Verified, SWE-bench Verified and list prices. NextVector does not run these tests.")
    for g in sd["guide"]:
        sections.append(f"- {g['title']}: {g['modelName']} ({g['developer']}) — {g['metric']}; list price {g['price']}. Rule: {g['rule']}")
    sections.append("")

    sections.append(f"## AI Models Directory ({len(models)} Models, sourced data)")
    for m in models:
        rank_str = f"#{m['arenaRank']}" if m.get('arenaRank') else "Unranked"
        elo_str = f"score {m['arenaElo']} ±{m['arenaCI']}" if m.get('arenaElo') else "not on Arena"
        sections.append(f"### {m['name']} ({m['developer']})")
        sections.append(f"- Model Detail Page: {BASE_URL}/models/{m['id']}")
        sections.append(f"- Release Date: {m['releaseDate']} | Architecture Type: {m['modelType']}")
        sections.append(f"- Parameters: {m['parameters']} | Context Window: {m['contextWindow']} | License: {m['license']}")
        sections.append(f"- arena.ai text leaderboard: {rank_str} ({elo_str})")
        sections.append(f"- API list price (input / output per 1M tokens): {m['priceText']}")
        for bmk in m["benchmarks"]:
            if bmk["benchmarkName"] != "Arena Text Elo":
                sections.append(f"- {bmk['benchmarkName']}: {bmk['score']} ({bmk['vsPreviousGen']})")
        sections.append(f"- Summary: {m['description']}")
        sections.append(f"- Sources: {', '.join(src['url'] for src in m['sources'])}\n")

    sections.append("## Published Intelligence Reports (Full Text Corpus)")
    for art in articles:
        takeaways_md = "\n".join([f"- {t}" for t in art["keyTakeaways"]])
        paras_md = "\n\n".join(art["content"])
        citations_md = "\n".join([f"- [{c['title']}]({c['url']}) ({c['source']})" for c in art["citations"]])
        sections.append(f"### {art['title']}")
        sections.append(f"- Canonical URL: {BASE_URL}/article/{art['slug']}")
        sections.append(f"- Published: {art['publishedAt'][:10]} | Category: {art['category'].upper()} | Signal Rating: {art['signalRating']}/100")
        sections.append(f"- Executive Summary: {art['subtitle']}\n")
        sections.append(f"**What Happened?**\n{art['threeQuestions']['whatHappened']}\n")
        sections.append(f"**Why It Matters:**\n{art['threeQuestions']['whyItMatters']}\n")
        sections.append(f"**What Could Happen Next:**\n{art['threeQuestions']['whatsNext']}\n")
        sections.append(f"**Key Takeaways:**\n{takeaways_md}\n")
        sections.append(f"**Full Article Content:**\n{paras_md}\n")
        if citations_md:
            sections.append(f"**Primary Sources & Citations:**\n{citations_md}\n")
        sections.append("---\n")
    
    full_corpus = "\n".join(sections)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    (PUBLIC_DIR / "llms-full.txt").write_text(full_corpus, encoding="utf-8")
    if DIST_DIR.exists():
        (DIST_DIR / "llms-full.txt").write_text(full_corpus, encoding="utf-8")
    print(f"Generated comprehensive llms-full.txt ({len(full_corpus.encode('utf-8'))} bytes) in public/ and dist/")

def top_released_models(n=5):
    """Highest arena.ai text scores among generally released models (pre-release entries skipped)."""
    ranked = [m for m in site_data()["models"] if m.get("arenaRank") and not m.get("preRelease")]
    return sorted(ranked, key=lambda m: m["arenaRank"])[:n]


def model_fact_line(m):
    p = m["pricing"]
    price = (f"{fmt_price(p['inputPer1M'])} / {fmt_price(p['outputPer1M'])} per 1M tokens (input / output)"
             if p.get("inputPer1M") is not None else "price not public")
    return (f"arena.ai text score {m['arenaElo']} ±{m['arenaCI']} (#{m['arenaRank']} of {site_data()['arenaTotal']}), "
            f"{price}, {m['contextWindow']} context")


def inject_top_models(template_html):
    """Fill the <noscript> model list in index.html (#nv-top-models) from site_data.json."""
    sd = site_data()
    items = "".join(
        f'\n            <li><a href="/models/{m["id"]}"><strong>{escape(m["name"])}</strong></a> ({escape(m["developer"])}): {escape(model_fact_line(m))}.</li>'
        for m in top_released_models())
    block = (f'<div id="nv-top-models">\n'
             f'          <h2>Top AI Models by arena.ai Text Score (data checked {sd["asOf"]})</h2>\n'
             f'          <ol>{items}\n          </ol>\n'
             f'          <p>Released models only. Sources and full tables: <a href="/models">AI Models Directory</a>, <a href="/benchmarks">leaderboards</a>.</p>\n'
             f'        </div>')
    out, n = re.subn(r'<div id="nv-top-models">.*?</div>', lambda _: block, template_html, count=1, flags=re.DOTALL)
    if n != 1:
        sys.exit("Error: <div id=\"nv-top-models\"> not found in dist/index.html")
    return out


def faq_pairs():
    """Question/answer pairs shown on the prerendered /faq page and used for its FAQPage schema."""
    sd = site_data()
    cvc = next((s["executiveVerdict"] for s in sd["showdowns"] if s["slug"] == "claude-vs-chatgpt"), "")
    return [
        ("Which AI model scores highest right now?",
         f"Highest arena.ai text score (released models): {guide_line('top-arena')}. Best score under $1 per 1M tokens: {guide_line('value')}. "
         f"Best open weights: {guide_line('open')}. Computer use (OSWorld-Verified): {guide_line('computer-use')}. "
         f"Highest Artificial Analysis Intelligence Index: {guide_line('aa-intelligence')} (data: Artificial Analysis). Data checked {sd['asOf']}."),
        ("Claude vs ChatGPT: what does the data say?", f"{cvc} Data checked {sd['asOf']}."),
        ("Where do the model and benchmark numbers come from?",
         "From public sources only: arena.ai (text leaderboard), the Artificial Analysis indexes (artificialanalysis.ai), OSWorld-Verified, swebench.com, OpenRouter's model catalog and the labs' own price pages. "
         "We save a dated copy of each source and do not run the tests ourselves. Missing values are shown as \"Not disclosed\" or \"Not listed\"."),
        ("How are NextVector Signal Ratings calculated?",
         "Signal Ratings use a 4-part formula: Architectural Novelty (30%), Empirical Benchmark Verification (30%), Practical Engineering Utility (25%), and Primary Source Reliability (15%)."),
    ]


def faq_html():
    cards = "".join(f"""
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h2 class="text-lg font-bold text-zinc-100">{escape(q)}</h2>
                  <p class="text-sm text-zinc-300 leading-relaxed">{escape(a)}</p>
                </div>
""" for q, a in faq_pairs())
    return f'<div class="space-y-6">{cards}              </div>'


def faq_schema():
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": f"{BASE_URL}/faq#faq",
        "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                       for q, a in faq_pairs()],
    }


def first_sentence(text):
    return re.split(r'(?<=[.!?])\s+', text.strip(), maxsplit=1)[0]


def write_public_and_dist(name, text):
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    (PUBLIC_DIR / name).write_text(text, encoding="utf-8")
    if DIST_DIR.exists():
        (DIST_DIR / name).write_text(text, encoding="utf-8")


def generate_llms_txt(articles, models):
    """Short llms.txt index. Model figures come from site_data.json; latest stories from articlesData.ts."""
    sd = site_data()
    L = [
        "# NextVector",
        "",
        "> NextVector is an independent AI news site and model data hub. Stories use a three-question format (What happened? Why does it matter? What could happen next?). "
        "Model pages carry sourced data: arena.ai text scores, Artificial Analysis indexes (data: Artificial Analysis, https://artificialanalysis.ai), OSWorld-Verified and SWE-bench Verified results, list prices and context windows.",
        "",
        "Editorial charter: Less noise. More signal. Sourced benchmarks over marketing claims. Founded and edited by Robiul Hasan (https://rhasan.online). "
        "Every story links its primary sources and gets a 1–100 Signal Rating (formula on the About page). "
        f"NextVector does not run benchmarks itself: model numbers come from public leaderboards and vendor price pages, saved as dated copies. Model data checked {sd['asOf']}.",
        "",
        "## Core Hubs",
        f"- [NextVector Home]({BASE_URL}/): Latest AI news, newest first, with the lead story on top.",
        f"- [AI Models Directory]({BASE_URL}/models): {len(models)} tracked AI models with sourced list prices, context windows, licences and arena.ai text scores.",
        f"- [Model Showdowns & Comparisons]({BASE_URL}/compare): Head-to-head comparisons built from the same data (arena.ai score, list price, context, licence).",
        f"- [AI Subscription Buyer's Guide]({BASE_URL}/subscriptions): Plain-English guide to ChatGPT Plus, Claude Pro, Google AI Pro, Cursor Pro and the $100-$200 plans, with budget options. Plan prices checked on vendor pages {PLANS_CHECKED}.",
        f"- [Benchmark Leaderboards]({BASE_URL}/benchmarks): arena.ai text, the Artificial Analysis Intelligence Index, OSWorld-Verified (computer use), SWE-bench Verified (code, bash-only runs) and a price vs Arena score frontier.",
        f"- [AI Breakthrough Timeline]({BASE_URL}/timeline): Chronological record of major AI and computing milestones.",
        f"- [Daily Intelligence Briefing]({BASE_URL}/briefing): A short scan of the day's main AI stories.",
        f"- [Research Explained]({BASE_URL}/research): Plain-language explanations of research papers.",
        f"- [Story Archive]({BASE_URL}/archive): Crawlable list of every published story.",
        "",
        f"## Model Decision Guide (data checked {sd['asOf']})",
    ]
    for g in sd["guide"]:
        L.append(f"- {g['title']}: [{g['modelName']}]({BASE_URL}/models/{g['modelId']}) ({g['developer']}): {g['metric']}; list price {g['price']}.")

    L += ["", f"## Top Released Models by arena.ai Text Score (data checked {sd['asOf']})"]
    for m in top_released_models():
        L.append(f"- [{m['name']}]({BASE_URL}/models/{m['id']}) ({m['developer']}): {model_fact_line(m)}.")

    boards = [
        ("arena", "arena.ai text leaderboard (tracked models, real arena.ai rank)", ""),
        ("aa", f"Artificial Analysis Intelligence Index v{sd['aa']['indexVersion']} (data: Artificial Analysis, https://artificialanalysis.ai)", ""),
        ("osworld", "OSWorld-Verified (computer use, success rate)", "%"),
        ("swebench", "SWE-bench Verified (bash-only runs, % resolved)", "%"),
        ("pareto", "Price vs Arena score frontier (NextVector calculation over list prices)", ""),
    ]
    L += ["", "## Leaderboards (top 3 each)"]
    for key, label, unit in boards:
        tops = []
        for e in sd["boards"][key][:3]:
            name = f"[{e['modelName']}]({BASE_URL}/models/{e['modelId']})" if e.get("modelId") else e["modelName"]
            extra = [x for x in (e.get("costPerRun"), "pre-release" if "pre-release" in (e.get("note") or "") else None, e["date"]) if x]
            tops.append(f"#{e['rank']} {name} {e['score']}{unit} ({', '.join(extra)})")
        L.append(f"- [{label}]({BASE_URL}/benchmarks): " + "; ".join(tops) + ".")

    L += ["", "## Model Showdowns"]
    for s in sd["showdowns"]:
        L.append(f"- [{s['name']}]({BASE_URL}/compare/{s['slug']}): {first_sentence(s['executiveVerdict'])}")

    L += ["", "## Latest Stories"]
    for a in articles[:5]:
        L.append(f"- [{a['title']}]({BASE_URL}/article/{a['slug']}) ({a['publishedAt'][:10]}): {a['subtitle']}")

    L += [
        "",
        "## Editorial Standards",
        f"- [About NextVector & Robiul Hasan]({BASE_URL}/about): Founder background, editorial principles and the 1–100 Signal Rating formula.",
        f"- [Frequently Asked Questions]({BASE_URL}/faq): Answers on AI models, where our data comes from and how Signal Ratings work.",
        f"- [Contact]({BASE_URL}/contact): Editorial contact, corrections and benchmark submissions.",
        "",
        "## Machine-Readable Endpoints",
        f"- [XML Sitemap]({BASE_URL}/sitemap.xml): Every published story, model and hub page.",
        f"- [RSS 2.0 Feed]({BASE_URL}/rss.xml): The 60 newest stories.",
        f"- [Full Text for LLMs]({BASE_URL}/llms-full.txt): Every story in full plus the complete model directory with sources.",
        f"- [Machine AI Summary]({BASE_URL}/ai-summary.json): Site facts, endpoints and current model picks as JSON.",
        "",
    ]
    text = "\n".join(L)
    write_public_and_dist("llms.txt", text)
    print(f"Generated llms.txt ({len(text.encode('utf-8'))} bytes) in public/ and dist/")


def update_ai_summary():
    """Refresh the model picks in ai-summary.json from site_data.json. Other keys are kept as written."""
    sd = site_data()
    path = PUBLIC_DIR / "ai-summary.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data.pop("topPicks2026", None)
    data["modelPicks"] = {
        "dataAsOf": sd["asOf"],
        "method": "Each pick applies a stated rule to public data (arena.ai text leaderboard, Artificial Analysis indexes, OSWorld-Verified, SWE-bench Verified, list prices). NextVector does not run these tests.",
        "credit": "Artificial Analysis index data: https://artificialanalysis.ai",
        "picks": [{
            "category": g["title"],
            "rule": g["rule"],
            "model": g["modelName"],
            "developer": g["developer"],
            "metric": g["metric"],
            "listPrice": g["price"],
            "url": f"{BASE_URL}/models/{g['modelId']}",
        } for g in sd["guide"]],
    }
    write_public_and_dist("ai-summary.json", json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(f"Updated ai-summary.json model picks (data as of {sd['asOf']}) in public/ and dist/")


def prerender_all():
    if not INDEX_HTML.exists():
        print(f"Error: {INDEX_HTML} not found. Please run 'npm run build' first.")
        sys.exit(1)

    template_html = inject_top_models(INDEX_HTML.read_text(encoding="utf-8"))
    # Newest first: drives the homepage lead story, RSS (newest 60), archive and llms-full order
    articles = sorted(parse_articles(), key=lambda a: a["publishedAt"], reverse=True)
    # Arena rank order (unranked last) for leaderboard tables
    models = sorted(parse_models(), key=lambda m: (m["arenaRank"] is None, m["arenaRank"] or 0))
    showdowns = parse_showdowns()
    print(f"Prerendering {len(articles)} articles, {len(models)} models and {len(showdowns)} showdowns...")

    generated_count = 0

    # 0. Prerender Root Landing Page (dist/index.html)
    lead_article = articles[0]
    lead_wh = escape(lead_article["threeQuestions"]["whatHappened"])
    lead_wm = escape(lead_article["threeQuestions"]["whyItMatters"])
    lead_wn = escape(lead_article["threeQuestions"]["whatsNext"])
    lead_takeaways = "".join([f"<li class='mb-1.5 text-zinc-300'>{escape(t)}</li>" for t in lead_article["keyTakeaways"][:3]])
    
    recent_stories = "".join([f"""
    <li class="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80 mb-3">
      <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
        <span class="text-emerald-400 font-bold uppercase">{escape(a['category'])}</span>
        <span>•</span>
        <span>{a['publishedAt'][:10]}</span>
        <span>•</span>
        <span>Signal: {a['signalRating']}/100</span>
      </div>
      <h3 class="text-base font-bold text-zinc-100 hover:text-emerald-400">
        <a href="/article/{a['slug']}">{escape(a['title'])}</a>
      </h3>
      <p class="text-xs text-zinc-400 mt-1 leading-relaxed">{escape(a['subtitle'])}</p>
    </li>""" for a in articles[1:7]])

    top_models_rows = "".join([f"""
    <tr class="border-b border-zinc-800/60">
      <td class="py-2.5 px-3 font-bold text-emerald-400">#{m['arenaRank'] if m['arenaRank'] else '-'}</td>
      <td class="py-2.5 px-3 font-bold text-zinc-100"><a href="/models/{m['id']}" class="hover:text-emerald-400">{escape(m['name'])}</a></td>
      <td class="py-2.5 px-3 text-zinc-400">{escape(m['developer'])}</td>
      <td class="py-2.5 px-3 font-mono font-bold text-zinc-200">{m['arenaElo'] if m['arenaElo'] else '-'}</td>
      <td class="py-2.5 px-3 text-zinc-400 font-mono">{m['priceText']}</td>
    </tr>""" for m in [x for x in models if x['arenaRank']][:6]])

    root_body = f"""
    <main class="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <header class="border-b border-zinc-800/80 pb-6">
        <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Primary Source AI &amp; Computing Intelligence</div>
        <h1 class="text-3xl md:text-5xl font-black text-zinc-100 tracking-tight leading-tight mb-3">
          NextVector — AI News, Frontier Model Benchmarks &amp; Intelligence
        </h1>
        <p class="text-sm md:text-base text-zinc-300 max-w-3xl leading-relaxed">
          NextVector delivers real-time AI news, sourced model data and public leaderboards (arena.ai, OSWorld, SWE-bench), model showdowns (Claude vs ChatGPT, Opus vs GPT-6), and buying guides. Less noise. More signal.
        </p>
      </header>

      <!-- Direct Key Answer / BLUF -->
      <section class="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-xs font-mono space-y-2">
        <span class="text-emerald-400 font-bold uppercase tracking-wider block">Model Data Snapshot ({site_data()['asOf']})</span>
        <p class="text-zinc-200 text-sm font-sans leading-relaxed">
          Highest arena.ai text score (released models): {escape(guide_line('top-arena'))}. Best score under $1 per 1M tokens: {escape(guide_line('value'))}. Best open weights: {escape(guide_line('open'))}. Computer use (OSWorld-Verified): {escape(guide_line('computer-use'))}.
        </p>
      </section>

      <!-- Lead Intelligence Report -->
      <section class="p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
        <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
          <span>Lead Intelligence Report • {lead_article['publishedAt'][:10]}</span>
        </div>
        <h2 class="text-2xl md:text-4xl font-extrabold text-zinc-100 leading-tight">
          <a href="/article/{lead_article['slug']}" class="hover:text-emerald-400">{escape(lead_article['title'])}</a>
        </h2>
        <p class="text-zinc-300 text-base leading-relaxed">{escape(lead_article['subtitle'])}</p>
        
        <div class="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs font-mono">
          <div><strong class="text-zinc-200">What Happened:</strong> <span class="text-zinc-400">{lead_wh}</span></div>
          <div><strong class="text-zinc-200">Why It Matters:</strong> <span class="text-zinc-400">{lead_wm}</span></div>
          <div><strong class="text-zinc-200">What's Next:</strong> <span class="text-zinc-400">{lead_wn}</span></div>
        </div>
      </section>

      <!-- Grid: Frontier Stream & Arena Leaderboard -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section class="lg:col-span-7">
          <h2 class="text-xl font-bold text-zinc-100 mb-4 font-sans">Frontier Stream (Recent Disclosures)</h2>
          <ul class="space-y-3">
            {recent_stories}
          </ul>
        </section>

        <section class="lg:col-span-5 space-y-6">
          <div class="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <h2 class="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4">Arena Top Models (arena.ai text)</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-xs font-mono text-left">
                <thead>
                  <tr class="border-b border-zinc-800 text-zinc-500">
                    <th class="py-2 px-3">Rank</th>
                    <th class="py-2 px-3">Model</th>
                    <th class="py-2 px-3">Lab</th>
                    <th class="py-2 px-3">Score</th>
                    <th class="py-2 px-3">$ / 1M (in / out)</th>
                  </tr>
                </thead>
                <tbody>
                  {top_models_rows}
                </tbody>
              </table>
            </div>
            <div class="mt-4 pt-3 border-t border-zinc-800 text-right">
              <a href="/benchmarks" class="text-xs font-mono text-emerald-400 hover:underline">View Full Leaderboards →</a>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer Quick Navigation -->
      <nav class="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
        <a href="/models" class="hover:text-emerald-400">{len(models)} Model Directory</a>
        <span>|</span>
        <a href="/compare" class="hover:text-emerald-400">Model Showdowns</a>
        <span>|</span>
        <a href="/subscriptions" class="hover:text-emerald-400">AI Subscription Buyer Guide</a>
        <span>|</span>
        <a href="/benchmarks" class="hover:text-emerald-400">Benchmarks</a>
        <span>|</span>
        <a href="/faq" class="hover:text-emerald-400">FAQ</a>
        <span>|</span>
        <a href="/about" class="hover:text-emerald-400">About &amp; Manifesto</a>
        <span>|</span>
        <a href="/contact" class="hover:text-emerald-400">Contact &amp; Submissions</a>
        <span>|</span>
        <a href="/archive" class="hover:text-emerald-400">Complete Archive</a>
      </nav>
    </main>
    """

    root_meta = {
        "title": "NextVector — AI News, Frontier Model Benchmarks & Intelligence",
        "description": "NextVector delivers real-time AI news, sourced model data and public leaderboards, model showdowns (Claude vs ChatGPT, Opus vs GPT-6), and buying guides. Less noise. More signal.",
        "keywords": "AI news, latest AI info, best models, best AI subscription to get, claude vs chatgpt, opus vs gpt 6, arena leaderboard, frontier AI models, SWE-bench verified, AI decision guide, daily AI briefing",
        "path": "/"
    }

    root_html = build_prerendered_page(template_html, root_meta, root_body)
    INDEX_HTML.write_text(root_html, encoding="utf-8")
    generated_count += 1

    # 1. Prerender Articles
    for art in articles:
        slug = art["slug"]
        art_dir = DIST_DIR / "article" / slug
        art_dir.mkdir(parents=True, exist_ok=True)
        art_url = f"{BASE_URL}/article/{slug}"
        cover_abs = art["coverImage"] if art["coverImage"].startswith("http") else f"{BASE_URL}{art['coverImage']}"

        word_count = len(" ".join(art["content"]).split())

        schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": ["NewsArticle", "TechArticle", "Article"],
                    "@id": f"{art_url}#article",
                    "headline": art["title"],
                    "description": art["subtitle"],
                    "image": cover_abs,
                    "datePublished": art["publishedAt"],
                    "dateModified": art["publishedAt"],
                    "inLanguage": "en-US",
                    "isAccessibleForFree": True,
                    "wordCount": word_count,
                    "articleSection": art["category"].upper(),
                    "keywords": ", ".join(art["tags"]),
                    "articleBody": "\n\n".join(art["content"]),
                    "author": {
                        "@type": "Person",
                        "@id": "https://rhasan.online/#person",
                        "name": "Robiul Hasan",
                        "jobTitle": "Founder & Editor-in-Chief",
                        "url": "https://rhasan.online",
                        "sameAs": ["https://rhasan.online", "https://github.com/Daddy-Ousen", "https://nextvectorr.substack.com"]
                    },
                    "publisher": {
                        "@type": ["Organization", "NewsMediaOrganization"],
                        "@id": f"{BASE_URL}/#organization",
                        "name": "NextVector",
                        "url": BASE_URL,
                        "logo": {"@type": "ImageObject", "url": LOGO_URL, "width": 512, "height": 512}
                    },
                    "mainEntityOfPage": {"@type": "WebPage", "@id": art_url},
                    "speakable": {
                        "@type": "SpeakableSpecification",
                        "cssSelector": [".three-questions-block", ".key-takeaways"]
                    },
                    "citation": [{"@type": "CreativeWork", "name": c["title"], "url": c["url"]} for c in art["citations"]]
                },
                {
                    "@type": "FAQPage",
                    "@id": f"{art_url}#faq",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": f"What happened regarding {art['title']}?",
                            "acceptedAnswer": {"@type": "Answer", "text": art["threeQuestions"]["whatHappened"]}
                        },
                        {
                            "@type": "Question",
                            "name": f"Why does {art['title']} matter?",
                            "acceptedAnswer": {"@type": "Answer", "text": art["threeQuestions"]["whyItMatters"]}
                        },
                        {
                            "@type": "Question",
                            "name": f"What could happen next after {art['title']}?",
                            "acceptedAnswer": {"@type": "Answer", "text": art["threeQuestions"]["whatsNext"]}
                        }
                    ]
                }
            ]
        }

        # Build Semantic Body HTML
        wh = escape(art["threeQuestions"]["whatHappened"])
        wm = escape(art["threeQuestions"]["whyItMatters"])
        wn = escape(art["threeQuestions"]["whatsNext"])

        takeaways_html = "".join([f"<li class='mb-2 text-zinc-300'>{escape(t)}</li>" for t in art["keyTakeaways"]])
        paras_html = "".join([f"<p class='text-zinc-300 text-lg leading-relaxed mb-6'>{escape(p)}</p>" for p in art["content"]])
        citations_html = "".join([f"<li><a href='{escape(c['url'])}' class='text-emerald-400 hover:underline' target='_blank' rel='noopener'>{escape(c['title'])} ({escape(c['source'])})</a></li>" for c in art["citations"]])

        body_html = f"""
        <article class="max-w-4xl mx-auto px-4 py-12">
          <header class="mb-8">
            <div class="flex items-center gap-2 mb-3 text-xs font-mono text-zinc-400">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">{art['category']}</span>
              <span>•</span>
              <time itemProp="datePublished" dateTime="{art['publishedAt']}">{art['publishedAt'][:10]}</time>
              <meta itemProp="dateModified" content="{art['publishedAt']}" />
              <span>•</span>
              <span>{art['readTimeMinutes']} min read</span>
              <span>•</span>
              <span>Signal Rating: {art['signalRating']}/100</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-4">{escape(art['title'])}</h1>
            <p class="text-lg md:text-xl text-zinc-300 font-sans leading-relaxed">{escape(art['subtitle'])}</p>
          </header>

          <div class="mb-10 rounded-2xl overflow-hidden border border-zinc-800">
            <img src="{cover_abs}" alt="{escape(art['coverImageAlt'] or art['title'])}" class="w-full h-auto object-cover" />
          </div>

          <!-- Direct Intelligence Key Answer / BLUF -->
          <section class="mb-8 p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-xs font-mono">
            <span class="text-emerald-400 font-bold uppercase tracking-wider block mb-1">Direct Intelligence Takeaway</span>
            <p class="text-zinc-200 text-sm font-sans leading-relaxed">{wh}</p>
          </section>

          <!-- The Three Questions Framework -->
          <section class="three-questions-block mb-10 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <h2 class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4">The Three-Question Framework</h2>
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-bold text-zinc-200">What Happened?</h3>
                <p class="text-sm text-zinc-400 mt-1 leading-relaxed">{wh}</p>
              </div>
              <div>
                <h3 class="text-sm font-bold text-zinc-200">Why It Matters</h3>
                <p class="text-sm text-zinc-400 mt-1 leading-relaxed">{wm}</p>
              </div>
              <div>
                <h3 class="text-sm font-bold text-zinc-200">What Could Happen Next</h3>
                <p class="text-sm text-zinc-400 mt-1 leading-relaxed">{wn}</p>
              </div>
            </div>
          </section>

          <!-- Key Takeaways -->
          <section class="key-takeaways mb-10 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <h2 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-4">Executive Key Takeaways</h2>
            <ul class="list-disc pl-5 space-y-2 font-sans">
              {takeaways_html}
            </ul>
          </section>

          <!-- Full Article Content -->
          <section class="article-body mb-12">
            {paras_html}
          </section>

          <!-- Citations & Sources -->
          {f'<section class="mb-12 p-6 rounded-lg border border-zinc-800/80 bg-zinc-950/40"><h3 class="text-sm font-bold text-zinc-200 mb-3 font-mono">Primary Sources & Citations</h3><ul class="space-y-2 text-xs font-mono">{citations_html}</ul></section>' if citations_html else ''}

          <!-- Breadcrumb & Related Navigation Links -->
          <footer class="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
            <a href="/" class="hover:text-emerald-400">← Back to NextVector Home</a>
            <span>|</span>
            <a href="/ai" class="hover:text-emerald-400">AI News</a>
            <span>|</span>
            <a href="/models" class="hover:text-emerald-400">{len(models)} Model Directory</a>
            <span>|</span>
            <a href="/benchmarks" class="hover:text-emerald-400">Benchmarks</a>
            <span>|</span>
            <a href="/archive" class="hover:text-emerald-400">Full Archive</a>
          </footer>
        </article>
        """

        meta = {
            "title": art["title"],
            "description": art["subtitle"],
            "keywords": ", ".join(art["tags"]),
            "path": f"/article/{slug}",
            "image": cover_abs,
            "ogType": "article",
            "schema": schema
        }

        page_html = build_prerendered_page(template_html, meta, body_html)
        (art_dir / "index.html").write_text(page_html, encoding="utf-8")
        generated_count += 1

    # 2. Prerender Models
    for m in models:
        m_id = m["id"]
        m_dir = DIST_DIR / "models" / m_id
        m_dir.mkdir(parents=True, exist_ok=True)
        m_url = f"{BASE_URL}/models/{m_id}"

        title = f"{m['name']}: Specs, Price & Benchmarks"
        desc = m['description'] or f"{m['name']} by {m['developer']}: {m['contextWindow']} context, {m['priceText']} per 1M tokens."

        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": m["name"],
            "applicationCategory": "AI Foundation Model",
            "creator": {"@type": "Organization", "name": m["developer"]},
            "description": desc,
            "url": m_url
        }
        if m["releaseDate"] != "Not listed":
            schema["releaseDate"] = m["releaseDate"]
        if m["inputPrice"] is not None:
            schema["offers"] = {
                "@type": "Offer",
                "price": str(m["inputPrice"]),
                "priceCurrency": "USD",
                "description": f"{fmt_price(m['inputPrice'])} per 1M input tokens, {fmt_price(m['outputPrice'])} per 1M output tokens (list price)"
            }

        body_html = f"""
        <main class="max-w-4xl mx-auto px-4 py-12">
          <header class="mb-8">
            <div class="flex items-center gap-2 mb-2 text-xs font-mono text-zinc-400">
              <span class="text-emerald-400 font-bold">{m['developer']}</span>
              <span>•</span>
              <span>Listed {m['releaseDate']}</span>
              <span>•</span>
              <span>{m['modelType']}</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">{m['name']}</h1>
            {f'<div class="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">Arena #{m["arenaRank"]} • score {m["arenaElo"]} ±{m["arenaCI"]}</div>' if m["arenaRank"] else ''}
          </header>

          <p class="text-base text-zinc-300 leading-relaxed mb-8">{escape(desc)}</p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-950/80 rounded-2xl border border-zinc-800 text-xs font-mono mb-10">
            <div>
              <div class="text-zinc-500 uppercase">Parameters</div>
              <div class="text-zinc-200 font-bold text-base mt-1">{m['parameters']}</div>
            </div>
            <div>
              <div class="text-zinc-500 uppercase">Context Window</div>
              <div class="text-zinc-200 font-bold text-base mt-1">{m['contextWindow']}</div>
            </div>
            <div>
              <div class="text-zinc-500 uppercase">Input / 1M tokens</div>
              <div class="text-zinc-200 font-bold text-base mt-1">{fmt_price(m['inputPrice'])}</div>
            </div>
            <div>
              <div class="text-zinc-500 uppercase">Output / 1M tokens</div>
              <div class="text-zinc-200 font-bold text-base mt-1">{fmt_price(m['outputPrice'])}</div>
            </div>
          </div>

          <section class="mb-10 text-sm text-zinc-300">
            <h2 class="text-sm font-mono font-bold text-emerald-400 uppercase mb-3">Benchmark Results</h2>
            <ul class="space-y-1">{''.join(f"<li>{escape(b['benchmarkName'])}: <strong>{escape(str(b['score']))}</strong> <span class='text-zinc-500'>({escape(b['vsPreviousGen'])})</span></li>" for b in m['benchmarks']) or '<li>No public leaderboard result in our sources yet.</li>'}</ul>
            <h2 class="text-sm font-mono font-bold text-emerald-400 uppercase mt-6 mb-3">Sources</h2>
            <ul class="space-y-1">{''.join(f"<li><a href='{escape(src['url'])}' class='text-emerald-400 hover:underline' rel='noopener'>{escape(src['label'])}</a></li>" for src in m['sources'])}</ul>
          </section>

          <div class="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-8 border-t border-zinc-800">
            <a href="/models" class="hover:text-emerald-400">← Back to All {len(models)} Models</a>
            <span>|</span>
            <a href="/compare" class="hover:text-emerald-400">Head-to-Head Compare</a>
            <span>|</span>
            <a href="/subscriptions" class="hover:text-emerald-400">Subscription Buying Guide</a>
          </div>
        </main>
        """

        meta = {
            "title": title,
            "description": desc,
            "keywords": f"{m['name']}, {m['developer']}, AI model, arena leaderboard, AI model pricing, context window",
            "path": f"/models/{m_id}",
            "schema": schema
        }

        page_html = build_prerendered_page(template_html, meta, body_html)
        (m_dir / "index.html").write_text(page_html, encoding="utf-8")
        generated_count += 1

    # 3. Prerender Core Landing & Hub Pages
    models_table_rows = "".join([f"""
    <tr class="border-b border-zinc-800/60 hover:bg-zinc-900/40">
      <td class="py-2.5 px-3 text-emerald-400 font-bold">#{m['arenaRank'] if m['arenaRank'] else '-'}</td>
      <td class="py-2.5 px-3 font-bold text-zinc-100"><a href="/models/{m['id']}" class="hover:text-emerald-400">{escape(m['name'])}</a></td>
      <td class="py-2.5 px-3 text-zinc-400">{escape(m['developer'])}</td>
      <td class="py-2.5 px-3 font-mono text-zinc-300">{escape(m['parameters'])}</td>
      <td class="py-2.5 px-3 font-mono text-zinc-300">{escape(m['contextWindow'])}</td>
      <td class="py-2.5 px-3 font-mono font-bold text-zinc-200">{m['arenaElo'] if m['arenaElo'] else '-'}</td>
      <td class="py-2.5 px-3 font-mono text-emerald-400">{fmt_price(m['inputPrice'])}</td>
      <td class="py-2.5 px-3 font-mono text-cyan-400">{fmt_price(m['outputPrice'])}</td>
    </tr>""" for m in models])

    core_pages = [
        {
            "path": "/models",
            "title": f"AI Models Directory ({len(models)} Models): Prices, Context & Arena Scores",
            "description": f"Prices, context windows, licences and arena.ai scores for {len(models)} AI models, each linked to its public source.",
            "keywords": "AI models directory, foundation models, LLM specs, Claude Opus 5.5, GPT-6 Astra, Grok 4.7, DeepSeek, model pricing",
            "body": f"""
            <main class="max-w-6xl mx-auto px-4 py-12">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-4">AI Models Directory ({len(models)} Models)</h1>
              <p class="text-lg text-zinc-300 mb-8 max-w-3xl leading-relaxed">Prices, context windows, licences and arena.ai scores for {len(models)} AI models. Data checked {site_data()['asOf']}; every model page lists its sources.</p>
              
              <div class="overflow-x-auto p-4 rounded-2xl bg-zinc-950 border border-zinc-800 mb-8">
                <table class="w-full text-xs font-mono text-left">
                  <thead>
                    <tr class="border-b border-zinc-800 text-zinc-500 uppercase">
                      <th class="py-2 px-3">Arena #</th>
                      <th class="py-2 px-3">Model</th>
                      <th class="py-2 px-3">Developer</th>
                      <th class="py-2 px-3">Params</th>
                      <th class="py-2 px-3">Context</th>
                      <th class="py-2 px-3">Arena score</th>
                      <th class="py-2 px-3">Input / 1M</th>
                      <th class="py-2 px-3">Output / 1M</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models_table_rows}
                  </tbody>
                </table>
              </div>
            </main>"""
        },
        {
            "path": "/compare",
            "title": "Model Showdowns: Claude vs ChatGPT, Opus vs GPT-6 and More",
            "description": "Head-to-head AI model comparisons built from sourced data: arena.ai text score, list price, context window and licence.",
            "keywords": "claude vs chatgpt, opus vs gpt 6, ai model comparison, gemini vs claude, deepseek vs openai",
            "body": f"""
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Model Showdowns &amp; Comparisons</h1>
              <p class="text-lg text-zinc-300 leading-relaxed">Each comparison is built from sourced data (arena.ai, list prices, public leaderboards). Data checked {site_data()['asOf']}.</p>
              <ul class="space-y-4">{''.join(f"<li class='p-5 rounded-2xl bg-zinc-950 border border-zinc-800'><h2 class='text-lg font-bold text-zinc-100'><a href='/compare/{sd["slug"]}'>{escape(sd["name"])}</a></h2><p class='text-xs text-zinc-400 mt-2'>{escape(sd["executiveVerdict"][:260])}…</p></li>" for sd in site_data()['showdowns'])}</ul>
            </main>"""
        },
        {
            "path": "/subscriptions",
            "title": "Best AI Subscriptions to Get (2026 Buyer's Guide) — ChatGPT Plus vs Claude Pro",
            "description": f"Plain-English 2026 AI subscription buyer's guide. Compare ChatGPT Plus ($20), Claude Pro ($20), Google AI Pro ($19.99), Cursor Pro and the $100-$200 plans. Prices checked on vendor pages {PLANS_CHECKED}.",
            "keywords": "best ai subscription to get, chatgpt plus vs claude pro, google ai pro, chatgpt pro worth it, claude max, ai buyer guide",
            "body": f"""
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Best AI Subscriptions to Get in 2026</h1>
              <p class="text-lg text-zinc-300 leading-relaxed">Plan prices and contents checked on each vendor's pricing page on {PLANS_CHECKED} (US prices). Model ranks from arena.ai, checked {site_data()['asOf']}.</p>
              <ul class="space-y-4">{''.join(f"<li class='p-5 rounded-2xl bg-zinc-950 border border-zinc-800'><h2 class='text-base font-bold text-zinc-100'>{escape(n)}</h2><p class='text-xs text-zinc-400 mt-1'>{escape(t)}</p></li>" for n, t in PLAN_SUMMARIES)}</ul>
            </main>"""
        },
        {
            "path": "/benchmarks",
            "title": "AI Benchmarks: Arena, Artificial Analysis, OSWorld & SWE-bench Leaderboards",
            "description": "Arena text scores, the Artificial Analysis Intelligence Index, OSWorld-Verified and SWE-bench Verified results, and a price vs score frontier. Every board links to its public source and date.",
            "keywords": "ai benchmarks, arena leaderboard, artificial analysis intelligence index, swe-bench verified, osworld verified, price performance ai",
            "body": f"""
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">AI Benchmark Leaderboards</h1>
              <p class="text-lg text-zinc-300 leading-relaxed">Results copied from public leaderboards, with the source and date for each board. NextVector does not run these tests.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2"><h2 class="text-sm font-bold text-emerald-400 uppercase">Arena text (arena.ai)</h2><p class="text-zinc-300">{board_top('arena')}</p></div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2"><h2 class="text-sm font-bold text-emerald-400 uppercase">Intelligence Index v{site_data()['aa']['indexVersion']} (data: <a href="https://artificialanalysis.ai/" class="underline">Artificial Analysis</a>)</h2><p class="text-zinc-300">{board_top('aa')}</p></div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2"><h2 class="text-sm font-bold text-emerald-400 uppercase">OSWorld-Verified (os-world.github.io)</h2><p class="text-zinc-300">{board_top('osworld', unit='%')}</p></div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2"><h2 class="text-sm font-bold text-emerald-400 uppercase">SWE-bench Verified, bash-only (swebench.com)</h2><p class="text-zinc-300">{board_top('swebench', unit='%')}</p></div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2"><h2 class="text-sm font-bold text-emerald-400 uppercase">Price vs Arena score (NextVector calculation)</h2><p class="text-zinc-300">{board_top('pareto')}</p></div>
              </div>
              <p class="text-xs text-zinc-400">Data checked {site_data()['asOf']}.</p>
            </main>"""
        },
        {
            "path": "/faq",
            "title": "Frequently Asked Questions (FAQ): AI Models, Benchmarks & NextVector",
            "description": "Answers built from sourced data: which AI model scores highest, Claude vs ChatGPT by the numbers, where our model data comes from, and how Signal Ratings work.",
            "keywords": "AI FAQ, best AI model, claude vs chatgpt, ai benchmarks FAQ, nextvector signal rating",
            "schema": faq_schema(),
            "body": f"""
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <header class="border-b border-zinc-800 pb-6">
                <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Knowledge Base</div>
                <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Frequently Asked Questions (FAQ)</h1>
                <p class="text-sm md:text-base text-zinc-300 mt-2">Model answers are built from sourced data checked {site_data()['asOf']}.</p>
              </header>

              {faq_html()}
            </main>"""
        },
        {
            "path": "/contact",
            "title": "Contact NextVector Editorial & Research Intelligence | Entity Verification",
            "description": "Direct contact channels for NextVector. Submit AI model benchmark disclosures, editorial corrections, research inquiries, or reach Founder & Editor Robiul Hasan.",
            "keywords": "contact nextvector, robiul hasan contact, ai benchmark submission, editorial corrections, press inquiries",
            "body": """
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <header class="border-b border-zinc-800 pb-6">
                <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Entity Verification &amp; Editorial Desk</div>
                <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Contact NextVector Editorial &amp; Research Desk</h1>
                <p class="text-sm md:text-base text-zinc-300 mt-2">Direct communication channels for AI labs, researchers, journalists, and readers.</p>
              </header>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs font-mono">
                  <h2 class="text-sm font-bold text-emerald-400 uppercase">Communication Desks</h2>
                  <div>
                    <span class="text-zinc-500 uppercase block">Editorial &amp; Lead Inquiries</span>
                    <a href="mailto:editor@nextvector.rhasan.online" class="text-zinc-100 font-bold hover:text-emerald-400 text-sm">editor@nextvector.rhasan.online</a>
                  </div>
                  <div>
                    <span class="text-zinc-500 uppercase block">Benchmark Submissions</span>
                    <a href="mailto:benchmarks@nextvector.rhasan.online" class="text-zinc-100 font-bold hover:text-emerald-400 text-sm">benchmarks@nextvector.rhasan.online</a>
                  </div>
                  <div>
                    <span class="text-zinc-500 uppercase block">Editorial Corrections</span>
                    <a href="mailto:corrections@nextvector.rhasan.online" class="text-zinc-100 font-bold hover:text-emerald-400 text-sm">corrections@nextvector.rhasan.online</a>
                  </div>
                </div>

                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs font-mono">
                  <h2 class="text-sm font-bold text-emerald-400 uppercase">Entity Identity &amp; Verification</h2>
                  <p class="text-zinc-300 leading-relaxed font-sans">NextVector is an independent digital publishing entity founded and edited by Robiul Hasan.</p>
                  <div>
                    <span class="text-zinc-500 uppercase block">Founder Website:</span>
                    <a href="https://rhasan.online" class="text-emerald-400 hover:underline">https://rhasan.online</a>
                  </div>
                  <div>
                    <span class="text-zinc-500 uppercase block">GitHub Organization:</span>
                    <a href="https://github.com/Daddy-Ousen" class="text-emerald-400 hover:underline">Daddy-Ousen / NextVector</a>
                  </div>
                </div>
              </div>
            </main>"""
        },
        {
            "path": "/timeline",
            "title": "AI & Technology Breakthrough Timeline: Living Record of Paradigm Shifts",
            "description": "Chronological archive of verified technological breakthroughs with Impact Scores >= 95 in AI architectures, compute fabrics, and science.",
            "keywords": "ai breakthrough timeline, technology milestones, compute history, quantum computing breakthroughs, tsmi wafer milestones"
        },
        {
            "path": "/briefing",
            "title": "Daily AI Briefing: 3-Minute Executive Morning Signal Scan",
            "description": "Curated executive morning intelligence briefing summarizing the top high-signal artificial intelligence and hardware developments.",
            "keywords": "daily ai briefing, morning vector, ai news summary, high signal ai, robiul hasan"
        },
        {
            "path": "/ai",
            "title": "Artificial Intelligence News & Frontier Foundation Model Intelligence",
            "description": "Daily verified reporting on frontier language models, autonomous agents, and AI systems without hype or marketing noise.",
            "keywords": "ai news, latest ai info, frontier models, autonomous agents, openai, anthropic, google deepmind"
        },
        {
            "path": "/technology",
            "title": "Computing Architecture, Semiconductors & Hardware News",
            "description": "Semiconductor lithography, advanced packaging, quantum processors, and datacenter infrastructure news.",
            "keywords": "semiconductor news, asml pecvd, tsmc n2, hardware compute fabrics, datacenter infrastructure"
        },
        {
            "path": "/science",
            "title": "Fundamental Science, Quantum Physics & Space Exploration News",
            "description": "Empirical scientific discoveries in quantum jump detection, primordial cosmology, astrophysics, and clean energy.",
            "keywords": "science news, quantum physics, space exploration, jwst discoveries, science breakthroughs"
        },
        {
            "path": "/research",
            "title": "Research Explained: First-Principles Deconstructions of Landmark Papers",
            "description": "Rigorous technical analysis of seminal pre-prints and peer-reviewed computer science literature.",
            "keywords": "ai research papers, research explained, ternary llms, model compression, computer science papers"
        },
        {
            "path": "/about",
            "title": "About NextVector & Editor-in-Chief Robiul Hasan",
            "description": "Editorial mission, three-question methodology, and background of founder Robiul Hasan. High signal, zero noise.",
            "keywords": "about nextvector, robiul hasan, editorial rulebook, tech intelligence manifesto"
        },
        {
            "path": "/author",
            "canonical": "/about",
            "title": "About NextVector & Editor-in-Chief Robiul Hasan",
            "description": "Editorial mission, three-question methodology, and background of founder Robiul Hasan. High signal, zero noise.",
            "keywords": "about nextvector, robiul hasan, editorial rulebook, tech intelligence manifesto"
        },
        {
            "path": "/analysis",
            "title": "News Analysis: Why Critical AI & Technology Announcements Matter",
            "description": "Rigorous explanations of why critical announcements matter beyond corporate press releases.",
            "keywords": "ai news analysis, technology analysis, frontier model analysis"
        },
        {
            "path": "/deep-dives",
            "title": "Technical Deep Dives: Engineering & Architecture Teardowns",
            "description": "Exhaustive engineering and architectural teardowns of modern algorithms, hardware, and scientific mechanisms.",
            "keywords": "technical deep dive, ai architecture, hardware teardown, engineering analysis"
        }
    ]

    # Hub pages that list stories get crawlable links to their newest 40 reports
    hub_filters = {
        "/ai": lambda a: a["category"] == "ai",
        "/technology": lambda a: a["category"] == "technology",
        "/science": lambda a: a["category"] == "science",
        "/analysis": lambda a: a["articleType"] == "analysis",
        "/deep-dives": lambda a: a["articleType"] == "deep-dive",
        "/briefing": lambda a: True,
    }

    for cp in core_pages:
        rel_path = cp["path"].lstrip("/")
        p_dir = DIST_DIR / rel_path
        p_dir.mkdir(parents=True, exist_ok=True)

        body_html = cp.get("body")
        if not body_html:
            hub_links = ""
            if cp["path"] in hub_filters:
                picked = [a for a in articles if hub_filters[cp["path"]](a)][:40]
                hub_links = "<ul class='mt-8 space-y-2 text-sm'>" + "".join(
                    f"<li><a href='/article/{a['slug']}' class='text-zinc-200 hover:text-emerald-400'>{escape(a['title'])}</a> "
                    f"<span class='text-zinc-500 font-mono text-xs'>({a['publishedAt'][:10]})</span></li>"
                    for a in picked
                ) + "</ul>"
            body_html = f"""
            <main class="max-w-6xl mx-auto px-4 py-12">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-4">{cp['title']}</h1>
              <p class="text-lg text-zinc-300 mb-8 max-w-3xl leading-relaxed">{cp['description']}</p>
              <div class="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-sm font-mono text-zinc-400">
                <p>Loading interactive intelligence modules... If you are using an automated reader or search crawler, explore all indexed articles and models below.</p>
                <div class="mt-4 flex gap-4">
                  <a href="/archive" class="text-emerald-400 hover:underline">View Full Archive →</a>
                  <a href="/" class="text-emerald-400 hover:underline">Return to Home →</a>
                </div>
              </div>
              {hub_links}
            </main>
            """

        meta = {
            "title": cp["title"],
            "description": cp["description"],
            "keywords": cp["keywords"],
            "path": cp["path"],
            "schema": cp.get("schema"),
        }
        if cp.get("canonical"):
            meta["canonical"] = cp["canonical"]

        page_html = build_prerendered_page(template_html, meta, body_html)
        (p_dir / "index.html").write_text(page_html, encoding="utf-8")
        generated_count += 1

    # 4. Generate Single-Page HTML Sitemap / Archive (/archive/index.html)
    archive_dir = DIST_DIR / "archive"
    archive_dir.mkdir(parents=True, exist_ok=True)
    
    art_links = "".join([f"<li class='mb-2 text-sm font-mono'><a href='/article/{a['slug']}' class='text-emerald-400 hover:underline font-medium'>{escape(a['title'])}</a> <span class='text-zinc-500'>({a['publishedAt'][:10]})</span></li>" for a in articles])
    mod_links = "".join([f"<li class='mb-2 text-sm font-mono'><a href='/models/{m['id']}' class='text-cyan-400 hover:underline font-medium'>{escape(m['name'])}</a> <span class='text-zinc-500'>({m['developer']})</span></li>" for m in models])

    archive_body = f"""
    <main class="max-w-5xl mx-auto px-4 py-12 font-sans">
      <header class="mb-10 pb-6 border-b border-zinc-800">
        <h1 class="text-4xl font-extrabold text-zinc-100 tracking-tight mb-2">NextVector Complete Intelligence Archive & Crawl Hub</h1>
        <p class="text-zinc-400 text-sm font-mono">Complete indexed directory of all {len(articles)} intelligence reports and {len(models)} foundation models for search engine crawlers and researcher navigation.</p>
      </header>

      <section class="mb-12">
        <h2 class="text-xl font-bold text-zinc-100 font-mono mb-4 text-emerald-400">All Published Intelligence Reports ({len(articles)})</h2>
        <ul class="space-y-1">
          {art_links}
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-xl font-bold text-zinc-100 font-mono mb-4 text-cyan-400">All Foundation Models ({len(models)})</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          {mod_links}
        </ul>
      </section>
    </main>
    """

    archive_meta = {
        "title": "Complete Intelligence Archive & HTML Sitemap",
        "description": f"Full crawlable directory of all {len(articles)} NextVector intelligence reports and {len(models)} foundation models.",
        "keywords": "nextvector archive, sitemap, all ai news, all foundation models directory",
        "path": "/archive"
    }

    archive_html = build_prerendered_page(template_html, archive_meta, archive_body)
    (archive_dir / "index.html").write_text(archive_html, encoding="utf-8")
    generated_count += 1

    # 4b. Prerender head-to-head showdown pages (/compare/<slug>)
    for sd in showdowns:
        sd_dir = DIST_DIR / "compare" / sd["slug"]
        sd_dir.mkdir(parents=True, exist_ok=True)
        other_links = "".join(
            f"<li><a href='/compare/{o['slug']}' class='text-emerald-400 hover:underline'>{escape(o['name'])}</a></li>"
            for o in showdowns if o["slug"] != sd["slug"]
        )
        sd_body = f"""
        <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
          <header class="border-b border-zinc-800 pb-6">
            <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Head-to-Head Model Showdown</div>
            <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">{escape(sd['name'])}</h1>
            <p class="text-sm md:text-base text-zinc-300 mt-3">{escape(sd['description'])}</p>
          </header>
          <section class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
            <h2 class="text-sm font-mono font-bold text-emerald-400 uppercase mb-3">Executive Verdict</h2>
            <p class="text-zinc-200 leading-relaxed">{escape(sd['verdict'])}</p>
          </section>
          <section>
            <h2 class="text-sm font-mono font-bold text-zinc-300 uppercase mb-3">More Showdowns</h2>
            <ul class="space-y-2 text-sm font-mono">{other_links}</ul>
          </section>
        </main>
        """
        sd_meta = {
            "title": sd["title"],
            "description": sd["description"],
            "keywords": f"{sd['name']}, ai model comparison, llm showdown, arena elo, swe-bench",
            "path": f"/compare/{sd['slug']}",
        }
        (sd_dir / "index.html").write_text(build_prerendered_page(template_html, sd_meta, sd_body), encoding="utf-8")
        generated_count += 1

    # 4c. Real 404 page for unknown URLs
    build_not_found_page(template_html)
    generated_count += 1

    # 5. Generate RSS 2.0 Feed, Sitemap & Full LLM Corpus
    generate_rss_feed(articles)
    generate_sitemap(articles, models, showdowns)
    generate_llms_full(articles, models)
    generate_llms_txt(articles, models)
    update_ai_summary()

    print(f"SUCCESS: Generated {generated_count} static HTML files across dist/ with complete titles, canonicals, Schema.org graphs, and crawlable semantic bodies.")

if __name__ == "__main__":
    prerender_all()
