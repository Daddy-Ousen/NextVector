#!/usr/bin/env python3
"""
NextVector IndexNow Multi-Engine Instant Notification Script
Submits all published URLs to the IndexNow protocol (Microsoft Bing, Yandex, Seznam, Naver).
Allows instant crawl discovery without waiting weeks for organic crawler passes.
"""

import sys
import json
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SITEMAP_FILE = ROOT_DIR / "public" / "sitemap.xml"
HOST = "nextvector.rhasan.online"
KEY = "c7e9a8f2b4d1456a9e8b7c6d5e4f3a2b"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

def submit_indexnow():
    if not SITEMAP_FILE.exists():
        print(f"Error: {SITEMAP_FILE} not found.")
        sys.exit(1)

    tree = ET.parse(SITEMAP_FILE)
    root = tree.getroot()
    urls = []
    for loc in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
        if loc.text:
            urls.append(loc.text.strip())

    print(f"Extracted {len(urls)} URLs from sitemap.xml for IndexNow ping.")

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=req_data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            status = response.status
            print(f"IndexNow API Response: HTTP {status}")
            if status in (200, 202):
                print("SUCCESS: URLs submitted to IndexNow search engine federation (Bing, Yandex, Seznam).")
            else:
                print(f"Note: Response status {status}")
    except Exception as e:
        print(f"Error pinging IndexNow: {e}")
        print("Note: IndexNow can be run after deployment when the key file is live at https://nextvector.rhasan.online/c7e9a8f2b4d1456a9e8b7c6d5e4f3a2b.txt")

if __name__ == "__main__":
    submit_indexnow()
