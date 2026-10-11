# Handoff — 2026-10-11 (Pass 6 design system done, NOT committed)

## Latest: Pass 6 — design system (user picked option C after the visual audit)
- All 14 audit items (V1–V14) fixed and verified. Details: `progress.md` → "Pass 6 — Design system".
- Rules for all new UI code: `DESIGN_SYSTEM.md`. Read it before touching any component.
- Shared pieces: utilities in `src/index.css` (`container-page`, `eyebrow`, `eyebrow-warn`, `heading-page`, `heading-section`, `scrollbar-none`, `fade-right`); components `src/components/common/PageHeader.tsx` and `SectionHeader.tsx`; `formatBenchmarkScore()` and new `getSignalColor()` in `src/utils/index.ts`.
- NOT committed. ~40 files changed + 3 new. Next step: ask the user to OK commit + push (push deploys to Vercel).
- Open low items: ModelCard spec box inside card; 4 plain-text footer items look like links; old lint warnings.
- Screenshot method that works: Playwright MCP `browser_run_code_unsafe` with `page.screenshot({path})` into the scratchpad. The built-in browser pane returned BLANK screenshots after scrolling the 1440px emulated home page (capture issue, not a site bug). Use the pane's "mobile" preset only for `pointer: coarse` tap audits (Playwright context has no touch).
- Playwright writes logs to `.playwright-mcp/` in the repo root (not tracked by git).

## How to resume
1. Design passes 1–6 are done. Light mode was dropped by the user.
2. Pass 5 committed as `bc61879` and pushed to `main` (Vercel deploys from `main`). Pass 6 is uncommitted. Check the live site on a phone after deploy.
3. Remaining open items are in `progress.md` → "Open items" (live-site 404 check, `_redirects`, lint warnings, optional WebP).

## Triad rule (new, docs only)
- `EDITORIAL_RULEBOOK.md` §2.4 "No-Restating Rule": article body must not repeat the Three-Question answers in other words. New articles only; the 211 old ones stay.
- Linked from `DAILY_UPDATE_PIPELINE.md` §5.1 and Stage 6 Step 1.
- Known doc drift (not fixed): Rulebook §5 / Pipeline §5.1 schema still says `whyDoesItMatter` / `whatCouldHappenNext` / `content: string`; real data uses `whyItMatters` / `whatsNext` / `content: string[]`.

## What was just done (Pass 5)
- Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 375px touch and 1024px mouse.
- Tap targets: `src/index.css` has (a) a base rule under `@media (pointer: coarse)` giving buttons/selects/inputs/summary min 40px, (b) a `tap` utility (min 40×40 on touch) for links. Mouse layouts unchanged.
- Skip link in `src/App.tsx`; `<main id="main-content" tabIndex={-1}>`.
- Audit result: 0 of 1,618 controls under 40px across 16 routes + menu + search + Saved window.

## Tap target rules for new code
- Buttons and form fields: nothing to do (base rule covers them).
- Stand-alone links (nav, footers, "Read", "View report", pills): add `tap` and make the link `flex`/`inline-flex items-center`.
- Truncated links (`truncate`): use `pointer-coarse:leading-10` instead of `tap` (flex breaks the ellipsis).
- Links inside a sentence: leave alone.
- Link lists: add `pointer-coarse:space-y-0` to the list so rows do not get too far apart.
- Tailwind v4 has `pointer-coarse:` built in. Browser pane "mobile" preset emulates `pointer: coarse`; "desktop" preset does not.

## Still open from earlier
- Check live site: Vercel serves `404.html` with status 404; `/compare/<slug>` pages load.
- USER TODO (Pass 2): upload new wordmark images to Substack.

## Gotchas
- Line endings: some files are CRLF (`App.tsx`, `Footer.tsx`, `Navbar.tsx`, `ArchivePage.tsx`, `AuthorPage.tsx`, `utils/index.ts`), others LF. For bulk edits a helper pattern works: read bytes, normalize to `\n`, replace with an expected count, write back with the original ending.
- Shell heredocs break on quotes/backslashes. Write scripts with the Write tool into the scratchpad.
- `npx vite build` alone is enough for quick browser checks; `npm run build` also runs prerender and rewrites `public/sitemap.xml`.
- Preview server: launch config `preview` (port 4173) serves `dist/`. Rebuild, then navigate again. Only `/_vercel/*` 404s are normal locally.
- SPA route change without reload (for audits): `history.pushState({}, '', p); dispatchEvent(new PopStateEvent('popstate'))`, then wait ~1.8 s for lazy pages.
- `location.reload()` inside javascript_tool cuts the script; reload, then run a second script.
- Bookmarks localStorage key is `nextvector_bookmarks`; feed view key is `nv-feed-view`.
- Article dates are UTC; the home feed sorts by UTC day + importance. Anything grouped by local day must re-sort by exact time.
- Article URLs are `/article/<slug>`. Contrast colors are `oklch(...)`.
- "99.4%" inside article art-11 and one model entry is real content. Leave it.
- Windows console shows `�` for em dashes when printing article text from Python. The file is fine (0 U+FFFD characters).
