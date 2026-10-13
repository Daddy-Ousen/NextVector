# Handoff — 2026-10-12 (Daily Intelligence Pipeline Run: art-222 to art-227)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch, Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-222`: `meta-releases-muse-wonder-agentic-models` (Hero, Signal 94, Meta AI Muse Wonder 12B/70B, 1M context, OpenRouter API).
  - `art-223`: `supermarket-refrigeration-cyberattack-france-europe` (Featured, Signal 91, European supermarket refrigeration attack across 350+ stores, €14M spoilage).
  - `art-224`: `uk-ai-minister-warns-cyber-breach-aisi-access` (Signal 90, UK AI Minister emergency AISI pre-deployment audit mandate).
  - `art-225`: `anthropic-demonstrates-iot-self-replicating-ai-worms` (Featured, Signal 92, Anthropic red team self-replicating IoT worm research across 18 architectures).
  - `art-226`: `zhipu-ai-unveils-glm-legal-agent` (Signal 88, Zhipu AI GLM-Legal 32B bilingual statutory agent with 45% KV-cache pruning).
  - `art-227`: `google-pays-90k-devsite-pickle-rce-flaw` (Signal 89, Simon Koeck $90K Google DevSite Flask session pickle RCE).
- **Model Watch:**
  - Added `model-muse-wonder` (`meta/muse-wonder` on OpenRouter, 1M context, $4/$20 per M tokens) to `curated_models.json`.
  - Rebuilt registry via `python scripts/build_model_data.py` (137 models).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Monday, October 12, 2026` (5 links).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and dhash pairwise Hamming distance > 24 bits.
  - Ran `npm run images` to ensure optimization.
- **Verification & Builds:**
  - `npm run build` prerendered 227 articles, 137 models, 10 showdowns; 393 static HTML pages.
  - `npm run verify` passed ALL 8 RELEASE GATES.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-12-the-morning-vector.md` (`db5aa87`).
- **Commits:**
  - `d978446`: `feat(intelligence): daily briefing and articles update [2026-10-12]`
  - `db5aa87`: `docs(newsletter): The Morning Vector [2026-10-12]`
- **Stories Dropped / Excluded:**
  - None dropped; selected 6 high-signal leads from HN, BBC, Anthropic Research, Zhipu, and Koeck writeup, covering AI, Cybersecurity, Sovereign Policy, Model Architectures, and Bug Bounties.
- **Open Items:**
  - Monitor Vercel automatic deployment for `main`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - `scripts/add_articles.py` enforces both token and binary dhash uniqueness against all 227 articles; when selecting Unsplash images, always check tokens against existing catalog entries first.

# Handoff — 2026-10-12 (Daily pipeline set up for Antigravity + Gemini 3.8 Flash)

## Latest: pipeline tooling and docs, commit `ee1224f`, pushed to `main`
- User runs the daily pipeline in Antigravity with Gemini 3.8 Flash. Goal: make the setup safe for a smaller model.
- Antigravity loads `AGENTS.md` (root, always on) and skills from `.agents/skills/` (project root `D:/AntigravityProjects/News`, confirmed in `~/.gemini/config/projects`). Workflows stop working on 2026-10-19, so the runbook is the skill `.agents/skills/daily-update/SKILL.md` (trigger: "Run the daily update pipeline" or `/daily-update`).
- New flow: `npm run harvest` → fill `pipeline_runs/YYYY-MM-DD.json` from `pipeline_runs/TEMPLATE.json` → `python scripts/add_articles.py <file> --check` → same without `--check` → `npm run images` → `npm run build` → `npm run verify`.
- Changed: `scripts/fetch_live_intel.py` (rewrite), `scripts/verify_daily_pipeline.py` (new checks, `LEGACY_MAX_ARTICLE = 221`), new `scripts/add_articles.py`, `DAILY_UPDATE_PIPELINE.md`, `EDITORIAL_RULEBOOK.md`, `.gitignore` (`pipeline_runs/*` except TEMPLATE).
- Checks: verify 8/8 now; full test with a temporary art-222 passed tsc/build/verify, then was removed.
- Next: user runs "Run the daily update pipeline" in Antigravity. Check its first run: articles added via the script, verify 8/8, handoff updated.
- Open: 7 near-duplicate old cover pairs (see progress.md Open items); untracked models found by model watch.
- Gotcha: near-duplicate check uses dhash (64-bit), limit 8 bits. Real duplicates in the catalog scored 0-7.
- Gotcha: `add_articles.py` writes JSON-style double-quoted strings; prerender and verify parse them fine (tested).
- Gotcha: shell heredocs with mixed quotes or non-ASCII break in this Bash tool; write Python edit scripts with the Write tool.

