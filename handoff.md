# Handoff — 2026-10-11 (design work: Pass 2, 1, 3, 4 done)

## How to resume
1. Read `progress.md` → "Design work plan". Unticked = still to do.
2. Pass 4 code is done and verified but NOT committed. Ask the user before commit/push (push to `main` deploys on Vercel).
3. Next pass: **Pass 5 — Accessibility leftovers** (tap targets, skip link, Triad repeat decision).
4. Open user decision: light mode (optional Pass 4 item) — do it or drop it.

## What was just done (Pass 4 — Engagement)
- Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 1024px and 375px.
- New files: `src/components/common/SubstackEmbed.tsx`, `src/components/common/ReadingProgressBar.tsx`, `src/components/cards/StoryList.tsx`.
- Changed: `src/pages/ArticleDetailPage.tsx` (progress bar, X/LinkedIn share, mid-article newsletter, Read next, category badge fix), `src/pages/HomePage.tsx` (Cards/List toggle), `src/utils/index.ts` (`getDayGroupLabel`, `formatClockTime`, `groupByDay`, `pickReadNext`), `src/App.tsx` (passes `readNext`, `onSelectArticle`), `src/components/layout/Footer.tsx` (uses `SubstackEmbed`).
- `public/sitemap.xml` changed from the build (expected).

## Uncommitted files
public/sitemap.xml, src/App.tsx, src/components/layout/Footer.tsx, src/pages/ArticleDetailPage.tsx, src/pages/HomePage.tsx, src/utils/index.ts, + 3 new component files above.

## Still open from earlier
- Check live site: Vercel serves `404.html` with status 404; `/compare/<slug>` pages load.
- USER TODO (Pass 2): upload new wordmark images to Substack.

## Pass 5 starting points
- Tap targets: many controls are `p-2` / `py-1` (≈28–32px). New Pass 4 controls too: Cards/List toggle (`HomePage.tsx`), share buttons (`ArticleDetailPage.tsx`). Target ≥ 40px for main controls at 375px.
- Skip link: add in `src/App.tsx` before `Navbar`; main content needs an `id`.

## Gotchas
- Line endings: some files are CRLF (`App.tsx`, `Footer.tsx`, `utils/index.ts`), others LF. In Python use `open(..., newline="")`, normalize to `\n`, write back with the original ending.
- Shell heredocs break on quotes/backslashes. Write scripts with the Write tool into the scratchpad.
- `npx vite build` alone is enough for quick browser checks; `npm run build` also runs prerender and rewrites `public/sitemap.xml`.
- Preview server: launch config `preview` (port 4173) serves `dist/`. Rebuild, then navigate again. Only `/_vercel/*` 404s are normal locally.
- `location.reload()` inside javascript_tool cuts the script; reload, then run a second script.
- Article dates are UTC; the home feed sorts by UTC day + importance. Anything grouped by local day must re-sort by exact time.
- Article URLs are `/article/<slug>`. Contrast colors are `oklch(...)`.
- "99.4%" inside article art-11 and one model entry is real content. Leave it.
