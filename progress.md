# NextVector — Progress

## Roadmap status
- Site: React 19 + Vite 8 SPA, Python prerender (SSG) step, deployed on Vercel.
- Content: 211 articles (art-1 to art-211), 146 models, 6 leaderboards, 87 timeline events.
- Daily pipeline: see `DAILY_UPDATE_PIPELINE.md`. Order now: `npm run images` → `npm run build` → `npm run verify` (8 gates).

## Completed
- 2026-10-11: Full project audit.
- 2026-10-11: Bug fixes + speed fixes (uncommitted, verified: build, tsc, 8/8 verify gates, browser test on `vite preview`).
  - Real 404 page (`src/pages/NotFoundPage.tsx`, `noindex`) for bad article / model / compare / any unknown path. Build writes `dist/404.html`. Catch-all rewrite removed from `vercel.json`.
  - Client `/archive` page (`src/pages/ArchivePage.tsx`).
  - `/?q=term` opens search with the term.
  - Trailing slashes normalized (`/models/` = `/models`).
  - 15 broken related links fixed in `articlesData.ts`. New verify Gate 8 checks related IDs.
  - Model count is live (`src/data/modelCount.ts`), was hardcoded "135".
  - Removed wrong Wikidata `Q11660` from org `sameAs`.
  - Typo "Artificial Intelligence Intelligence" fixed.
  - Bookmarks no longer vanish if localStorage fails. Toast timer fixed. Article/model pages keyed by id.
  - SEOHead: `noindex` prop, absolute og:image, clears stale `article:*` tags, stable effect deps.
  - Prerender: articles sorted newest first (RSS was only the 60 OLDEST stories; homepage lead story was from Sept 1). Models sorted by rank.
  - Prerender now writes `sitemap.xml` (git-based lastmod, deterministic), RSS `lastBuildDate` = newest item (deterministic), `/compare/<slug>`, `/analysis`, `/deep-dives`, `/author` (canonical `/about`), hub pages list article links.
  - IndexNow: sends only new/changed URLs (state in `scripts/indexnow_state.json`), exits 1 on failure. Launchers no longer re-run the script on failure.
  - Speed: article bodies split out by Vite plugin `vite.articleSplit.ts` → `data-articles` chunk 449 KB → 168 KB gzip; each article body ≈2 KB gzip, loaded on demand.
  - Speed: "Load more" paging (24 per page) on home + category pages (`src/components/common/LoadMore.tsx`).
  - Speed: `scripts/optimize_images.py` (`npm run images`): article images 87 MB → 21 MB; 1 PNG converted to JPG. Cache header for `/images` and `/brand`.

## Open items
- [x] Commit and deploy: passes 1-3 committed as `cd6b75a` and pushed to `main` on 2026-10-11 (bug/speed fixes were `678f93a`).
- [ ] After first deploy: check that Vercel serves `404.html` with status 404 for unknown URLs, and that `/compare/<slug>` pages load.
- [ ] `public/_redirects` (`/* /index.html 200`) is Netlify/Cloudflare-only. Vercel ignores it. Delete it if you never deploy there.
- [ ] ~130 lint warnings (unused imports). No errors.
- [ ] Optional: WebP/AVIF + `srcset` for covers; brand folder is 6.5 MB.
- [ ] Optional: Gate 5 uses file order (`articles[-5:]`), not dates.

## Design work plan (from audit 2026-10-11)
User decision: do ALL passes, in this order: Pass 2 → Pass 1 → Pass 3 → Pass 4 → Pass 5.
Audit numbers were measured on `vite preview` (home at 1440px and 375px, an article page, /models).
Rule: tick a box only after `npx tsc -b`, `npm run build`, `npm run verify` (8/8) and a browser check pass.

### Pass 2 — Trust (DONE 2026-10-11)
- [x] Removed site-wide "Signal Purity 99.4%" (top bar) and footer "Status: Operational (100%)".
- [x] "Join 45,000+" → "Free on Substack" text (footer + `/briefing`). Footer badges → "No Clickbait Policy", "Primary Sources Linked", "Three-Question Format". "Official Substack Instant Verification" → "Sign-up handled by Substack". Removed "peer-grade" line from article author box.
- [x] Removed "Dhaka & San Francisco" claims: footer credit, Contact "Operating Hub" row, Schema.org `PostalAddress` (index.html, HomePage, ContactPage), prerender About text.
- [x] Wordmark tagline "99%+ Signal Purity" → "Less Noise. More Signal."; images rebuilt (`python scripts/build_substack_wordmarks.py`).
- Kept on purpose: per-article Signal Purity score (formula on /about); `/briefing` "Published Every Weekday" (user decision); AuthorPage job locations (resume facts).
- [ ] USER: upload new wordmark images to Substack (Settings → Branding).

### Pass 1 — Readability (DONE 2026-10-11)
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 1440px and 375px.
- [x] Text size: new token `text-2xs` = 12px (all `text-[9/10/11px]` → `text-2xs`, 159 places); `text-xs` raised to 13px in `src/index.css` `@theme`. Home: 0 text items under 12px (was 280). Grid card summary `text-xs` → `text-sm`.
- [x] Less monospace: home 73% → 23% mono. `font-mono` removed from non-data UI in all pages (scripts kept mono for uppercase eyebrows, td/th/code/kbd/pre, tabular-nums, text-right, ⌘ key, score badge, top-bar time, rank numbers, spec values, archive dates).
- [x] Contrast: `text-zinc-500` → `text-zinc-400` (108 places); `placeholder:text-zinc-600` → `-500`; 2 informational zinc-600/700 texts lightened. Home: 0 text items under 4.5:1 (was ~77).
- [x] Article body: container `max-w-4xl` → `max-w-3xl`; body text `max-w-[42rem]` → 65–75 characters per line (was ~100). Takeaways list `text-sm` → `text-base`.
- [x] Article Triad: stacked one column, body text `text-sm` → `text-base` (`ThreeQuestionsBlock.tsx`).
- [x] Global `:focus-visible` emerald ring + `prefers-reduced-motion` rule (`src/index.css`).
- [x] Side fixes found during check: logo tagline hidden under `sm` (header was 10px too wide at 375px, `NextVectorLogo.tsx`); `/compare` model dropdowns overflowed to 822px on phones (old bug) → now fit (`ComparePage.tsx`).
- Note: `/research` reports 1px extra width at 375px; no visible element overflows; body has `overflow-x: hidden`. Ignored.

