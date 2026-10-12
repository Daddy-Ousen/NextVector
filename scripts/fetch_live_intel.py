#!/usr/bin/env python3
"""
NextVector Live Intelligence Harvester (Stage 2 + Stage 3 discovery).
Gives the daily pipeline real, dated candidate stories so nothing is written from memory.

News (last 48 hours):
  1. Hacker News stories with 30+ points, highest points first
  2. BBC Technology RSS (items older than 48 hours are dropped)
  3. arXiv cs.AI / cs.CL / cs.LG newest submissions
Model watch (last 72 hours):
  4. OpenRouter models added in 72 hours, plus any from 14 days not in curated_models.json (NEW)
  5. Hugging Face models created recently by major lab organisations

Every item is printed (grouped by source) and saved to pipeline_runs/harvest-YYYY-MM-DD.json.

Usage:
  python scripts/fetch_live_intel.py            # or: npm run harvest
"""

import json
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURATED_FILE = ROOT / "scripts" / "model_sources" / "curated_models.json"
RUNS_DIR = ROOT / "pipeline_runs"
UA = {"User-Agent": "NextVectorIntelligence/1.0"}
NEWS_HOURS = 48
MODEL_HOURS = 72
UNTRACKED_DAYS = 14   # also list OpenRouter models this old that the site does not track yet
HF_ORGS = ["deepseek-ai", "Qwen", "meta-llama", "mistralai", "google", "microsoft", "openai", "nvidia",
           "moonshotai", "zai-org", "MiniMaxAI", "ibm-granite", "allenai", "tencent", "baidu", "stepfun-ai",
           "xai-org", "apple", "CohereLabs", "ByteDance-Seed"]


def get(url, timeout=15):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def fetch_hn(cutoff, limit=60):
    url = (f"https://hn.algolia.com/api/v1/search_by_date?tags=story"
           f"&numericFilters=created_at_i>{int(cutoff.timestamp())},points>30&hitsPerPage={limit}")
    out = []
    try:
        for hit in json.loads(get(url)).get("hits", []):
            out.append({
                "source": "Hacker News",
                "title": hit.get("title"),
                "url": hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}",
                "discussion": f"https://news.ycombinator.com/item?id={hit.get('objectID')}",
                "points": hit.get("points", 0),
                "timestamp": hit.get("created_at"),
            })
    except Exception as e:
        print(f"  Warning: Hacker News fetch failed: {e}")
    out.sort(key=lambda s: -s["points"])
    return out


def fetch_bbc(cutoff):
    out = []
    try:
        root = ET.fromstring(get("https://feeds.bbci.co.uk/news/technology/rss.xml"))
        for item in root.findall(".//item"):
            text = lambda tag: (item.findtext(tag) or "").strip()
            try:
                when = parsedate_to_datetime(text("pubDate"))
            except Exception:
                continue
            if when < cutoff:
                continue
            out.append({"source": "BBC Technology", "title": text("title"), "url": text("link"),
                        "summary": text("description"), "timestamp": when.astimezone(timezone.utc).isoformat()})
    except Exception as e:
        print(f"  Warning: BBC RSS fetch failed: {e}")
    return out


def fetch_arxiv(limit=30):
    url = ("https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG"
           f"&sortBy=submittedDate&sortOrder=descending&max_results={limit}")
    ns = {"atom": "http://www.w3.org/2005/Atom"}
    out = []
    try:
        root = ET.fromstring(get(url, timeout=30))
        for entry in root.findall("atom:entry", ns):
            text = lambda tag: " ".join((entry.findtext(tag, default="", namespaces=ns) or "").split())
            out.append({"source": "arXiv", "title": text("atom:title"),
                        "url": text("atom:id").replace("http://", "https://"),
                        "summary": text("atom:summary")[:300], "timestamp": text("atom:published")})
    except Exception as e:
        print(f"  Warning: arXiv fetch failed: {e}")
    return out


def tracked_openrouter_ids():
    try:
        models = json.loads(CURATED_FILE.read_text(encoding="utf-8"))["models"]
        return {m["or"] for m in models if m.get("or")}
    except Exception:
        return set()


