# NextVector Daily Intelligence Update Pipeline
**Standard Operating Procedure for Daily Autonomous Content & Newsletter Ingestion**

*Target Audience: AI Agents (Antigravity) & Editorial Operations*  
*Publication: NextVector (nextvector.rhasan.online) & The Morning Vector (nextvectorr.substack.com)*  
*Editor-in-Chief: Robiul Hasan*

---

## 0. Executive Overview & Trigger Command

Every day, the user will trigger the daily update by prompting the AI agent with:
> *"Run the daily update pipeline."* or *"Execute today's intelligence update."*

When receiving this trigger, the agent **MUST** execute the complete 7-stage workflow outlined below without skipping steps.

### Core Objectives for Each Run:
1. **At least 5 new intelligence reports** published to `src/data/articlesData.ts` covering verifiable developments from the **last 48 hours**.
2. **AI Model & Benchmark Check**: If any new frontier or open-weights model was released or updated, create a dedicated report, register the model in `src/data/modelsData.ts`, and update the benchmarks in `src/data/benchmarksData.ts`.
3. **100% Factuality & Zero Hallucination**: No fabricated specs, parameters, or DOIs.
4. **100% Unique, Non-Generic Images**: 0 duplicate images across the entire publication. Tier-1 public domain, Tier-2 bespoke technical diagrams, or Tier-3 verified URLs.
5. **Update Daily Briefing**: Refresh `MOCK_DAILY_BRIEFING` in `src/data/mockData.ts` for today's date.
6. **Pass Production Build**: `npm run build` must succeed with 0 errors, committed and pushed to `main`.
7. **Generate Substack Newsletter**: Draft the full edition of **The Morning Vector** ready to copy/paste into Substack.

---

## Stage 1: State Audit & Catalog Inspection

Before touching any code or searching the web, determine the current catalog baseline:

1. **Find Current Article ID and Slugs**:
   Run a quick scan on `src/data/articlesData.ts` to identify:
   - Total existing articles (e.g. 58 articles, IDs `art-1` through `art-58`).
   - The next sequential ID (e.g. `art-59`, `art-60`, etc.).
   - Set of existing slugs, titles, and cover images to prevent duplicates.
2. **Check Tracked Models**:
   Inspect `src/data/modelsData.ts` to see current model count (e.g. `ALL_135_MODELS`).
3. **Establish 48-Hour Time Horizon**:
   Confirm current date/time. The discovery scope is strictly news, papers, and releases from the **last 48 hours**.

---

## Stage 2: Intelligence Discovery & Verification (Last 48 Hours)

Search reputable primary sources across four distinct beats:

| Beat | Primary Sources to Query | Focus Areas |
| :--- | :--- | :--- |
| **1. Frontier AI & Reasoning** | OpenAI, DeepMind, Anthropic, Meta AI, Mistral, xAI, Microsoft Research, arXiv (cs.AI, cs.CL, cs.LG) | Architecture releases, test-time compute, KV cache breakthroughs, multi-agent frameworks, open weights. |
| **2. Silicon & Infrastructure** | TSMC, ASML, NVIDIA, AMD, Cerebras, Intel Labs, SK Hynix, Micron, Hyperscale Cloud | Wafer yields, advanced packaging (CoWoS, HBM3E/4), High-NA EUV, liquid-cooled rack architectures. |
| **3. Systems & Cybersecurity** | Linux Foundation, CISA, US-CERT, PyTorch, Kubernetes, GitHub Security, kernel trees | Mainline kernel merges, zero-days, supply chain exploits, BGP hijacking, memory safety migrations. |
| **4. Applied Science & Space** | NASA, ESA, STScI (Webb), ESO, NIST, Nature, Science, NEJM, APS Physics | Space telescope cosmic dawn discoveries, quantum sensors, fusion magnets, in-vivo CRISPR, solid-state batteries. |

### Selection Criteria (Top 5+ Stories):
- Filter for **substantive technical depth**, not generic corporate PR or minor executive personnel moves.
- Minimum **5 distinct reports**. If more high-signal events occurred, there is no upper limit.
- Calculate a **Signal Score** (70–100) based on architectural novelty and empirical impact.

### Factuality Verification Rules:
- **Zero Inventions**: Verify exact model parameters, latency numbers, benchmark results, wafer nanometer nodes, or court dockets from primary documentation.
- If a technical metric is unconfirmed, state *"according to developer technical documentation"* or omit.

---

## Stage 3: AI Model Release & Benchmark Synchronization