# Handoff — 2026-10-12 (Article page: wide cover image)

## Latest: option 3 done, pushed to `main`
- User asked why article content is a narrow centered column on wide Windows screens. Cause: `max-w-[42rem] mx-auto` on the article (set in commit `b3fbd80` for reading width). User picked option 3: wide image, narrow text.
- Change: Hero Image div in `src/pages/ArticleDetailPage.tsx` gets `lg:w-[min(72rem,calc(100vw-4rem))] lg:left-1/2 lg:-translate-x-1/2 lg:aspect-[21/9] lg:max-h-[520px]`. Text column unchanged.
- Checks passed: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser: 1600 px (image 1152 px, centered), 1100 px (image fills to 32 px gutters), 375 px (unchanged, no side scroll).
- Pushed as `233a26c`. Next: check a live article page after the Vercel deploy.
- Gotcha: do not put max-width on all article children; `ReadingProgressBar` is a fixed bar inside the article and would shrink.

# Handoff — 2026-10-12 (Subscription guide restored, pushed)

## Latest: /subscriptions guide back, facts fixed — committed and pushed to `main`
- Why: commit `1845086` (model data rebuild) replaced the plain plan guide with leaderboard picks. User said non-experts could not use it. User chose "restore old page, fix facts".
- Files: new `src/components/models/SubscriptionGuide.tsx`; `src/pages/SubscriptionsPage.tsx`; `scripts/prerender_static_pages.py` (`PLANS_CHECKED`, `PLAN_SUMMARIES`, `/subscriptions` body, llms.txt line). `/models` still uses the data-only `ModelDecisionGuide.tsx` (unchanged).
- Facts source (checked 2026-10-12): claude.com/pricing (Pro $20 / $17 yearly, Max from $100, Team $25/$20, Premium $125, Fable via credits on Pro, 50% weekly on Max), support.claude.com Max 5x $100 / 20x $200; chatgpt.com/pricing (Go $8, Plus $20, model table, Business $25/$20); help.openai.com Pro 100/200/500; gemini.google/subscriptions (AI Pro: 3.8 Flash + 3.1 Pro, 5 TB) + blog.google (Ultra $100/$200); Google AI Pro $19.99 from third-party sites (Google page shows BDT here); cursor.com/pricing + /docs/models; runpod.io/pricing (4090 $0.34-$0.89/h, page conflicts).
- Model numbers on the page come from `ALL_MODELS` / `GUIDE_PICKS`, so they update with each data build.
- Checks passed: tsc, lint 0 errors, build, verify 8/8, browser (all tabs, 375px no side scroll).
- Next: check live /subscriptions after the Vercel deploy.
- Gotcha: openai.com/chatgpt pricing blocks WebFetch (403); use the built-in browser. Google One and gemini.google pages show Bangladesh prices from here.

# Handoff — 2026-10-12 (Benchmarks: price scatter + OSWorld all-runs switch)

## Latest: option 4 done, commit `b494452`, pushed to `main`
- User asked why Price vs Score had 9 models and OSWorld 21 (live shows 24). Answer: Pareto frontier rule; OSWorld keeps only "General model" runs. User picked option 4 (both changes).
- Done: scatter chart of all 112 priced models (frontier marked) + list switch Frontier/All priced; OSWorld switch Models only (24) / All runs (66).
- Files: `scripts/build_model_data.py`, `scripts/verify_daily_pipeline.py`, `src/types/index.ts`, `src/data/mockData.ts`, `src/components/benchmarks/BenchmarkChart.tsx`, new `src/components/benchmarks/PriceScoreScatter.tsx`, generated `benchmarksData.ts` + `site_data.json`.
- Checks passed: `python scripts/build_model_data.py`, `npm run build`, `npm run verify` 8/8, `npx tsc -b`, lint 0 errors, browser on `vite preview` (375px no side scroll, desktop hover box, both switches).
- Next: check live /benchmarks after the Vercel deploy (Price vs Score chart, both switches).
- Gotcha: the built-in browser pane can be hidden; then ResizeObserver never fires. The chart now measures once in `useLayoutEffect` before it observes.
- Gotcha: the browser cached old HTML after a rebuild; add `?nocache=N` to the URL.
- Not changed: llms.txt / prerender still list the frontier only (top 3). Fine as is.

