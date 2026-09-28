# NextVector Editorial & Publishing Rulebook
**Standard Operating Procedure for Intelligence Reports, News, and Scientific Deconstructions**

*Version 1.0 — Approved by Robiul Hasan, Founder & Editor-in-Chief*
*Publication: NextVector (nextvector.rhasan.online) / The Morning Vector (nextvectorr.substack.com)*

---

## 1. Editorial Charter & Founding Philosophy

### 1.1 The Core Mission
NextVector is an independent digital intelligence platform dedicated to surfacing genuine technological progress, architectural breakthroughs, and empirical scientific discoveries. 

> **Editorial Motto**: *"Technology is moving extremely fast. We identify the developments worth paying attention to. Less noise. More signal."*

### 1.2 Target Audience & Reading Level
NextVector reports are written for:
- AI researchers, foundation model engineers, and compute architects
- Systems software developers and kernel engineers
- Hardware architects and semiconductor analysts
- Applied scientists, bioinformaticians, and quantum physicists
- Technology executives, engineering leaders, and deep-tech venture investors

### 1.3 Tone of Voice
- **Tone**: Analytical, authoritative, rigorous, measured, and technically uncompromising.
- **Banned Styles**: Zero clickbait, zero superficial sensationalism, zero speculative hyperbole, zero promotional PR-speak ("game-changing", "revolutionary", "mind-blowing", "insane").
- **Language**: Precise domain terminology is preferred over dumbed-down analogies. When introducing novel terms, define their technical mechanics directly.

---

## 2. The Three-Question Analytical Framework

Every intelligence report, without exception, must rigorously answer the **Three-Question Framework**:

```
┌────────────────────────────────────────────────────────┐
│               THE THREE-QUESTION FRAMEWORK              │
├────────────────────────────────────────────────────────┤
│ 1. WHAT HAPPENED?        Factual, empirical event data │
│ 2. WHY DOES IT MATTER?   Architectural/systemic impact │
│ 3. WHAT COULD HAPPEN     Second-order consequences &   │
│    NEXT?                 near-to-mid term roadmap      │
└────────────────────────────────────────────────────────┘
```

### 2.1 Question 1: What Happened?
- Must provide an exact, objective accounting of the event or breakthrough.
- Must cite specific version numbers, model parameters, dataset scales, benchmark results, wafer nodes, legal case numbers, or financial figures.
- Banned: Vague generalities ("A major lab recently released a new model").

### 2.2 Question 2: Why Does It Matter?
- Must articulate the underlying architectural or economic inflection point.
- Why couldn't this be done before? Which technical bottleneck was overcome (e.g., KV cache latency, memory wall, thermal dissipation, single-point of failure)?
- How does this shift developer workflows, enterprise unit economics, or hardware scaling laws?

### 2.3 Question 3: What Could Happen Next?
- Actionable, forward-looking projection of near-to-mid term second-order effects (3 to 24 months).
- Anticipated counter-moves by competitors (e.g. OpenAI, Google DeepMind, Anthropic, Meta, NVIDIA, TSMC).
- Regulatory, supply chain, or architectural bottlenecks that will emerge next.

---

## 3. Sourcing, Factuality & Anti-Hallucination Standards

### 3.1 Strict Factuality (Zero Hallucination Policy)
- **Do not invent or extrapolate unverified facts.** Every metric, parameter count, benchmark score, paper DOI, patent application, or legal quote must be real and verifiable.
- If a detail is rumored or unconfirmed by primary sources, it must be explicitly caveated as *"reported by industry sources"* or omitted entirely.

