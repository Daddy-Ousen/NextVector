#!/usr/bin/env python3
"""
NextVector Static Pre-Rendering (SSG) & GEO Optimization Pipeline
Generates standalone, SEO/GEO-optimized static HTML files for all articles,
models, core hubs, /faq, /contact, and the root homepage in dist/ after Vite build.
Also generates valid RSS 2.0 (rss.xml) and comprehensive LLM full-text corpus (llms-full.txt).
"""

import os
import sys
import re
import json
import html
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT_DIR / "dist"
PUBLIC_DIR = ROOT_DIR / "public"
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
    full_url = f"{BASE_URL}{page_meta['path']}" if page_meta['path'] != "/" else f"{BASE_URL}/"
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

    now_rfc822 = format_datetime(datetime.now(timezone.utc))
    rss_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NextVector — AI News, Frontier Model Benchmarks &amp; Intelligence</title>
    <link>{BASE_URL}</link>
    <description>Real-time AI news, verified frontier model benchmarks, LMSYS Chatbot Arena rankings, model showdowns, and high-signal research intelligence.</description>
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
    sections.append("Editorial Charter: Less noise. More signal. Verified benchmarks over marketing claims. Edited by Robiul Hasan (https://rhasan.online).\n")
    
    sections.append("## Platform Overview & Methodology")
    sections.append("NextVector evaluates foundation models and technical breakthroughs through an empirical, primary-source framework. Every report answers three core questions: (1) What happened? (2) Why does it matter? (3) What could happen next? Stories are assigned a Signal Rating from 1 to 100 based on architectural novelty, benchmark verification, practical engineering utility, and source reliability.\n")

    sections.append("## 2026 Model Decision Guide & AI Subscription Breakdown")
    sections.append("- Claude Pro ($20/mo): Recommended for software engineers, mathematicians, and technical writers. Key model: Claude Opus 5.5 (1417 LMSYS Arena Elo, 1M native context window, 75.8% SWE-bench Verified with native Lean 4 formal verification).")
    sections.append("- ChatGPT Plus ($20/mo): Recommended for general multi-tool usage, voice interactions, and autonomous computer navigation. Key model: GPT-6 Astra (1420 LMSYS Arena Elo, 68.4% OSWorld).")
    sections.append("- ChatGPT Pro ($200/mo): Recommended exclusively for full-time quantitative researchers and autonomous agent operators needing unrestricted max-compute reasoning passes.")
    sections.append("- Optimal $100/mo Power User Budget: Claude Pro ($20) + Cursor Pro ($20) + $60 in developer API credits (DeepSeek, Gemini Flash, Anthropic).\n")

    sections.append("## Evaluated AI Models Directory (135 Models)")
    for m in models:
        rank_str = f"#{m['arenaRank']}" if m.get('arenaRank') else "Unranked"
        elo_str = f"{m['arenaElo']} Elo" if m.get('arenaElo') else "N/A"
        sections.append(f"### {m['name']} ({m['developer']})")
        sections.append(f"- Model Detail Page: {BASE_URL}/models/{m['id']}")
        sections.append(f"- Release Date: {m['releaseDate']} | Architecture Type: {m['modelType']}")
        sections.append(f"- Parameters: {m['parameters']} | Context Window: {m['contextWindow']} | License: {m['license']}")
        sections.append(f"- LMSYS Arena: {rank_str} ({elo_str})")
        sections.append(f"- API Token Pricing: ${m['inputPrice']} / 1M input | ${m['outputPrice']} / 1M output")
        sections.append(f"- Summary: {m['description']}\n")

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

