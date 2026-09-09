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
} from 'lucide-react';

interface ModelDecisionGuideProps {
  onSelectModel: (modelId: string) => void;
}

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
    why: string;
  };
  valuePick: {
    name: string;
    modelId: string;
    rank: number;
    elo: number;
    price: string;
    savings: string;
    why: string;
  };
  speedPick: {
    name: string;
    modelId: string;
    metric: string;
    why: string;
  };
  localPick?: {
    name: string;
    modelId: string;
    license: string;
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
      why: 'Global Rank #1. Unrivaled multi-step tool execution and autonomous operating system control.',
    },
    valuePick: {
      name: 'DeepSeek-V4-Pro',
      modelId: 'model-deepseek-v4-pro-0813',
      rank: 10,
      elo: 1404,
      price: '$0.75 / 1M input',
      savings: '90.6% cheaper',
      why: 'Delivers ~98.8% of frontier coding Elo at 1/10th the cost of proprietary APIs. Ideal for high-frequency test loops.',
    },
    speedPick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      metric: 'Sub-300ms TTFT',
      why: 'Instant inline code autocomplete and instantaneous single-function generation.',
    },
    localPick: {
      name: 'DeepSeek-V4-Pro (Open Weights)',
      modelId: 'model-deepseek-v4-pro-0813',
      license: 'Apache 2.0',
      why: 'Full multi-expert weights available for self-hosted enterprise clusters with zero code telemetry.',
    },
    proTip:
      'Architecture Pattern: Use Gemini 3.8 Flash or DeepSeek-V4-Pro for initial code scaffolding and unit test generation. Escalate only failing test runs to GPT-6 Astra for architectural resolution.',
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
      why: 'Exceptional test-time reasoning density and nuanced step-by-step mathematical proof verification.',
    },
    valuePick: {
      name: 'DeepSeek-V4-Pro',
      modelId: 'model-deepseek-v4-pro-0813',
      rank: 10,
      elo: 1404,
      price: '$0.75 / 1M input',
      savings: '90.4% cheaper',
      why: 'Trained with extreme reinforcement learning; matches closed frontier reasoning models across AIME and MATH benchmarks.',
    },
    speedPick: {
      name: 'Claude Fable 5.1',
      modelId: 'model-claude-fable-5-1',
      metric: 'Adaptive Thinking',
      why: 'Dynamically allocates reasoning token budget based on query complexity to avoid unnecessary latency.',
    },
    localPick: {
      name: 'Qwen3.8-27B',
      modelId: 'model-qwen3-8-27b',
      license: 'Apache 2.0',
      why: 'Runs comfortably on a single workstation GPU (RTX 5090 / 4090) while outperforming previous-generation 70B models.',
    },
    proTip:
      'Cost Efficiency: DeepSeek-V4-Pro delivers comparable MATH benchmark accuracy to frontier reasoning APIs. Reserve Claude Opus 5 for multi-disciplinary scientific synthesis requiring novel hypotheses.',
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
      why: 'Superior document understanding and 99.9% needle retrieval accuracy across full 1M token windows with prompt caching.',
    },
    valuePick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      rank: 15,
      elo: 1395,
      price: '$0.85 / 1M input',
      savings: '2M Context King',
      why: 'The only frontier model offering 2,000,000 tokens of context at sub-$1/1M pricing. Ingests 10 full codebases simultaneously.',
    },
    speedPick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      metric: 'Fast Ingestion',
      why: 'TPU v5e architecture processes 1M tokens of text and video in under 4 seconds.',
    },
    localPick: {
      name: 'DeepSeek-V4-Flash-Vision-Exp',
      modelId: 'model-deepseek-v4-flash-vision-exp',
      license: 'Apache 2.0',
      why: 'Supports 200k local context with memory-efficient Multi-Head Latent Attention (MLA).',
    },
    proTip:
      'Prompt Caching Secret: Both Anthropic (Claude Fable 5.1) and DeepSeek support prompt caching. Repeated queries against the same 500k-token repository cost 80–90% less on subsequent requests.',
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
      why: 'Maximum reliability for mission-critical enterprise workloads with strict zero-data-retention guarantees.',
    },
    valuePick: {
      name: 'DeepSeek-V4-Pro',
      modelId: 'model-deepseek-v4-pro-0813',
      rank: 10,
      elo: 1404,
      price: '$0.75 / 1M input',
      savings: 'Unbeatable Pareto',
      why: 'The definitive Pareto frontier champion: 1404 Elo for $0.75/1M. Processing 100M tokens costs $75 instead of $780.',
    },
    speedPick: {
      name: 'Gemini 3.8 Flash',
      modelId: 'model-gemini-3-8-flash',
      metric: 'High Throughput',
      why: 'Handles massive concurrent requests with minimal rate limit throttling.',
    },
    localPick: {
      name: 'Qwen3.8-27B',
      modelId: 'model-qwen3-8-27b',
      license: 'Apache 2.0',
      why: 'Zero API costs. Deployable on internal Kubernetes clusters via vLLM or SGLang.',
    },
    proTip:
      'The 90/10 Enterprise Rule: Route 90% of routine categorization and summarization queries through DeepSeek-V4-Pro or Gemini 3.8 Flash ($0.75/1M). Route only the remaining 10% edge cases to GPT-6 Astra.',
  },
];