### 3.2 Primary Sourcing Hierarchy
All reports must prioritize primary technical documentation in this order:
1. **Tier 1 (Peer-Reviewed & Preprint Science)**: arXiv preprints, *Nature*, *Science*, IEEE publications, ACM digital library, NEJM, Cell.
2. **Tier 2 (Official Engineering & Lab Releases)**: Engineering blogs and technical whitepapers published directly by core research teams (e.g., OpenAI Research, Google DeepMind, Anthropic Research, Meta AI, Apple Machine Learning Research).
3. **Tier 3 (Silicon & Hardware Documentation)**: Foundry reports, ISSCC papers, IEEE Hot Chips proceedings, official architecture whitepapers (NVIDIA, AMD, TSMC, ASML, Cerebras, Intel Labs).
4. **Tier 4 (Legal & Regulatory Filings)**: Official US District Court dockets, DOJ/FTC filings, European Commission / EU AI Office official regulatory texts.

### 3.3 Anti-Duplication Protocol
Before researching or staging any new article:
1. **Audit the Existing Database**: Cross-check `src/data/articlesData.ts` to ensure the subject has not already been covered.
2. **Substantial New Angle Requirement**: An existing topic may only be revisited if there is a substantial new development (e.g. a new benchmark release, court verdict, or architectural revision). In such cases, cross-link the prior report.

### 3.4 Temporal Consistency & Zero-Anachronism Standards
NextVector covers cutting-edge developments in real time. Editors and AI agents must maintain rigorous chronological integrity and strictly prevent anachronisms.

1. **The 48-Hour Breaking News Window**:
   - All candidate news stories, model release announcements, and scientific breakthroughs must originate from verified primary events within the **last 48 hours** relative to the operational run date.
   - Editors and automated workflows must verify external timestamps (e.g., ISO publication dates on RSS feeds, arXiv submission timestamps, GitHub release tags, or HTTP `Last-Modified` / `Date` headers).

2. **Prohibition of Parametric Memory Reliance**:
   - AI agents are strictly forbidden from drafting breaking news based on unanchored pre-training memory or historical training weights.
   - Any story drafted without a primary source timestamp verified via live network harvesting (`python scripts/fetch_live_intel.py` or direct HTTP inspection) is invalid and must be rejected.

3. **Legacy Model Classification & Anachronism Ban**:
   - Historical foundation models and checkpoints released during prior years/operational cycles belong to historical records, not current breaking news.
   - **Explicit Historical Baseline**:
     - **2024 Models**: GPT-4o, Claude 3 Opus/Sonnet/Haiku, Claude 3.5 Sonnet, Llama 3 / 3.1, Gemini 1.5 Pro/Flash, DeepSeek-V2 / DeepSeek-V3.
     - **2025 Models**: Claude 3.7 Sonnet (February 2025), DeepSeek-R1 (January 2025), Llama 3.3, Gemini 2.0 / 2.5 Flash/Pro.
     - **2026 Models**: The current operational baseline (GPT-5/6, Claude Fable 5/5.1, Claude Opus 5, DeepSeek-V4/V4.1, Qwen 3.5/3.8, Gemini 3.x).
   - **Strict Ban**: NEVER report a 2024 or 2025 model (such as Claude 3.7 Sonnet or Claude 3.5) as a "new model released today" in 2026. Such claims are factual hallucinations and immediately fail the Pre-Publication Release Gate.
   - **Retrospective Analysis vs. Breaking News**: A historical model may only be cited in retrospective comparisons or benchmarks (e.g., *"Evaluating Claude Fable 5.1 against 2025 baselines such as Claude 3.7 Sonnet"*), NEVER as breaking news.

---

## 4. Visual Assets & Media Standards (Strict Compliance)

### 4.1 Rule of Absolute Uniqueness (Zero Duplication)
- **Every single article must have a 100% unique cover image.**
- **No two articles in the NextVector catalog may ever share the same visual asset URL or image file.**
- If 60 articles exist, there must be 60 distinct images.

### 4.2 Anti-Generic Image Policy
Generic stock clichés are strictly prohibited:
- **BANNED**: Generic blue matrix code falling on black backgrounds.
- **BANNED**: Generic metallic padlocks sitting on laptop keyboards.
- **BANNED**: Generic business people shaking hands in glass offices.
- **BANNED**: Generic abstract blue motherboard lines with zero context.

