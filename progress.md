# NextVector — Progress

## Roadmap status
- Site: React 19 + Vite 8 SPA, Python prerender (SSG) step, deployed on Vercel.
- Content: 221 articles (art-1 to art-221), 146 models, 6 leaderboards, 87 timeline events.
- Daily pipeline: run by Antigravity (Gemini 3.8 Flash). Runbook `.agents/skills/daily-update/SKILL.md`, always-on rules `AGENTS.md`, reference `DAILY_UPDATE_PIPELINE.md`. Order: `npm run harvest` → batch JSON → `python scripts/add_articles.py <file> --check` → write → `npm run images` → `npm run build` → `npm run verify` (8 gates).

## Completed
- 2026-10-12: Daily pipeline set up for Antigravity + Gemini 3.8 Flash.
  - New `AGENTS.md` (always-on rules) and `.agents/skills/daily-update/SKILL.md` (14-step runbook). Antigravity workflows stop on 2026-10-19, so this uses a skill, not a workflow.
  - New `scripts/add_articles.py`: validates a batch JSON (real field names, enums, lengths, dates, citations, No-Restating similarity check), assigns ids + author, downloads covers locally, blocks exact and near-duplicate photos (dhash), writes articles + briefing + ticker. Template `pipeline_runs/TEMPLATE.json`; run files git-ignored.
  - `scripts/fetch_live_intel.py`: printed only 15 items (all Hacker News), so BBC/arXiv never showed. Now prints all, by source; BBC limited to 48h; HN by points; arXiv 30; new MODEL WATCH (OpenRouter 72h + untracked 14 days, Hugging Face lab orgs 72h); saves `pipeline_runs/harvest-DATE.json`.
  - `scripts/verify_daily_pipeline.py`: near-duplicate cover check (error after art-221, warning before), new articles need local cover / Robiul author / no future date, briefing must have 5 items (+ date warning), ticker text ≤ 95.
  - Docs: `DAILY_UPDATE_PIPELINE.md` and `EDITORIAL_RULEBOOK.md` §5 used wrong field names (signalScore, readTime, sources, whyDoesItMatter, content: string). Fixed to the real type; arena.ai; git add list; covers downloaded; 8 gates.
  - Tested: test article art-222 written by the script → tsc, build, verify 8/8 passed → duplicate-cover re-run blocked → test removed, rebuilt, sitemap/RSS back to committed state.
  - Commit `ee1224f`, pushed to `main`.
- 2026-10-12: Article page wide cover image (user pick, option 3). Text column stays 42rem (672 px). On screens 1024 px and wider, the cover image breaks out to `min(72rem, 100vw - 4rem)` (1152 px max), 21:9 crop, max 520 px tall. Mobile unchanged. File: `src/pages/ArticleDetailPage.tsx` (Hero Image div). Verified: tsc, build, verify 8/8, lint 0 errors, browser at 1600 / 1100 / 375 px (no side scroll). Commit `233a26c`, pushed.
- 2026-10-12: Benchmarks board option 4 (user pick). Commit `b494452`, pushed. Verified: build, verify 8/8, tsc, lint 0 errors, browser at 375px and desktop.
  - Price vs Score: new scatter chart (`src/components/benchmarks/PriceScoreScatter.tsx`) with all 112 priced models, log price axis, frontier (9) in emerald with a step line, hover box, click opens model page. List switch: Frontier (9) / All priced (112).
  - OSWorld-Verified: list switch Models only (24) / All runs (66). All runs = every approach (general, agent framework, specialized), best per name + type, with a note that they are not equal-terms runs.
  - Build: `build_model_data.py` writes `OSWORLD_ALL_RUNS_ENTRIES`, `PRICE_ALL_PRICED_ENTRIES`, `PRICE_SCORE_POINTS`; `site_data.json` has `boards.osworldAll`, `boards.paretoAll`, `pricePoints`. Types: `Benchmark.altView`, `Benchmark.pricePoints`, `PriceScorePoint`.
  - Gate 6 checks the two new lists and that chart frontier flags match the Pareto board (a score tie goes to the cheaper model).