def fetch_openrouter_new(cutoff, untracked_cutoff):
    tracked = tracked_openrouter_ids()
    out = []
    try:
        for m in json.loads(get("https://openrouter.ai/api/v1/models", timeout=30))["data"]:
            created = datetime.fromtimestamp(m.get("created", 0), timezone.utc)
            if m["id"].endswith((":free", ":batch", ":beta", ":extended")):
                continue
            is_tracked = m["id"] in tracked
            if created < untracked_cutoff or (created < cutoff and is_tracked):
                continue
            out.append({"source": "OpenRouter", "title": m.get("name"), "id": m["id"],
                        "url": f"https://openrouter.ai/{m['id']}", "timestamp": created.isoformat(),
                        "tracked": is_tracked})
    except Exception as e:
        print(f"  Warning: OpenRouter fetch failed: {e}")
    out.sort(key=lambda s: s["timestamp"], reverse=True)
    return out


def fetch_hf_new(cutoff):
    out = []
    for org in HF_ORGS:
        try:
            rows = json.loads(get(f"https://huggingface.co/api/models?author={org}&sort=createdAt&direction=-1&limit=5"))
        except Exception as e:
            print(f"  Warning: Hugging Face {org} fetch failed: {e}")
            continue
        for r in rows:
            created = datetime.fromisoformat(r["createdAt"].replace("Z", "+00:00"))
            if created >= cutoff:
                out.append({"source": "Hugging Face", "title": r["id"], "url": f"https://huggingface.co/{r['id']}",
                            "timestamp": created.isoformat(), "downloads": r.get("downloads", 0)})
    out.sort(key=lambda s: s["timestamp"], reverse=True)
    return out


def show(title, items, fmt):
    print(f"\n=== {title}: {len(items)} ===")
    if not items:
        print("  (none)")
    for i, s in enumerate(items, 1):
        print(f"{i:>2}. {fmt(s)}")
        print(f"    {s['url']}  [{s['timestamp']}]")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    now = datetime.now(timezone.utc)
    news_cutoff = now - timedelta(hours=NEWS_HOURS)
    model_cutoff = now - timedelta(hours=MODEL_HOURS)
    print("NextVector Live Intelligence Harvester")
    print(f"Now (UTC): {now:%Y-%m-%d %H:%M}   News window: since {news_cutoff:%Y-%m-%d %H:%M}   "
          f"Model window: since {model_cutoff:%Y-%m-%d %H:%M}")

    hn = fetch_hn(news_cutoff)
    bbc = fetch_bbc(news_cutoff)
    arxiv = fetch_arxiv()
    orouter = fetch_openrouter_new(model_cutoff, now - timedelta(days=UNTRACKED_DAYS))
    hf = fetch_hf_new(model_cutoff)

    show("Hacker News (most points first)", hn, lambda s: f"[{s['points']} pts] {s['title']}")
    show("BBC Technology", bbc, lambda s: s["title"])
    show("arXiv (newest)", arxiv, lambda s: s["title"])
    show(f"MODEL WATCH - OpenRouter: added in last 72h, or untracked from last {UNTRACKED_DAYS} days", orouter,
         lambda s: f"{'tracked' if s['tracked'] else 'NEW - not in curated_models.json'}: {s['title']} ({s['id']})")
    show("MODEL WATCH - Hugging Face lab uploads, last 72h", hf, lambda s: f"{s['title']} ({s['downloads']} downloads)")

    RUNS_DIR.mkdir(exist_ok=True)
    out_file = RUNS_DIR / f"harvest-{now:%Y-%m-%d}.json"
    out_file.write_text(json.dumps({"harvestedAt": now.isoformat(), "hackerNews": hn, "bbc": bbc, "arxiv": arxiv,
                                    "openrouterNew": orouter, "huggingFaceNew": hf}, indent=2, ensure_ascii=False),
                        encoding="utf-8")
    untracked = [s for s in orouter if not s["tracked"]]
    print(f"\nSaved: {out_file.relative_to(ROOT)}")
    print(f"Totals: HN {len(hn)}, BBC {len(bbc)}, arXiv {len(arxiv)}, OpenRouter new {len(orouter)} "
          f"({len(untracked)} not tracked), Hugging Face new {len(hf)}")
    print("Reminder: a harvest item is a lead, not a fact. Open the primary source before you write anything.")


if __name__ == "__main__":
    main()
