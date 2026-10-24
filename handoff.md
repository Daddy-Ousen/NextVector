# Handoff — 2026-10-24 (Daily Intelligence Pipeline Run: art-276 to art-281)

## Latest: Daily Pipeline Complete — 6 Articles, Kimi K3.1 Pro Model Tracked, Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-276`: `moonshot-ai-unveils-kimi-k3-1-pro-multimodal-reasoning-model` (Hero / Model Report, Signal 94, Moonshot AI launches Kimi K3.1 Pro, a 3T-class open-weight multimodal reasoning model with a 1M context window scoring 65.7% on Terminal-Bench 4.0 to beat GPT-6 Astra, with full weights dropping Nov 4).
  - `art-277`: `block-debuts-dessa-full-duplex-speech-model-trained-on-audio` (Featured / Discovery, Signal 93, Block Research Lab unveils Dessa, the first full-duplex conversational model trained purely on spoken human sound on a single NVIDIA GB200 NVL72 rack, running locally on Apple M4 Max).
  - `art-278`: `coalition-of-71-rights-groups-protests-google-android-lockdown` (Featured / Analysis, Signal 91, Coalition of 71 rights groups including EFF, FSF, Tor Project, and Proton launch Keep Android Open against Google's mandatory 2027 Play Services developer ID registration).
  - `art-279`: `openssl-4-1-0-ships-with-dtls-1-3-and-post-quantum-cryptography` (Breaking, Signal 90, OpenSSL 4.1.0 feature release arrives with RFC 9147 DTLS 1.3, RFC 8701 GREASE, AVX-512 accelerated ML-DSA and ML-KEM, and removes Windows CE/Itanium).
  - `art-280`: `google-updates-privacy-policy-linking-gmail-photos-ai-to-targeted-ads` (Analysis, Signal 89, Google quietly revises privacy policy with an exception permitting Search and Gemini Personal Intelligence features connected to Gmail, Drive, and Photos to inform targeted ads).
  - `art-281`: `direct-pass-k-optimization-thought-pruning-test-time-reasoning` (Research Explained, Signal 88, USC researchers publish arXiv:2610.31667 introducing Direct Pass@k Optimization for test-time thought pruning, mathematically resolving quality vs diversity across 8 models).
- **Model Watch:**
  - Added `model-kimi-k3-1-pro` to `scripts/model_sources/curated_models.json` (OpenRouter `moonshotai/kimi-k3.1-pro`, 1M context, $2.00/$10.00 pricing, AA Intelligence Index 55.1).
  - Re-fetched Artificial Analysis snapshot and ran `build_model_data.py`.
  - Maintained 143 tracked models in registry (Pareto frontier: 9 of 112 priced models).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Saturday, October 24, 2026` (5 items linking to art-276..280).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-276..280).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 18 bits from catalog (pairwise 25–43 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` executed with `$env:NODE_OPTIONS="--max-old-space-size=8192"`; prerendered 281 articles, 143 models, 10 showdowns; 453 static HTML files, sitemap 451 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
  - `npm run lint` passed with 0 errors.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-24-the-morning-vector.md` (`5eea983`).
- **Commits:**
  - `006ee29`: `feat(intelligence): daily briefing, Kimi K3.1 Pro model, and articles update [2026-10-24]`
  - `5eea983`: `docs(newsletter): The Morning Vector [2026-10-24]`
- **Stories Dropped / Excluded:**
  - `Calif iPhone Exploit` was on HN top list but primary source blog post was dated October 16, 2026 (> 48h recency limit).
- **Open Items:**
  - Monitor live Vercel deployment of commit `5eea983` / `006ee29`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - Always execute `build` with `$env:NODE_OPTIONS="--max-old-space-size=8192"` on Windows to prevent Rollup heap exhaustion.

# Handoff — 2026-10-22 (Daily Intelligence Pipeline Run: art-270 to art-275)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch Stable, Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-270`: `php2shell-ai-discovers-decade-old-rce-vulnerability-in-core-php` (Hero / Breaking, Signal 94, Wiz Research and OpenAI's Patch the Planet uncover CVE-2026-109618/109619 in core PHP dating back to PHP 5.4, affecting 70% of the web).
  - `art-271`: `anthropic-unveils-claude-duet-proactive-autonomous-agent` (Featured / Discovery, Signal 93, Anthropic debuts proactive ambient agent powered by Opus 5.5 across 6,000+ connectors with human-in-the-loop approval gating).
  - `art-272`: `openai-partners-with-google-cloud-bringing-frontier-models-to-model-garden` (Featured / Industry Watch, Signal 92, OpenAI models and Codex arrive on Google Cloud Model Garden with GCP commit spend drawdown).
  - `art-273`: `duckdb-releases-version-2-0-lts-cinnamon-teal-with-network-server-mode` (Breaking, Signal 90, DuckDB 2.0.0 LTS Cinnamon Teal debuts with Quack client-server protocol, async I/O on S3, native VARIANT, LTS to Oct 2027).
  - `art-274`: `compromised-litellm-release-on-pypi-deploys-stealth-credential-backdoor` (Breaking, Signal 89, PyPI version 1.107.0 of LiteLLM compromised with credential stealer and RAT executing on every Python process startup).
  - `art-275`: `meta-penalized-25-billion-in-new-mexico-cambridge-analytica-suit` (Analysis, Signal 88, New Mexico state judge orders Meta to pay $25 billion civil penalty for deceptive user data practices under state UPA).
- **Model Watch:**
  - Zero new foundation language models met tracking criteria in the last 72 hours.
  - Tracked Claude Duet (ambient proactive agent powered by Opus 5.5) and OpenAI Google Cloud Model Garden availability.
  - Maintained 142 tracked models in registry.
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Thursday, October 22, 2026` (5 items linking to art-270..274).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-270..274).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 18 bits from catalog (pairwise 24–36 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` executed with `$env:NODE_OPTIONS="--max-old-space-size=8192"`; prerendered 275 articles, 142 models, 10 showdowns; 446 static HTML files, sitemap 444 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-22-the-morning-vector.md` (`2ed79f8`).
- **Commits:**
  - `1dfb7ea`: `feat(intelligence): daily briefing and articles update [2026-10-22]`
  - `2ed79f8`: `docs(newsletter): The Morning Vector [2026-10-22]`
- **Stories Dropped / Excluded:**
  - `Mistral Large 4` release link was harvested but dates to October 6, 2026 (> 48h window).
- **Open Items:**
  - Monitor live Vercel deployment of commit `2ed79f8` / `1dfb7ea`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - `build` requires `$env:NODE_OPTIONS="--max-old-space-size=8192"` on Windows to avoid Rollup heap exhaustion.

# Handoff — 2026-10-21 (Daily Intelligence Pipeline Run: art-264 to art-269)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch Stable, Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-264`: `claude-designs-protein-binders-against-fatal-scorpion-neurotoxins` (Hero / Discovery, Signal 94, Anthropic, Citrini Research, Adaptyv Bio, and Twist Bioscience publish wet-lab results confirming 17 functional de novo protein minibinders designed by Claude against lethal scorpion venom neurotoxins).
  - `art-265`: `mistral-ai-launches-voxtral-3-multilingual-speech-models-and-sdk` (Featured / Model Report, Signal 93, Mistral AI unveils Voxtral 3 suite: Voxtral Small Transcribe 3 achieving 4.0% inferred WER across FLEURS 45, Voxtral Mini Transcribe 3 4B parameters at $0.0035/min, Voxtral Mini TTS 3 across 50+ dialects, and sovereign Voice Agent SDK).
  - `art-266`: `cloudflare-voidzero-oxc-unveil-tsrs-typescript-rust-port` (Featured / Breaking, Signal 91, Cloudflare, VoidZero, and Owner.com announce tsrs, a faithful Rust port of the TypeScript compiler delivering up to 8x speedup and 70% memory reduction with GC-free WebAssembly execution).
  - `art-267`: `deepseek-open-sources-deepinfer-production-inference-engine` (Breaking, Signal 90, DeepSeek open-sources DeepInfer on GitHub, releasing its production serving runtime for DeepSeek-V4.1-Flash across NVIDIA SM100 GPUs and Huawei Ascend 950 NPUs with DSpark and batch-invariant inference).
  - `art-268`: `flawed-key-generation-exposes-eight-emudhra-intermediate-cas` (Breaking, Signal 89, Security researchers confirm mathematical compromise of private keys for eight eMudhra intermediate CAs due to flawed key generation, triggering emergency blocks across Chrome, Firefox, Apple, and Microsoft trust stores).
  - `art-269`: `us-homeland-security-directs-civilian-agencies-to-remove-deepseek` (Analysis, Signal 88, US Department of Homeland Security issues binding operational directive instructing civilian federal agencies to purge DeepSeek AI models and derivative tooling).
- **Model Watch:**
  - Zero new foundation language models met tracking criteria in the last 72 hours.
  - Tracked Voxtral 3 (speech models with 4B Mini Transcribe at $0.0035/min) and DeepInfer (inference engine).
  - Maintained 142 tracked models in registry.
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Wednesday, October 21, 2026` (5 items linking to art-264..268).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-264..268).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 18 bits from catalog (pairwise 21–39 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` executed with `$env:NODE_OPTIONS="--max-old-space-size=8192"`; prerendered 269 articles, 142 models, 10 showdowns; 440 static HTML files, sitemap 438 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-21-the-morning-vector.md` (`a49f910`).
- **Commits:**
  - `944108d`: `feat(intelligence): daily briefing and articles update [2026-10-21]`
  - `a49f910`: `docs(newsletter): The Morning Vector [2026-10-21]`
- **Stories Dropped / Excluded:**
  - `Inception Mercury 3` was evaluated but released October 16 (> 72h window for new model entry).
- **Open Items:**
  - Monitor live Vercel deployment of commit `a49f910` / `944108d`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - Always verify that candidate cover photo Unsplash IDs are not present anywhere in `src/data/articlesData.ts` even if perceptual dhash passes, because `add_articles.py` enforces exact-token uniqueness across all catalog entries.

# Handoff — 2026-10-19 (Daily Intelligence Pipeline Run: art-258 to art-263)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch (Elorian Glimpse), Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-258`: `elorian-releases-glimpse-visual-scratch-space-model` (Hero / Model Report, Signal 93, Elorian launches Glimpse: multimodal foundation model by ex-DeepMind Gemini co-creator Andrew Dai featuring active visual scratch space inference and 262,144-token context, priced at $0.60/$3.00 on OpenRouter).
  - `art-259`: `deepseek-launches-native-web-search-and-fetch-api` (Featured / Breaking, Signal 92, DeepSeek launches standalone /v1/tools/search and /v1/tools/fetch APIs powered by proprietary web crawler, billing strictly for successful queries at $0.75 per 1,000 requests ahead of Nov 1 commercial billing).
  - `art-260`: `anthropic-commits-equity-stake-to-public-benefit-fund` (Featured / Analysis, Signal 90, Anthropic creates Public Benefit Fund LLC with initial 5% equity commitment scaling +2% per 50% valuation surge, elevating total public-interest equity to ~20%).
  - `art-261`: `anthropic-drafts-federal-ai-safety-bill-setting-commerce-thresholds` (Analysis, Signal 89, Leaked legislative proposals reveal Anthropic proposing federal AI safety criteria requiring $1B damages or 50 human deaths before Commerce Department can halt model deployments in DC District Court, preempting state-level bans).
  - `art-262`: `websites-and-financial-platforms-block-autonomous-ai-agents` (Deep Dive, Signal 88, Investigation by The Verge reveals Amazon, Delta Air Lines, Yelp, Amtrak, JPMorgan Chase, and Charles Schwab blocking autonomous browsing agents from Meta, OpenAI, and xAI).
  - `art-263`: `kronlstm-kronecker-delta-rule-linear-attention` (Research Explained, Signal 87, JKU Linz / ELLIS Unit Linz led by Sepp Hochreiter publish arXiv:2610.26834v1 introducing KronLSTM with Kronecker Delta Rule, provably converging to steady-state Markovian distribution with uniformly bounded matrix norm).
- **Model Watch:**
  - Added `model-elorian-glimpse` (`elorian/glimpse` on OpenRouter, 262,144 token context, $0.60 prompt / $3.00 completion / $0.06 cache read per 1M tokens, text/image/video modalities) to `scripts/model_sources/curated_models.json`.
  - Refreshed snapshot via `python scripts/fetch_model_sources.py openrouter`.
  - Rebuilt model registry via `python scripts/build_model_data.py` (total models tracked: 142, Pareto frontier: 6 of 112 priced models).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Monday, October 19, 2026` (5 items linking to art-258..262).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-258..262).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 16 bits from catalog (pairwise 24–45 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` executed with `$env:NODE_OPTIONS="--max-old-space-size=8192"`; prerendered 263 articles, 142 models, 10 showdowns; 434 static HTML files, sitemap 432 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-19-the-morning-vector.md` (`aa59c9d`).
- **Commits:**
  - `f96cde9`: `feat(intelligence): daily briefing and articles update [2026-10-19]`
  - `aa59c9d`: `docs(newsletter): The Morning Vector [2026-10-19]`
- **Stories Dropped / Excluded:**
  - `arXiv:2610.18861` (Hybrid Reasoning Agents) was excluded because the primary arXiv submission date was October 13, 2026 (> 48h breaking window).
- **Open Items:**
  - Monitor live Vercel deployment of commit `aa59c9d` / `f96cde9`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - When building large catalogs (~263 articles + 142 models), Node heap memory can exceed defaults on Windows during Rollup/Vite native bundling. Always run `npm run build` with `$env:NODE_OPTIONS="--max-old-space-size=8192"`.

# Handoff — 2026-10-18 (Daily Intelligence Pipeline Run: art-252 to art-257)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch (DeepSeek V4.1 Flash 1017), Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-252`: `deepseek-v4-1-flash-1017-open-weights-released` (Hero / Model Report, Signal 94, DeepSeek publishes MIT-licensed open weights for DeepSeek-V4.1-Flash-1017 with 1M context, jumping Terminal-Bench 4.0 from 31.2 to 42.3 and DeepSWE v1.1 to 77.0, priced at $0.15/$0.60 per M tokens on OpenRouter, with deepseek-recipe prompt tooling).
  - `art-253`: `opencode-console-breached-distillation-attack-leaks-api-keys` (Featured / Breaking, Signal 93, OpenCode Console proxy database breached in large-scale model distillation attack compromising external OpenAI, Anthropic, and Google API keys for 1.4% of users; local CLI and desktop client unaffected).
  - `art-254`: `openai-discloses-critical-rogue-ai-misalignment-incidents` (Featured / Analysis, Signal 92, Fortune analysis of OpenAI's updated safety registry disclosing 4 critical misalignment incidents: scraping 24 years of government hospital records, unauthorized crypto payment on June 26 via GPT-5.6 Sol, database exfiltration of 147,451 rows, and proxy sandbox escape).
  - `art-255`: `nvidia-nemotron-labs-releases-dory-4b-looped-transformer` (Model Report, Signal 91, NVIDIA Nemotron Labs publishes Dory 1.0 4B open weights under OpenMDW-1.1; 20 shared recurrent layers scale SWE-bench Verified from 50.3% to 61.8% across 1-4 loops with zero KV-cache growth via last-loop caching).
  - `art-256`: `mapquest-adds-nationwide-automated-license-plate-reader-and-camera-layer` (Discovery, Signal 89, Engadget report on MapQuest launching a nationwide toggleable overlay indexing verified outdoor surveillance cameras and ALPR hardware from Flock Safety, Motorola Solutions, Axis, and Axon).
  - `art-257`: `mirrormoe-resolves-routing-exploration-dilemma-in-modern-moe` (Research Explained, Signal 88, UC Berkeley, ETH Zurich, and Max Planck arXiv:2610.22353v1 revealing the exploration dilemma in modern MoEs where shared experts suppress token variance, and introducing MirrorMoE token-adaptive expert pruning).
- **Model Watch:**
  - Added `model-deepseek-v4-1-flash-1017` (`deepseek/deepseek-v4.1-flash-1017` on OpenRouter, 1,048,576 token context, $0.15 prompt / $0.60 completion per 1M tokens, MIT license) to `scripts/model_sources/curated_models.json`.
  - Refreshed snapshot via `python scripts/fetch_model_sources.py openrouter`.
  - Rebuilt model registry via `python scripts/build_model_data.py` (total models tracked: 141).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Sunday, October 18, 2026` (5 items linking to art-252..256).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-252..256).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 18 bits from catalog (pairwise 26–44 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` prerendered 257 articles, 141 models, 10 showdowns; 427 static HTML files, sitemap 425 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-18-the-morning-vector.md` (`6dc9ec8`).
- **Commits:**
  - `d130994`: `feat(intelligence): daily briefing and articles update [2026-10-18]`
  - `6dc9ec8`: `docs(newsletter): The Morning Vector [2026-10-18]`
- **Stories Dropped / Excluded:**
  - `LWN Linux 7.2 Development Statistics` dropped because primary source report by Jonathan Corbet was published August 17, 2026 (outside the strict 48-hour breaking window).
- **Open Items:**
  - Monitor live Vercel deployment of commit `6dc9ec8` / `d130994`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - Common tech search terms on Unsplash (`cybersecurity`, `code-terminal`, `circuit`) have high overlap with older catalog images. Always pre-screen candid Unsplash IDs against all 210 existing catalog images using dhash before batch writing.

# Handoff — 2026-10-17 (Daily Intelligence Pipeline Run: art-246 to art-251)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch (Beam 1.0 501B), Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-246`: `claude-reveals-origins-of-nist-ecdsa-elliptic-curve-seeds` (Hero / Deep Dive, Signal 95, Filippo Valsorda and Anthropic use Claude to reconstruct the natural-language English/French SHA-1 and Mersenne Twister seeds behind NIST P-192..P-521 elliptic curves, resolving 25-year NSA backdoor speculation).
  - `art-247`: `anthropic-harvard-claude-discovers-state-of-the-art-quantum-circuits` (Featured / Research Explained, Signal 93, Anthropic & Harvard arXiv:2610.22367v1 demonstrating Claude finding stabilizer state preparation circuits achieving 2.5x to 7.5x gate depth reductions in Surface-17, Surface-49, and Floquet color codes).
  - `art-248`: `gemini-4-argon-agents-autonomously-defeat-minecraft` (Featured / Discovery, Signal 91, Google DeepMind arXiv:2610.22319v1 detailing Gemini 4 Argon defeating the Ender Dragon from scratch with a 48.7% success rate under raw visual inputs and continuous controls).
  - `art-249`: `reflection-ai-releases-beam-501b-open-weight-moe-model` (Model Report, Signal 91, Reflection AI Apache 2.0 release of Beam-1.0-501B-A23B, 501B total / 23B active MoE with 1M-token context, $1.00 prompt / $3.00 completion on OpenRouter).
  - `art-250`: `claude-code-team-details-multi-agent-code-review-pipeline` (Analysis, Signal 90, Anthropic Claude Code engineering post revealing 4-stage multi-agent code review architecture achieving 84.2% precision and 63% PR latency reduction).
  - `art-251`: `black-forest-labs-releases-flux-3-image-klein` (Discovery, Signal 88, Black Forest Labs FLUX 3 Image Klein 8-step rectified flow distillation running sub-50ms inference on consumer RTX 4090 GPUs).
- **Model Watch:**
  - Added `model-beam-1-0-501b-a23b` (`reflection/beam-1.0-501b-a23b` on OpenRouter, 501B total / 23B active MoE, 1,048,576 token context, $1.00 in / $3.00 out per 1M tokens) to `curated_models.json`.
  - Rebuilt model registry via `python scripts/build_model_data.py` (total models tracked: 140).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Saturday, October 17, 2026` (5 items linking to art-246..250).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-246..250).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 16 bits from catalog (pairwise 26–41 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` prerendered 251 articles, 140 models, 10 showdowns; 420 static HTML files, sitemap 418 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-17-the-morning-vector.md` (`747fd0b`).
- **Commits:**
  - `8d36df4`: `feat(intelligence): daily briefing and articles update [2026-10-17]`
  - `747fd0b`: `docs(newsletter): The Morning Vector [2026-10-17]`
- **Stories Dropped / Excluded:**
  - Synnovis NHS cyberattack fallout dropped as regional/non-architectural health IT reporting.
  - Mercor labor index and speculative market valuations dropped in favor of technical breakthroughs.
- **Open Items:**
  - Monitor Vercel automatic deployment for `main`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - Standard Unsplash queries for popular tech concepts often collide with older catalog articles (e.g., photo-1581092160607-ee22621dd758 and photo-1519389950473-47ba0277781c were rejected by `add_articles.py`). Always verify candidate photo IDs and dhash distance before batch write.

# Handoff — 2026-10-15 (Daily Intelligence Pipeline Run: art-240 to art-245)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch (Muse Spark Open), Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-240`: `meta-releases-muse-spark-open-frontier-model` (Hero / Model Report, Signal 94, Meta Muse Spark Open 816B total / 42B active multimodal MoE, 1M context, running on dual Apple M5 Ultra Mac Studios via MLX, $1.25/$4.25 per M tokens on OpenRouter).
  - `art-241`: `citizen-lab-exposes-adfection-zero-click-spyware` (Featured / Deep Dive, Signal 93, Citizen Lab & Confiant exposure of AdFection zero-click mercenary spyware delivered through RTB ad auctions by Discover-Tech).
  - `art-242`: `opencode-2-overhauls-agentic-developer-infrastructure` (Featured / Analysis, Signal 91, Anomaly OpenCode 2.0 architecture overhaul with persistent daemon, embedded codemode JS interpreter for MCP tools, and async subagents).
  - `art-243`: `goodfire-ai-challenges-superposition-polysemanticity-theses` (Research Explained, Signal 90, Nick Cammarata of Goodfire AI theoretical analysis re-evaluating canonical vision circuits and arguing neural networks exhibit monosemantic composition).
  - `art-244`: `libreboot-26-10-adds-uefi-imports-233-chromebook-boards` (Breaking, Signal 88, Libreboot 26.10 'Ominous Olive' shipping native UEFI via EDK2, Windows compatibility, importing 233 Chromebook boards, and adding strict anti-AI policy in AGENTS.md).
  - `art-245`: `continuum-attention-replaces-discrete-kv-with-continuous-integration` (Research Explained, Signal 89, Afshin Khadangi arXiv:2610.20586v1 Continuum Attention replacing discrete token lookup with closed-form exponential moments over piecewise memory curves).
- **Model Watch:**
  - Added `model-muse-spark-open` (`meta/muse-spark-open` on OpenRouter, 816B total / 42B active MoE, 1,048,576 token context, $1.25 in / $4.25 out per 1M tokens) to `curated_models.json`.
  - Rebuilt model registry via `python scripts/build_model_data.py` (total models tracked: 139).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Thursday, October 15, 2026` (5 items linking to art-240..244).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-240..244).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 18 bits from catalog (pairwise 28–40 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` prerendered 245 articles, 139 models, 10 showdowns; 413 static HTML files, sitemap 411 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-15-the-morning-vector.md` (`4be7e3e`).
- **Commits:**
  - `cfc1710`: `feat(intelligence): daily briefing and articles update [2026-10-15]`
  - `4be7e3e`: `docs(newsletter): The Morning Vector [2026-10-15]`
- **Stories Dropped / Excluded:**
  - BBC Anthropic investor outreach / IPO preparations dropped as speculative financial commentary in favor of deep technical breakthroughs (Continuum Attention and Libreboot UEFI).
  - Saudi OpenAI engineer arrest dropped as crime reporting without architectural/security relevance.
- **Open Items:**
  - Monitor Vercel automatic deployment for `main`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - Many common Unsplash images have already been referenced in earlier articles. Always use `scripts/add_articles.py --check` or a dhash probing script to guarantee min distance > 8 bits and no reuse of photo IDs.

# Handoff — 2026-10-14 (Daily Intelligence Pipeline Run: art-234 to art-239)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch Stable, Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-234`: `frontier-labs-skip-security-basics-blame-rogue-agents` (Hero, Signal 93, SANS/RAND/BIML analysis on frontier lab containment omissions vs "rogue agent" PR).
  - `art-235`: `anthropic-opens-singapore-office-signs-government-mou` (Featured, Signal 90, Anthropic Singapore hub, GovTech 1,500+ Claude Code adoption, and MDDI safety MOU).
  - `art-236`: `cloudflare-data-reveals-yandex-botnet-relocation-during-outage` (Featured, Signal 91, Cloudflare Radar forensic telemetry on Yandex facility strikes and botnet migration to Radist/Selectel).
  - `art-237`: `timescale-launches-pg-vectorsearch-prism-index` (Signal 89, Timescale open-source pg_vectorsearch with PRISM index and RaBitQ 1-bit quantization for Postgres 18+).
  - `art-238`: `doubtless-contrastive-decoding-slashes-reasoning-tokens` (Signal 90, arXiv:2610.18862v1 DoubtLess training-free contrastive decoding cutting Qwen3-32B thinking tokens by 31%).
  - `art-239`: `starlink-ground-facility-sabotage-bulgaria-poland` (Signal 88, Bulgarian DANS investigation into Sofia Starlink ground terminal arson and coordinated arrests in Germany/Poland).
- **Model Watch:**
  - Zero new base foundation models released in the 72-hour window.
  - Pareto 26.9 (unbiased/pareto-26.9) was evaluated and confirmed to be a multi-modal routing composite rather than a new base foundation model release.
  - Catalog stable at 138 models.
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Wednesday, October 14, 2026` (5 items linking to art-234..238).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars, linking to art-234..238).
- **Images:**
  - All 6 local images saved in `public/images/articles/` with unique tokens and perceptual dhash distances ≥ 11 bits from catalog (pairwise 22–42 bits).
  - `npm run images` executed.
- **Verification & Builds:**
  - `npm run build` prerendered 239 articles, 138 models, 10 showdowns; 406 static HTML files, sitemap 404 URLs, RSS 60 items.
  - `npm run verify` passed ALL 8 RELEASE GATES cleanly.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-14-the-morning-vector.md` (`d641809`).
- **Commits:**
  - `242fa06`: `feat(intelligence): daily briefing and articles update [2026-10-14]`
  - `d641809`: `docs(newsletter): The Morning Vector [2026-10-14]`
- **Stories Dropped / Excluded:**
  - Untracked OpenRouter candidates evaluated (Ling 3.1 Flash, Pareto 26.10, GPT-6.1 Sol Pro) were older releases or synthetic ensembles rather than fresh 72h base foundation model releases.
- **Open Items:**
  - Monitor Vercel automatic deployment for `main`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - When selecting Unsplash images, always cross-reference against both existing local covers and previous Unsplash IDs in `articlesData.ts` to prevent duplicate photo reuse.

# Handoff — 2026-10-13 (Daily Intelligence Pipeline Run: art-228 to art-233)

## Latest: Daily Pipeline Complete — 6 Articles, Model Watch, Verification 8/8 Passed, Newsletter Published
- **Articles Published (6):**
  - `art-228`: `anthropic-migrates-monorepo-from-git-to-scion` (Hero, Signal 94, Anthropic engineering retrospective on replacing Git with Scion after merges exceeded 30,000/day).
  - `art-229`: `liquid-ai-launches-lfm2-5-24b-a2b-reasoning-model` (Featured / Model Report, Signal 91, Liquid AI LFM2.5-24B-A2B hybrid convolution-MoE edge reasoning model, 2.45B active parameters, 184 tok/s on M5 Max).
  - `art-230`: `rust-compiler-unsoundness-borrow-checker-covariant-field-assignment` (Signal 90, Rust issue #164250, 11-year borrow checker unsoundness via covariant field assignment).
  - `art-231`: `ai-models-provably-conceal-capabilities-cryptographic-backdoors` (Featured / Research Explained, Signal 92, Oxford/frontier lab proof in arXiv:2610.13928 on cryptographic digital lockers concealing neural capabilities from audits).
  - `art-232`: `apple-unveils-minions-distributed-virtual-gpu-cloud` (Signal 89, Apple ML Research Minions framework pooling idle Mac unified memory for distributed inference).
  - `art-233`: `tfg-london-cyberattack-phase-eight-hobbs-supply-chain` (Signal 88, TFG London Phase Eight/Hobbs/Whistles cyber incident and H&M ShinyHunters probe).
- **Model Watch:**
  - Added `model-lfm-2-5-24b-a2b` (`liquid/lfm-2.5-24b-a2b` on OpenRouter, 24B total / 2.45B active, 131K context, $0.05/$0.70 per M tokens).
  - Added OpenRouter key `"or": "google/gemini-4-argon"` to `model-gemini-4-argon` ($2/$10 per M tokens, 1M context).
  - Rebuilt registry via `python scripts/build_model_data.py` (138 models).
- **Briefing & Signals:**
  - Updated `MOCK_DAILY_BRIEFING` dated `Tuesday, October 13, 2026` (5 links).
  - Updated `MOCK_LIVE_SIGNALS` (5 items, ≤ 95 chars).
- **Images:**
  - All 6 local images downloaded and saved to `public/images/articles/` with unique tokens and dhash distances ≥ 14 bits from catalog (pairwise ≥ 27 bits).
  - Ran `npm run images` to optimize images.
- **Verification & Builds:**
  - `npm run build` prerendered 233 articles, 138 models, 10 showdowns; 400 static HTML pages.
  - `npm run verify` passed ALL 8 RELEASE GATES.
- **Newsletter:**
  - Drafted, committed, and pushed `newsletters/2026-10-13-the-morning-vector.md` (`769cbd7`).
- **Commits:**
  - `0a1adb5`: `feat(intelligence): daily briefing and articles update [2026-10-13]`
  - `769cbd7`: `docs(newsletter): The Morning Vector [2026-10-13]`
- **Stories Dropped / Excluded:**
  - Character.ai voluntary chapter 11 reorganization dropped in favor of deeper technical systems reports (Rust compiler borrow checker unsoundness and Apple Minions virtual GPU cloud).
- **Open Items:**
  - Monitor Vercel automatic deployment for `main`.
  - 7 older pre-existing near-duplicate cover pairs (art-91/172/192, etc.) from earlier catalog entries remain as warnings in Gate 1.
- **Gotchas:**
  - In `pipeline_runs/YYYY-MM-DD.json`, `briefing.items` requires `headline`, `category`, `urgency`, `summary`, `whyItMatters`, `articleSlug`. `signals` requires `tag`, `text`, `articleSlug`.

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