# Handoff — 2026-10-11 (Daily pipeline run, art-212 to art-216)

## Latest: daily pipeline done
- Added 10 articles. Second batch art-217..221: Reflection Beam preview, Cloudflare Clef-omni (HF card), METR time-horizon paper, probes paper, 4-bit AdamW paper (arXiv abstracts). User rule: 5 is the MINIMUM, not the limit, and use more than BBC. First batch art-212..216: Anthropic agent fake murder tip, Microsoft Brad Smith AI rules, fired OpenAI researchers, Firmus IPO scrapped, Anthropic usage policy. Facts come only from BBC pages (read in the built-in browser; WebFetch is blocked on bbc.co.uk). Content is 450-650 words each, shorter than the 1,000-word target, to avoid invented detail.
- Updated `MOCK_DAILY_BRIEFING` and `MOCK_LIVE_SIGNALS`. No timeline entry. No model change.
- Covers are Unsplash URLs (HTTP 200 checked, not used before). No image generator in this session.
- Newsletter draft: `newsletters/2026-10-11-the-morning-vector-b.md` (a second 10-11 edition; the first one has old claims).
- Checks passed: `npm run images`, `npm run build`, `npm run verify` 8/8. Committed and pushed to `main`.
- Next: check the live site after the Vercel deploy. Optional: add Reflection AI Beam once weights are on Hugging Face (announced, weights promised this month).
- Gotcha: the 2026-10-11 newsletter and art-207 (Nvidia/Reflection acquisition) were not verified in this run; earlier audits found fake detail in similar items.

# Handoff — 2026-10-11 (Site-level files fixed; commits 13773b5 + cb1f52e pushed)

## Latest: Artificial Analysis (AA) index added — commit `4c07aab`, pushed to `main`
- Key is in `.env.local` (git-ignored). Fetch reads all 4 pages (697 rows, index v4.3). Full list → `snapshots/artificial_analysis_full.json` (git-ignored, for mapping). Committed `snapshots/artificial_analysis.json` keeps only the 256 rows our models use (repo is PUBLIC; AA terms reserve redistribution).
- Mapping: `"aa": [all settings]` on 120 of 136 models in `curated_models.json`. Build uses each model's best setting per index (same rule as Arena). Hand fixes: AA's undated `deepseek-v4-pro` = 0813 and `deepseek-v4-flash` = 0731; April models use the `-0424` / `-0420` slugs; `hy3-preview` excluded; `qwen3-8-max` (0902) not `-0803`. Not on AA (16): GPT-5.2/5.3 Chat, GPT-5.2/5.5 Pro (no score), Mythos 5.1, Gemini 3.8 Live x2, ERNIE 5.1, Seed x3, Grok 4.1, Qwen3.8 Flash, Hy4, Laguna, Namazu.
- Site: 5th board "AA Intelligence Index" (Coding/Agentic in row note), 3 index rows per model page (link to AA model page + setting), card shows Intelligence only, 3 new guide picks (aa-intelligence / aa-coding / aa-agentic), FAQ answer, footer credit "Model index data: Artificial Analysis", prerender /benchmarks + llms.txt + ai-summary credit, Gate 6 checks the AA board.
- Side fix: BenchmarkChart default unit was '%' (index showed "57.6%"); now no unit unless `scoreUnit` is set.
- Result: AA also ranks Anthropic first (Opus 5.5 57.6, Sonnet 5.5 56.0, Fable 5.1 53.4, GPT-6 Astra 52.7, Gemini 4 Argon 52.6 pre-release).
- Checks: build, verify 8/8, tsc, lint 0 errors, browser (board, model page, footer).
- Draft `lab_reported_draft.json` deleted (user OK). Next: check the live site after the Vercel deploy (/benchmarks AA tab, a model page, footer credit).