### 4.3 Asset Sourcing & Selection Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    VISUAL ASSET HIERARCHY                   │
├─────────────────────────────────────────────────────────────┤
│ TIER 1: Authentic Public-Domain Science / Space Photography │
│         (NASA, ESO, JWST, NIST, national laboratories)      │
│         → Download locally to /public/images/articles/      │
├─────────────────────────────────────────────────────────────┤
│ TIER 2: Bespoke Editorial Technical Diagrams & Renders      │
│         (For novel AI models, software bugs, algorithms)    │
│         → Generated via image synthesis, Swiss typography   │
│         → Saved locally to /public/images/articles/         │
├─────────────────────────────────────────────────────────────┤
│ TIER 3: Verified Topic-Specific High-Resolution Photography │
│         (Cleanroom equipment, foundry machinery, courts)    │
│         → Verified Unsplash CDN URL (HTTP 200 guaranteed)   │
└─────────────────────────────────────────────────────────────┘
```

#### Tier 1: Authentic Public-Domain Photography
- Use for physical scientific phenomena, astronomical discoveries, Mars missions, and telescope observations.
- Sources: NASA JPL, STScI (Webb/Hubble), European Southern Observatory (ESO CC-BY 4.0), NIST, national laboratories.
- Must be saved locally to `public/images/articles/` with clean naming: `art-{id}-{slug}.jpg`.

#### Tier 2: Bespoke Technical Diagrams
- Use for algorithmic breakthroughs, AI architectures, distributed systems, and cybersecurity exploits where physical camera photos do not exist (e.g., DeepSeek DualPipe, GPT-6 Astra agent, Test-Time compute scaling, BGP hijacking).
- Style: Dark mode, Swiss-clean typographic labels, volumetric lighting, engineering-accurate block diagrams or hardware flow charts.
- Must be saved locally to `public/images/articles/` with clean naming: `art-{id}-{slug}.jpg`.

#### Tier 3: Verified Topic-Specific High-Resolution Photography
- Use for real-world hardware, semiconductor fabs, courtrooms, printing plants, and clinical testbeds.
- Must be directly verified via automated HTTP requests (status code 200).
- Must have exact thematic alignment with the article subject.

### 4.4 Mandatory Descriptive Alt Text (`coverImageAlt`)
- Every article must provide a rich, descriptive `coverImageAlt` string.
- The alt text must describe the visual elements and explain why they relate to the story.
- Example: `"DeepSeek DualPipe and Multi-Head Latent Attention architectural diagram with decoupled KV cache vectors and overlapping GPU micro-batches"` instead of `"AI diagram"`.

---

## 5. Article Data Schema & Field Specifications

Every article entry in `src/data/articlesData.ts` must conform strictly to the TypeScript interface:

```typescript
export interface Article {
  id: string;                      // e.g. 'art-59' (sequential)
  slug: string;                    // e.g. 'deepseek-v3-dualpipe-mla-architecture'
  title: string;                   // Technical, high-signal, non-clickbait title
  summary: string;                 // 1-2 sentence executive synopsis
  content: string;                 // Full markdown report (1,000 - 3,500 words)
  category: 'ai' | 'technology' | 'science' | 'research';
  tags: string[];                  // 3-6 specific lowercase tags
  publishedAt: string;             // ISO-8601 string (e.g. '2026-09-08T06:00:00Z')
  readTime: string;                // e.g. '8 min read'
  author: {
    name: 'Robiul Hasan';
    role: 'Founder & Editor-in-Chief';
    avatar: string;
    bio: string;
  };
  coverImage: string;              // Local path (/images/articles/...) or verified URL
  coverImageAlt: string;           // Detailed descriptive alt text
  signalScore: number;             // Numerical score between 70 and 100
  isLeadStory?: boolean;           // true for the primary featured report
  isBreakthrough?: boolean;        // true for signalScore >= 95
  threeQuestions: {
    whatHappened: string;          // Rigorous breakdown of empirical facts
    whyDoesItMatter: string;       // Architectural / systemic significance
    whatCouldHappenNext: string;   // Second-order projections (3-24 months)
  };
  sources: Array<{
    title: string;                 // Primary paper or filing title
    url: string;                   // Direct URL (DOI, GitHub, official blog)
  }>;
}
```

---

## 6. Authorship, Attribution & Branding

### 6.1 Sole Authorship
- NextVector is founded and edited by **Robiul Hasan**.
- All published intelligence reports are attributed to Robiul Hasan as Founder & Editor-in-Chief.
- External portfolio links (`rhasan.online`) reside on the Author page and standard footer links.

### 6.2 Newsletter & Syndication Integration
- All executive briefings are published in parallel via **The Morning Vector** on Substack (`nextvectorr.substack.com`).
- The newsletter signup module must always use native Substack POST delivery (`https://nextvectorr.substack.com/api/v1/free?nojs=true`) with `target="_blank"` and a direct link to `nextvectorr.substack.com/subscribe`.

