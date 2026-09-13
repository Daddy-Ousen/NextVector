#!/usr/bin/env python3
"""
NextVector Live Intelligence Harvester (Last 48 Hours)
Stage 2 discovery tool to eliminate memory reliance & hallucination.
Fetches verified live stories from:
1. Hacker News (Top & Recent tech discussions)
2. BBC World / Technology RSS Feed
3. arXiv Computer Science & AI recent listings
"""

import sys
import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta

def fetch_hn_top_stories(limit=30, hours=48):
    print(f"\n[1/3] Harvesting Hacker News top stories (Last {hours}h)...")
    cutoff = datetime.now(timezone.utc) - timedelta(hours=hours)
    cutoff_ts = int(cutoff.timestamp())
    
    url = f"https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>{cutoff_ts},points>30&hitsPerPage={limit}"
    req = urllib.request.Request(url, headers={"User-Agent": "NextVectorIntelligence/1.0"})
    
    results = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            for hit in data.get("hits", []):
                created_at = hit.get("created_at")
                title = hit.get("title")
                story_url = hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}"
                points = hit.get("points", 0)
                comments = hit.get("num_comments", 0)
                results.append({
                    "source": "Hacker News",
                    "title": title,
                    "url": story_url,
                    "points": points,
                    "comments": comments,
                    "timestamp": created_at
                })
    except Exception as e:
        print(f"  Warning: HN Algolia fetch failed: {e}")
        # Fallback to direct Firebase topstories
        try:
            top_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
            with urllib.request.urlopen(top_url, timeout=10) as resp:
                ids = json.loads(resp.read().decode("utf-8"))[:limit]
            for sid in ids[:15]:
                item_url = f"https://hacker-news.firebaseio.com/v0/item/{sid}.json"
                with urllib.request.urlopen(item_url, timeout=5) as iresp:
                    item = json.loads(iresp.read().decode("utf-8"))
                    item_time = datetime.fromtimestamp(item.get("time", 0), timezone.utc)
                    if item_time >= cutoff:
                        results.append({
                            "source": "Hacker News",
                            "title": item.get("title"),
                            "url": item.get("url") or f"https://news.ycombinator.com/item?id={sid}",
                            "points": item.get("score", 0),
                            "comments": len(item.get("kids", [])),
                            "timestamp": item_time.isoformat()
                        })
        except Exception as e2:
            print(f"  Warning: HN Firebase fetch failed: {e2}")

    print(f"-> Found {len(results)} verified HN signals.")
    return results

def fetch_bbc_tech():
    print("\n[2/3] Harvesting BBC Technology RSS Feed...")
    url = "https://feeds.bbci.co.uk/news/technology/rss.xml"
    req = urllib.request.Request(url, headers={"User-Agent": "NextVectorIntelligence/1.0"})
    results = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            xml_data = resp.read()
            root = ET.fromstring(xml_data)
            for item in root.findall(".//item"):
                title = item.find("title").text if item.find("title") is not None else ""
                link = item.find("link").text if item.find("link") is not None else ""
                pubDate = item.find("pubDate").text if item.find("pubDate") is not None else ""
                desc = item.find("description").text if item.find("description") is not None else ""
                results.append({
                    "source": "BBC Technology",
                    "title": title,
                    "url": link,
                    "summary": desc,
                    "timestamp": pubDate
                })
    except Exception as e:
        print(f"  Warning: BBC RSS fetch failed: {e}")

    print(f"-> Found {len(results)} BBC tech signals.")
    return results

def fetch_arxiv_recent():
    print("\n[3/3] Harvesting arXiv cs.AI / cs.CL recent submissions...")
    url = "http://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=10"
    req = urllib.request.Request(url, headers={"User-Agent": "NextVectorIntelligence/1.0"})
    results = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            xml_data = resp.read()
            root = ET.fromstring(xml_data)
            ns = {"atom": "http://www.w3.org/2005/Atom"}
            for entry in root.findall("atom:entry", ns):
                title = entry.find("atom:title", ns).text.strip().replace("\n", " ") if entry.find("atom:title", ns) is not None else ""
                link = entry.find("atom:id", ns).text if entry.find("atom:id", ns) is not None else ""
                published = entry.find("atom:published", ns).text if entry.find("atom:published", ns) is not None else ""
                summary = entry.find("atom:summary", ns).text.strip().replace("\n", " ")[:200] if entry.find("atom:summary", ns) is not None else ""
                results.append({
                    "source": "arXiv cs",
                    "title": title,
                    "url": link,
                    "summary": summary + "...",
                    "timestamp": published
                })
    except Exception as e:
        print(f"  Warning: arXiv API fetch failed: {e}")

    print(f"-> Found {len(results)} arXiv papers.")
    return results

def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        
    print("=========================================================")
    print("  NextVector Live Intelligence Harvester (48h Window)    ")
    print("=========================================================")
    now_utc = datetime.now(timezone.utc)
    print(f"Current System UTC: {now_utc.isoformat()}")
    print(f"48h Temporal Horizon: {(now_utc - timedelta(hours=48)).isoformat()} to {now_utc.isoformat()}")

    hn = fetch_hn_top_stories()
    bbc = fetch_bbc_tech()
    arxiv = fetch_arxiv_recent()

    all_signals = hn + bbc + arxiv
    print("\n=========================================================")
    print(f"  Total Fresh Signals Harvested: {len(all_signals)}")
    print("=========================================================")
    
    # Print top 15 candidates
    print("\nTop Candidates for Today's Pipeline:")
    for i, s in enumerate(all_signals[:15], 1):
        print(f"{i}. [{s['source']}] {s['title']}")
        print(f"   URL: {s['url']}")
        print(f"   Timestamp: {s['timestamp']}\n")

if __name__ == "__main__":
    main()