### Pass 3 — Home page (DONE 2026-10-11)
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 1440px and 375px.
- [x] News-first top (`HomePage.tsx`): big SEO H1 block → one small H1 line "AI News, Model Benchmarks & Research" + "Updated <date>"; lead story right under it. Ticker moved below the lead story. At 375px the lead headline now starts at 455px (first screen; was ~1.5 screens down). Hero image on phones is 200px high (`ArticleCard.tsx`).
- [x] Cards (`ArticleCard.tsx`): grid headline `line-clamp-3`; grid What/Why/Next teaser removed; grid author byline replaced by relative time. Hero keeps author; hero Triad teaser shows from `sm` up, 2 lines each (`ThreeQuestionsBlock.tsx` compact).
- [x] "Frontier Stream" + pill → "Latest Stories" / "Newest first"; link "All AI news" does not wrap. Deep Dives pill hidden on phones. "Highest Technical Impact Index … peer discussion" → "Highest-Rated Stories / Ranked by Signal score" (the old text claimed a ranking input that does not exist).
- [x] Ticker: label "LIVE SIGNAL" → "Breaking"; fade edges (`.fade-edges` in `src/index.css`). Ticker items still come from `MOCK_LIVE_SIGNALS` (daily pipeline step). Docs updated: `DAILY_UPDATE_PIPELINE.md` §5.4, `EDITORIAL_RULEBOOK.md` §9.
- [x] /models: compare list starts empty (`App.tsx`; was 2 preset models, so the "2 models selected" bar showed on first load). Duplicate "Open Decision Matrix" callout removed (tab does the same). Header and filter box made compact; sort labels shortened. At 375px the table header is at ~640px and the first model row is on the first screen (table was at 838px).
- [x] Jargon: plain labels in Navbar search ("Search news & models..."), nav menus, Bookmarks ("Saved Stories"), Command palette, Footer ("Sections"), BenchmarkChart, Article page ("Back to all news", "Related Models, Benchmarks & Papers"), Author, Benchmarks, Category ("All News"), Briefing, FAQ, 404, Timeline, Archive ("Story Archive"), Compare FAQ, Decision Guide. Hero button "Read Signal" → "Read story".
- Kept on purpose: SEO `<title>`s, Schema.org, brand tagline "Technology & AI Intelligence", "Daily Intelligence Briefing" product name, per-article Signal score and Signal filter.

### Pass 4 — Engagement (DONE 2026-10-11, not committed yet)
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 1024px and 375px (no side scroll).
- [x] "Read next" block (`ArticleDetailPage.tsx`, after related models, before author box): 3 stories from `pickReadNext()` in `src/utils/index.ts` = same category, most shared tags first, then newest; fills from newest any-category. Wired in `App.tsx`. Real links (`<a href>`), so crawlable.
- [x] Share on X and LinkedIn (inline SVG logos; lucide has no brand icons) next to copy-link. All share the canonical URL. Copy-link now copies the canonical URL and only shows the tick when the copy worked.
- [x] Home "Latest Stories": Cards / List toggle. List = time + headline + category, grouped Today / Yesterday / "Friday, Oct 9" (reader's local time). `src/components/cards/StoryList.tsx`. Choice saved in localStorage `nv-feed-view` (try/catch). List sorts by exact time before grouping (feed order is UTC day + importance, which split groups).
- [x] Mid-article newsletter box after the middle paragraph (stories with 4+ paragraphs). Shared `src/components/common/SubstackEmbed.tsx` now also used by `Footer.tsx`. Iframe is `loading="lazy"`.
- [x] Reading progress bar (`src/components/common/ReadingProgressBar.tsx`): fixed 4px emerald bar at the top, uses scaleX, rAF-throttled scroll.
- [x] Side fix: article category badge got `[object Object]` as its class (`getCategoryBadge` returns an object). Now uses `.color` and `.label`.
- [ ] Optional, NOT done: light mode (site is dark only; `index.html` has `class="dark"`). Large job (hundreds of zinc-* classes). Ask user.

### Pass 5 — Accessibility leftovers
- [ ] Mobile tap targets: 118 of 175 links/buttons were under 32px at 375px. Target ≥ 40px for main controls.
- [ ] "Skip to content" link.
- [ ] Article body repeats the Triad text (content/pipeline issue; see `DAILY_UPDATE_PIPELINE.md`). Decide with user.

## Architectural decisions
- `src/data/articlesData.ts` stays the single source of truth. The app reads it only through virtual modules `virtual:article-summaries` and `virtual:article-body/<id>` (see `vite.articleSplit.ts`). Types: `ArticleSummary` (lists) vs `Article` (detail).
- `public/sitemap.xml`, `public/rss.xml`, `public/llms-full.txt` are build outputs. Do not hand-edit. Sitemap regenerates only when git history is available; otherwise the committed file is kept.
- Vercel routing: no SPA rewrite. Every route is a prerendered file; unknown URLs get `404.html`, which still boots the SPA.