---

## 7. Pre-Publication Quality Assurance (Release Gate)

Before committing any new article to the repository or deploying to production, the publishing agent/editor MUST execute the **8-Step Release Gate**:

```
┌────────────────────────────────────────────────────────┐
│               PRE-PUBLICATION RELEASE GATE             │
├────────────────────────────────────────────────────────┤
│ STEP 1: FACTUALITY & PRIMARY SOURCE AUDIT              │
│         Verify numbers, model specs, DOIs, and claims. │
├────────────────────────────────────────────────────────┤
│ STEP 2: TEMPORAL SANITY & ZERO-ANACHRONISM AUDIT       │
│         Confirm all stories are from the last 48 hours │
│         and contain no historical model anachronisms.  │
├────────────────────────────────────────────────────────┤
│ STEP 3: CATALOG DEDUPLICATION CHECK                    │
│         Confirm topic, slug, and title are unique.     │
├────────────────────────────────────────────────────────┤
│ STEP 4: TIMELINE INTEGRITY CHECK                       │
│         Audit events with Impact Score >= 95 and sync  │
│         MOCK_TIMELINE_EVENTS in mockData.ts.           │
├────────────────────────────────────────────────────────┤
│ STEP 5: LIVE SIGNAL TICKER INTEGRITY CHECK             │
│         Verify MOCK_LIVE_SIGNALS contains 5 fresh      │
│         signals matching today's stories with links.   │
├────────────────────────────────────────────────────────┤
│ STEP 6: IMAGE UNIQUENESS & VALIDATION AUDIT            │
│         Confirm coverImage is 100% unique (0 dupes),   │
│         file exists on disk or remote returns HTTP 200.│
├────────────────────────────────────────────────────────┤
│ STEP 7: AUTOMATED RELEASE GATE & BUILD VERIFICATION    │
│         Run `npm run verify` & `npm run build`         │
│         (must pass with 0 errors across all 7 gates).  │
├────────────────────────────────────────────────────────┤
│ STEP 8: ATOMIC GIT COMMIT & REMOTE PUSH                │
│         Commit with semantic prefix: `feat(news): ...` │
└────────────────────────────────────────────────────────┘
```

### 7.1 Automated Pre-Publication Release Gates (`scripts/verify_daily_pipeline.py`)
NextVector enforces 7 automated verification gates before any batch is cleared for production release:

1. **Gate 1: Catalog Integrity, IDs, Slugs & Image Uniqueness**
   - 100% unique cover images across the entire catalog (0 duplicate strings, 0 duplicate local SHA-256 binaries, 0 duplicate Unsplash tokens).
   - All local image files exist on disk and exceed 5KB.
   - Zero historical model anachronisms (e.g., Claude 3.5/3.7, GPT-4o reported as new 2026 releases).