Perform a dedicated search: **Were any AI models or checkpoints released in the last 48 hours?**

### If a new model WAS released:
1. **Publish Release Article**:
   - Write an in-depth deconstruction in `src/data/articlesData.ts` focusing on model architecture, context window, tokenizer, benchmark results, and pricing.
2. **Register in `src/data/modelsData.ts`**:
   - Append to `ALL_135_MODELS` with full `AIModel` schema:
     - `id`: `model-{developer}-{name}` (kebab-case)
     - `name`, `developer`, `releaseDate`, `modelType`, `modalities`
     - `contextWindow`, `parameters`, `pricing` (input/output/cached per 1M tokens)
     - `openSourceStatus`, `license`, `hardwareRequirements`
     - `benchmarks` (Chatbot Arena Elo, SWE-bench, etc.)
     - `keyImprovements`, `knownLimitations`, `architectureNotes`
     - `link`
3. **Update Benchmarks in `src/data/benchmarksData.ts`**:
   - Insert model entry into applicable leaderboards (`OSWorld`, `WebArena`, `SWE-bench`, `Cyber-Eval`, `Chatbot Arena`, or `Price-to-Performance Pareto`).
   - Recalibrate ranks as appropriate.

### If NO new model was released:
- Note in the daily brief that model leaderboards remain stable, and proceed to general intelligence reports.

---

## Stage 4: Visual Asset Curation & Deduplication

Enforce the strict **Visual Asset Rules** from `EDITORIAL_RULEBOOK.md`:

1. **Absolute Uniqueness (Zero Duplication)**:
   - Every single new article must have a **completely unique cover image**.
   - Cross-check proposed image URL/path against all existing articles. No duplicates allowed!
2. **Anti-Generic Policy**:
   - Strictly banned: generic matrix code, glowing padlocks on laptops, blue abstract motherboard lines.
3. **Sourcing Priority**:
   - **Tier 1 (Public Domain NASA/ESO/Science)**: Download to `public/images/articles/art-{id}-{slug}.jpg`.
   - **Tier 2 (Bespoke Technical Diagrams)**: Use image generation for novel AI architectures/exploits with Swiss typography and clean schematics. Save to `public/images/articles/art-{id}-{slug}.jpg`.
   - **Tier 3 (Verified Topic Photography)**: Unsplash verified CDN URL. **Must test with python script to guarantee HTTP 200.**
4. **Mandatory Alt Text**:
   - Write rich, descriptive `coverImageAlt` explaining the visual mechanics.

---

## Stage 5: Codebase Content Injection

### 5.1 Append New Articles to `src/data/articlesData.ts`
For each of the 5+ new stories, append a valid `Article` object adhering to the schema:
- Sequential `id`: `art-{next_number}`
- `slug`: kebab-case URL slug
- `title`: technical, executive, high-signal
- `summary`: 1-2 sentence executive synopsis
- `category`: `'ai'` | `'technology'` | `'science'` | `'research'`
- `tags`: 3-6 specific lowercase tags
- `publishedAt`: ISO-8601 string for today
- `readTime`: realistic duration (e.g. `'7 min read'`)
- `author`: `AUTHOR_ROBIUL_HASAN`
- `coverImage`: unique local path or verified URL
- `coverImageAlt`: topic-specific descriptive text
- `signalScore`: 70–100
- `isLeadStory`: `true` for today's #1 top story
- `threeQuestions`:
  - `whatHappened`: factual breakdown with numbers
  - `whyDoesItMatter`: architectural/economic impact
  - `whatCouldHappenNext`: second-order projections (3-24 months)
- `content`: full markdown report (1,000–2,500 words with H2 sections, architecture analysis, and citations)
- `sources`: array of primary URLs

### 5.2 Update `MOCK_DAILY_BRIEFING` in `src/data/mockData.ts`
- Update `date` to today's date string (e.g. `Wednesday, September 9, 2026`).
- Update `summary` with a 2-sentence macro synthesis of today's top developments.
- Replace `items` with the top 5 curated briefing items matching today's new articles:
  - `id`: `brief-1` to `brief-5`
  - `headline`: punchy, executive title
  - `category`: `'ai'` | `'technology'` | `'science'` | `'research'`
  - `urgency`: `'Critical Signal'` | `'High Impact'` | `'Notable Shift'`
  - `summary`: 2-sentence summary
  - `whyItMatters`: 1-sentence bottom-line takeaway
  - `articleSlug`: exact slug of the corresponding article

---

## Stage 6: Verification, Build & Deployment Gate

