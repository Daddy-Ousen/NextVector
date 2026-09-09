import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Brain,
  Layers,
  Database,
  Lock,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Coins,
  Compass,
  Server,
  Terminal,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';

interface ModelDecisionGuideProps {
  onSelectModel: (modelId: string) => void;
}

type BudgetTier = '20' | '100' | '200';
type UseCaseCategory = 'all' | 'coding' | 'reasoning' | 'context' | 'rag';

interface UseCaseGuideItem {
  id: string;
  category: UseCaseCategory;
  title: string;
  subtitle: string;
  description: string;
  frontierPick: {
    name: string;
    modelId: string;
    rank: number;
    elo: number;
    price: string;
    badge: string;
    tierAvailability: string;
    why: string;
  };
  valuePick: {
    name: string;
    modelId: string;
    rank: number;
    elo: number;
    price: string;
    savings: string;
    tierAvailability: string;
    why: string;
  };
  speedPick: {
    name: string;
    modelId: string;
    metric: string;
    tierAvailability: string;
    why: string;
  };
  localPick?: {
    name: string;
    modelId: string;
    license: string;
    tierAvailability: string;
    why: string;
  };
  proTip: string;
}

const USE_CASE_GUIDES: UseCaseGuideItem[] = [
  {
    id: 'guide-coding',
    category: 'coding',
    title: 'Autonomous Coding & Agentic Software Engineering',
    subtitle: 'SWE-bench verified, multi-file repo refactoring, terminal & git tool use',
    description:
      'For complex multi-file codebase refactoring, autonomous agent loops, and terminal tool execution where compiler verification and zero hallucination are mission-critical.',
    frontierPick: {
      name: 'GPT-6 Astra',
      modelId: 'model-gpt-6-astra',
      rank: 1,
      elo: 1420,
      price: '$7.95 / 1M input',
      badge: 'SWE-bench 98%',
      tierAvailability: 'Available in ChatGPT Plus ($20/mo, limited caps), unmetered in Pro ($200/mo) & API.',
      why: 'Global Rank #1. Unrivaled multi-step tool execution and autonomous operating system & terminal control.',
    },
    valuePick: {
      name: 'DeepSeek-V4-Pro',
      modelId: 'model-deepseek-v4-pro-0813',
      rank: 10,
      elo: 1404,
      price: '$0.75 / 1M input',
      savings: '90.6% cheaper',
      tierAvailability: 'Available via API ($0.75/1M) & Apache 2.0 open weights.',
      why: 'Delivers ~98.8% of frontier coding Elo at 1/10th the cost of proprietary APIs. Ideal for high-frequency test loops and CI/CD.',
    },
    speedPick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      metric: 'Sub-300ms TTFT',
      tierAvailability: 'Available in Gemini Advanced ($20/mo) & API ($0.85/1M).',
      why: 'Instant inline code autocomplete and instantaneous single-function generation.',
    },
    localPick: {
      name: 'DeepSeek-V4-Pro (Open Weights)',
      modelId: 'model-deepseek-v4-pro-0813',
      license: 'Apache 2.0',
      tierAvailability: 'Self-hosted via vLLM / SGLang on local GPU cluster ($0 recurring).',
      why: 'Full multi-expert weights available for self-hosted enterprise clusters with zero code telemetry.',
    },
    proTip:
      'Architecture Pattern: Use DeepSeek-V4-Pro ($0.75/1M) or Gemini 3.8 Flash for initial code scaffolding and unit test runs. Escalate only failing test suites to GPT-6 Astra (via Plus, Pro, or API) for architectural debugging.',
  },
  {
    id: 'guide-reasoning',
    category: 'reasoning',
    title: 'Deep Logic, STEM & Formal Mathematical Proofs',
    subtitle: 'Complex chain-of-thought, algorithmic analysis, scientific modeling',
    description:
      'Demanding tasks requiring multi-step formal deduction, mathematical proofs, symbolic manipulation, and algorithmic optimization where raw statistical prediction fails.',
    frontierPick: {
      name: 'Claude Opus 5',
      modelId: 'model-claude-opus-5',
      rank: 3,
      elo: 1416,
      price: '$7.85 / 1M input',
      badge: 'Reasoning Leader',
      tierAvailability: 'Available in Claude Pro ($20/mo, usage caps), unmetered in API & Team.',
      why: 'Exceptional test-time reasoning density and nuanced step-by-step mathematical proof verification.',
    },
    valuePick: {
      name: 'DeepSeek-V4-Pro',
      modelId: 'model-deepseek-v4-pro-0813',
      rank: 10,
      elo: 1404,
      price: '$0.75 / 1M input',
      savings: '90.4% cheaper',
      tierAvailability: 'Available via API ($0.75/1M) & Apache 2.0 open weights.',
      why: 'Trained with extreme reinforcement learning; matches closed frontier reasoning models across AIME and MATH benchmarks at 1/10th cost.',
    },
    speedPick: {
      name: 'Claude Fable 5.1',
      modelId: 'model-claude-fable-5-1',
      metric: 'Adaptive Thinking',
      tierAvailability: 'Commercial API only ($7.90/1M, Bedrock, Vertex). Excluded from Claude Pro.',
      why: 'Dynamically allocates reasoning token budget based on query complexity to avoid unnecessary latency.',
    },
    localPick: {
      name: 'Qwen3.8-27B',
      modelId: 'model-qwen3-8-27b',
      license: 'Apache 2.0',
      tierAvailability: 'Runs locally on single 24GB GPU (RTX 4090/5090) via Ollama.',
      why: 'Runs comfortably on a single workstation GPU (RTX 5090 / 4090) while outperforming previous-generation 70B models.',
    },
    proTip:
      'Cost Efficiency: DeepSeek-V4-Pro delivers comparable MATH benchmark accuracy to closed frontier APIs. Use Claude Opus 5 (in Claude Pro or API) for novel scientific synthesis requiring multi-disciplinary hypotheses.',
  },
  {
    id: 'guide-context',
    category: 'context',
    title: 'Massive Context Ingestion (1M to 2M Tokens)',
    subtitle: 'Full codebase analysis, books, legal archives, multi-hour audio & video',
    description:
      'Analyzing entire production repositories, 1,000+ page regulatory disclosures, or 2-hour technical video transcripts in a single inference call with needle-in-a-haystack retrieval.',
    frontierPick: {
      name: 'Claude Fable 5.1',
      modelId: 'model-claude-fable-5-1',
      rank: 2,
      elo: 1418,
      price: '$7.90 / 1M input',
      badge: '1M Native Window',
      tierAvailability: 'Commercial API ($7.90/1M, $0.25 prompt cache). Excluded from Claude Pro.',
      why: 'Superior document understanding and 99.9% needle retrieval accuracy across full 1M token windows with prompt caching.',
    },
    valuePick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      rank: 15,
      elo: 1395,
      price: '$0.85 / 1M input',
      savings: '2M Context King',
      tierAvailability: 'Included in Gemini Advanced ($20/mo) and API ($0.85/1M).',
      why: 'The only frontier model offering 2,000,000 tokens of context at sub-$1/1M pricing. Ingests 10 full codebases simultaneously.',
    },
    speedPick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      metric: 'Fast Ingestion',
      tierAvailability: 'Gemini Advanced ($20/mo) & Vertex AI.',
      why: 'TPU v5e architecture processes 1M tokens of text and video in under 4 seconds.',
    },
    localPick: {
      name: 'DeepSeek-V4-Flash-Vision-Exp',
      modelId: 'model-deepseek-v4-flash-vision-exp',
      license: 'Apache 2.0',
      tierAvailability: 'Open weights for local inference clusters with 200k window.',
      why: 'Supports 200k local context with memory-efficient Multi-Head Latent Attention (MLA).',
    },
    proTip:
      'Prompt Caching Secret: Both Anthropic (Claude Fable 5.1 API) and DeepSeek support prompt caching. Repeated queries against the same 500k-token repository cost 80–90% less ($0.25/1M reads) on subsequent requests.',
  },
  {
    id: 'guide-rag',
    category: 'rag',
    title: 'High-Volume Production Pipelines & Enterprise RAG',
    subtitle: 'Millions of queries, automated classification, extraction & semantic routing',
    description:
      'Backend infrastructure processing hundreds of thousands to millions of customer interactions, synthetic data generation, or document classification daily.',
    frontierPick: {
      name: 'GPT-5.6 Sol',
      modelId: 'model-gpt-5-6-sol',
      rank: 4,
      elo: 1415,
      price: '$7.80 / 1M input',
      badge: 'Enterprise SLA',
      tierAvailability: 'Available in ChatGPT Plus ($20/mo) and OpenAI API ($7.80/1M).',
      why: 'Maximum reliability for mission-critical enterprise workloads with strict zero-data-retention guarantees.',
    },
    valuePick: {
      name: 'DeepSeek-V4-Pro',
      modelId: 'model-deepseek-v4-pro-0813',
      rank: 10,
      elo: 1404,
      price: '$0.75 / 1M input',
      savings: 'Unbeatable Pareto',
      tierAvailability: 'Available via Open API ($0.75/1M) & Apache 2.0 open weights.',
      why: 'The definitive Pareto frontier champion: 1404 Elo for $0.75/1M. Processing 100M tokens costs $75 instead of $780.',
    },
    speedPick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      metric: 'High Throughput',
      tierAvailability: 'Included in Gemini Advanced ($20/mo) & Google AI Studio.',
      why: 'Handles massive concurrent requests with minimal rate limit throttling.',
    },
    localPick: {
      name: 'Qwen3.8-27B',
      modelId: 'model-qwen3-8-27b',
      license: 'Apache 2.0',
      tierAvailability: 'Apache 2.0 weights running on private enterprise servers.',
      why: 'Permissive Apache 2.0 license allows commercial deployment with full on-premises data isolation.',
    },
    proTip:
      'The 90/10 Enterprise Rule: Route 90% of routine categorization and summarization queries through DeepSeek-V4-Pro or Gemini 3.8 Flash ($0.75/1M). Route only the remaining 10% edge cases to GPT-5.6 Sol or Claude Opus 5.',
  },
];