2. **Gate 2: Daily Briefing & Live Signals Deep-Link Parity**
   - Briefing matches the operational run date with valid article slugs.
   - Live Signal marquee ticker contains $\ge 5$ fresh items with valid deep-links.
3. **Gate 3: Breakthrough Timeline Integrity**
   - All timeline entries strictly meet `impactScore >= 95`.
   - Every `articleSlug` cross-link resolves to an existing catalog article.
4. **Gate 4: Sitemap Completeness & Indexability**
   - `public/sitemap.xml` contains 100% of all published articles with canonical URLs.
5. **Gate 5: Temporal Sanity & 48-Hour Breaking News Window**
   - Newest published articles have valid ISO-8601 timestamps matching the active operational window.
6. **Gate 6: Model Registry & Benchmark Sync**
   - All 6 benchmark leaderboards (Arena, OSWorld, WebArena, SWE-bench, Cyber-Eval, Price-Performance) feature strictly sequential 1..N ranks with 0 rank jumps.
   - Complete parity between leaderboard scores and `ALL_135_MODELS` attributes (`arenaRank`, `arenaElo`).
7. **Gate 7: SEO, GEO & AI Overview Readiness Audit**
   - Minimum 5 targeted keywords/tags per article (`tags: string[]`).
   - Complete Three-Question Framework (`whatHappened`, `whyItMatters`, `whatsNext`), with each answer $>80$ characters for high-density AI Overview and Schema.org `FAQPage` synthesis.
   - Minimum 3 executive key takeaway bullet points per article for featured snippet extraction (`keyTakeaways: string[]`).
   - Minimum 1 primary source citation link per article (`citations: Array<{title, url, source}>`).
   - Schema.org `@graph` verification: `TechArticle`, `FAQPage`, and `SpeakableSpecification` (`.three-questions-block`, `.key-takeaways`).

---

## 8. Technology & Science Breakthrough Timeline Curation

NextVector maintains a permanent, living chronological record of paradigm-shifting milestones (`MOCK_TIMELINE_EVENTS` in `src/data/mockData.ts`) rendered on the `/timeline` route.

### 8.1 Inclusion Criteria & Thresholds
A daily development qualifies for the Breakthrough Timeline if and only if:
1. **Permanent Structural Shift**: It represents a lasting historical inflection in AI capabilities, compute fabrics, semiconductor lithography, or empirical science (not ephemeral marketing announcements or executive personnel moves).
2. **Impact Score >= 95**: Only events with an assessed Impact Score of 95 or higher (or industry-defining acquisitions/regulations) are elevated to the permanent timeline.
3. **Primary-Source Verified**: Must be confirmed by peer-reviewed paper, verifiable hardware wafer yields, audited benchmark scores, or definitive legal/acquisition filings.

### 8.2 Category Alignment
Milestones must be strictly classified into one of the 5 canonical categories matching the UI filter pills:
- `'AI Breakthrough'`
- `'Semiconductors'`
- `'Computing Architecture'`
- `'Fundamental Science'`
- `'Space & Quantum'`

### 8.3 Data Schema & Deep-Linking
Every `TimelineEvent` must contain:
- `id`: Unique kebab-case identifier (e.g. `'time-2026-09-09-tsmc'`).
- `year`: Numeric year (e.g. `2026`).
- `month`: Short month and day (e.g. `'Sep 9'`).
- `title`: Rigorous, definitive headline.
- `category`: One of the 5 canonical categories above.
- `summary`: 1-2 sentence executive synopsis.
- `impactScore`: Numeric score between 95 and 100.
- `keyShift`: 1-sentence defining description of the paradigm shift.
- `articleSlug`: Optional slug pointing to the corresponding in-depth NextVector intelligence report for seamless reader cross-navigation.

---

## 9. Live Breaking Signal Ticker Standards

NextVector features a prominent horizontal marquee ticker (`LIVE SIGNAL`) at the top of the homepage feed, providing readers with real-time signal density.

