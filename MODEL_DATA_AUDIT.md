# Model, Benchmark & Comparison Data Audit — 2026-10-11

Scope: `src/data/modelsData.ts` (146 models + Arena board), `src/data/benchmarksData.ts` (5 boards), `src/data/mockData.ts` (benchmark text), `src/pages/ComparePage.tsx`, `src/components/models/ModelDecisionGuide.tsx`, `ModelComparisonModal.tsx`, `ModelCard.tsx`, `ModelsDirectoryPage.tsx`, `BenchmarkChart.tsx`.
Method: data dumped to JSON and checked by script; Anthropic facts checked against the bundled Claude API reference (cached 2026-10-06); older public models checked against published figures known up to mid-2026.

## Verdict

Most model and benchmark numbers are **made by a formula, not measured**. The site labels them "verified". This is the main problem. The text in the compare pages and decision guide also contradicts the data in many places.

## 1. Critical — the data is synthetic

Source: `scripts/generateModelsData.cjs`.

| Field | How it is made | Line |
|---|---|---|
| Arena Elo | `1420 - round(index / (n-1) * 242)`: a straight line from 1420 down to 1178 by list position | 234 |
| Price | Proprietary: `8.00 - rank*0.05` input, ×4 output. Open: `0.80 - rank*0.005`, ×3 | 213–221 |
| Release date | By rank: top 15 = "September 2026", … rank > 110 = "Early 2026" | 223–229 |
| 2nd benchmark | `98 - index*0.25` %, label "+X% vs baseline" | 255–256 |
| Parameters | Regex on the name (any "mini"/"Lite" = "8B - 14B Dense") | 200–210 |
| Text | Same 3 key improvements, 2 limitations, architecture note for each model | 274–286 |

Results in the live data:
- 134 of 146 models have template text and link to `https://arena.ai/` instead of the lab page.
- OSWorld, WebArena, SWE-bench and Cyber-Eval boards follow the Arena order for 97–98% of all model pairs (inversions: 1.5%–3.4%). Real benchmarks never line up like this.
- Price-Performance index: 416 logic breaks. Example: GLM-5.3-Flash has higher Elo (1393 vs 1338) and lower price ($0.12 vs $0.20 blended) than Claude Haiku 5.5, but scores lower (96.8 vs 99.2). Claude Opus 5 (blended $30) outscores GPT-6 Astra (blended $8.75).
- Every row on every board has `verifiedByNextVector: true`. `ModelComparisonModal.tsx:273` says "All scores verified independently by NextVector Evaluation Labs." No such lab runs exist. `DAILY_UPDATE_PIPELINE.md:29` itself says "synthetic formulas strictly prohibited".

## 2. Wrong facts (checked against sources)

### Anthropic (source: Claude API reference, cached 2026-10-06)

| Model | Site says | Correct |
|---|---|---|
| Claude Fable 5.1 | $5 / $20, cache $1 | $10 / $50, cache $0.25 |
| Claude Fable 5 | $5 / $20 | $10 / $50 (cache $1) |
| Claude Mythos 5.1 | $8 / $32, "Research Weights" | $10 / $50, API model (Project Glasswing only) |
| Claude Opus 5 | $15 / $75 | $5 / $25 |
| Claude Opus 4.8 / 4.7 / 4.6 | $15 / $75, 200k | $5 / $25, 1M context |
| Claude Opus 4.5 | $15 / $75 | $5 / $25 |
| Claude Sonnet 5 | $3 / $15, 200k | $2 / $10, 1M |
| Claude Sonnet 4.6 | 200k | 1M ($3 / $15 is correct) |
| Claude Haiku 5.5 | 200k context | 1M ($0.10 / $0.50 up to 100K prompt; $0.50 / $2.50 above) |
| Claude Sonnet 5.5 | missing | $2 / $10, 1M — current Sonnet |
| Claude Haiku 4.5 | missing (but Haiku 5.5 text compares to it) | $1 / $5, 200K |

Claims that break as a result:
- "Opus 5.5 is 40% cheaper than Opus 5" (`modelsData` Opus 5.5 entry, `ComparePage.tsx:68`, `ModelDecisionGuide.tsx:137`): real cut is 20% ($5 → $4). With the site's own $15 it would be 73%. 40% is wrong either way.
- Haiku 5.5 "80% cost reduction": Haiku 4.5 was $1 / $5, so it is 90%.
- Haiku 5.5 SWE-bench 58.2% "+11.4% gain": Haiku 4.5 scored 73.3%, so 58.2% would be a drop.
- Decision guide says Claude Pro gives "Opus 5, Sonnet 5, Haiku 4.5" (`ModelDecisionGuide.tsx:324`, `:1019`): current models are Opus 5.5, Sonnet 5.5, Haiku 5.5.

