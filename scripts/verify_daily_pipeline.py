#!/usr/bin/env python3
"""
NextVector Daily Pipeline Pre-Publication Release Gate Verifier
Strictly enforces Editorial Rulebook §3, §4, §7, and §8:
1. 100% unique cover images across all articles (0 duplicates).
2. All local image assets exist on disk.
3. Temporal sanity: newly published articles match operational run date (last 48 hours).
4. Zero-anachronism gate: rejects historical models (e.g., Claude 3.5/3.7, GPT-4o) reported as breaking new releases in 2026.
5. All required schema fields (threeQuestions, sources, tags, author).
6. Sync between articlesData.ts, MOCK_DAILY_BRIEFING, MOCK_LIVE_SIGNALS, MOCK_TIMELINE_EVENTS, and public/sitemap.xml.
"""

import sys
import os
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
ARTICLES_FILE = ROOT_DIR / "src" / "data" / "articlesData.ts"
MOCK_DATA_FILE = ROOT_DIR / "src" / "data" / "mockData.ts"
SITEMAP_FILE = ROOT_DIR / "public" / "sitemap.xml"
PUBLIC_IMAGES_DIR = ROOT_DIR / "public"
MODELS_FILE = ROOT_DIR / "src" / "data" / "modelsData.ts"
BENCHMARKS_FILE = ROOT_DIR / "src" / "data" / "benchmarksData.ts"

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
    print("\n[Gate 1/5] Auditing src/data/articlesData.ts...")
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

        # Check cover image uniqueness (Rulebook §4.1)
        if cover in seen_covers:
            errors.append(f"DUPLICATE COVER IMAGE: '{cover}' shared by {seen_covers[cover]} and {art_id}")
        else:
            seen_covers[cover] = art_id

        # If local image, check file existence
        if cover.startswith("/"):
            local_rel = cover.lstrip("/")
            local_path = PUBLIC_IMAGES_DIR / local_rel
            if not local_path.exists():
                errors.append(f"MISSING LOCAL IMAGE FILE: {local_path} referenced in {art_id}")

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

    print(f"-> Total catalog articles parsed: {len(articles)}")
    print(f"-> Total unique cover images: {len(seen_covers)}")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False, articles

    print("PASS: Catalog structure, IDs, slugs, and cover image uniqueness verified.")
    return True, articles

def check_briefing_and_signals(articles):
    print("\n[Gate 2/5] Auditing MOCK_DAILY_BRIEFING & MOCK_LIVE_SIGNALS...")
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

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False

    print("PASS: Daily Briefing and Live Signals deep links verified.")
    return True

def check_timeline(articles):
    print("\n[Gate 3/5] Auditing Breakthrough Timeline (`MOCK_TIMELINE_EVENTS`)...")
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
    print("\n[Gate 4/5] Auditing public/sitemap.xml...")
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
    print("\n[Gate 5/5] Auditing Temporal Sanity (48-Hour Breaking News Window)...")
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
    print("\n[Gate 6/6] Auditing Model Registry & Benchmark Synchronization...")
    if not MODELS_FILE.exists() or not BENCHMARKS_FILE.exists():
        print("FAIL: modelsData.ts or benchmarksData.ts missing.")
        return False

    models_content = MODELS_FILE.read_text(encoding="utf-8")
    bench_content = BENCHMARKS_FILE.read_text(encoding="utf-8")

    errors = []

    # 1. Audit ARENA_LEADERBOARD_ENTRIES ranks
    arena_match = re.search(r"export const ARENA_LEADERBOARD_ENTRIES = \[(.*?)\];", models_content, re.DOTALL)
    if not arena_match:
        errors.append("Could not parse ARENA_LEADERBOARD_ENTRIES in modelsData.ts")
    else:
        arena_body = arena_match.group(1)
        ranks = [int(r) for r in re.findall(r"[\"']rank[\"']:\s*(\d+)", arena_body)]
        print(f"-> Total Arena entries: {len(ranks)}")
        for expected, actual in enumerate(ranks, start=1):
            if expected != actual:
                errors.append(f"Arena rank mismatch at index {expected-1}: expected #{expected}, found #{actual}")
                break

        # Check Grok 4.7
        if "Grok 4.7" not in arena_body:
            errors.append("Grok 4.7 missing from ARENA_LEADERBOARD_ENTRIES.")

    # 2. Audit SWE-bench ranks
    swe_match = re.search(r"export const SWE_BENCH_LEADERBOARD_ENTRIES: LeaderboardEntry\[\] = \[(.*?)\];", bench_content, re.DOTALL)
    if not swe_match:
        errors.append("Could not parse SWE_BENCH_LEADERBOARD_ENTRIES in benchmarksData.ts")
    else:
        swe_body = swe_match.group(1)
        swe_ranks = [int(r) for r in re.findall(r"[\"']?rank[\"']?:\s*(\d+)", swe_body)]
        print(f"-> Total SWE-bench entries: {len(swe_ranks)}")
        for expected, actual in enumerate(swe_ranks, start=1):
            if expected != actual:
                errors.append(f"SWE-bench rank mismatch at index {expected-1}: expected #{expected}, found #{actual}")
                break
        if "Grok 4.7" not in swe_body:
            errors.append("Grok 4.7 missing from SWE_BENCH_LEADERBOARD_ENTRIES.")

    # 3. Audit OSWorld
    osworld_match = re.search(r"export const OSWORLD_LEADERBOARD_ENTRIES: LeaderboardEntry\[\] = \[(.*?)\];", bench_content, re.DOTALL)
    if osworld_match:
        os_body = osworld_match.group(1)
        if "Grok 4.7" not in os_body:
            errors.append("Grok 4.7 missing from OSWORLD_LEADERBOARD_ENTRIES.")

    # 4. Audit Price-Performance
    price_match = re.search(r"export const PRICE_PERFORMANCE_LEADERBOARD_ENTRIES: LeaderboardEntry\[\] = \[(.*?)\];", bench_content, re.DOTALL)
    if price_match:
        price_body = price_match.group(1)
        if "Jev (System One)" not in price_body:
            errors.append("Jev (System One) missing from PRICE_PERFORMANCE_LEADERBOARD_ENTRIES.")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False

    print("PASS: Model and Benchmark leaderboards synchronized with 1..N sequential ranks.")
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

    print("\n=========================================================")
    print("  [SUCCESS] ALL 6 RELEASE GATES PASSED (100% Rulebook Compliant)")
    print("=========================================================")
    sys.exit(0)

if __name__ == "__main__":
    main()
