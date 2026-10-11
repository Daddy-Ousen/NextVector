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
- [ ] Commit and deploy (user decision).
- [ ] After first deploy: check that Vercel serves `404.html` with status 404 for unknown URLs, and that `/compare/<slug>` pages load.
- [ ] `public/_redirects` (`/* /index.html 200`) is Netlify/Cloudflare-only. Vercel ignores it. Delete it if you never deploy there.
- [ ] ~130 lint warnings (unused imports). No errors.
- [ ] Optional: WebP/AVIF + `srcset` for covers; brand folder is 6.5 MB.
- [ ] Optional: Gate 5 uses file order (`articles[-5:]`), not dates.

## Architectural decisions
- `src/data/articlesData.ts` stays the single source of truth. The app reads it only through virtual modules `virtual:article-summaries` and `virtual:article-body/<id>` (see `vite.articleSplit.ts`). Types: `ArticleSummary` (lists) vs `Article` (detail).
- `public/sitemap.xml`, `public/rss.xml`, `public/llms-full.txt` are build outputs. Do not hand-edit. Sitemap regenerates only when git history is available; otherwise the committed file is kept.
- Vercel routing: no SPA rewrite. Every route is a prerendered file; unknown URLs get `404.html`, which still boots the SPA.
