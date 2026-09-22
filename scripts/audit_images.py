#!/usr/bin/env python3
"""
NextVector Article Image Audit and Forensic Deduplication Script
Audits all articles in src/data/articlesData.ts and public/images/articles:
1. Exact string uniqueness of coverImage.
2. Unsplash photo token uniqueness across all articles.
3. Local file SHA256 binary hash uniqueness across all articles.
4. Exhaustive disk scan: ensures zero duplicate binary images in public/images/articles/.
5. Image integrity check: ensures all local files exist and are valid readable images (>5KB).
"""

import re
import hashlib
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
ARTICLES_FILE = ROOT_DIR / "src" / "data" / "articlesData.ts"
ARTICLES_IMG_DIR = ROOT_DIR / "public" / "images" / "articles"

def audit():
    print("==================================================")
    print("      NextVector Image Catalog Forensic Audit     ")
    print("==================================================")

    if not ARTICLES_FILE.exists():
        print(f"[ERROR] Articles file missing: {ARTICLES_FILE}")
        sys.exit(1)

    content = ARTICLES_FILE.read_text(encoding="utf-8")
    raw_articles = re.findall(r'(\{\s*id:\s*["\'](art-\d+)["\'].*?\n  \})', content, re.DOTALL)
    print(f"Total articles found in articlesData.ts: {len(raw_articles)}")

    seen_covers = {}
    seen_tokens = {}
    seen_article_sha = {}
    errors = []

    for block_text, art_id in sorted(raw_articles, key=lambda x: int(x[1].split('-')[1])):
        title_m = re.search(r'title:\s*["\']([^"\']+)["\']', block_text)
        cover_m = re.search(r'coverImage:\s*["\']([^"\']+)["\']', block_text)
        alt_m = re.search(r'coverImageAlt:\s*["\']([^"\']+)["\']', block_text)

        title = title_m.group(1) if title_m else "UNKNOWN"
        cover = cover_m.group(1) if cover_m else ""
        alt = alt_m.group(1) if alt_m else ""

        if not cover:
            errors.append(f"[{art_id}] Missing coverImage.")
            continue

        # 1. String check
        if cover in seen_covers:
            errors.append(f"[{art_id}] DUPLICATE STRING: '{cover}' already used by {seen_covers[cover]}")
        else:
            seen_covers[cover] = art_id

        # 2. Token check for Unsplash
        token_m = re.search(r'photo-([a-zA-Z0-9_-]+)', cover)
        if token_m:
            token = token_m.group(1).split('?')[0]
            if token in seen_tokens:
                errors.append(f"[{art_id}] DUPLICATE TOKEN: photo-{token} already used by {seen_tokens[token]}")
            else:
                seen_tokens[token] = art_id

        # 3. Local file binary check
        if cover.startswith("/"):
            local_p = ROOT_DIR / "public" / cover.lstrip("/")
            if not local_p.exists():
                errors.append(f"[{art_id}] MISSING LOCAL FILE: {local_p}")
            else:
                b = local_p.read_bytes()
                if len(b) < 5000:
                    errors.append(f"[{art_id}] FILE TOO SMALL/CORRUPT (<5KB): {local_p}")
                sha = hashlib.sha256(b).hexdigest()
                if sha in seen_article_sha:
                    prev_id, prev_cover = seen_article_sha[sha]
                    errors.append(f"[{art_id}] BINARY COLLISION: SHA256 {sha[:12]} is identical to {prev_id} ({prev_cover})")
                else:
                    seen_article_sha[sha] = (art_id, cover)

    # 4. Exhaustive disk scan
    disk_hashes = {}
    if ARTICLES_IMG_DIR.exists():
        for f in ARTICLES_IMG_DIR.glob("*"):
            if f.is_file():
                h = hashlib.sha256(f.read_bytes()).hexdigest()
                if h in disk_hashes:
                    errors.append(f"[DISK DUPLICATE] '{f.name}' has identical bytes to '{disk_hashes[h]}' (SHA: {h[:12]})")
                else:
                    disk_hashes[h] = f.name

    print(f"-> Verified unique coverImage strings:   {len(seen_covers)}")
    print(f"-> Verified unique Unsplash photo IDs:   {len(seen_tokens)}")
    print(f"-> Verified unique local image binaries: {len(seen_article_sha)}")
    print(f"-> Verified total unique files on disk:  {len(disk_hashes)}")

    if errors:
        print("\n[FAILED] Detected image violations:")
        for err in errors:
            print(f"  {err}")
        sys.exit(1)

    print("\n[SUCCESS] 100% Unique, non-colliding image assets across all articles and disk.")
    sys.exit(0)

if __name__ == "__main__":
    audit()
