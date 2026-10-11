# Article & Timeline Model-Claims Audit — 2026-10-11

Scope: `src/data/articlesData.ts` (211 articles) and the timeline, daily briefing and live signals in `src/data/mockData.ts`.
Source of truth: `scripts/model_sources/build/site_data.json` (data as of 2026-10-11). Extra checks: the official lab pages for Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable/Mythos 5.1, Gemini 4 Argon, Grok 4.7 (xAI docs), Muse Spark, Mistral 3 and DeepSeek-V4.1-Flash, read on 2026-10-11. The OpenAI GPT-6 Astra page returned 403.

Method: script scan for Arena/Elo, SWE-bench, OSWorld, WebArena, Cyber-Eval, MMLU-Pro, MATH-500, HumanEval, prices, context sizes, "% cheaper" and Lean 4; each hit checked against `site_data.json` and the old fake registry (`git show 1845086^:src/data/modelsData.ts`, `benchmarksData.ts`).

Rule used:
- (a) Contradicts `site_data.json` or is a fake-registry figure → replaced with the sourced value or removed.
- (b) Not in our sources → kept only with a vendor citation, and marked "X-reported"; otherwise removed.
- (c) Unrelated real content (Lean 4 research papers, o1, Llama 3.1, Claude 3.5 Sonnet caching, GPU scaling 94.6%, etc.) → left alone.

## Findings and fixes (all in `src/data/articlesData.ts` unless noted)