### Older public models (published figures)

| Model | Site says | Published |
|---|---|---|
| Claude Opus 4 | released "Early 2026", SWE-bench 30.2% | May 2025, 72.5% |
| Claude Opus 4.1 | "Early 2026", 35.1% | Aug 2025, 74.5% |
| Claude Sonnet 4.5 | "June 2026", 41.0% | Sep 2025, 77.2% |
| Claude Opus 4.5 | "July 2026", 52.6% | Nov 2025, 80.9% |
| Gemini 2.5 Pro | "Compact / Edge", "8B–14B Dense", 2M ctx, $1.25 / $5, SWE 31% | flagship, 1M ctx, $1.25 / $10, SWE 63.8% |
| o3 | $15 / $60, SWE 36.5% | $2 / $8 (since Jun 2025), 69.1% |
| GPT-5 | $0.60 / $2.40, "June 2026" | $1.25 / $10, Aug 2025 |
| GPT-5 mini | $0.15 / $0.60 | $0.25 / $2 |
| MiniMax M2, GLM-4.5 | "Proprietary API" | open weights (MIT) |
| DeepSeek-V3.2 | Apache 2.0, 200k | MIT, 128K |
| Gemini 3 Pro / 3.1 Pro | "Compact / Edge", "8B–14B Dense" | flagship Pro models |
| Nemotron 3 Ultra | type "Open Weights", status "Proprietary API" | contradiction; NVIDIA ships open weights |

The Arena scale is also off. On the real LMArena, Gemini 2.5 Pro and Claude Opus 4.x sat near the top with scores well above 1400 in 2025. Here they are near the bottom (1187–1214).

Models released after June 2026 (GPT-6 Astra, Gemini 3.8, Grok 4.7, DeepSeek-V4, etc.) could not be checked from memory. They need live sources.

## 3. The site contradicts itself

### Model page vs leaderboard (SWE-bench, 15 models)

