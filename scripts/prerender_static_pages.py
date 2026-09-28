#!/usr/bin/env python3
"""
NextVector Static Pre-Rendering (SSG) Pipeline
Generates standalone, SEO/GEO-optimized static HTML files for all 144 articles,
135 foundation models, and core intelligence hubs in dist/ after Vite build.

When Googlebot crawls any URL:
- Vercel serves the static HTML file directly (HTTP 200, <50ms TTFB).
- Googlebot receives specific <title>, <meta description>, specific canonical URL,
  complete Schema.org JSON-LD graph (TechArticle, FAQPage, Product), and full semantic HTML.
- Zero JavaScript rendering required for Googlebot to index the text in Wave 1.
- React seamlessly mounts into #root on client visit.
"""

import os
import sys
import re
import json
import html
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT_DIR / "dist"
INDEX_HTML = DIST_DIR / "index.html"
ARTICLES_FILE = ROOT_DIR / "src" / "data" / "articlesData.ts"
MODELS_FILE = ROOT_DIR / "src" / "data" / "modelsData.ts"

BASE_URL = "https://nextvector.rhasan.online"
DEFAULT_IMAGE = f"{BASE_URL}/brand/nextvector-brand-system.jpg"
LOGO_URL = f"{BASE_URL}/brand/nextvector-logo.jpg"

def escape(s):
    return html.escape(str(s or ""), quote=True)

def parse_articles():
    content = ARTICLES_FILE.read_text(encoding="utf-8")
    blocks = re.split(r'(?=\{\s*id:\s*["\']art-\d+["\'])', content)[1:]
    articles = []

    def get_field(name, text):
        m = re.search(name + r':\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\')', text, re.DOTALL)
        if m:
            val = m.group(1) if m.group(1) is not None else m.group(2)
            return val.replace('\\"', '"').replace("\\'", "'")
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
                takeaways = re.findall(r'^\s*["\'](.*?)["\'],?\s*$', kt_block_m.group(1), re.MULTILINE)

        # Content paragraphs
        content_paras = []
        c_start = b.find("content:")
        if c_start != -1:
            c_block_m = re.search(r'content:\s*\[(.*?)\n\s*\]', b, re.DOTALL)
            if c_block_m:
                content_paras = re.findall(r'^\s*["\'](.*?)["\'],?\s*$', c_block_m.group(1), re.MULTILINE)

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

def parse_models():
    content = MODELS_FILE.read_text(encoding="utf-8")
    m_start = content.find("export const ALL_135_MODELS: AIModel[] = [\n")
    m_end = content.find("export const ARENA_LEADERBOARD_ENTRIES = [")
    raw_models = re.split(r'\n  \},\n  \{\n', content[m_start:m_end])
    models = []

    for m_str in raw_models:
        id_m = re.search(r'["\']id["\']:\s*["\']([^"\']+)["\']', m_str)
        name_m = re.search(r'["\']name["\']:\s*["\']([^"\']+)["\']', m_str)
        dev_m = re.search(r'["\']developer["\']:\s*["\']([^"\']+)["\']', m_str)
        rel_m = re.search(r'["\']releaseDate["\']:\s*["\']([^"\']+)["\']', m_str)
        type_m = re.search(r'["\']modelType["\']:\s*["\']([^"\']+)["\']', m_str)
        desc_m = re.search(r'["\']description["\']:\s*["\']([^"\']+)["\']', m_str)
        params_m = re.search(r'["\']parameters["\']:\s*["\']([^"\']+)["\']', m_str)
        ctx_m = re.search(r'["\']contextWindow["\']:\s*["\']([^"\']+)["\']', m_str)
        license_m = re.search(r'["\']license["\']:\s*["\']([^"\']+)["\']', m_str)
        rank_m = re.search(r'["\']arenaRank["\']:\s*(\d+)', m_str)
        elo_m = re.search(r'["\']arenaElo["\']:\s*(\d+)', m_str)
        in_p = re.search(r'["\']inputPer1M["\']:\s*([0-9.]+)', m_str)
        out_p = re.search(r'["\']outputPer1M["\']:\s*([0-9.]+)', m_str)

        if id_m and name_m:
            models.append({
                "id": id_m.group(1),
                "name": name_m.group(1),
                "developer": dev_m.group(1) if dev_m else "",
                "releaseDate": rel_m.group(1) if rel_m else "2026",
                "modelType": type_m.group(1) if type_m else "Foundation Model",
                "description": desc_m.group(1) if desc_m else "",
                "parameters": params_m.group(1) if params_m else "Undisclosed",
                "contextWindow": ctx_m.group(1) if ctx_m else "200K tokens",
                "license": license_m.group(1) if license_m else "Proprietary",
                "arenaRank": int(rank_m.group(1)) if rank_m else None,
                "arenaElo": int(elo_m.group(1)) if elo_m else None,
                "inputPrice": float(in_p.group(1)) if in_p else 0.0,
                "outputPrice": float(out_p.group(1)) if out_p else 0.0
            })

    return models

