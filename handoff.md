# Handoff — 2026-10-11 (design work: Pass 2, Pass 1, Pass 3 done)

## How to resume
1. Read `progress.md` → "Design work plan". It lists every pass with checkboxes. Unticked = still to do.
2. Next pass to do: **Pass 4 — Engagement**. Then Pass 5 (Accessibility leftovers).
3. User decision on record: do ALL passes, in order 2 → 1 → 3 → 4 → 5.

## What was just done (Pass 3 — Home page)
- Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 1440px and 375px.
- `src/pages/HomePage.tsx`: small H1 line + "Updated <date>", lead story first, ticker below it ("Breaking", fade edges), "Latest Stories" header, plain section labels.
- `src/components/cards/ArticleCard.tsx`: grid headline 3 lines, no Triad teaser, time instead of author. Hero image 200px on phones; hero Triad teaser from `sm` up.
- `src/components/common/ThreeQuestionsBlock.tsx`: compact lines clamp 2 (only hero uses compact now).
- `src/App.tsx`: compare list starts empty.
- `src/pages/ModelsDirectoryPage.tsx`: compact header and filters, duplicate guide callout removed.
- `src/index.css`: `.fade-edges` class.
- Jargon labels changed in ~17 files (list in `progress.md`).
- Docs: ticker label/position in `DAILY_UPDATE_PIPELINE.md` §5.4 and `EDITORIAL_RULEBOOK.md` §9.
- Nothing is committed. 44 files changed.
- USER TODO (from Pass 2): upload new wordmark images to Substack.

## Pass 4 starting points
- Article page: `src/pages/ArticleDetailPage.tsx` (copy-link button exists; Triad at ~line 322; related entities block at ~line 371).
- Substack embed to reuse: `src/components/layout/Footer.tsx`.
- "Read next": pick 3 by same category, newest first, exclude current. Article list is `ArticleSummary[]` from `virtual:article-summaries`.

## Gotchas
- Line endings: files may flip between CRLF and LF after edits. Git normalizes; `git diff --stat` stays small. In Python use `open(..., newline="")` and detect `\r\n` before building match strings.
- `npx vite build` alone is enough for quick browser checks; `npm run build` also runs prerender and rewrites `public/sitemap.xml` (expected while uncommitted).
- Preview server: launch config `preview` (port 4173) serves `dist/`. Rebuild, then navigate again. Old tabs show many 404s for old chunk names after a rebuild; reload clears them. Only `/_vercel/*` 404s are normal locally.
- Screenshots can show black images if taken before decode, and can time out. Retry, or check `img.complete` / sizes with JS.
- Article URLs are `/article/<slug>`.
- Contrast colors are `oklch(...)`; convert through a canvas before computing ratios.
- "99.4%" inside article art-11 and one model entry is real content. Leave it.
- Shell heredocs strip backslashes. Write scripts with the Write tool into the scratchpad.
