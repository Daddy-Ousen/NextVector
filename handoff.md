# Handoff — 2026-10-11

## What was just done
- Fixed all audit bugs and the three speed problems. See `progress.md` → Completed.
- All checks pass: `npm run build`, `npm run verify` (8/8), `tsc -b`. Lint: 0 errors.
- Browser-tested on `vite preview`: 404 pages, `/archive`, `/compare/<slug>`, `?q=` search, article pages (body chunk loads), homepage "Load more".
- Nothing is committed yet. ~150 files changed (most are recompressed images).

## Next steps
1. User reviews, then commits and pushes (Vercel deploys).
2. After deploy: open a bad URL on the live site and confirm HTTP 404. Open `/compare/grok-vs-claude`.
3. Run `npm run indexnow` once after deploy (first run sends all URLs, then only changes).

## Gotchas
- Shell heredocs in this environment strip backslashes. Write Python helper scripts with the Write tool, not `cat <<EOF`.
- `vite.articleSplit.ts` uses Vite `runnerImport` to read `articlesData.ts`. If articles fail to show, check this plugin first.
- Article cards need all three "Three Questions" (compact card shows them), so `threeQuestions` stays in the summary.
- Timers are throttled in the hidden browser pane; avoid `setTimeout` waits in browser test scripts.
- `npm run build` rewrites `public/sitemap.xml`, `public/rss.xml`, `public/llms-full.txt`. Output is now deterministic, so no diff unless content changed.

## Active files
- `src/App.tsx`, `src/pages/ArticleDetailPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/pages/ArchivePage.tsx`
- `src/components/common/SEOHead.tsx`, `src/components/common/LoadMore.tsx`
- `src/data/mockData.ts`, `src/data/articleBodies.ts`, `src/data/modelCount.ts`, `src/types/index.ts`, `src/virtual-modules.d.ts`
- `vite.config.ts`, `vite.articleSplit.ts`, `vercel.json`
- `scripts/prerender_static_pages.py`, `scripts/verify_daily_pipeline.py`, `scripts/ping_indexnow.py`, `scripts/optimize_images.py`
- `DAILY_UPDATE_PIPELINE.md`