export const ModelDecisionGuide: React.FC<ModelDecisionGuideProps> = ({ onSelectModel }) => {
  const [activeBudget, setActiveBudget] = useState<BudgetTier>('20');
  const [activeCategory, setActiveCategory] = useState<UseCaseCategory>('all');
  const [selectedSubTab, setSelectedSubTab] = useState<'consumer' | 'pro'>('consumer');
  const [selected20Tab, setSelected20Tab] = useState<'deepseek' | 'cursor' | 'router'>('deepseek');
  const [selected100Tab, setSelected100Tab] = useState<'multisub' | 'api100' | 'team100'>('multisub');
  const [selected200Tab, setSelected200Tab] = useState<'chatgptpro' | 'api200' | 'cloudgpu'>('chatgptpro');

  const filteredGuides =
    activeCategory === 'all'
      ? USE_CASE_GUIDES
      : USE_CASE_GUIDES.filter((g) => g.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* 1. HERO HEADER */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>NextVector Strategic Intelligence • September 2026</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 font-sans tracking-tight">
            The 2026 Model Decision Matrix & Budget Tradeoff Engine
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Stop overpaying for compute. Match your specific engineering task to the optimal model, understand the true opportunity cost across <strong>$20, $100, and $200/month</strong> budgets, and verify exact tier availability before subscribing.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Global #1 Model</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">GPT-6 Astra</span>
            <span className="text-[11px] text-emerald-400 font-mono block">1420 Elo • Plus (Limited), Pro ($200), API</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Reasoning Leader</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">Claude Opus 5</span>
            <span className="text-[11px] text-purple-400 font-mono block">1416 Elo • Claude Pro ($20), API, Team</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Pareto Champion</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">DeepSeek-V4-Pro</span>
            <span className="text-[11px] text-cyan-400 font-mono block">$0.75 / 1M • Open API & Weights</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Context Record</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">Gemini 3.8 Flash</span>
            <span className="text-[11px] text-amber-400 font-mono block">2,000,000 Tokens • $20 Sub / API</span>
          </div>
        </div>
      </div>

      {/* CLAUDE MYTHOS & FRONTIER ACCESS AUDIT ALERT */}
      <div className="p-4 md:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono shadow-lg">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 uppercase tracking-wide">
              Verified Subscription & Tier Access Audit (September 2026)
            </span>
            <p className="text-zinc-300 leading-relaxed font-sans text-xs">
              <strong>ChatGPT Plus ($20/mo)</strong> grants access to <strong>GPT-6 Astra (limited rate caps)</strong> alongside <strong>GPT-5.6 Sol, 5.6 Terra, and 5.6 Luna</strong>. Full unmetered Astra Operator computer use requires <strong>ChatGPT Pro ($200/mo)</strong>.
              <br className="my-1" />
              <strong>Claude Pro ($20/mo)</strong> grants access to <strong>Opus 5</strong> (complex tasks), <strong>Sonnet 5</strong> (everyday default), and <strong>Haiku 4.5</strong> (fastest), plus extended legacy models (Opus 4.8–4.6). <strong>Claude Fable 5.1</strong> is exclusive to commercial API / enterprise, and <strong>Claude Mythos 5.1</strong> is strictly restricted to <strong>Project Glasswing</strong> defense enclaves.
            </p>
          </div>
        </div>
        <div className="shrink-0 px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
          Live Model Menus Verified
        </div>
      </div>

      {/* 2. THE MULTI-TIER BUDGET TRADEOFF ENGINE ($20, $100, $200) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <Coins className="w-4 h-4" />
              <span>Capital Efficiency & Opportunity Cost Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">
              Budget Tradeoff: Where Should You Spend Your AI Budget?
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Select your monthly budget to see the exact opportunity cost between consumer web subscriptions, developer API credits, and multi-model tools.
            </p>
          </div>

          {/* Budget Tier Selector */}
          <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl shrink-0 overflow-x-auto max-w-full scrollbar-none">
            <span className="text-[11px] font-mono text-zinc-500 pl-2 pr-1 hidden sm:inline">Budget:</span>
            <button
              onClick={() => setActiveBudget('20')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeBudget === '20'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="hidden sm:inline">$20 / Month</span>
              <span className="sm:hidden">$20/mo</span>
            </button>
            <button
              onClick={() => setActiveBudget('100')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeBudget === '100'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="hidden sm:inline">$100 / Month</span>
              <span className="sm:hidden">$100/mo</span>
            </button>
            <button
              onClick={() => setActiveBudget('200')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeBudget === '200'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="hidden sm:inline">$200 / Month</span>
              <span className="sm:hidden">$200/mo</span>
            </button>
          </div>
        </div>

        {/* ----------------- $20 BUDGET TIER ----------------- */}
        {activeBudget === '20' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-zinc-400">
                Evaluating paths for a <strong>$20/Month</strong> entry / solo developer budget:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto max-w-full scrollbar-none">
                <button
                  onClick={() => setSelected20Tab('deepseek')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selected20Tab === 'deepseek'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  26.6M Tokens
                </button>
                <button
                  onClick={() => setSelected20Tab('cursor')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selected20Tab === 'cursor'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Cursor Pro ($20)
                </button>
                <button
                  onClick={() => setSelected20Tab('router')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selected20Tab === 'router'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Pay-As-You-Go
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* $20 Path 1: Consumer Web Sub */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 1 (Consumer Sub)
                    </span>
                    <span className="text-lg font-bold font-mono text-zinc-100 whitespace-nowrap">$20 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    Single Lab Web Subscription
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Buying either <strong>ChatGPT Plus</strong> (GPT-6 Astra [limited], Sol, Terra, Luna) or <strong>Claude Pro</strong> (Opus 5, Sonnet 5, Haiku 4.5).
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>ChatGPT Plus:</strong> GPT-6 Astra (limited), GPT-5.6 Sol, Terra & Luna with Canvas & Voice.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Claude Pro:</strong> Opus 5 for complex tasks, Sonnet 5 for daily work, Haiku 4.5 for speed, plus Artifacts 3.0.</span>
                    </div>
                    <div className="flex items-start gap-2 text-amber-400/90 pt-1">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Strict Message Caps:</strong> Astra and Opus 5 are heavily rate-limited (~40 msgs / 5 hrs).</span>
                    </div>
                    <div className="flex items-start gap-2 text-amber-400/90">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Unused quota expires at month end. No API access or IDE integration.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                  Best for: Conversational daily chat, interactive web artifacts & brainstorming.
                </div>
              </div>

              {/* $20 Path 2: Dynamic Token Volume / Tool */}
              <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      {selected20Tab === 'deepseek' && 'Option 2 (Token Volume)'}
                      {selected20Tab === 'cursor' && 'Option 2 (Multi-Model IDE)'}
                      {selected20Tab === 'router' && 'Option 2 (API Router)'}
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-400 whitespace-nowrap">
                      {selected20Tab === 'deepseek' && '$20 Total'}
                      {selected20Tab === 'cursor' && '$20 / Month'}
                      {selected20Tab === 'router' && '$20 Deposit'}
                    </span>
                  </div>

                  {selected20Tab === 'deepseek' && (
                    <>
                      <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                        <span>26.6M Tokens on DeepSeek-V4-Pro</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        At <strong>$0.75 per 1M tokens</strong>, your $20 purchases an astonishing <strong>26,666,000 tokens</strong> of verified 1404 Elo intelligence.
                      </p>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Equivalent Reading:</span>
                          <span className="text-emerald-400 font-semibold">~53 Complete Textbooks</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Code Refactors:</span>
                          <span className="text-emerald-400 font-semibold">~13,300 Deep Queries</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Typical Duration:</span>
                          <span className="text-emerald-400 font-semibold">4 to 8 Months of Usage</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selected20Tab === 'cursor' && (
                    <>
                      <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                        <span>Multi-Model IDE (Cursor Pro / Windsurf)</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        Instead of paying $40/mo for separate consumer accounts, a single $20 IDE plan provides in-editor access to <strong>Claude Sonnet 5, GPT-5.6 Sol, and DeepSeek-V4</strong>.
                      </p>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Dual Lab Cost:</span>
                          <span className="line-through text-zinc-600">$40.00 / mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">IDE Plan Cost:</span>
                          <span className="text-emerald-400 font-semibold">$20.00 / mo (Save 50%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Fast Requests:</span>
                          <span className="text-emerald-400 font-semibold">500 / mo + Unlimited Standard</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selected20Tab === 'router' && (
                    <>
                      <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                        <span>Pay-Per-Token Multi-Provider Routing</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        Deposit $20 into an API router (OpenRouter, Together, or direct keys). You pay only for what you run with <strong>zero subscription expiration</strong>.
                      </p>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">10 Deep Proofs:</span>
                          <span className="text-zinc-300 font-semibold">$0.30 (Claude Opus 5)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">50 Complex Edits:</span>
                          <span className="text-zinc-300 font-semibold">$1.20 (GPT-6 Astra API)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">2,000 Routine Queries:</span>
                          <span className="text-emerald-400 font-semibold">$1.50 (DeepSeek-V4)</span>
                        </div>
                        <div className="flex justify-between border-t border-zinc-800 pt-1 text-emerald-400">
                          <span>Total Spent:</span>
                          <span>$3.00 (Leaves $17 Balance)</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    {selected20Tab === 'cursor' ? (
                      <>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Switch seamlessly between Claude Sonnet 5, GPT-5.6 Sol & DeepSeek.</span>
                        </div>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Full repository semantic indexing & background terminal execution.</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Credits never expire at month end. Zero message rate limits.</span>
                        </div>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Connect to open frontends (LibreChat, TypingMind, Cline, Aider).</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-emerald-400 font-semibold">
                  Best for: Developers & engineers optimizing for maximum ROI.
                </div>
              </div>

              {/* $20 Path 3: Free / Self-Hosted */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 3 (Zero Cost)
                    </span>
                    <span className="text-lg font-bold font-mono text-cyan-400 whitespace-nowrap">$0 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    Local Open-Weights Deployment
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Running state-of-the-art open models directly on your own hardware using Ollama, vLLM, or LM Studio.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Qwen3.8-27B</strong> (Apache 2.0): 1368 Elo on a single 24GB GPU.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>100% private, zero telemetry, air-gapped security, unlimited usage.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-400">
                      <AlertTriangle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                      <span>Requires workstation hardware (e.g. RTX 4090/5090 or Apple Silicon 64GB+).</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                  Best for: Strict corporate compliance, offline privacy & hobbyists.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- $100 BUDGET TIER ----------------- */}
        {activeBudget === '100' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-zinc-400">
                Evaluating paths for a <strong>$100/Month</strong> pro engineer / prototype stack budget:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                <button
                  onClick={() => setSelected100Tab('multisub')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selected100Tab === 'multisub'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Tri-Lab Pro Suite
                </button>
                <button
                  onClick={() => setSelected100Tab('api100')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selected100Tab === 'api100'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  133M Token Fleet
                </button>
                <button
                  onClick={() => setSelected100Tab('team100')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selected100Tab === 'team100'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Team Seat Tier
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* $100 Path 1: Tri-Lab Bundle */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 1 (Pro Suite)
                    </span>
                    <span className="text-lg font-bold font-mono text-zinc-100 whitespace-nowrap">$100 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    The Tri-Lab Suite + API Buffer
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Combines the best of OpenAI, Anthropic, and in-editor agent tools while maintaining a dedicated API headroom buffer.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">ChatGPT Plus:</span>
                      <span className="text-zinc-200 font-semibold">$20 (Astra [ltd] + Sol/Terra)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Claude Pro:</span>
                      <span className="text-zinc-200 font-semibold">$20 (Opus 5 + Sonnet 5)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Cursor Pro:</span>
                      <span className="text-zinc-200 font-semibold">$20 (In-Editor Agent)</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-800 pt-1 text-emerald-400">
                      <span>API Headroom Buffer:</span>
                      <span>$40 / mo (Uncapped Astra/Opus 5)</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Zero downtime: switch effortlessly between OpenAI and Anthropic when hitting hourly caps.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>$40 API reserve allows triggering uncapped autonomous agent scripts when web chat is capped.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                  Best for: Technical product leads & consultants needing all UIs.
                </div>
              </div>

              {/* $100 Path 2: 133M API Token Fleet */}
              <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      Option 2 (API Powerhouse)
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-400 whitespace-nowrap">$100 in Credits</span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                    <span>133.3M Tokens on DeepSeek-V4-Pro</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Direct developer credit allocation yielding massive programmatic throughput across autonomous agents like Claude Code, Cline, and Aider.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">DeepSeek Volume:</span>
                      <span className="text-emerald-400 font-semibold">133,333,000 Tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Frontier Equivalent:</span>
                      <span className="text-zinc-200 font-semibold">12.6M Tokens (Astra/Fable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Cached Read Volume:</span>
                      <span className="text-emerald-400 font-semibold">Up to 400M Cached Tokens</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-800 pt-1 text-emerald-400">
                      <span>Codebase Ingestion:</span>
                      <span>~260 Complete Repositories</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Empowers continuous background CI/CD unit testing and code refactoring.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Uses Anthropic $0.25/1M prompt caching for repeated codebase queries.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-emerald-400 font-semibold">
                  Best for: Software engineers running high-volume autonomous agents.
                </div>
              </div>

              {/* $100 Path 3: Team Tier */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 3 (Team Seats)
                    </span>
                    <span className="text-lg font-bold font-mono text-cyan-400 whitespace-nowrap">$100 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    Claude Team / ChatGPT Team (3 Seats)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Enterprise collaboration tier with elevated limits and zero data retention for training.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>5x Higher Rate Limits:</strong> Significantly higher caps on Opus 5, Sonnet 5, and GPT-6 Astra.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Shared Knowledge Base:</strong> Shared projects, prompts, and document repositories.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Zero Data Training:</strong> Commercial terms strictly prohibit training on corporate data.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                  Best for: Small engineering squads, startups & agency teams.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- $200 BUDGET TIER ----------------- */}
        {activeBudget === '200' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-zinc-400">
                Evaluating paths for a <strong>$200/Month</strong> frontier power-user / autonomous agent budget:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                <button
                  onClick={() => setSelected200Tab('chatgptpro')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selected200Tab === 'chatgptpro'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  ChatGPT Pro ($200)
                </button>
                <button
                  onClick={() => setSelected200Tab('api200')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selected200Tab === 'api200'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  266M Token Swarm
                </button>
                <button
                  onClick={() => setSelected200Tab('cloudgpu')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selected200Tab === 'cloudgpu'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Dedicated Cloud GPU
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* $200 Path 1: ChatGPT Pro */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      Option 1 (Frontier Consumer)
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-400 whitespace-nowrap">$200 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    ChatGPT Pro (Frontier Operator)
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    The only consumer subscription that unlocks <strong>unmetered GPT-6 Astra Operator</strong> with native pixel-based autonomous computer & browser control.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Flagship Model:</span>
                      <span className="text-emerald-400 font-semibold">GPT-6 Astra (Rank #1, 1420 Elo)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Autonomous Execution:</span>
                      <span className="text-emerald-400 font-semibold">OSWorld Leader (Desktop/Web)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Reasoning Quota:</span>
                      <span className="text-emerald-400 font-semibold">Unlimited High-Compute Runs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Research Agent:</span>
                      <span className="text-zinc-300 font-semibold">Multi-Hour Deep Research</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Zero API configuration needed; executes workflows directly on virtual desktop.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>No 5-hour message throttling even under heavy agentic workloads.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-emerald-400 font-semibold">
                  Best for: Technical founders, power researchers & non-dev operators.
                </div>
              </div>

              {/* $200 Path 2: 266M Token Agent Swarm */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 2 (Agent Swarm)
                    </span>
                    <span className="text-lg font-bold font-mono text-zinc-100 whitespace-nowrap">$200 in Credits</span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    Frontier API Swarm Cluster
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Allocates $200 directly into API endpoints to power autonomous coding agents across multi-thousand-step refactoring loops.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">DeepSeek Token Volume:</span>
                      <span className="text-emerald-400 font-semibold">266,666,000 Tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Frontier API Volume:</span>
                      <span className="text-zinc-200 font-semibold">25.3M Tokens (Astra / Fable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Cached Context Read:</span>
                      <span className="text-emerald-400 font-semibold">Up to 800M Tokens</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-800 pt-1 text-emerald-400">
                      <span>Agent Workflows:</span>
                      <span>Continuous 24/7 Agent Swarms</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Full access to <strong>Claude Fable 5.1</strong> ($7.90/1M) and <strong>GPT-6 Astra API</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Unused credits roll over perpetually with zero monthly forfeiture.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                  Best for: AI software engineers, quantitative teams & agent architects.
                </div>
              </div>

              {/* $200 Path 3: Dedicated Cloud GPU */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 3 (Dedicated Cloud)
                    </span>
                    <span className="text-lg font-bold font-mono text-cyan-400 whitespace-nowrap">$200 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">
                    Dedicated Cloud GPU Instance (RunPod / Lambda)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Rent a dedicated 24GB/48GB GPU instance (e.g. 1x RTX 4090 @ $0.27/hr × 730 hrs ≈ $197/mo) hosting vLLM 24/7.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Zero Rate Limits:</strong> Send millions of requests with 100% predictable fixed monthly cost.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Complete Data Sovereignty:</strong> No external API keys, zero prompt logging or leakage.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Host custom fine-tuned weights of Qwen3.8-27B or DeepSeek-V4-Flash.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                  Best for: Enterprise security compliance, privacy-first startups & continuous batch pipelines.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Takeaway Summary Box */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3 text-xs font-sans">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-zinc-200 font-mono">NextVector Capital Efficiency Rule:</span>
            {activeBudget === '20' && (
              <p className="text-zinc-400 leading-relaxed">
                Both $20 subscriptions now provide access to premier frontier intelligence: <strong>ChatGPT Plus ($20)</strong> offers <strong>GPT-6 Astra (limited)</strong> plus Sol, Terra, and Luna, while <strong>Claude Pro ($20)</strong> offers <strong>Opus 5</strong> (complex tasks) and <strong>Sonnet 5</strong> (everyday default) with Artifacts 3.0. However, if your daily workflow is high-volume coding, <strong>Cursor Pro ($20)</strong> or <strong>$20 in DeepSeek API credits (26.6M tokens)</strong> provides dramatically higher throughput without 5-hour rate limits.
              </p>
            )}
            {activeBudget === '100' && (
              <p className="text-zinc-400 leading-relaxed">
                For $100/mo, avoid buying 5 separate consumer subscriptions. The Pareto-optimal stack is <strong>Cursor Pro ($20) + $80 API credits</strong> (routing between DeepSeek-V4 for bulk code generation and Claude Fable 5.1 with prompt caching for deep reasoning). For non-developers, the <strong>Tri-Lab Suite ($60 subs + $40 API)</strong> guarantees zero throttling across all major models.
              </p>
            )}
            {activeBudget === '200' && (
              <p className="text-zinc-400 leading-relaxed">
                At $200/mo, the decision comes down to interface: if you want autonomous desktop & browser automation out of the box, <strong>ChatGPT Pro ($200)</strong> with unmetered GPT-6 Astra is unbeatable. If you write code and use terminal agents (Cline, Claude Code, Aider), spending <strong>$200 on direct API credits</strong> yields up to 266M tokens of DeepSeek or 25M tokens of pure frontier Astra/Fable with prompt caching.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE USE-CASE DECISION MATRIX */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Architectural Task Mapping</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">
              When to Use Which Model: Use-Case Matrix
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Verified tier access and Pareto-optimal assignments across 2026 engineering workloads.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { label: 'All Tasks', value: 'all' },
              { label: 'Coding & Agents', value: 'coding' },
              { label: 'Deep STEM', value: 'reasoning' },
              { label: 'Massive Context', value: 'context' },
              { label: 'Pipelines & RAG', value: 'rag' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as UseCaseCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="border-b border-zinc-850 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    {guide.subtitle}
                  </span>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">{guide.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-sans leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                {/* Model Picks */}
                <div className="space-y-3">
                  {/* Frontier Pick */}
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🥇 Gold Standard
                        </span>
                        <span className="text-xs font-mono text-zinc-400">Rank #{guide.frontierPick.rank} • {guide.frontierPick.elo} Elo</span>
                      </div>
                      <button
                        onClick={() => onSelectModel(guide.frontierPick.modelId)}
                        className="text-sm font-bold text-zinc-100 hover:text-emerald-400 cursor-pointer transition-colors inline-flex items-center gap-1 text-left"
                      >
                        <span>{guide.frontierPick.name}</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </button>
                      <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                        {guide.frontierPick.why}
                      </p>
                      <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
                        {guide.frontierPick.tierAvailability}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 bg-zinc-800 px-2 py-1 rounded shrink-0">
                      {guide.frontierPick.price}
                    </span>
                  </div>

                  {/* Value Champion Pick */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          💰 Value Champion
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">{guide.valuePick.savings}</span>
                      </div>
                      <button
                        onClick={() => onSelectModel(guide.valuePick.modelId)}
                        className="text-sm font-bold text-zinc-100 hover:text-emerald-400 cursor-pointer transition-colors inline-flex items-center gap-1 text-left"
                      >
                        <span>{guide.valuePick.name}</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </button>
                      <p className="text-[11px] text-zinc-300 leading-normal font-sans">
                        {guide.valuePick.why}
                      </p>
                      <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {guide.valuePick.tierAvailability}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-1 rounded shrink-0 border border-emerald-500/30">
                      {guide.valuePick.price}
                    </span>
                  </div>

                  {/* Speed & Local row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      onClick={() => onSelectModel(guide.speedPick.modelId)}
                      className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                    >
                      <span className="text-[10px] text-zinc-500 block uppercase">⚡ Latency Winner</span>
                      <span className="text-zinc-200 font-semibold group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                        {guide.speedPick.name}
                        <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{guide.speedPick.metric}</p>
                      <span className="text-[9px] text-zinc-500 block mt-1">{guide.speedPick.tierAvailability}</span>
                    </button>

                    {guide.localPick && (
                      <button
                        onClick={() => guide.localPick && onSelectModel(guide.localPick.modelId)}
                        className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                      >
                        <span className="text-[10px] text-zinc-500 block uppercase">🔒 Open-Weights</span>
                        <span className="text-zinc-200 font-semibold group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                          {guide.localPick.name}
                          <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <p className="text-[10px] text-cyan-400 mt-0.5">{guide.localPick.license}</p>
                        <span className="text-[9px] text-zinc-500 block mt-1">{guide.localPick.tierAvailability}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Pro Tip Footer */}
              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-[11px] text-zinc-400 font-sans border-l-2 border-l-emerald-500">
                <span className="font-bold text-zinc-300 font-mono">NextVector Take: </span>
                {guide.proTip}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VERIFIED SUBSCRIPTION BUYER'S GUIDE MATRIX ($20 vs $100-$200) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Verified Subscription Buyer's Guide</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">
              Which Paid Plan Should You Buy?
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Direct side-by-side comparison of active consumer and professional tiers in September 2026.
            </p>
          </div>

          {/* Subscriptions Switcher: $20 vs $100-$200 */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setSelectedSubTab('consumer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedSubTab === 'consumer'
                  ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              $20/Month Consumer Plans
            </button>
            <button
              onClick={() => setSelectedSubTab('pro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedSubTab === 'pro'
                  ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              $100 – $200 Pro & Frontier Plans
            </button>
          </div>
        </div>

        {/* $20 CONSUMER PLANS */}
        {selectedSubTab === 'consumer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Claude Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">Anthropic</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Claude Pro</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Full web suite featuring <strong>Opus 5</strong>, <strong>Sonnet 5</strong>, and <strong>Haiku 4.5</strong> with Artifacts 3.0 and Projects.
                </p>

                {/* Verified Model Selector Menu Display */}
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center text-purple-300 font-semibold">
                    <span>Opus 5</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Complex tasks</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-400 font-semibold">
                    <span>Sonnet 5 ✓</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Everyday default</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span>Haiku 4.5</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Fastest answers</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-1 text-[10px] text-zinc-500">
                    Legacy: Opus 4.8, 4.7, 4.6 & Sonnet 4.6
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Artifacts 3.0 for interactive previews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Clean non-slop technical documentation</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[10px] font-mono text-amber-300/90 leading-tight">
                  ⚠️ <strong>Note:</strong> Claude Fable 5.1 is API/Enterprise ($7.90/1M). Claude Mythos 5.1 is restricted to Project Glasswing defense enclaves.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-purple-300">Best for:</strong> Technical writers, essayists & researchers.
              </div>
            </div>

            {/* OpenAI Plus */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">OpenAI</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">ChatGPT Plus</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Web chat suite giving access to <strong>GPT-6 Astra (limited)</strong> alongside <strong>GPT-5.6 Sol, Terra, and Luna</strong>.
                </p>

                {/* Verified Model Selector Menu Display */}
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center text-emerald-400 font-semibold">
                    <span>GPT-6 Astra</span>
                    <span className="text-[10px] text-amber-400 font-normal">Limited rate caps</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-200 font-semibold">
                    <span>GPT-5.6 Sol</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Rank #4, 1415 Elo</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span>GPT-5.6 Terra</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Rank #12, 1400 Elo</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-1 text-[10px] text-zinc-500 flex justify-between">
                    <span>GPT-5.6 Luna</span>
                    <span>Rank #29, 1369 Elo</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time Advanced Voice conversation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Canvas inline document and code editing</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[10px] font-mono text-amber-300/90 leading-tight">
                  ⚠️ <strong>Note:</strong> Unmetered Astra Operator (desktop/browser agent) requires ChatGPT Pro ($200/mo) or the API.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Generalists, operators & product teams.
              </div>
            </div>

            {/* Gemini Advanced */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase">Google</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Gemini Advanced</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Access to <strong>Gemini 3.8 Flash</strong> and <strong>Gemini 3.1 Pro</strong> with a 2,000,000 token context window and 2TB Google Drive storage.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Massive 2M token context window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Native multi-hour video and audio analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Includes 2TB Google One Cloud Storage</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 leading-tight">
                  ✨ <strong>Bonus:</strong> Directly integrates with Gmail, Docs, Drive, and Google Calendar.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-blue-300">Best for:</strong> Media analysts & Google Workspace users.
              </div>
            </div>

            {/* Cursor Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">IDE Multi-Lab</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Cursor Pro / Windsurf</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Multi-model coding agent that routes between <strong>Claude Sonnet 5</strong>, <strong>GPT-5.6 Sol</strong>, and <strong>DeepSeek-V4</strong> inside VS Code.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Access both OpenAI & Anthropic for $20</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Full codebase indexing & background terminal execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>500 fast requests + unlimited standard queries</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 leading-tight">
                  ✨ <strong>Developer Value:</strong> Saves $20/mo vs paying OpenAI & Anthropic separately.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-cyan-300">Best for:</strong> Professional software engineers.
              </div>
            </div>
          </div>
        )}

        {/* $100 - $200 PRO & FRONTIER PLANS */}
        {selectedSubTab === 'pro' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* ChatGPT Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-emerald-500/50 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-2xl shadow-emerald-950/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">OpenAI Elite</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">$200 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">ChatGPT Pro</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Full unmetered access to <strong>GPT-6 Astra Operator</strong> (autonomous desktop/browser agent) and unlimited high-compute reasoning.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unmetered GPT-6 Astra autonomous computer use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero rate limits or 5-hour throttling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Autonomous Deep Research recursive agent</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Technical founders & research directors.
              </div>
            </div>

            {/* Claude Team */}
            <div className="rounded-2xl bg-zinc-950 border border-purple-500/40 p-6 flex flex-col justify-between space-y-4 hover:border-purple-400 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">Anthropic Team</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">$100 / mo (3 seats)</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Claude Team</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Multi-seat collaborative workspace with <strong>5x higher rate limits</strong> on Claude Opus 5 & Sonnet 5, shared project repos, and admin security.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>5x message limits on Opus 5 & Sonnet 5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Centralized project repositories & docs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Zero data training guarantee under SOC-2</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-purple-300">Best for:</strong> Engineering teams & security-conscious startups.
              </div>
            </div>

            {/* Frontier API Pool */}
            <div className="rounded-2xl bg-zinc-950 border border-cyan-500/40 p-6 flex flex-col justify-between space-y-4 hover:border-cyan-400 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Direct API</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">$100 - $200 Pool</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Frontier API Keys</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Direct commercial access to <strong>Claude Fable 5.1</strong> ($7.90/1M) and <strong>GPT-6 Astra API</strong> with $0.25/1M prompt caching.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Access genuine frontier tier (Fable 5.1 & Astra)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>$0.25/1M prompt caching read discounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Powers autonomous agent swarms (Claude Code, Cline)</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-cyan-300">Best for:</strong> Agent developers & automation architects.
              </div>
            </div>

            {/* Dedicated Cloud Instance */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Self-Hosted Cloud</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold">$200 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Dedicated GPU Cloud</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Dedicated 24/7 cloud GPU (e.g. 1x RTX 4090 on RunPod) hosting <strong>Qwen3.8-27B</strong> or <strong>DeepSeek-V4-Flash</strong> via vLLM.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Predictable zero-marginal-cost inference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Complete air-gapped data privacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Zero rate limits or third-party TOS constraints</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                <strong className="text-zinc-300">Best for:</strong> Defense contractors & high-volume batch pipelines.
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