def build_prerendered_page(template_html, page_meta, body_html):
    out = template_html
    full_title = f"{page_meta['title']} | NextVector" if "NextVector" not in page_meta['title'] else page_meta['title']
    full_url = f"{BASE_URL}{page_meta['path']}"
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

    # Insert Canonical Link (Always accurate for this specific route)
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

    # Inject specific Schema.org JSON-LD
    if "schema" in page_meta and page_meta["schema"]:
        schema_json = json.dumps(page_meta["schema"], ensure_ascii=False, indent=2)
        schema_tag = f'<script type="application/ld+json" id="seo-jsonld">\n{schema_json}\n</script>'
        out = out.replace('</head>', f'  {schema_tag}\n</head>')

    # Inject static body content inside <div id="root">
    # When React mounts on client, it will replace/hydrate this content seamlessly
    out = out.replace('<div id="root"></div>', f'<div id="root">\n{body_html}\n</div>')

    return out

def prerender_all():
    if not INDEX_HTML.exists():
        print(f"Error: {INDEX_HTML} not found. Please run 'npm run build' first.")
        sys.exit(1)

    template_html = INDEX_HTML.read_text(encoding="utf-8")
    articles = parse_articles()
    models = parse_models()
    print(f"Prerendering {len(articles)} articles and {len(models)} models...")

    generated_count = 0

    # 1. Prerender Articles
    for art in articles:
        slug = art["slug"]
        art_dir = DIST_DIR / "article" / slug
        art_dir.mkdir(parents=True, exist_ok=True)
        art_url = f"{BASE_URL}/article/{slug}"
        cover_abs = art["coverImage"] if art["coverImage"].startswith("http") else f"{BASE_URL}{art['coverImage']}"

        schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "TechArticle",
                    "@id": f"{art_url}#article",
                    "headline": art["title"],
                    "description": art["subtitle"],
                    "image": cover_abs,
                    "datePublished": art["publishedAt"],
                    "dateModified": art["publishedAt"],
                    "articleSection": art["category"].upper(),
                    "keywords": ", ".join(art["tags"]),
                    "articleBody": "\n\n".join(art["content"]),
                    "author": {
                        "@type": "Person",
                        "name": "Robiul Hasan",
                        "jobTitle": "Founder & Editor-in-Chief",
                        "url": "https://rhasan.online",
                        "sameAs": ["https://rhasan.online", "https://github.com/Daddy-Ousen", "https://nextvectorr.substack.com"]
                    },
                    "publisher": {
                        "@type": "NewsMediaOrganization",
                        "name": "NextVector",
                        "url": BASE_URL,
                        "logo": {"@type": "ImageObject", "url": LOGO_URL}
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
        paras_html = "".join([f"<p class='text-zinc-300 text-lg leading-relaxed mb-6 font-serif'>{escape(p)}</p>" for p in art["content"]])
        citations_html = "".join([f"<li><a href='{escape(c['url'])}' class='text-emerald-400 hover:underline' target='_blank' rel='noopener'>{escape(c['title'])} ({escape(c['source'])})</a></li>" for c in art["citations"]])

        body_html = f"""
        <article class="max-w-4xl mx-auto px-4 py-12">
          <header class="mb-8">
            <div class="flex items-center gap-2 mb-3 text-xs font-mono text-zinc-400">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">{art['category']}</span>
              <span>•</span>
              <span>{art['publishedAt'][:10]}</span>
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
          {f'<section class="mb-12 p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/40"><h3 class="text-sm font-bold text-zinc-200 mb-3 font-mono">Primary Sources & Citations</h3><ul class="space-y-2 text-xs font-mono">{citations_html}</ul></section>' if citations_html else ''}

          <!-- Breadcrumb & Related Navigation Links -->
          <footer class="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
            <a href="/" class="hover:text-emerald-400">← Back to NextVector Home</a>
            <span>|</span>
            <a href="/ai" class="hover:text-emerald-400">AI News</a>
            <span>|</span>
            <a href="/models" class="hover:text-emerald-400">135 Model Directory</a>
            <span>|</span>
            <a href="/benchmarks" class="hover:text-emerald-400">Benchmark Radar</a>
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

        title = f"{m['name']} — Specifications, Pricing & Arena Elo Ratings"
        desc = m['description'] or f"{m['name']} by {m['developer']}: {m['parameters']} parameters, {m['contextWindow']} context window, ${m['inputPrice']}/1M input, ${m['outputPrice']}/1M output."

        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": m["name"],
            "applicationCategory": "AI Foundation Model",
            "creator": {"@type": "Organization", "name": m["developer"]},
            "releaseDate": m["releaseDate"],
            "offers": {
                "@type": "Offer",
                "price": str(m["inputPrice"]),
                "priceCurrency": "USD",
                "description": f"${m['inputPrice']} per 1M input tokens, ${m['outputPrice']} per 1M output tokens"
            },
            "description": desc,
            "url": m_url
        }

        body_html = f"""
        <main class="max-w-4xl mx-auto px-4 py-12">
          <header class="mb-8">
            <div class="flex items-center gap-2 mb-2 text-xs font-mono text-zinc-400">
              <span class="text-emerald-400 font-bold">{m['developer']}</span>
              <span>•</span>
              <span>Released {m['releaseDate']}</span>
              <span>•</span>
              <span>{m['modelType']}</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">{m['name']}</h1>
            {f'<div class="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">LMSYS Arena Rank #{m["arenaRank"]} • {m["arenaElo"]} Elo</div>' if m["arenaRank"] else ''}
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
              <div class="text-zinc-500 uppercase">Input Pricing</div>
              <div class="text-zinc-200 font-bold text-base mt-1">${m['inputPrice']} / 1M</div>
            </div>
            <div>
              <div class="text-zinc-500 uppercase">Output Pricing</div>
              <div class="text-zinc-200 font-bold text-base mt-1">${m['outputPrice']} / 1M</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-8 border-t border-zinc-800">
            <a href="/models" class="hover:text-emerald-400">← Back to All 135 Models</a>
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
            "keywords": f"{m['name']}, {m['developer']}, AI foundation model, LMSYS Arena Elo, AI model pricing, context window",
            "path": f"/models/{m_id}",
            "schema": schema
        }

        page_html = build_prerendered_page(template_html, meta, body_html)
        (m_dir / "index.html").write_text(page_html, encoding="utf-8")
        generated_count += 1

    # 3. Prerender Core Landing & Hub Pages
    core_pages = [
        {
            "path": "/models",
            "title": "AI Models Directory (135 Frontier & Open Architectures)",
            "description": "Comprehensive technical database of 135 foundation models. Track LMSYS Arena Elo ratings, API token pricing, context windows, and parameters.",
            "keywords": "AI models directory, foundation models, LLM specs, Claude Opus 5.5, GPT-6 Astra, Grok 4.7, DeepSeek, model pricing"
        },
        {
            "path": "/compare",
            "title": "Model Showdowns & Comparisons: Claude vs ChatGPT, Opus vs GPT-6",
            "description": "In-depth head-to-head architectural showdowns between leading AI models. Benchmark comparisons across coding, reasoning, and context retention.",
            "keywords": "claude vs chatgpt, opus vs gpt 6, ai model comparison, best model for coding, gemini vs claude, deepseek vs openai"
        },
        {
            "path": "/subscriptions",
            "title": "Best AI Subscription to Get in 2026: ChatGPT Plus vs Claude Pro vs Team Plans",
            "description": "2026 AI buyer's guide comparing ChatGPT Plus ($20), Claude Pro ($20), Gemini Advanced ($20), and ChatGPT Pro ($200) with ROI calculations.",
            "keywords": "best ai subscription to get, chatgpt plus vs claude pro, ai pricing guide 2026, cursor vs copilot, best llm subscription"
        },
        {
            "path": "/benchmarks",
            "title": "AI Benchmark Radar: LMSYS Arena, SWE-bench Verified, OSWorld & Price-Performance",
            "description": "Six verified empirical AI leaderboards tracking coding performance, agentic computer use, and price-to-performance frontier Pareto champions.",
            "keywords": "ai benchmarks, lmsys chatbot arena, swe-bench verified, osworld benchmark, price performance ai, frontier model leaderboard"
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
        }
    ]

    for cp in core_pages:
        rel_path = cp["path"].lstrip("/")
        p_dir = DIST_DIR / rel_path
        p_dir.mkdir(parents=True, exist_ok=True)

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
        </main>
        """

        meta = {
            "title": cp["title"],
            "description": cp["description"],
            "keywords": cp["keywords"],
            "path": cp["path"]
        }

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

    print(f"SUCCESS: Generated {generated_count} static HTML files across dist/ with complete titles, canonicals, Schema.org graphs, and crawlable semantic bodies.")

if __name__ == "__main__":
    prerender_all()
