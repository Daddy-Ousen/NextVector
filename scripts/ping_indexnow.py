#!/usr/bin/env python3
"""
NextVector IndexNow Multi-Engine Instant Notification Script
Submits new or changed URLs to the IndexNow protocol (Microsoft Bing, Yandex, Seznam, Naver).
Allows instant crawl discovery without waiting weeks for organic crawler passes.

Only URLs whose sitemap <lastmod> changed since the last successful ping are sent.
State is kept in scripts/indexnow_state.json (commit it). Use --all to resubmit everything.
"""

import sys
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SITEMAP_FILE = ROOT_DIR / "public" / "sitemap.xml"
STATE_FILE = ROOT_DIR / "scripts" / "indexnow_state.json"
HOST = "nextvector.rhasan.online"
KEY = "c7e9a8f2b4d1456a9e8b7c6d5e4f3a2b"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP_NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
MAX_URLS_PER_REQUEST = 10000

def read_sitemap():
    tree = ET.parse(SITEMAP_FILE)
    entries = {}
    for url_el in tree.getroot().iter(f"{SITEMAP_NS}url"):
        loc = url_el.findtext(f"{SITEMAP_NS}loc")
        if loc:
            entries[loc.strip()] = (url_el.findtext(f"{SITEMAP_NS}lastmod") or "").strip()
    return entries

def load_state():
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def submit(urls):
    payload = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls}
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as response:
        return response.status

def submit_indexnow():
    if not SITEMAP_FILE.exists():
        print(f"Error: {SITEMAP_FILE} not found.")
        sys.exit(1)

    entries = read_sitemap()
    state = {} if "--all" in sys.argv else load_state()
    changed = [url for url, lastmod in entries.items() if state.get(url) != lastmod]

    print(f"Sitemap has {len(entries)} URLs; {len(changed)} new or changed since the last ping.")
    if not changed:
        print("Nothing to submit.")
        return

    try:
        for i in range(0, len(changed), MAX_URLS_PER_REQUEST):
            batch = changed[i:i + MAX_URLS_PER_REQUEST]
            status = submit(batch)
            print(f"IndexNow API Response: HTTP {status} ({len(batch)} URLs)")
            if status not in (200, 202):
                print(f"Error: unexpected IndexNow status {status}")
                sys.exit(1)
    except urllib.error.HTTPError as e:
        print(f"Error pinging IndexNow: HTTP {e.code} {e.reason}")
        if e.code == 403:
            print(f"Note: key file must be live at {KEY_LOCATION} (deploy first).")
        sys.exit(1)
    except Exception as e:
        print(f"Error pinging IndexNow: {e}")
        sys.exit(1)

    # Record only after success so failed pings are retried next run
    STATE_FILE.write_text(json.dumps(entries, indent=0, sort_keys=True) + "\n", encoding="utf-8")
    print("SUCCESS: URLs submitted to IndexNow search engine federation (Bing, Yandex, Seznam).")

if __name__ == "__main__":
    submit_indexnow()