### 9.1 Daily Synchronization Rule (Zero Stale Signals)
The live ticker must never display stale developments from previous days. During every execution of the daily update pipeline (Stage 5.4), `MOCK_LIVE_SIGNALS` in `src/data/mockData.ts` MUST be refreshed with 5 punchy items corresponding directly to today's published reports.

### 9.2 Data Schema (`LiveSignalItem`)
```typescript
export interface LiveSignalItem {
  id: string;            // Sequential ID (e.g. 'sig-1', 'sig-2')
  tag: string;           // 2-3 word bold entity/event label (e.g. 'OpenAI Lean 4', 'ASML & Intel')
  text: string;          // Single-sentence empirical action or spec (under 95 characters)
  articleSlug?: string;  // Target slug for direct one-click navigation
}
```

### 9.3 Interactive Deep-Linking
Every live signal ticker item must be clickable, directly invoking client-side navigation (`onSelectArticle(sig.articleSlug)`) to the corresponding NextVector intelligence report.

---

## 10. SEO, GEO & AI Overview Optimization Standards

NextVector is engineered from the ground up for premier organic search rankings and Generative Engine Optimization (GEO), ensuring maximum visibility across Google Search, Google AI Overviews, Perplexity, Claude Search, and ChatGPT Search.

### 10.1 Generative Engine Optimization (GEO) Core Framework
LLM search agents prioritize structured, high-density factual answers over conversational prose. Every intelligence report must provide:
1. **Three-Question Framework (`threeQuestions`)**:
   - `whatHappened`: Empirical breakdown of technical facts, events, and releases.
   - `whyItMatters`: Architectural, economic, or systemic significance.
   - `whatsNext`: Second-order projections spanning the next 3 to 24 months.
   - *Threshold*: Each field MUST strictly exceed 80 characters to guarantee complete synthetic context.
2. **Executive Key Takeaways (`keyTakeaways`)**:
   - Minimum 3 bullet points per article, formatted with bold descriptive prefixes (e.g., `"Direct GUI manipulation: ..."`).
   - Designed for direct extraction by Google Featured Snippets and LLM retrieval-augmented generation (RAG) prompts.
3. **Primary Source Citations (`citations`)**:
   - Minimum 1 verified authoritative primary source citation (`{ title, url, source }`).
   - Links must point directly to arXiv pre-prints, DOI registries, official engineering announcements, or legal dockets.

### 10.2 Targeted Search Terms & Keyword Taxonomy (`tags`)
Every published report must index at least 5 targeted, high-intent keywords in its `tags` array:
- Specific model, project, or paper names (e.g., `'GPT-6 Astra'`, `'Claude Opus 5.5'`, `'BITCOS'`).
- Technical mechanism or architectural keywords (e.g., `'Ternary LLMs'`, `'Computer Use'`, `'PECVD'`).
- Benchmark and evaluation terminology (e.g., `'OSWorld'`, `'WebArena'`, `'SWE-bench'`).
- High-intent search queries and domain categories (e.g., `'Enterprise AI'`, `'Model Compression'`, `'Cybersecurity'`).

### 10.3 Machine-Readable Schema.org Graph Integration
Every article detail view dynamically injects a JSON-LD `@graph` containing:
- **`TechArticle` / `NewsArticle`**: Complete metadata with canonical URLs, author attributions, publisher nodes, and keywords.
- **`FAQPage`**: Formed dynamically by mapping `threeQuestions` into question-answer pairs (`"What happened regarding [Title]?"`, `"Why does [Title] matter?"`, `"What could happen next after [Title]?"`).
- **`SpeakableSpecification`**: CSS selectors targeting `['.three-questions-block', '.key-takeaways']` for voice assistants and automated audio briefing pipelines.
- **AI Crawler Directives**: `robots` meta tag configured with `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.

---

*This rulebook is the permanent operating standard for all intelligence reporting on NextVector.*