- 2026-10-11: Daily pipeline run. 10 articles added (art-212 to art-216 from BBC reports; art-217 to art-221 from a Hugging Face model card, arXiv abstracts and a secondary Beam write-up; Unsplash covers). Briefing + ticker refreshed. No timeline event (none reached impact 95). No new model (Haiku 5.5, Mistral Large 4 already tracked). Newsletter: `newsletters/2026-10-11-the-morning-vector-b.md`. Checks: images, build, verify 8/8.
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
- [ ] Old near-duplicate covers (same photo twice): art-91/172/192, art-98/195, art-100/193, art-182/198 (hotel bedroom, off-topic), art-194/209. Replace the later ones. Gate 1 lists them as warnings.
- [ ] 41 old articles still hotlink Unsplash covers (221 covers, 180 local).
- [ ] Model watch on 2026-10-12 found untracked OpenRouter models: GPT-6.1 Sol Pro, Ling 3.1 Flash, Pareto 26.10 Preview, Nano Banana 2.1 (image). Decide in the next daily run.

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

### Pass 4 — Engagement (DONE 2026-10-11, commit `92672e5`, pushed)
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 1024px and 375px (no side scroll).
- [x] "Read next" block (`ArticleDetailPage.tsx`, after related models, before author box): 3 stories from `pickReadNext()` in `src/utils/index.ts` = same category, most shared tags first, then newest; fills from newest any-category. Wired in `App.tsx`. Real links (`<a href>`), so crawlable.
- [x] Share on X and LinkedIn (inline SVG logos; lucide has no brand icons) next to copy-link. All share the canonical URL. Copy-link now copies the canonical URL and only shows the tick when the copy worked.
- [x] Home "Latest Stories": Cards / List toggle. List = time + headline + category, grouped Today / Yesterday / "Friday, Oct 9" (reader's local time). `src/components/cards/StoryList.tsx`. Choice saved in localStorage `nv-feed-view` (try/catch). List sorts by exact time before grouping (feed order is UTC day + importance, which split groups).
- [x] Mid-article newsletter box after the middle paragraph (stories with 4+ paragraphs). Shared `src/components/common/SubstackEmbed.tsx` now also used by `Footer.tsx`. Iframe is `loading="lazy"`.
- [x] Reading progress bar (`src/components/common/ReadingProgressBar.tsx`): fixed 4px emerald bar at the top, uses scaleX, rAF-throttled scroll.
- [x] Side fix: article category badge got `[object Object]` as its class (`getCategoryBadge` returns an object). Now uses `.color` and `.label`.
- Light mode: DROPPED by user decision 2026-10-11. Site stays dark only.

### Pass 5 — Accessibility leftovers (DONE 2026-10-11, commit `bc61879`, pushed)
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, browser at 375px (touch emulation) and 1024px (mouse).
- [x] Tap targets: on touch screens (`pointer: coarse`) controls are now ≥ 40×40px. Mouse layouts do not change (checked: topic chip still 28px at 1024px).
  - Base rule in `src/index.css` (`@layer base`): every `button`, `select`, `summary`, text `input` gets `min-height: 2.5rem`; buttons also `min-width`.
  - New utility `tap` in `src/index.css` for links (links inside running text are left alone, WCAG 2.5.8 exempts them). Added to links in Navbar, ArticleCard, ModelCard, HomePage, BenchmarkChart, Footer, SubstackEmbed, ArticleDetailPage, ArchivePage, ContactPage, NotFoundPage, ResearchPage, AuthorPage.
  - Layout fixes so touch rows do not get too tall or crowded: `pointer-coarse:py-0` on top bar, `pointer-coarse:py-1` on ticker, `pointer-coarse:space-y-0` + `pointer-coarse:py-1.5` on footer link lists, `pointer-coarse:leading-10` on truncated archive/contact links.
  - Result at 375px over 16 routes (home, article, /models, model detail, /benchmarks, /compare, /research, /timeline, /briefing, /faq, /contact, /about, /archive, /ai, /subscriptions, 404) + mobile menu + search + Saved window: 0 of 1,618 controls under 40px (was 127 of 173 on home alone). No side scroll.
  - Side fix: icon-only bookmark buttons and Cards/List toggle got `aria-label`; bookmark buttons got `aria-pressed`.
- [x] "Skip to content" link (`src/App.tsx`): first focusable element, shows on keyboard focus, moves focus to `<main id="main-content" tabIndex={-1}>`. Checked: Tab shows it, Enter focuses main, next Tab lands on the lead story.
- [x] Article body repeats the Triad text in longer words (paraphrased, not copied). User decision (option B): rule for NEW articles only, old 211 articles stay. Added `EDITORIAL_RULEBOOK.md` §2.4 "No-Restating Rule", linked from `DAILY_UPDATE_PIPELINE.md` §5.1 (`content` bullet) and Stage 6 Step 1 (self-check). No automated gate (paraphrase cannot be detected reliably; a verbatim gate would fail on 2 old articles).

## Pass 6 — Design system (DONE 2026-10-11, commit `b3fbd80`, pushed)
User decision: option C (full design system pass) after the visual audit (V1–V14).
Rules for new code: `DESIGN_SYSTEM.md` (layout widths, colors by role, type scale, 3 corner sizes, one level of box, checklist).
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, Playwright screenshots at 1440px and 375px, built-in browser at 375px touch over 15 routes: 0 side scroll; all controls ≥ 40px except the sr-only skip link and one inline name link in the footer sentence (both allowed).
- [x] Shared pieces: `src/index.css` utilities `container-page`, `eyebrow`, `eyebrow-warn`, `heading-page`, `heading-section`, `scrollbar-none` (was used in 4 places but never defined), `fade-right`. Removed unused `.glass-panel`, `.bezel-*`, `.text-glow-*`, `--font-serif`. New components `src/components/common/PageHeader.tsx`, `SectionHeader.tsx`.
- [x] V1 Score badge: solid blurred backing; 95+ emerald, rest neutral zinc (`getSignalColor` in `src/utils/index.ts`).
- [x] V2 Fake italic removed (/briefing summary, footer quote, audio player). Briefing summary: no quote marks, left rule, not boxed.
- [x] V3 Colors: stray cyan/purple/blue/Substack orange → emerald or zinc. Kept by rule: category pills, A-vs-B second series (cyan) on /compare and comparison modal, amber for warnings and top-3 ranks. /briefing "Critical Signal" red → emerald. Chart bars solid emerald.
- [x] V4 One left edge: top bar, nav, main, footer all use `container-page` (all at 109px at 1440). Removed double padding in Compare/Contact/FAQ/Subscriptions. Wide text pages (Archive, Author, Contact, FAQ, Model detail) are left-aligned `max-w-5xl` (no `mx-auto`).
- [x] V5 Boxes: hub page headers unboxed (PageHeader on Archive, Benchmarks, Category, Compare, Contact, FAQ, Models, Research, Subscriptions, Timeline); Triad = one card with dividers (removed "Core Signal Framework" chip and pulsing dot); Substack form wrapper border/white bg removed; home "AI Models at a Glance" and "Highest-Rated Stories" unboxed (SectionHeader).
- [x] V6 H1: hub pages `heading-page` (36px); detail pages keep 48px; /briefing H1 sans; 404 uses `heading-page`. Section H2s use `heading-section` (11 places; /models decision guide H2 was bigger than the page H1).
- [x] V7 Card format label hidden when it repeats the category ("Discovery" under "Science & Discovery").
- [x] V8 /models table: chips and header cells `whitespace-nowrap`, Parameters wraps to 2 lines (no "…"), cell padding px-3. Table fits 1214px at 1440 (was 1237 → cut off).
- [x] V9 Phone /models filters stack full width (labels readable). Chip rows (home topics, /compare, /research, /timeline) fade at the right edge, no scrollbar.
- [x] V10 Article column: all blocks 42rem (was 48rem boxes + 42rem text).
- [x] V11 Corners: only `rounded-lg`, `rounded-2xl`, `rounded-full` (192 replacements, also in `scripts/prerender_static_pages.py`).
- [x] V12 Labels: 57 colored uppercase labels → `eyebrow` (emerald) or `eyebrow-warn` (amber). Neutral zinc field labels left as is.
- [x] V13 Newsreader serif dropped from `index.html` (3 font links) and code; Jakarta 300 weight dropped (unused). `font-black` → `font-extrabold` (900 was never loaded).
- [x] V14 Small text: checked. 12–13px kept for data tables and meta; rule written in `DESIGN_SYSTEM.md` §3.
- [x] Side fix: model benchmark scores showed "1338%" (Elo) and "58.2%%". New `formatBenchmarkScore()` in `src/utils/index.ts`, used in ModelCard, ModelDetailPage, ModelComparisonModal.
- [x] Side fix: footer external links had 2 different colors; now same as other footer links. Decorative blurred color blobs removed (Author, Compare, Decision guide).
- Copy touched (small): /compare eyebrow "NextVector Head-to-Head Architecture Audit • September 2026" → "Head-to-Head Model Comparison" (old one had a stale month).
- [x] Committed as `b3fbd80` and pushed to `main` (user OK, option A).
- Open (not done, low): ModelCard has a spec box inside the card (box in box). Footer "Standards & Mission" has 4 plain-text items that look like links. ~130 old lint warnings (unused imports).

## Model & benchmark data audit (2026-10-11, report only, no data changed)
Full report: `MODEL_DATA_AUDIT.md`.
- Finding: `scripts/generateModelsData.cjs` makes Elo (straight line 1420→1178), prices, release dates, 2nd benchmark and text by formula. 134 of 146 models are template entries. OSWorld/WebArena/SWE-bench/Cyber-Eval boards copy Arena order (97–98% of pairs). Price index has 416 logic breaks. All rows say "verified by NextVector".
- Wrong facts: Anthropic prices/context (Fable 5.1, Fable 5, Mythos 5.1, Opus 5, Opus 4.5–4.8, Sonnet 5, Sonnet 4.6, Haiku 5.5 context); Sonnet 5.5 and Haiku 4.5 missing; older models (Opus 4/4.1/4.5, Sonnet 4.5, Gemini 2.5 Pro, o3, GPT-5, MiniMax M2, GLM-4.5, DeepSeek-V3.2) have wrong dates, prices, licenses, scores.
- Contradictions: 15 model-page SWE-bench scores ≠ board; 140/141 "Rank #N" texts wrong; ~25 wrong figures in `ComparePage.tsx` and `ModelDecisionGuide.tsx`; comparison modal AIME/GPQA rows broken; license filter drops "Research Weights".
- User picked option A (rebuild with real sourced data). DONE 2026-10-11, commit `1845086`, pushed.

## Model data rebuild (option A, 2026-10-11, commit `1845086`, pushed)
Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, lint 0 errors, browser check (model page, compare, benchmarks, guide, /models at 375px, no side scroll).
- [x] New pipeline: `scripts/fetch_model_sources.py` (dated snapshots in `scripts/model_sources/snapshots/`), `scripts/model_sources/curated_models.json` (model list + source keys + showdown pairs), `scripts/build_model_data.py` (writes `modelsData.ts`, `benchmarksData.ts`, `showdownsData.ts`, `scripts/model_sources/build/site_data.json`, vercel.json redirects). `generateModelsData.cjs` deleted.
- [x] 135 real models (16 unverifiable dropped, variants merged, 15 added e.g. Sonnet 5.5, Haiku 4.5, GPT-6.1 Sol, Gemini 4 Argon). 31 redirects for old model URLs.
- [x] Boards: Arena (real ranks, 115), OSWorld-Verified (24), SWE-bench Verified bash-only (42, runs end Feb 2026), Price vs Arena Pareto (9). WebArena and fake "Cyber-Eval" removed (5 article links removed).
- [x] UI rewired: ModelCard, ModelDetailPage (sources, price notes), comparison modal, directory (blended sort, licence filter), BenchmarkChart (modelId links, source/date), ComparePage + DecisionGuide + Subscriptions + FAQ now data-driven; "verified by NextVector" claims removed. Prerender + llms-full read site_data.json. Gate 6 rewritten. Docs updated (pipeline, rulebook, README).
- [x] Committed `1845086` and pushed to `main` (user OK, option A).
- [x] Follow-up: article/timeline audit DONE 2026-10-11 (see next section).
- [ ] Optional: lab-reported SWE-bench for 2026 models; ComparePage unused icon imports.
- [x] Bias check 2026-10-11 (user question): all labs use their best arena.ai variant. GPT-5.2 Chat added (136 models, 116 on Arena). Explanation line on /models and /benchmarks. Verified: build, verify 8/8, tsc, lint 0 errors, browser. Commit `4c07aab`, pushed.
- [ ] Lab-reported scores (user option 2): replaced by user choice 1 = Artificial Analysis index. Draft lab data kept in `scripts/model_sources/lab_reported_draft.json` (not used).
- [x] Artificial Analysis index (2026-10-12, commit `4c07aab`, pushed): 120 of 136 models mapped, 5th board, model page rows, guide picks, footer credit, trimmed public snapshot (256 rows), full list local only. Verified: build, verify 8/8, tsc, lint 0 errors, browser. Side fix: chart no longer adds "%" to index scores.

## Subscription guide restored (2026-10-12)
User: the `1845086` rebuild deleted the plain subscription guide; the data-only page was too hard for non-experts. User picked "restore old page, fix facts".
- [x] New `src/components/models/SubscriptionGuide.tsx` = old layout (budget planner $20/$100/$200, use-case matrix, $20 plans, $100-$200 plans). Model ranks/prices/scores read from `ALL_MODELS` + `GUIDE_PICKS`; plan facts typed in, checked 2026-10-12 on vendor pages (`PLANS_CHECKED`).
- [x] `src/pages/SubscriptionsPage.tsx`: old title/H1/short answer/FAQ schema back, facts fixed. `/models` keeps the data-only `ModelDecisionGuide`.
- [x] `scripts/prerender_static_pages.py`: `/subscriptions` no-JS body = `PLAN_SUMMARIES`; llms.txt line updated. Keep `PLANS_CHECKED`/`PLAN_SUMMARIES` in sync with the TSX.
- [x] Verified: `npx tsc -b`, `npm run lint` (0 errors), `npm run build`, `npm run verify` 8/8, browser on preview (all tabs, 375px no side scroll, desktop screenshot).
- [x] Committed and pushed to `main` (user OK).
- [ ] Re-check plan prices about monthly; vendors change plans often (ChatGPT Pro tiers changed 2026-09-29).

## Article & timeline model-claims audit (2026-10-11, commit `13773b5`, pushed)
Full list: `ARTICLE_CLAIMS_AUDIT.md`. Verified: `npx tsc -b`, `npm run build`, `npm run verify` 8/8, `npm run lint` 0 errors, built Opus 5.5 page spot-checked.
- [x] 12 articles fixed (art-1, 7, 60, 78, 79, 90, 110, 115, 146, 155, 186, 197) + 2 timeline entries (Sonnet 5.5, Mistral 3). Daily briefing and live signals were clean.
- [x] Removed: Cyber-Eval 94.6%, all fake Elo (1396/1404/1412/1417/1418/1338/1386/1425), fake SWE-bench (58.2/62.4/73.4/84.1/91.4), OSWorld/WebArena 68.4/74.2, MMLU-Pro/HumanEval/MATH-500 fakes, Opus 5.5 "native Lean 4 prover".
- [x] Corrected from site_data/official pages: prices (Fable 5.1 $10/$50, Sonnet 5.5 $2/$10, Grok 4.7 $2/$6, DeepSeek-V4.1-Flash $0.30/$1.20, Haiku 5.5 cache $0.01, Argon $2/$10 intro), context sizes, arena.ai scores/ranks, Opus 5.5 "20% lower token prices; Anthropic says 40% less to run".
- Note: Anthropic's Opus 5.5 page really says "costs 40% less to run than Opus 5" (per task). Per-token cut is 20%. Both are now stated.
- [x] Site-level files fixed (2026-10-11, commit `cb1f52e`, pushed). Verified: `npm run build`, `npm run verify` 8/8, `npx tsc -b`, `npm run lint` 0 errors, dist files checked (0 old figures, `/faq` FAQPage schema valid JSON).
  - `index.html`: removed the global FAQPage schema (fake figures, not visible on most pages). Wording: "verified LMSYS" → "sourced … arena.ai"; no plan prices. No-JS model list is now a placeholder `<div id="nv-top-models">`, filled at build time.
  - `scripts/prerender_static_pages.py`: new `inject_top_models()` (top 5 released models by arena.ai score), `generate_llms_txt()` (whole `public/llms.txt`), `update_ai_summary()` (`modelPicks` key in `public/ai-summary.json`; `topPicks2026` removed), `faq_pairs()`/`faq_schema()` (one source for `/faq` body + schema). Core pages now pass `schema` through.
  - Side fix: new `js_unescape()` in the article parser. 59 prerendered pages and llms-full.txt showed raw `’` / `\'` text; now 0.
- [ ] Newsletters archive still repeats old fake figures (sent emails; editorial call).
- [ ] Follow-ups: art-78 Mixture-of-Depths premise vs Mistral's real post; art-79 architecture numbers vs DeepSeek page; art-197 invented API header/model ID.

## Architectural decisions
- `src/data/articlesData.ts` stays the single source of truth. The app reads it only through virtual modules `virtual:article-summaries` and `virtual:article-body/<id>` (see `vite.articleSplit.ts`). Types: `ArticleSummary` (lists) vs `Article` (detail).
- `public/sitemap.xml`, `public/rss.xml`, `public/llms-full.txt`, `public/llms.txt` are build outputs. Do not hand-edit. In `public/ai-summary.json` only `modelPicks` is generated; other keys are hand-written. The `index.html` no-JS model list (`#nv-top-models`) is filled at build time. Sitemap regenerates only when git history is available; otherwise the committed file is kept.
- Vercel routing: no SPA rewrite. Every route is a prerendered file; unknown URLs get `404.html`, which still boots the SPA.