| Article | Old text | New text | Class |
|---|---|---|---|
| art-1 GPT-6 Astra | OSWorld 68.4%, WebArena 74.2%, "42.1% for prior models", "outperforming … by over 20 points" (triad, takeaway, body, 2 specs) | Removed. Body says Astra is not on OSWorld-Verified; takeaway/spec give arena.ai 1475 (#35 of 414) | a (fake registry) |
| art-1 | Context "500,000 tokens" | "1.05M tokens (OpenRouter listing)" | a |
| art-7 Muse Spark | SWE-bench 67.8%, HumanEval-Agentic 71.0% | Marked "Meta-reported, not independently verified" | b |
| art-60 Fable/Mythos 5.1 | "Elo of 1418 (Rank #2)", "1418 Chatbot Arena Elo (#2)", "1425 Internal (Mythos)" | arena.ai 1501 (#6 of 414); Mythos "not listed" | a |
| art-60 | Mythos "94.6% on Cyber-Eval" (triad, body) | Removed (Cyber-Eval is not a real benchmark) | a |
| art-60 | Fable 5.1 "91.4% on SWE-bench Verified" | Anthropic-reported Terminal-Bench 4.0: 55.8% (Fable) / 60.9% (Mythos) | a |
| art-60 | Price "$7.90 / $31.60" | "$10.00 / $50.00" | a |
| art-60 | Cache "undercuts Astra by 84%", "84% reduction vs competitors" | "75% below GPT-6 Astra ($1.00/M)"; cut 75% vs previous rate | a |
| art-60 | Citation URL `anthropic.com/news/claude-fable-5-1-announcement` | `anthropic.com/claude-fable-and-mythos-5-1` | — |
| art-78 Mistral Large 3 | 89.2% MMLU-Pro, 84.1% SWE-bench, 91.4% GSM8k (subtitle, triad, takeaway, body, spec) | Removed; Mistral's post gives none; notes LMArena #2 open non-reasoning debut; spec → arena.ai 1414 (#143) | a (fake registry) |
| art-78 | Context "128,000 Tokens" | "256K Tokens (OpenRouter listing)" | a |
| art-78 | relatedBenchmarkId `bench-swe-bench`; citation `mistral.ai/news/mistral-large-3/` | `bench-chatbot-arena`; `mistral.ai/news/mistral-3` | — |
| art-79 DeepSeek-V4.1-Flash | Price $0.14 / $0.56, cache $0.02 (title, triad, takeaway, body, spec) | $0.30 / $1.20 (OpenRouter list price) | a |
| art-79 | "1396 Arena Elo", "top 10", "surpassing Gemini 3.8 Flash" | arena.ai 1475 (#39 of 414), below Gemini 3.8 Flash (1497) | a |
| art-79 | HumanEval 82.4%, MMLU-Pro 78.6% | Removed (DeepSeek's tables are images on its page) | a (fake registry) |
| art-79 | "new industry price floor", "50 times lower than GPT-6 Astra" | "pricing it for … agent swarms", "roughly 33 to 42 times less than GPT-6 Astra ($10 / $50)" | a |
| art-79 | Context "256,000 Tokens"; license "Apache 2.0" | "1M Tokens (OpenRouter listing)"; "MIT" | a |
| art-79 | LMSYS "Canary Benchmark Verification" citation | arena.ai text leaderboard | — |
| art-90 Gemini 3.8 Live | Arena "Rank #4 (Elo 1412)" / "Rank #7 (Elo 1404)", "outranking Claude 3.7 Sonnet (1408) and o3-mini (1395)" (triad, takeaway, body, spec) | Removed; neither variant is on arena.ai; spec line deleted; citation → arena.ai | a (fake registry) |
| art-90 | Artificial Analysis speech score 82.6 | Kept (cited to Artificial Analysis) | b |
| art-110 Grok 4.7 | SWE-bench 62.4%, MATH-500 96.8%, OSWorld 58.2% (subtitle, triad, takeaway, body, spec) | Removed; xAI docs list none; spec → arena.ai 1443 (#90 of 414) | a (fake registry) |
| art-110 | Context "512,000" (body, spec) | 500,000 (xAI docs) | a |
| art-110 | Price $3 / $12, cache $0.75 | $2 / $6 under 200K-token prompts ($4 / $12 above), cache $0.50 | a |
| art-110 | LMSYS citation | xAI docs + arena.ai | — |
| art-115 Claude Opus 5.5 | Title/subtitle/triad/takeaway/body: "40% inference price reduction" | "20% lower token prices" ($5/$25 → $4/$20, cache $0.50 → $0.20); "Anthropic says it costs 40% less to run" (that is Anthropic's per-task claim) | a |
| art-115 | "native Lean 4 prover", "internal Lean 4 kernel", "Lean 4 compilation sandboxes", spec "Native Lean 4 & Coq proof engine", "Integrated Formal Reasoning Head" | Removed. Anthropic's page does not mention Lean 4. Body now cites Anthropic's 30%+ faster output and adaptive thinking. C-HD paragraph reworded: researchers used Opus 5.5-led agents with the external Lean 4 prover | a (fake registry feature) |
| art-115 | "1417 Elo … Rank 4", "Fable 5.1 (1418)", "Opus 5 (1416)" | arena.ai 1507 (#2 of 414), Fable 5.1 1501, Opus 5 1490 | a |
| art-115 | SWE-bench 73.4% | Removed; Anthropic-reported Terminal-Bench 4.0 66.4% (Astra 57.9%), FrontierCode 54.4%, HLE w/ tools 67.7% | a |
| art-115 | Tags "Lean 4", "Formal Verification"; relatedBenchmarkId `bench-swe-bench`; citations (news URL, Lean community blog) | "Agentic Coding", "Terminal-Bench"; `bench-chatbot-arena`; `anthropic.com/claude-opus-5-5` + arena.ai | — |
| art-146 Claude Sonnet 5.5 | Price $3 / $15 (triad, takeaway, body, spec) | $2 / $10 (same as Sonnet 5) | a |
| art-146 | Terminal-Bench 4.0 "68.4%" | 70.6% (Anthropic-reported) | b → corrected from source |
| art-146 | Context "200,000 Tokens (with 1M beta)" | 1M Tokens | a |
| art-155 Gemini 4 Argon | Price "$4 / $20 upon rollout" | $2 / $10 introductory, then $4 / $20 (Google blog) | a |
| art-155 | "4-million token context window" (triad, body, spec) | Removed; spec "1M Tokens (arena.ai model listing; not stated by Google)" | a |
| art-186 Reflection Beam | "1386 on LMSYS Chatbot Arena" | Removed; Beam is not on arena.ai. SWE-bench 54.8% / MATH-500 88.2% kept, attributed to Reflection AI | a / b |
| art-197 Claude Haiku 5.5 | SWE-bench 58.2% (triad, takeaway, body, spec) | Removed; Anthropic-reported Terminal-Bench 4.0 39.2%, OSWorld 2.1 offline 72.4% | a (fake registry) |
| art-197 | "LMSYS Arena Elo 1338 (Rank #54)" | Removed (not on arena.ai) | a (fake registry) |
| art-197 | Context "200,000 tokens" (subtitle, triad, body, spec) | 1M tokens | a |
| art-197 | Cache $0.025, "80% price reduction" | Cache $0.01 (prompts ≤100K); "90% below Haiku 4.5"; "about 75% less to run" (Anthropic) | a |
| art-197 | "sub-200ms / under 180 ms TTFT" (fake-registry text) | "Anthropic's fastest model to date" | a |
| `mockData.ts` time-2026-09-29-sonnet-5-5 | "record 68.4% on Terminal-Bench 4.0" | "70.6% on Terminal-Bench 4.0 (Anthropic-reported)" | b → corrected |
| `mockData.ts` time-2026-09-13-mistral3 | "scoring 89.2% on MMLU-Pro" | Removed | a |

Already correct before this pass (no change): timeline Opus 5.5 ($4/$20, 20% lower), timeline DeepSeek-V4.1-Flash (Arena 1475), Haiku 5.5 timeline ($0.10), daily briefing, live signals.

## Result
- 0 matches left for: Cyber-Eval, 73.4%, 62.4%, 68.4%, 74.2%, $0.14, 1396, 1417, 1418, 1420, 1412, 1404, 1338, 1386, $7.90, 91.4%, 82.4%, 78.6%, 84.1%.
- Remaining "94.6%", "96.8%", "89.2%", "58.2%" hits are unrelated (GPU scaling, RAM savings, search market share, DLM MMLU-Pro).
- Remaining "Lean 4" hits are research coverage (Navier–Stokes, C-HD, openai/math, Gemini 3 Deep Think, Terence Tao). Left alone.

## Follow-ups (not fixed here; outside this audit's scope)
0. **HIGH — site-level files still carry the fake registry.** Found during the build spot check:
   - `index.html` lines 131, 139, 186–190 (FAQ schema + no-JS model list, shipped in every prerendered page): "GPT-6 Astra #1 … 1420 Elo", "SWE-bench 98%", Fable 1418, Opus 5.5 "1417 … native Lean 4", Grok 1414 / $3.00, DeepSeek 1396 / $0.14.
   - `public/ai-summary.json` lines 38–39: "GPT-6 Astra (1420 Elo)", "Opus 5.5 (1417 Elo, … Lean 4 Verified)".
   - `public/llms.txt` lines 12, 20, 25–35: same Elo/price/OSWorld 68.4% figures, WebArena board, and two model links to wrong IDs (`model-claude-opus-5` for Opus 5.5, `model-deepseek-v4-pro-0813` for V4.1-Flash).
   - `newsletters/*.md|html` (2026-09-09, -13, -22, -23, …): already-sent issues repeat 94.6% Cyber-Eval, 1396/$0.14, 62.4%, 73.4%, 1417. Sent email archives; decide whether to annotate or leave as history.
1. art-78: the whole "Mixture-of-Depths, 670B / 38B active, 96 layers" premise conflicts with Mistral's own post (675B total / 41B active MoE, released 2 Dec 2025). The article is dated 2026-09-13. Needs an editorial decision (rewrite or unpublish). Timeline `time-2026-09-13-mistral3` repeats it.
2. art-79: architecture numbers (280B / 16.5B active, "KV cache cut by 40%", 160 tok/s) conflict with DeepSeek's page (552B; 8B active for input / 16B for output; KV cache needs 1/4 the HBM). Title and timeline still say "40%".
3. art-197: invented API details ("anthropic-effort: 0.0–1.0" header, model ID `claude-haiku-5-5-20261007`).
4. art-1: GPT-6 Astra launch claims could not be checked (openai.com returned 403). Context and benchmark numbers were fixed; other details (500K visual buffer latency "120ms") are unsourced.
5. art-115: cover image alt text still describes "formal Lean 4 verification proofs" (it describes the image, so it was left).
6. art-60: "perfect needle-in-a-haystack retrieval accuracy" is an unsourced over-claim.