## Before: waiting for the AA key (done)
- AA free tier: `GET https://artificialanalysis.ai/api/v2/language/models/free`, header `x-api-key`, 100 requests/day. Fields: intelligence / coding / agentic index, `intelligence_index_version`, `release_date`, slug, creator. Attribution required on all tiers: visible byline or footer link to https://artificialanalysis.ai. Redistribution beyond display: "contact the team" (so: show index values with credit; no bulk export of their data).
- Done: `fetch_artificial_analysis()` in `scripts/fetch_model_sources.py` (key from `AA_API_KEY` env or `.env.local`, git-ignored via `*.local`; skips without key). New filter: `python scripts/fetch_model_sources.py artificial_analysis` fetches only that source.
- Next after key: run that command → map AA slugs to our ids (`aa` key in `curated_models.json`, build error on unknown slug like the other sources) → in `build_model_data.py` add model benchmarks "AA Intelligence/Coding/Agentic Index" + a 5th board → `benchmarksData.ts` export, BenchmarksPage/BenchmarkChart with credit line, prerender /benchmarks + llms.txt, Gate 6 → build, verify, browser.
- Still uncommitted: GPT-5.2 Chat + explanation line (verified) and the fetch code.

## Before: option 2 started (uncommitted) — lab-score findings
- Done + verified (build, verify 8/8, tsc, lint 0 errors, browser on preview): GPT-5.2 Chat added (`model-gpt-5-2-chat`, arena #31, 136 models / 116 on Arena). Explanation line on /models and /benchmarks (`ARENA_RANKED_COUNT` in `src/data/modelCount.ts`).
- Lab-reported scores: PAUSED. Problems: labs use different tests and versions (Terminal-Bench 2.1 vs 4.0; OSWorld-Verified vs 2.0 vs 2.1); many tables are images; OpenAI GPT-6.1 Sol page has only canvas charts (no exact numbers); labs print different numbers for the same rival model. Rule used: own lab's page only.
- Draft data so far: `scripts/model_sources/lab_reported_draft.json` (Opus 5.5, Fable 5.1, Fable 5, Opus 5, GPT-6 Astra; GPT-6.1 Sol gap). Not used by the build.
- Method that works for image tables: browser JS lists `img` URLs (scroll first for lazy load), then `curl` the `_next/image?url=...&w=1920` version into scratchpad `labimg/` and Read it. openai.com: WebFetch gets 403; the built-in browser works (`main.innerText`).
- Alternative found: Artificial Analysis Intelligence Index (same tests for all labs). Its list on 2026-10-11 also puts Anthropic first (Opus 5.5 58, Sonnet 5.5 56, Fable 5.1 / GPT-6 Astra / Gemini 4 Argon 53). Using its data needs an API key (user must sign up) and its terms.

## Previous: user asked "135 vs 115? GPT ranked low? Anthropic bias?" (answered, no code change)
- 135 = models we track. 115 = those that have an arena.ai text row. 20 have none (e.g. GPT-5.5 Pro, Codex models, Haiku 5.5, Mythos 5.1).
- 146 → 135 in the rebuild: 16 unverifiable ids dropped, 10 variant ids merged (redirects), 15 added.
- Arena ranks are arena.ai's own (snapshot 2026-10-11). Anthropic holds 9 of the top 15 rows there; best OpenAI row is gpt-5.6-sol-xhigh #20.
- Variant check (scratchpad `variant_check.py`): every model uses its best-ranked arena variant, all labs. Only gap: `gpt-5.2-chat-latest-20260210` (#31) is not tracked as its own model (GPT-5.3 Chat is).
- Known weakness: SWE-bench board stops Feb 2026 and OSWorld only has submitted runs, so new GPT models have no task scores. Optional fix: lab-reported scores, clearly labelled.
- Waiting for the user's choice (options in chat).

## Previous: index.html, llms.txt, ai-summary.json fixed (commit cb1f52e, pushed)
- What was done: old fake figures (1420/1417/1396 Elo, SWE-bench 98%, $0.14, Lean 4, OSWorld 68.4%, WebArena, wrong model links) are gone from all three files.
- Now generated by `scripts/prerender_static_pages.py` at every `npm run build`, from `site_data.json` + `articlesData.ts`:
  - `public/llms.txt` (whole file, `generate_llms_txt()`). Do not hand-edit; change the text in the script.
  - `public/ai-summary.json` → only the `modelPicks` key (`update_ai_summary()`). Other keys are hand-written.
  - `index.html` no-JS model list: placeholder `<div id="nv-top-models">` in the source, filled in dist (`inject_top_models()`). Build exits if the div is missing.
  - `/faq` prerender: body + FAQPage schema from `faq_pairs()`.
- Removed the global FAQPage schema from `index.html` (it showed on every page, not visible, fake numbers).
- Side fix: `js_unescape()` in `parse_articles()`. Prerendered pages had raw `’` text (59 pages); now 0.
- Checks passed: `npm run build`, `npm run verify` 8/8, `npx tsc -b`, `npm run lint` 0 errors.
- State: committed `cb1f52e` and pushed to `main` together with `13773b5` (user OK, option 1). Next: check the live site after the Vercel deploy (`/llms.txt`, `/ai-summary.json`, `/faq`).
- Gotcha: one `npm run build` failed with "memory allocation of 131072 bytes failed" (Vite/rolldown). A re-run passed. Not a code bug.
- Open: newsletters archive repeats old figures (editorial call); art-78 / art-79 / art-197 follow-ups in `ARTICLE_CLAIMS_AUDIT.md`.

## Previous: article & timeline claims audit (see `ARTICLE_CLAIMS_AUDIT.md`)
- What was done: 12 articles + 2 timeline entries now match `scripts/model_sources/build/site_data.json` and official lab pages. Fake Elo, Cyber-Eval, fake SWE-bench/OSWorld/WebArena/MMLU-Pro numbers and the Opus 5.5 "native Lean 4 prover" are gone.
- Checks passed: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors.
- State: committed on `main`, NOT pushed. Waiting for the user to approve the push (`git push origin main`).
- Next (HIGH): DONE — see "Latest" above.
- Other follow-ups: art-78 Mixture-of-Depths premise, art-79 architecture numbers, art-197 invented API header. Details in the audit file.
- Gotcha: Opus 5.5 "40%" is Anthropic's own per-task cost claim; per-token prices fell 20%. Say both.
- Gotcha: articlesData mixes `’` escapes and raw `’`/`—` characters. Match raw file text exactly in edit scripts.
- Method that worked: scratchpad `edits.py` with (id, old, new, count) tuples, dry-run count check, CRLF kept.

## Previous: option A done (see progress.md "Model data rebuild")
- Model data is now GENERATED. Never hand-edit `src/data/modelsData.ts`, `benchmarksData.ts`, `showdownsData.ts`.
- Refresh: `python scripts/fetch_model_sources.py` then `python scripts/build_model_data.py`, then `npm run build`, `npm run verify`.
- Add/change models or showdown pairs in `scripts/model_sources/curated_models.json`. Build fails if a source key is missing.
- Anthropic/Google prices are typed from official pages (`price` with `src`); others come from OpenRouter.
- All checks passed. Committed `1845086`, pushed to `main`. Next: check the live site after the Vercel deploy (redirects for old /models/ URLs, /compare pages).
- Articles/timeline audit: done (see Latest above).
- Gotcha: shell heredocs break on mixed quotes; write edit scripts to scratchpad files (helper `edit_lib.py` pattern: counted exact replacements, keep CRLF).
- Gotcha: substring type rules bit us ("gemini" contains "mini"); build uses whole-word matching.

## Previous: Pass 6 — design system (user picked option C after the visual audit)
- All 14 audit items (V1–V14) fixed and verified. Details: `progress.md` → "Pass 6 — Design system".
- Rules for all new UI code: `DESIGN_SYSTEM.md`. Read it before touching any component.
- Shared pieces: utilities in `src/index.css` (`container-page`, `eyebrow`, `eyebrow-warn`, `heading-page`, `heading-section`, `scrollbar-none`, `fade-right`); components `src/components/common/PageHeader.tsx` and `SectionHeader.tsx`; `formatBenchmarkScore()` and new `getSignalColor()` in `src/utils/index.ts`.
- Committed as `b3fbd80` and pushed to `main`. Next step: check the live site after the Vercel deploy (phone + desktop).
- Open low items: ModelCard spec box inside card; 4 plain-text footer items look like links; old lint warnings.
- Screenshot method that works: Playwright MCP `browser_run_code_unsafe` with `page.screenshot({path})` into the scratchpad. The built-in browser pane returned BLANK screenshots after scrolling the 1440px emulated home page (capture issue, not a site bug). Use the pane's "mobile" preset only for `pointer: coarse` tap audits (Playwright context has no touch).
- Playwright writes logs to `.playwright-mcp/` in the repo root (not tracked by git).

## How to resume
1. Design passes 1–6 are done. Light mode was dropped by the user.
2. Pass 5 committed as `bc61879` and pushed to `main` (Vercel deploys from `main`). Pass 6 is `b3fbd80`, also pushed. Check the live site on a phone after deploy.
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