export const ModelDecisionGuide: React.FC<ModelDecisionGuideProps> = ({ onSelectModel }) => {
  const [activeCategory, setActiveCategory] = useState<UseCaseCategory>('all');
  const [selectedTradeoffTab, setSelectedTradeoffTab] = useState<'deepseek' | 'router' | 'cursor'>('deepseek');

  const filteredGuides = activeCategory === 'all'
    ? USE_CASE_GUIDES
    : USE_CASE_GUIDES.filter((g) => g.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* 1. HERO BANNER: DECISION MATRIX */}
      <div className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-emerald-500/30 p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Compass className="w-4 h-4" />
            <span>NextVector Strategic Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 font-sans tracking-tight">
            The 2026 Model Decision Matrix & $20 Tradeoff Engine
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Stop overpaying for compute. Match your specific engineering task to the optimal model, understand the true opportunity cost of a $20/month subscription, and build a Pareto-optimal AI stack.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Global #1 Model</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">GPT-6 Astra</span>
            <span className="text-[11px] text-emerald-400 font-mono block">1420 Arena Elo</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Reasoning Leader</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">Claude Opus 5</span>
            <span className="text-[11px] text-purple-400 font-mono block">1416 Arena Elo</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Pareto Champion</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">DeepSeek-V4-Pro</span>
            <span className="text-[11px] text-cyan-400 font-mono block">$0.75 / 1M tokens</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase block">Context Record</span>
            <span className="text-lg font-bold text-zinc-100 font-mono">Gemini 3.8 Flash</span>
            <span className="text-[11px] text-amber-400 font-mono block">2,000,000 Tokens</span>
          </div>
        </div>
      </div>

      {/* 2. THE $20 TRADEOFF & OPPORTUNITY COST ENGINE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <Coins className="w-4 h-4" />
              <span>Capital Efficiency Analysis</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">
              The $20 Tradeoff: Where Should You Spend $20/Month?
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Every dollar spent on a consumer chat subscription has an opportunity cost in API tokens and multi-model tools.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setSelectedTradeoffTab('deepseek')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedTradeoffTab === 'deepseek'
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              API Token Volume
            </button>
            <button
              onClick={() => setSelectedTradeoffTab('cursor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedTradeoffTab === 'cursor'
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Multi-Model IDE
            </button>
            <button
              onClick={() => setSelectedTradeoffTab('router')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedTradeoffTab === 'router'
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Multi-Lab Routing
            </button>
          </div>
        </div>

        {/* The 3-Way Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Path 1: Consumer Subscription */}
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
                Buying a single consumer subscription (e.g. <strong>Anthropic Pro</strong> for Claude Fable 5.1 or <strong>ChatGPT Plus</strong> for GPT-6 Astra).
              </p>

              <div className="space-y-2 pt-2 text-xs font-sans">
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Polished Web UI, Artifacts 3.0 / Canvas, and voice interaction.</span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Predictable monthly billing with unlimited lower-tier queries.</span>
                </div>
                <div className="flex items-start gap-2 text-amber-400/90 pt-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Strict message caps (e.g. 40 msgs / 5 hrs). Locked to one vendor.</span>
                </div>
                <div className="flex items-start gap-2 text-amber-400/90">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Unused monthly quota expires at month end. No API access.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
              Best for: Non-developers & casual daily chatters.
            </div>
          </div>

          {/* Path 2: API Token Portfolio */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                  {selectedTradeoffTab === 'deepseek' && 'Option 2 (Token Volume)'}
                  {selectedTradeoffTab === 'cursor' && 'Option 2 (Multi-Model IDE)'}
                  {selectedTradeoffTab === 'router' && 'Option 2 (API Router)'}
                </span>
                <span className="text-lg font-bold font-mono text-emerald-400 whitespace-nowrap">
                  {selectedTradeoffTab === 'deepseek' && '$20 Total'}
                  {selectedTradeoffTab === 'cursor' && '$20 / Month'}
                  {selectedTradeoffTab === 'router' && '$20 Deposit'}
                </span>
              </div>

              {selectedTradeoffTab === 'deepseek' && (
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

              {selectedTradeoffTab === 'cursor' && (
                <>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                    <span>Multi-Model IDE (Cursor / Windsurf)</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Instead of paying <strong>$40/mo</strong> ($20 to OpenAI + $20 to Anthropic), a $20 IDE plan gives you direct access to <strong>both GPT-6 Astra AND Claude Fable 5.1</strong> inside your code editor.
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
                      <span className="text-zinc-500">Model Flexibility:</span>
                      <span className="text-emerald-400 font-semibold">Instant In-Editor Switch</span>
                    </div>
                  </div>
                </>
              )}

              {selectedTradeoffTab === 'router' && (
                <>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                    <span>Pay-Per-Token Multi-Provider Routing</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Deposit $20 into an API router (OpenRouter, Together, or direct keys). You pay only for what you run with <strong>zero subscription expiration</strong>.
                  </p>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">10 Hard Reasoning Calls:</span>
                      <span className="text-zinc-300 font-semibold">$0.30 (Claude Opus 5)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">50 Code Refactors:</span>
                      <span className="text-zinc-300 font-semibold">$1.20 (GPT-6 Astra)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">2,000 Fast Queries:</span>
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
                {selectedTradeoffTab === 'cursor' ? (
                  <>
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Switch seamlessly between GPT-6 Astra, Claude Fable 5.1 & DeepSeek.</span>
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
                      <span>Credits never expire at month end. No message throttling or 40-msg caps.</span>
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
              Best for: Developers & engineers optimizing for ROI.
            </div>
          </div>

          {/* Path 3: Free / Self-Hosted Path */}
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
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
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
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
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
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 bg-zinc-800 px-2 py-1 rounded shrink-0">
                      {guide.frontierPick.price}
                    </span>
                  </div>

                  {/* Value Champion Pick */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
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

      {/* 4. WHICH $20 SUBSCRIPTION SHOULD YOU BUY? */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Consumer Subscription Guide</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">
            Which $20/Month Subscription Should You Buy?
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Direct comparison of the 4 primary paid AI plans available in 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Anthropic Pro */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">Anthropic</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">$20 / mo</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-100 font-sans">Claude Pro</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Direct web access to <strong>Claude Fable 5.1</strong> and <strong>Claude Opus 5</strong> with 1M context, Artifacts 3.0, and Projects.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Highest reasoning density in market</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Artifacts 3.0 for interactive previews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cleanest non-slop technical writing</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
              <strong className="text-purple-300">Best for:</strong> Software architects, essayists & researchers.
            </div>
          </div>

          {/* OpenAI Plus */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">OpenAI</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">$20 / mo</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-100 font-sans">ChatGPT Plus</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Direct access to <strong>GPT-6 Astra</strong> and <strong>GPT-5.6 Sol</strong> with Advanced Voice, web operator workflows, and Canvas.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Global Rank #1 in SWE-bench (98%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Native autonomous web & OS operator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Industry-standard Advanced Voice</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
              <strong className="text-emerald-300">Best for:</strong> Generalists, operators & product teams.
            </div>
          </div>

          {/* Gemini Advanced */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">Google</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">$20 / mo</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-100 font-sans">Gemini Advanced</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Access to <strong>Gemini 3.8 Pro</strong> and <strong>Gemini 3.8 Flash</strong> with 2M token context, Google Workspace integration, and 2TB cloud storage.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Massive 2M token context window</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Native multi-hour video/audio analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Includes 2TB Google Drive cloud storage</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
              <strong className="text-blue-300">Best for:</strong> Analysts processing big PDFs & media.
            </div>
          </div>

          {/* Cursor Pro */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">IDE Multi-Lab</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">$20 / mo</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-100 font-sans">Cursor Pro / Windsurf</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Multi-model coding agent that routes between <strong>GPT-6 Astra</strong>, <strong>Claude Fable 5.1</strong>, and <strong>DeepSeek-V4</strong> directly in VS Code.
              </p>
              <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Both OpenAI & Anthropic for $20</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct full-codebase indexing & edits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Background terminal agent execution</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
              <strong className="text-cyan-300">Best for:</strong> Professional software engineers.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
