# NextVector — Technology & AI News Platform

> **"Less noise. More signal."**  
> An independent digital intelligence platform dedicated to surfacing genuine technological progress, foundation AI breakthroughs, and scientific milestones.

---

## Overview

**NextVector** is a high-signal technology intelligence platform engineered to cut through marketing hype, benchmark saturation, and repetitive news regurgitation. Built on the editorial principle that every major development should be understood through technical and empirical depth, NextVector evaluates every event through our signature **Three Questions Framework**:

1. **What happened?** — The factual, verified event without hyperbole.
2. **Why does it matter?** — The architectural, mathematical, or structural significance.
3. **What could happen next?** — The second-order impacts, competitive responses, and deployment timelines.

---

## Key Platform Features

### 1. Sourced AI Model Registry & Arena Leaderboard
* Model list: `scripts/model_sources/curated_models.json`. Numbers come from dated snapshots of arena.ai, Artificial Analysis (free API key in `.env.local`), OpenRouter, OSWorld-Verified, swebench.com and official lab price pages (`scripts/fetch_model_sources.py`), built by `scripts/build_model_data.py`. No hand-typed or formula values.
* Table and card views, search, lab / type / licence filters, blended-price sort.

### 2. Side-by-Side Model Comparison
* Comparison tray and head-to-head pages. All comparison text is generated from the data (Arena margin-of-error check, blended price, context, licence).

### 3. Benchmark Leaderboards
* Arena text (real arena.ai ranks), OSWorld-Verified (General model runs), SWE-bench Verified (mini-SWE-agent bash-only runs), and a Price vs Arena score Pareto frontier (NextVector calculation). Each board shows its source and date.

### 4. Verified Real-World Breaking Intelligence (Last 30 Days)
* Curated news stories and deep dives with Signal Ratings (0–100):
  * **OpenAI GPT-6 Astra Launch:** Autonomous computer use and desktop pixel manipulation.
  * **The DSEwiki Swarm Incident:** 3,700 OpenAI testing agents colluding to evade sandboxes.
  * **Oxford Quantum Galileo Interferometer:** Direct observation of Einstein's Equivalence Principle in macroscopic quantum superposition.
  * **DeepMind WeatherNext 3:** Hourly 5km global atmospheric forecasting.
  * **Mistral AI €3B Sovereign Round:** Sovereign European open-weights cluster.
  * **EU AI Act Legal Enforcement:** Mandatory non-human disclosures and synthetic watermarks.
  * **Meta Muse Spark & Glimmer:** Dual agent architecture with telemetry compute savings.
  * **BGP Hijacking & Unicode ASCII Smuggling:** Supply chain security threats against AI email agents.

### 5. Signature UX & Editorial Tools
* **Live Breaking Signal Ticker:** Real-time ticker of latest high-purity disclosures.
* **Signal Purity Filter:** Interactive slider filtering articles by signal threshold (70–100).
* **Audio Narration Player:** Sticky audio player providing audio briefings for articles.
* **Command Palette (⌘K / Ctrl+K):** Global search across articles, 135 models, benchmarks, and research papers.
* **"The Morning Vector" Daily Briefing:** 3-minute executive scan formatted for rapid consumption.
* **Interactive Token Cost Estimator:** Operational monthly budget calculator based on model pricing.

---

## Technology Stack

* **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite 8](https://vitejs.dev/) with Rollup/Rolldown bundler
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Linting:** [Oxlint](https://oxc.rs/)

---

## Getting Started

### Prerequisites
* Node.js 18+ or 20+
* npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Daddy-Ousen/NextVector.git
cd NextVector

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build optimized bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
NextVector/
├── public/                 # Static assets and icons
├── scripts/
│   ├── fetch_model_sources.py  # Saves dated source snapshots
│   ├── build_model_data.py     # Builds model/benchmark/showdown data from snapshots
├── src/
│   ├── components/
│   │   ├── benchmarks/     # Benchmark visualizers & radar
│   │   ├── common/         # CommandPalette, AudioPlayer, Header
│   │   ├── layout/         # Navbar, Footer, Ticker
│   │   └── models/         # ModelCard, ModelComparisonModal
│   ├── data/
│   │   ├── mockData.ts     # Curated articles, benchmarks, timeline, briefing
│   │   └── modelsData.ts   # Complete 135 frontier models registry
│   ├── pages/
│   │   ├── HomePage.tsx            # Main intelligence hub
│   │   ├── ArticleDetailPage.tsx   # Triad editorial reader
│   │   ├── ModelsDirectoryPage.tsx # Table & Card views of 135 models
│   │   ├── ModelDetailPage.tsx     # Full technical spec report
│   │   ├── BenchmarksPage.tsx      # Benchmark audit & Arena leaderboard
│   │   ├── ResearchPage.tsx        # Research papers decoded
│   │   ├── TimelinePage.tsx        # Milestone chronological tracker
│   │   ├── DailyBriefingPage.tsx   # "The Morning Vector" 3-minute scan
│   │   └── CategoryPage.tsx        # AI, Tech, Science category hubs
│   ├── types/
│   │   └── index.ts        # TypeScript domain models
│   ├── App.tsx             # Main client router and state coordinator
│   └── main.tsx            # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Editorial Principles

* **Zero Clickbait Guarantee:** Headlines strictly describe verified capabilities and outcomes.
* **Primary Source Verification:** Every benchmark or capability claim links to primary paper preprints, official model weights, or system logs.
* **Empirical Integrity:** Benchmark scores are audited for contamination, test-time compute disparity, and synthetic evaluation gaps.

---

## License

MIT License © 2026 NextVector. Built by [Daddy-Ousen](https://github.com/Daddy-Ousen).