Execute the mandatory pre-flight checks:

1. **Automated Deduplication Audit**:
   Run a verification script to confirm:
   - Total articles == expected count.
   - Total unique cover images == total articles (0 duplicates).
   - All local images exist on disk.
   - All remote image URLs return HTTP 200.
2. **TypeScript & Vite Build**:
   Run `npm run build`. Must compile with zero errors in under 2 seconds.
3. **Git Commit & Push**:
   Stage modified and new files:
   ```bash
   git add src/data/articlesData.ts src/data/modelsData.ts src/data/benchmarksData.ts src/data/mockData.ts public/images/articles/
   git commit -m "feat(intelligence): daily briefing and articles update [YYYY-MM-DD]"
   git push origin main
   ```

---

## Stage 7: Substack Newsletter Generation (The Morning Vector)

Once the website is updated and live, generate the complete Substack newsletter edition ready for publication.

Save the newsletter draft to:
`newsletters/YYYY-MM-DD-the-morning-vector.md`

### Substack Newsletter Template:

```markdown
---
subject: "The Morning Vector: [Top Story Headline in 6-8 words]"
subtitle: "[1-sentence teaser of today's 2 biggest technical revelations]"
date: "[Full Date, e.g. September 9, 2026]"
author: "Robiul Hasan"
publication: "The Morning Vector by NextVector"
---

# THE MORNING VECTOR
### The 3-Minute Executive Signal Briefing | [Date]
*Delivered by NextVector Intelligence • Filter the noise.*

---

## ⚡ EXECUTIVE MACRO SCAN
> [2-3 sentences synthesizing today's macro shift across AI, compute infrastructure, and applied science.]

---

## 🔴 LEAD INTELLIGENCE REPORT
### [Title of Top Story (art-XX)]
**Signal Purity Score: [XX]/100 • Critical Breakthrough**

[3-4 paragraphs deconstructing the lead breakthrough.]

- **What Happened:** [Factual summary with numbers, versions, specs]
- **Why It Matters:** [Architectural and economic implications]
- **What Could Happen Next:** [Second-order projections for the next 6-12 months]

👉 **[Read the Full Technical Report on NextVector ↗](https://nextvector.rhasan.online/article/[slug])**

---

## 🛰️ RAPID SIGNAL SCANS (Last 48 Hours)

### 1. [Story #2 Headline]
- **Category:** [AI / Technology / Science] • **Read:** [X] min
- **The Core Signal:** [2-sentence technical summary.]
- **Bottom Line:** [Why engineering leaders must track this.]
- 🔗 [Read Full Signal on NextVector ↗](https://nextvector.rhasan.online/article/[slug])

### 2. [Story #3 Headline]
- **Category:** [AI / Technology / Science] • **Read:** [X] min
- **The Core Signal:** [2-sentence technical summary.]
- **Bottom Line:** [Why engineering leaders must track this.]
- 🔗 [Read Full Signal on NextVector ↗](https://nextvector.rhasan.online/article/[slug])

### 3. [Story #4 Headline]
- **Category:** [AI / Technology / Science] • **Read:** [X] min
- **The Core Signal:** [2-sentence technical summary.]
- **Bottom Line:** [Why engineering leaders must track this.]
- 🔗 [Read Full Signal on NextVector ↗](https://nextvector.rhasan.online/article/[slug])

### 4. [Story #5 Headline]
- **Category:** [AI / Technology / Science] • **Read:** [X] min
- **The Core Signal:** [2-sentence technical summary.]
- **Bottom Line:** [Why engineering leaders must track this.]
- 🔗 [Read Full Signal on NextVector ↗](https://nextvector.rhasan.online/article/[slug])

---

## 📊 MODEL & BENCHMARK RADAR
*(If any model was released/updated today)*
- **Model:** [Name] by [Developer]
- **Key Metric:** [Elo / SWE-bench / Context / Pricing]
- **NextVector Analysis:** [1-sentence verdict]
👉 **[Inspect Live Benchmark Radar ↗](https://nextvector.rhasan.online/benchmarks)**

---

**NextVector Intelligence**  
*Curated & Founded by [Robiul Hasan](https://nextvector.rhasan.online/author) (Dhaka).*  
*Primary Source Verified • Zero Clickbait Guarantee.*  
*Manage your subscription or read past archives at [nextvectorr.substack.com](https://nextvectorr.substack.com).*
```

Output this entire newsletter markdown in the chat for the user so they can immediately paste it into their Substack post composer!

---

*End of Daily Update Pipeline. Execute with precision.*
