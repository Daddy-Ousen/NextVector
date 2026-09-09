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

Before committing any new article to the repository or deploying to production, the publishing agent/editor MUST execute the **6-Step Release Gate**:

```
┌────────────────────────────────────────────────────────┐
│               PRE-PUBLICATION RELEASE GATE             │
├────────────────────────────────────────────────────────┤
│ STEP 1: FACTUALITY & PRIMARY SOURCE AUDIT              │
│         Verify numbers, model specs, DOIs, and claims. │
├────────────────────────────────────────────────────────┤
│ STEP 2: CATALOG DEDUPLICATION CHECK                    │
│         Confirm topic, slug, and title are unique.     │
├────────────────────────────────────────────────────────┤
│ STEP 3: TIMELINE INTEGRITY CHECK                       │
│         Audit events with Impact Score >= 95 and sync  │
│         MOCK_TIMELINE_EVENTS in mockData.ts.           │
├────────────────────────────────────────────────────────┤
│ STEP 4: IMAGE UNIQUENESS & VALIDATION AUDIT            │
│         Confirm coverImage is 100% unique (0 dupes),   │
│         file exists on disk or remote returns HTTP 200.│
├────────────────────────────────────────────────────────┤
│ STEP 5: TYPESCRIPT COMPILATION & BUILD CHECK           │
│         Run `npm run build` (must pass with 0 errors). │
├────────────────────────────────────────────────────────┤
│ STEP 6: ATOMIC GIT COMMIT & REMOTE PUSH                │
│         Commit with semantic prefix: `feat(news): ...` │
└────────────────────────────────────────────────────────┘
```

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

*This rulebook is the permanent operating standard for all intelligence reporting on NextVector.*