| Model | Model page | SWE-bench board |
|---|---|---|
| GPT-6 Astra | 98% | 75.8% (#4) |
| Muse Spark 1.3 | 97% | 71.5% |
| Muse Spark 1.1 | 94% | 67.1% |
| Sakana Namazu | 87.5% | 57.5% |
| Kimi K2.7 Code | 84% | 60.1% |
| GPT-5.3 Codex | 80.5% | 52.5% |
| … 8 more | | |

Claude Haiku 5.5 shows a SWE-bench score but is missing from the SWE-bench board.

### Rank text
- 140 of 141 "Rank #N" texts inside model benchmarks are wrong. Example: Claude Fable 5.1 says "Global Rank #2"; its real rank in the data is #3. The same wrong rank appears in `keyImprovements` ("Official LMSYS Chatbot Arena Global Rank #N").

### Board coverage
- Registry has 146 models. Boards have 140–144. Six models are missing from OSWorld, WebArena, SWE-bench and Cyber-Eval (Haiku 5.5, Qwen-Image-2.1, Jev, Gemini 3.8 Live, Gemini 3.8 Live Extended Thinking, Kolibri-1). Board descriptions still say "evaluating 146 models".
- "Claude Sonnet 5.1 (Swarm Mode)" is #2 on SWE-bench (89.4%) but is not in the registry.
- Board ties get different ranks (4 cases, e.g. OSWorld #19/#20 both 53.6).

### costPerRun
- Pipeline doc says `0.75 × input + 0.25 × output`. The data uses the input price only.
- Claude Mythos 5.1 has four different values: $1.05, $0.99, $2.46, $24.00 / 1M tok. Its input price is $8.
- Price board mixes two formats ("$0.50" and "$0.75 / 1M tok").

### Compare page (`src/pages/ComparePage.tsx`)
| Line | Text says | Data says |
|---|---|---|
| 68, 84, 138, 250 | GPT-6 Astra "98% SWE-bench", coding leader | SWE board 75.8%, rank #4; Gemini 3 Deep Think is #1 |
| 84 | "highest empirical coding Elo (1420)" | 1420 is the general Arena score, not coding |
| 96, 259 | GPT-6 Astra $5 / $25 | $5 / $20 |
| 68 | Opus 5.5 "40% cheaper" than Astra at $4 | input is 20% cheaper; output is the same |
| 120, 143, 185 | GPT-6 Astra 256K context | 1M |
| 236, 273, 287 | Grok 4.7 500k | 512k |
| 314 | DeepSeek-V4.1-Flash "lowest pricing floor in the industry" ($0.14) | 4 models cost $0.05–$0.08 |
| 347, 352 | DeepSeek-V4-Pro $0.75 | $0.55 |
| 361 | DeepSeek-V4-Pro 128k | 200k |
| 384, 399 | Sonnet 5 $1.50, "62% cheaper than Opus 5.5" | data $3; real $2 (50% cheaper) |
| 421, 434 | Qwen3.8 Max is "open-weights", "peak open-weights Elo #16" | registry: Proprietary API; DeepSeek-V4-Pro (#15) is higher |
| 421, 444 | Qwen3.8 Max "higher coding" than Mistral Large 3 | SWE board: Mistral 84.1% vs Qwen 71.6% |
| 546 | "All 10 Showdowns" | 9 showdowns |
| 528 | "Unbiased empirical comparisons" | based on synthetic data |

### Decision guide (`src/components/models/ModelDecisionGuide.tsx`)
- Wrong ranks: DeepSeek-V4.1-Flash #10 (data #20), DeepSeek-V4-Pro #10 (#15), Fable 5.1 #2 (#3), Gemini 3.8 Flash #15 (#21), GPT-5.6 Sol #4 (#6), Terra #12 (#17), Luna #29 (#36).
- Claude Fable 5.1 price: $5.00 (lines 153, 178, 180) and $7.90 (lines 958, 1282, 1488) on the same page. Real: $10 / $50.
- "90.4% cheaper" (line 145) and "$75 instead of $780" (line 235) assume a $7.80 model that does not exist. Against Opus 5.5 ($4) it is 81%.
- Line 252: "Gemini 3.8 Flash ($0.75/1M)". Data: $0.10.
- Token math disagrees: $20 of DeepSeek-V4.1-Flash = 81.6M blended tokens (line 493, correct), but line 1019 says 26.6M and line 1029 says 266M for $200.
- Line 548: "10 deep proofs on Claude Opus 5 for $0.30" ($0.03 each) is not realistic for long proof output.
- Line 775: the DeepSeek credit plan lists "Anthropic $0.25/1M prompt caching" as a benefit.
- Line 191: "only frontier model with 2M context under $1" — 14 models in the data have 2M context.

### Comparison modal (`src/components/models/ModelComparisonModal.tsx`)
- Benchmark rows match on the first 5 letters (line 209). "AIME 2024" row shows "AIME 2026" scores.
- "GPQA Diamond" row is always empty (no model has it).
- Rows show each model's own number (e.g. Astra 98%), not the board number (75.8%).

### Directory and cards
- License filter (`ModelsDirectoryPage.tsx:76`): `includes('Open')` puts "Research Weights" under Proprietary.
- "Price" sort uses input price only. Muse Spark 1.3 ($2 / $2) sorts above models that cost less in total.
- `ModelCard.tsx:125` labels benchmarks by first word: "LMSYS:", "Chatbot:", "Price-to-Performance:".

## 4. Over-claims (trust)
- "zero hallucination", "zero-hallucination code verification", "99.9% needle recall", "Lean 4 Prover" modality, "machine-certified" — no source.
- Benchmark text in `mockData.ts` calls the price index "Artificial Analysis Intelligence per Dollar". It is not from Artificial Analysis.
- "LMSYS Chatbot Arena": the project renamed itself LMArena in 2025.

## What is fine
- No duplicate model names or IDs. Board ranks run 1…N without gaps. Arena rank and Elo on each model match the Arena board. No price has output < input or cache > input.
- `formatBenchmarkScore` handles the odd scores ("28/42 (Gold Medal)", "2048x2048") correctly.
- Opus 5.5 ($4 / $20, $0.20 cache, 1M) and Haiku 5.5 price ($0.10 / $0.50) are correct.
- Arithmetic that is right: $0.14 vs $5 = 97.2% cheaper; $20 / $0.245 blended = 81.6M tokens; RTX 4090 $0.27 × 730 h ≈ $197.