def prerender_all():
    if not INDEX_HTML.exists():
        print(f"Error: {INDEX_HTML} not found. Please run 'npm run build' first.")
        sys.exit(1)

    template_html = INDEX_HTML.read_text(encoding="utf-8")
    articles = parse_articles()
    models = parse_models()
    print(f"Prerendering {len(articles)} articles and {len(models)} models...")

    generated_count = 0

    # 0. Prerender Root Landing Page (dist/index.html)
    lead_article = articles[0]
    lead_wh = escape(lead_article["threeQuestions"]["whatHappened"])
    lead_wm = escape(lead_article["threeQuestions"]["whyItMatters"])
    lead_wn = escape(lead_article["threeQuestions"]["whatsNext"])
    lead_takeaways = "".join([f"<li class='mb-1.5 text-zinc-300'>{escape(t)}</li>" for t in lead_article["keyTakeaways"][:3]])
    
    recent_stories = "".join([f"""
    <li class="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 mb-3">
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
      <td class="py-2.5 px-3 text-zinc-400 font-mono">${m['inputPrice']} / ${m['outputPrice']}</td>
    </tr>""" for m in models[:6]])

    root_body = f"""
    <main class="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <header class="border-b border-zinc-800/80 pb-6">
        <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Primary Source AI &amp; Computing Intelligence</div>
        <h1 class="text-3xl md:text-5xl font-black text-zinc-100 tracking-tight leading-tight mb-3">
          NextVector — AI News, Frontier Model Benchmarks &amp; Intelligence
        </h1>
        <p class="text-sm md:text-base text-zinc-300 max-w-3xl leading-relaxed">
          NextVector delivers real-time AI news, frontier model intelligence, verified LMSYS Arena leaderboards, model showdowns (Claude vs ChatGPT, Opus vs GPT-6), and buying guides. Less noise. More signal.
        </p>
      </header>

      <!-- Direct Key Answer / BLUF -->
      <section class="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-xs font-mono space-y-2">
        <span class="text-emerald-400 font-bold uppercase tracking-wider block">Frontier AI Overview (September 2026)</span>
        <p class="text-zinc-200 text-sm font-sans leading-relaxed">
          OpenAI GPT-6 Astra ranks #1 globally on LMSYS Arena (1420 Elo) and leads OSWorld computer use (68.4%). Anthropic Claude Opus 5.5 (1417 Elo) leads in formal Lean 4 mathematical verification and 1M context retention. DeepSeek-V4.1-Flash leads economic Pareto efficiency ($0.14/1M tokens).
        </p>
      </section>

      <!-- Lead Intelligence Report -->
      <section class="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
        <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
          <span>Lead Intelligence Report • {lead_article['publishedAt'][:10]}</span>
        </div>
        <h2 class="text-2xl md:text-4xl font-extrabold text-zinc-100 leading-tight">
          <a href="/article/{lead_article['slug']}" class="hover:text-emerald-400">{escape(lead_article['title'])}</a>
        </h2>
        <p class="text-zinc-300 text-base leading-relaxed">{escape(lead_article['subtitle'])}</p>
        
        <div class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs font-mono">
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
            <h2 class="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4">LMSYS Arena Top Models</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-xs font-mono text-left">
                <thead>
                  <tr class="border-b border-zinc-800 text-zinc-500">
                    <th class="py-2 px-3">Rank</th>
                    <th class="py-2 px-3">Model</th>
                    <th class="py-2 px-3">Lab</th>
                    <th class="py-2 px-3">Elo</th>
                    <th class="py-2 px-3">Price / 1M</th>
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
        <a href="/models" class="hover:text-emerald-400">135 Model Directory</a>
        <span>|</span>
        <a href="/compare" class="hover:text-emerald-400">Model Showdowns</a>
        <span>|</span>
        <a href="/subscriptions" class="hover:text-emerald-400">AI Subscription Buyer Guide</a>
        <span>|</span>
        <a href="/benchmarks" class="hover:text-emerald-400">Benchmark Radar</a>
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
        "description": "NextVector delivers real-time AI news, frontier model intelligence, verified LMSYS Arena leaderboards, model showdowns (Claude vs ChatGPT, Opus vs GPT-6), and buying guides. Less noise. More signal.",
        "keywords": "AI news, latest AI info, best models, best AI subscription to get, claude vs chatgpt, opus vs gpt 6, chatbot arena leaderboard, frontier AI models, SWE-bench verified, AI decision guide, daily AI briefing",
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
        paras_html = "".join([f"<p class='text-zinc-300 text-lg leading-relaxed mb-6 font-serif'>{escape(p)}</p>" for p in art["content"]])
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
    models_table_rows = "".join([f"""
    <tr class="border-b border-zinc-800/60 hover:bg-zinc-900/40">
      <td class="py-2.5 px-3 text-emerald-400 font-bold">#{m['arenaRank'] if m['arenaRank'] else '-'}</td>
      <td class="py-2.5 px-3 font-bold text-zinc-100"><a href="/models/{m['id']}" class="hover:text-emerald-400">{escape(m['name'])}</a></td>
      <td class="py-2.5 px-3 text-zinc-400">{escape(m['developer'])}</td>
      <td class="py-2.5 px-3 font-mono text-zinc-300">{escape(m['parameters'])}</td>
      <td class="py-2.5 px-3 font-mono text-zinc-300">{escape(m['contextWindow'])}</td>
      <td class="py-2.5 px-3 font-mono font-bold text-zinc-200">{m['arenaElo'] if m['arenaElo'] else '-'}</td>
      <td class="py-2.5 px-3 font-mono text-emerald-400">${m['inputPrice']}</td>
      <td class="py-2.5 px-3 font-mono text-cyan-400">${m['outputPrice']}</td>
    </tr>""" for m in models])

    core_pages = [
        {
            "path": "/models",
            "title": "AI Models Directory (135 Frontier & Open Architectures)",
            "description": "Comprehensive technical database of 135 foundation models. Track LMSYS Arena Elo ratings, API token pricing, context windows, and parameters.",
            "keywords": "AI models directory, foundation models, LLM specs, Claude Opus 5.5, GPT-6 Astra, Grok 4.7, DeepSeek, model pricing",
            "body": f"""
            <main class="max-w-6xl mx-auto px-4 py-12">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-4">AI Models Directory (135 Frontier &amp; Open Architectures)</h1>
              <p class="text-lg text-zinc-300 mb-8 max-w-3xl leading-relaxed">Comprehensive technical database of 135 foundation models. Track LMSYS Arena Elo ratings, API token pricing, context windows, and parameter counts.</p>
              
              <div class="overflow-x-auto p-4 rounded-2xl bg-zinc-950 border border-zinc-800 mb-8">
                <table class="w-full text-xs font-mono text-left">
                  <thead>
                    <tr class="border-b border-zinc-800 text-zinc-500 uppercase">
                      <th class="py-2 px-3">Rank</th>
                      <th class="py-2 px-3">Model</th>
                      <th class="py-2 px-3">Developer</th>
                      <th class="py-2 px-3">Params</th>
                      <th class="py-2 px-3">Context</th>
                      <th class="py-2 px-3">Arena Elo</th>
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
            "title": "Model Showdowns & Comparisons: Claude vs ChatGPT, Opus vs GPT-6",
            "description": "In-depth head-to-head architectural showdowns between leading AI models. Benchmark comparisons across coding, reasoning, and context retention.",
            "keywords": "claude vs chatgpt, opus vs gpt 6, ai model comparison, best model for coding, gemini vs claude, deepseek vs openai",
            "body": """
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Model Showdowns &amp; Comparisons: Claude vs ChatGPT, Opus vs GPT-6</h1>
              <p class="text-lg text-zinc-300 leading-relaxed">Head-to-head architectural showdowns pitting frontier models against empirical benchmark suites.</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <span class="text-xs font-mono text-emerald-400 font-bold uppercase">Frontier Showdown</span>
                  <h2 class="text-xl font-bold text-zinc-100"><a href="/compare/claude-vs-chatgpt">Claude Opus 5.5 vs GPT-6 Astra</a></h2>
                  <p class="text-xs text-zinc-400">Lean 4 mathematical proofs and 1M context analysis vs autonomous desktop navigation and multi-modal tool integration.</p>
                </div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <span class="text-xs font-mono text-cyan-400 font-bold uppercase">Pareto Showdown</span>
                  <h2 class="text-xl font-bold text-zinc-100"><a href="/compare/deepseek-vs-openai">DeepSeek-V4.1 vs GPT-5.6 Sol</a></h2>
                  <p class="text-xs text-zinc-400">Open-weight sovereign pricing efficiency ($0.14/1M) vs commercial hyperscaler enterprise governance.</p>
                </div>
              </div>
            </main>"""
        },
        {
            "path": "/subscriptions",
            "title": "Best AI Subscription to Get in 2026: ChatGPT Plus vs Claude Pro vs Team Plans",
            "description": "2026 AI buyer's guide comparing ChatGPT Plus ($20), Claude Pro ($20), Gemini Advanced ($20), and ChatGPT Pro ($200) with ROI calculations.",
            "keywords": "best ai subscription to get, chatgpt plus vs claude pro, ai pricing guide 2026, cursor vs copilot, best llm subscription",
            "body": """
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Best AI Subscription to Get in 2026: Definitive Buyer's Guide</h1>
              <p class="text-lg text-zinc-300 leading-relaxed">Direct comparison of ChatGPT Plus ($20), Claude Pro ($20), Gemini Advanced ($20), and ChatGPT Pro ($200) with concrete ROI calculations.</p>

              <div class="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-xs font-mono space-y-2">
                <span class="text-emerald-400 font-bold uppercase">Executive Decision Summary</span>
                <p class="text-zinc-200 text-sm font-sans leading-relaxed">
                  Choose <strong>Claude Pro ($20/mo)</strong> for whole-file coding, technical research, and 1M context retention. Choose <strong>ChatGPT Plus ($20/mo)</strong> for computer use, voice, and live web browsing. For power users with a $100 budget, combine Claude Pro ($20) + Cursor ($20) + $60 in developer API credits.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <h2 class="text-base font-bold text-zinc-100 font-mono">$20 / Month Tier</h2>
                  <p class="text-xs text-zinc-400">Top pick: Claude Pro (Claude Opus 5.5, Sonnet 5, Artifacts). Alternative: ChatGPT Plus (GPT-6 Astra, GPT-5.6 Sol).</p>
                </div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <h2 class="text-base font-bold text-zinc-100 font-mono">$100 / Month Stack</h2>
                  <p class="text-xs text-zinc-400">Optimal leverage: $20 Claude Pro + $20 Cursor IDE + $60 API credits for batch tasks.</p>
                </div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <h2 class="text-base font-bold text-zinc-100 font-mono">$200 / Month Tier</h2>
                  <p class="text-xs text-zinc-400">ChatGPT Pro: Justified only for full-time quantitative researchers needing unmetered reasoning.</p>
                </div>
              </div>
            </main>"""
        },
        {
            "path": "/benchmarks",
            "title": "AI Benchmark Radar: LMSYS Arena, SWE-bench Verified, OSWorld & Price-Performance",
            "description": "Six verified empirical AI leaderboards tracking coding performance, agentic computer use, and price-to-performance frontier Pareto champions.",
            "keywords": "ai benchmarks, lmsys chatbot arena, swe-bench verified, osworld benchmark, price performance ai, frontier model leaderboard",
            "body": """
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">AI Benchmark Radar &amp; Empirical Leaderboards</h1>
              <p class="text-lg text-zinc-300 leading-relaxed">Six verified leaderboards tracking coding ability, computer control, and price-performance efficiency.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
                  <h2 class="text-sm font-bold text-emerald-400 uppercase">LMSYS Chatbot Arena</h2>
                  <p class="text-zinc-300">#1 GPT-6 Astra (1420 Elo) | #2 Claude Fable 5.1 (1418 Elo) | #3 Claude Opus 5.5 (1417 Elo)</p>
                </div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
                  <h2 class="text-sm font-bold text-cyan-400 uppercase">SWE-bench Verified (Code)</h2>
                  <p class="text-zinc-300">#1 Claude Opus 5.5 (75.8% Pass@1) | #2 GPT-6 Astra (75.4%) | #3 Claude Fable (73.3%)</p>
                </div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
                  <h2 class="text-sm font-bold text-purple-400 uppercase">OSWorld (Computer Navigation)</h2>
                  <p class="text-zinc-300">#1 GPT-6 Astra (68.4% Pass@1) | #2 Claude Fable 5.1 (57.3%) | #3 Grok 4.7 (55.1%)</p>
                </div>
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-mono">
                  <h2 class="text-sm font-bold text-amber-400 uppercase">Price-Performance Pareto</h2>
                  <p class="text-zinc-300">#1 DeepSeek-V4.1-Flash ($0.14/1M) | #2 Gemini 3.8 Flash ($0.15/1M) | #3 Mistral 3B</p>
                </div>
              </div>
            </main>"""
        },
        {
            "path": "/faq",
            "title": "Frequently Asked Questions (FAQ) — Frontier AI Models & Intelligence",
            "description": "Comprehensive answers to the most common AI questions in 2026: What is the best AI model? Claude vs ChatGPT comparison, best AI subscriptions ($20 vs $200), and NextVector's signal rating formula.",
            "keywords": "AI FAQ, best AI model 2026, claude vs chatgpt, best ai subscription, nextvector signal rating, ai benchmarks FAQ",
            "body": """
            <main class="max-w-5xl mx-auto px-4 py-12 space-y-8">
              <header class="border-b border-zinc-800 pb-6">
                <div class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">Knowledge Base &amp; Intelligence Q&amp;A</div>
                <h1 class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Frequently Asked Questions (FAQ)</h1>
                <p class="text-sm md:text-base text-zinc-300 mt-2">Verified answers to the most queried questions in artificial intelligence and model benchmarking.</p>
              </header>

              <div class="space-y-6">
                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h2 class="text-lg font-bold text-zinc-100">What is the best AI model in 2026?</h2>
                  <p class="text-sm text-zinc-300 leading-relaxed">OpenAI GPT-6 Astra ranks #1 globally on LMSYS Arena (1420 Elo) and leads in autonomous OS navigation (68.4% on OSWorld). Claude Opus 5.5 ranks #4 (1417 Elo) and leads in software engineering, formal Lean 4 proof verification, and 1M context retention. DeepSeek-V4.1-Flash leads the economic Pareto frontier at $0.14/1M tokens.</p>
                </div>

                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h2 class="text-lg font-bold text-zinc-100">Claude vs ChatGPT: Which should you choose in 2026?</h2>
                  <p class="text-sm text-zinc-300 leading-relaxed">Choose Claude (Claude Opus 5.5 / Sonnet 5) for coding, large documents (1M tokens), and formal math verification. Choose ChatGPT (GPT-6 Astra / GPT-5.6 Sol) for computer automation, web browsing, and multimodal voice.</p>
                </div>

                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h2 class="text-lg font-bold text-zinc-100">What is the best AI subscription to get in 2026?</h2>
                  <p class="text-sm text-zinc-300 leading-relaxed">For individual developers, Claude Pro ($20/mo) is top for coding and writing. ChatGPT Plus ($20/mo) is best for general multi-tool usage. Power users with a $100/mo budget get maximum leverage by combining Claude Pro ($20) + Cursor ($20) + $60 in developer API credits.</p>
                </div>

                <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h2 class="text-lg font-bold text-zinc-100">How are NextVector Signal Ratings calculated?</h2>
                  <p class="text-sm text-zinc-300 leading-relaxed">Signal Ratings use a 4-part deterministic formula: Architectural Novelty (30%), Empirical Benchmark Verification (30%), Practical Engineering Utility (25%), and Primary Source Reliability (15%). Scores above 90 represent verified breakthrough paradigm shifts.</p>
                </div>
              </div>
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
                  <p class="text-zinc-300 leading-relaxed font-sans">NextVector is an independent digital publishing entity founded and edited by Robiul Hasan. Operating hubs in San Francisco, CA and Dhaka, Bangladesh.</p>
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
        }
    ]

    for cp in core_pages:
        rel_path = cp["path"].lstrip("/")
        p_dir = DIST_DIR / rel_path
        p_dir.mkdir(parents=True, exist_ok=True)

        body_html = cp.get("body")
        if not body_html:
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

    # 5. Generate RSS 2.0 Feed & Full LLM Corpus
    generate_rss_feed(articles)
    generate_llms_full(articles, models)

    print(f"SUCCESS: Generated {generated_count} static HTML files across dist/ with complete titles, canonicals, Schema.org graphs, and crawlable semantic bodies.")

if __name__ == "__main__":
    prerender_all()
