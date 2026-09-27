import React, { useState, useMemo } from 'react';
import { AIModel } from '../types';
import { SEOHead } from '../components/common/SEOHead';
import {
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  DollarSign,
  Layers,
  Code2,
  Terminal,
  Zap,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface ComparePageProps {
  slug?: string;
  models: AIModel[];
  onSelectModelDetail: (id: string) => void;
  onNavigate: (path: string) => void;
}

interface PresetShowdown {
  slug: string;
  name: string;
  shortTitle: string;
  modelIdA: string;
  modelIdB: string;
  seoTitle: string;
  seoDescription: string;
  executiveVerdict: string;
  verdictA: {
    title: string;
    points: string[];
  };
  verdictB: {
    title: string;
    points: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

const PRESET_SHOWDOWNS: PresetShowdown[] = [
  {
    slug: 'claude-vs-chatgpt',
    name: 'Claude vs ChatGPT (Opus 5.5 vs GPT-6 Astra)',
    shortTitle: 'Claude vs ChatGPT',
    modelIdA: 'model-claude-opus-5-5',
    modelIdB: 'model-gpt-6-astra',
    seoTitle: 'Claude vs ChatGPT: Opus 5.5 vs GPT-6 Astra Showdown (2026) | NextVector',
    seoDescription: 'Direct head-to-head comparison of Claude Opus 5.5 vs OpenAI GPT-6 Astra. Verified Chatbot Arena Elo, SWE-bench Verified coding scores, 1M context, and pricing analysis.',
    executiveVerdict:
      'For complex multi-file coding, terminal computer operation, and zero-shot agent workflows, OpenAI GPT-6 Astra retains the Global Rank #1 position (1420 Arena Elo, 98% SWE-bench). However, Anthropic Claude Opus 5.5 (1417 Arena Elo, 73.4% SWE-bench Verified) leads in formal mathematical reasoning (native Lean 4 theorem synthesis), massive 1M-token context retention, and is 40% cheaper at $4.00/1M tokens with ultra-low $0.20/1M prompt caching.',
    verdictA: {
      title: 'Choose Claude (Opus 5.5 / Sonnet 5) if:',
      points: [
        'You need certified, machine-verified mathematical proofs or avionics code via native Lean 4 execution.',
        'You analyze massive repositories or multi-hundred-page documents in a unified 1,000,000 token context window.',
        'You build production API applications where prompt caching ($0.20/1M tokens) cuts recurring inference costs by 80–90%.',
        'You prioritize nuanced, prose-accurate writing without formulaic boilerplate or conversational sycophancy.',
      ],
    },
    verdictB: {
      title: 'Choose ChatGPT (GPT-6 Astra / Plus / Pro) if:',
      points: [
        'You require autonomous desktop computer navigation, mouse/keyboard GUI actions, and OSWorld operator capability.',
        'You want unmetered, deep deliberative reasoning across consumer desktop apps (ChatGPT Pro $200/mo tier).',
        'Your workflow benefits from multimodal voice/vision streaming and integrated DALL-E image generation.',
        'You need the absolute highest empirical coding Elo (1420 Elo) on raw repo bug solving.',
      ],
    },
    faqs: [
      {
        question: 'Which is better in 2026: Claude or ChatGPT?',
        answer:
          'Both models lead the industry across different axes. ChatGPT (powered by GPT-6 Astra) is superior for autonomous operating system navigation and raw agentic SWE-bench performance. Claude (powered by Opus 5.5 and Sonnet 5) is superior for formal mathematical verification (Lean 4), long-context document analysis (1M tokens), and cost-efficient API workloads.',
      },
      {
        question: 'Is Claude Opus 5.5 cheaper than GPT-6 Astra?',
        answer:
          'Yes. Claude Opus 5.5 costs $4.00 per million input tokens and $20.00 per million output tokens, with prompt caching reads priced at $0.20/1M. GPT-6 Astra is billed at $5.00 per million input tokens and $25.00 per million output tokens. For high-volume context analysis, Claude is approximately 20% to 80% cheaper.',
      },
      {
        question: 'Which subscription is better for coding: ChatGPT Plus or Claude Pro?',
        answer:
          'For day-to-day software development, Claude Pro ($20/mo) is preferred by senior engineers for architectural refactoring, cleaner syntax, and whole-file generation without truncation. ChatGPT Plus ($20/mo) is superior for general scripting, rapid debugging, and tasks requiring browser search integration.',
      },
    ],
  },
  {
    slug: 'opus-vs-gpt-6',
    name: 'Opus 5.5 vs GPT-6 Astra: Frontier Showdown',
    shortTitle: 'Opus vs GPT-6',
    modelIdA: 'model-claude-opus-5-5',
    modelIdB: 'model-gpt-6-astra',
    seoTitle: 'Opus vs GPT-6: Claude Opus 5.5 vs OpenAI GPT-6 Astra Comparison | NextVector',
    seoDescription: 'Empirical benchmark comparison of Claude Opus 5.5 vs GPT-6 Astra. Analysis of Lean 4 verification vs OSWorld computer use, token pricing, and context limits.',
    executiveVerdict:
      'The definitive battle between the top two frontier reasoning architectures: OpenAI GPT-6 Astra (#1, 1420 Elo) emphasizes general computer use and multi-step tool agency, while Anthropic Claude Opus 5.5 (#4, 1417 Elo) leads in formal scientific verification, 1M context length, and $4/M economics.',
    verdictA: {
      title: 'Claude Opus 5.5 Advantages:',
      points: [
        'Native Lean 4 and Coq interactive theorem proving engine.',
        '1,000,000 tokens native context window (vs 256k on GPT-6 Astra).',
        '$4.00 / $20.00 pricing with $0.20 prompt cache reads.',
        'Zero-shot machine-certified software verification.',
      ],
    },
    verdictB: {
      title: 'GPT-6 Astra Advantages:',
      points: [
        'Autonomous GUI navigation scoring 68.4% on OSWorld.',
        'Global #1 LMSYS Arena rating (1420 Elo).',
        'Direct integration with OpenAI Operator and ChatGPT desktop apps.',
        'Massive distributed agent inference ecosystem.',
      ],
    },
    faqs: [
      {
        question: 'Does Claude Opus 5.5 beat GPT-6 Astra on SWE-bench?',
        answer:
          'GPT-6 Astra holds the peak mark on raw SWE-bench (98% with test-time search scaffolding), while Claude Opus 5.5 achieves 73.4% on SWE-bench Verified with zero regressions and Lean 4 certified proof checking.',
      },
      {
        question: 'What is the context window difference between Opus 5.5 and GPT-6 Astra?',
        answer:
          'Claude Opus 5.5 features a native 1,000,000-token context window with 99.9% needle-in-a-haystack recall. GPT-6 Astra natively processes 256,000 tokens, expandable to 512,000 tokens via enterprise agreement.',
      },
    ],
  },
  {
    slug: 'grok-vs-claude',
    name: 'Grok 4.7 vs Claude Opus 5.5: Multi-Agent Face-Off',
    shortTitle: 'Grok vs Claude',
    modelIdA: 'model-grok-4-7',
    modelIdB: 'model-claude-opus-5-5',
    seoTitle: 'Grok 4.7 vs Claude Opus 5.5: Multi-Agent Reasoning Comparison | NextVector',
    seoDescription: 'Compare xAI Grok 4.7 and Anthropic Claude Opus 5.5. Analysis of native multi-agent token branching vs Lean 4 formal proofs on the Colossus supercluster.',
    executiveVerdict:
      'xAI Grok 4.7 introduces native multi-agent orchestration directly into inference decoding, branching into parallel sub-agents across a 500k context window for $3.00/1M tokens. Anthropic Claude Opus 5.5 delivers formal Lean 4 verification and 1M context at $4.00/1M tokens.',
    verdictA: {
      title: 'Grok 4.7 Advantages:',
      points: [
        'Native sub-agent branching tokens eliminate external orchestration wrappers.',
        'Trained on xAI Memphis Colossus with liquid-cooled FP4/FP8 compute.',
        '$3.00 / 1M input tokens ($0.75 prompt cache).',
        '62.4% on SWE-bench Verified and 96.8% on MATH-500.',
      ],
    },
    verdictB: {
      title: 'Claude Opus 5.5 Advantages:',
      points: [
        'Higher overall Arena Elo (1417 vs 1414).',
        'Full 1M native context window (vs 500k on Grok 4.7).',
        'Certified mathematical Lean 4 compilation engine.',
        'Extensive enterprise Bedrock and Vertex AI availability.',
      ],
    },
    faqs: [
      {
        question: 'How does Grok 4.7 compare to Claude Opus 5.5 for coding?',
        answer:
          'Grok 4.7 resolves multi-file bugs by autonomously branching parallel sub-agents to test hypotheses simultaneously. Claude Opus 5.5 uses a deeper unified reasoning loop with Lean 4 verification.',
      },
    ],
  },
  {
    slug: 'deepseek-vs-openai',
    name: 'DeepSeek-V4.1-Flash vs GPT-5.6 Sol: The Pareto War',
    shortTitle: 'DeepSeek vs OpenAI',
    modelIdA: 'model-deepseek-v4-1-flash',
    modelIdB: 'model-gpt-5-6-sol',
    seoTitle: 'DeepSeek vs OpenAI (V4.1-Flash vs GPT-5.6 Sol) Pricing & Elo Showdown | NextVector',
    seoDescription: 'DeepSeek-V4.1-Flash vs OpenAI GPT-5.6 Sol comparison. Benchmark Pareto efficiency, 160 tokens/sec throughput, and $0.14 vs $3.00 token pricing.',
    executiveVerdict:
      'DeepSeek-V4.1-Flash delivers 96% of frontier capabilities (1396 Arena Elo) at an astonishing $0.14/1M input pricing—95% cheaper than OpenAI GPT-5.6 Sol ($3.00/1M). While GPT-5.6 Sol offers strict enterprise SLAs and zero-data-retention compliance, DeepSeek provides unbeatable price-performance leverage for high-volume agent swarms.',
    verdictA: {
      title: 'DeepSeek-V4.1-Flash Advantages:',
      points: [
        '$0.14 / 1M input tokens—the lowest pricing floor in the industry.',
        '4-token Multi-Token Prediction (MTP) generating 160+ tokens/sec.',
        'Multi-Head Latent Attention v2 (MLA-2) cuts KV-cache RAM by 40%.',
        'Apache 2.0 open weights available for private self-hosting.',
      ],
    },
    verdictB: {
      title: 'GPT-5.6 Sol Advantages:',
      points: [
        'Higher Elo (1415 vs 1396) and superior edge-case disambiguation.',
        'Guaranteed zero-data-retention and SOC-2 Type II enterprise compliance.',
        'Native tool calling and structured JSON schema reliability.',
        'Dedicated capacity reservations and SLA availability.',
      ],
    },
    faqs: [
      {
        question: 'Is DeepSeek-V4.1-Flash as smart as GPT-5.6?',
        answer:
          'DeepSeek-V4.1-Flash scores 1396 Elo compared to 1415 for GPT-5.6 Sol. For 90% of routine coding, summarization, and data extraction tasks, users cannot tell them apart, while DeepSeek costs 95% less.',
      },
    ],
  },
];

export const ComparePage: React.FC<ComparePageProps> = ({
  slug,
  models,
  onSelectModelDetail,
  onNavigate,
}) => {
  // Find matching preset or default to first showdown (claude-vs-chatgpt)
  const currentPreset = useMemo(() => {
    if (!slug) return PRESET_SHOWDOWNS[0];
    return PRESET_SHOWDOWNS.find((p) => p.slug === slug) || PRESET_SHOWDOWNS[0];
  }, [slug]);

  const [selectedIdA, setSelectedIdA] = useState<string>(currentPreset.modelIdA);
  const [selectedIdB, setSelectedIdB] = useState<string>(currentPreset.modelIdB);

  // Sync state if slug changes
  React.useEffect(() => {
    setSelectedIdA(currentPreset.modelIdA);
    setSelectedIdB(currentPreset.modelIdB);
  }, [currentPreset]);

  const modelA = models.find((m) => m.id === selectedIdA) || models[0];
  const modelB = models.find((m) => m.id === selectedIdB) || models[1] || models[0];

  // FAQ Schema for GEO & Google AI Overviews
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: currentPreset.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const canonicalPath = `/compare/${currentPreset.slug}`;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-4 sm:px-6">
      <SEOHead
        title={currentPreset.seoTitle}
        description={currentPreset.seoDescription}
        canonicalPath={canonicalPath}
        schemaData={faqSchema}
        tags={['AI Comparison', 'Claude vs ChatGPT', 'Opus vs GPT 6', 'AI Benchmarks 2026', 'Best AI Models']}
      />

      {/* 1. HERO & SHOWDOWN SELECTOR */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <Scale className="w-3.5 h-3.5" />
            <span>NextVector Head-to-Head Architecture Audit • September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
            {currentPreset.name}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
            Unbiased empirical comparison evaluated across 135 models on LMSYS Arena Elo, SWE-bench Verified coding, context length, latency, and true token economics.
          </p>

          {/* Quick Preset Pills */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-1">
              Popular Showdowns:
            </span>
            {PRESET_SHOWDOWNS.map((p) => {
              const isActive = p.slug === currentPreset.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => onNavigate(`/compare/${p.slug}`)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  {p.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. THE INVERTED PYRAMID EXECUTIVE VERDICT (GEO Optimized for AI Overviews) */}
      <section className="rounded-3xl bg-zinc-950 border border-emerald-500/30 p-6 md:p-8 space-y-6 shadow-xl relative">
        <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          <Award className="w-4 h-4" />
          <span>The Bottom Line Verdict (Executive Summary)</span>
        </div>

        <p className="text-base sm:text-lg text-zinc-200 font-sans leading-relaxed">
          {currentPreset.executiveVerdict}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/80">
          <div className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentPreset.verdictA.title}</span>
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans">
              {currentPreset.verdictA.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentPreset.verdictB.title}</span>
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans">
              {currentPreset.verdictB.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SIDE-BY-SIDE SPECIFICATION COMPARISON MATRIX */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 font-sans">
              Side-by-Side Architectural Specifications
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Select any model from the 135-model registry to compare in real time
            </p>
          </div>

          {/* Model Selectors */}
          <div className="flex items-center gap-2 sm:gap-4">
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 px-3 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.developer})
                </option>
              ))}
            </select>
            <span className="text-xs font-mono text-zinc-500 font-bold">VS</span>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 px-3 py-1.5 rounded-xl focus:outline-none focus:border-cyan-500"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.developer})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* The Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="p-4 text-xs font-mono text-zinc-400 uppercase w-1/4">Specification</th>
                <th className="p-4 text-zinc-100 w-3/8 font-bold text-base border-l border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span>{modelA.name}</span>
                    <button
                      onClick={() => onSelectModelDetail(modelA.id)}
                      className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 font-normal"
                    >
                      Spec Sheet <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 block font-normal mt-0.5">
                    {modelA.developer}
                  </span>
                </th>
                <th className="p-4 text-zinc-100 w-3/8 font-bold text-base border-l border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span>{modelB.name}</span>
                    <button
                      onClick={() => onSelectModelDetail(modelB.id)}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 font-normal"
                    >
                      Spec Sheet <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 block font-normal mt-0.5">
                    {modelB.developer}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 font-sans text-xs sm:text-sm">
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">LMSYS Arena Elo</td>
                <td className="p-4 border-l border-zinc-800 font-mono font-bold text-emerald-400 text-base">
                  {modelA.arenaElo ? `${modelA.arenaElo} Elo (#${modelA.arenaRank})` : 'Unrated'}
                </td>
                <td className="p-4 border-l border-zinc-800 font-mono font-bold text-cyan-400 text-base">
                  {modelB.arenaElo ? `${modelB.arenaElo} Elo (#${modelB.arenaRank})` : 'Unrated'}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Architecture / Type</td>
                <td className="p-4 border-l border-zinc-800">{modelA.modelType} ({modelA.parameters})</td>
                <td className="p-4 border-l border-zinc-800">{modelB.modelType} ({modelB.parameters})</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Context Window</td>
                <td className="p-4 border-l border-zinc-800 font-mono font-bold text-zinc-200">{modelA.contextWindow}</td>
                <td className="p-4 border-l border-zinc-800 font-mono font-bold text-zinc-200">{modelB.contextWindow}</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">API Input Pricing</td>
                <td className="p-4 border-l border-zinc-800 font-mono text-emerald-400 font-bold">
                  ${modelA.pricing.inputPer1M.toFixed(2)} / 1M tokens
                </td>
                <td className="p-4 border-l border-zinc-800 font-mono text-cyan-400 font-bold">
                  ${modelB.pricing.inputPer1M.toFixed(2)} / 1M tokens
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">API Output Pricing</td>
                <td className="p-4 border-l border-zinc-800 font-mono text-zinc-300">
                  ${modelA.pricing.outputPer1M.toFixed(2)} / 1M tokens
                </td>
                <td className="p-4 border-l border-zinc-800 font-mono text-zinc-300">
                  ${modelB.pricing.outputPer1M.toFixed(2)} / 1M tokens
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Open Weights / License</td>
                <td className="p-4 border-l border-zinc-800">{modelA.openSourceStatus} ({modelA.license})</td>
                <td className="p-4 border-l border-zinc-800">{modelB.openSourceStatus} ({modelB.license})</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Modalities</td>
                <td className="p-4 border-l border-zinc-800">{modelA.modalities.join(', ')}</td>
                <td className="p-4 border-l border-zinc-800">{modelB.modalities.join(', ')}</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Key Strengths</td>
                <td className="p-4 border-l border-zinc-800 leading-relaxed text-zinc-300">
                  {modelA.keyImprovements[0]}
                </td>
                <td className="p-4 border-l border-zinc-800 leading-relaxed text-zinc-300">
                  {modelB.keyImprovements[0]}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Known Limitations</td>
                <td className="p-4 border-l border-zinc-800 leading-relaxed text-zinc-400">
                  {modelA.knownLimitations[0]}
                </td>
                <td className="p-4 border-l border-zinc-800 leading-relaxed text-zinc-400">
                  {modelB.knownLimitations[0]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (Citable for AI Overviews & Perplexity) */}
      <section className="space-y-6 pt-6 border-t border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>AI Overview & Search Intelligence FAQ</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 font-sans">
            Frequently Asked Questions: {currentPreset.shortTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPreset.faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2 shadow-lg"
            >
              <h3 className="text-sm font-bold text-zinc-100 font-sans">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION / SUBSCRIPTION DECISION LINK */}
      <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-zinc-100 font-sans">
            Need Help Choosing an AI Plan or Budget Tier?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Explore our comprehensive $20/mo, $100/mo, and $200/mo subscription trade-off matrix.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/subscriptions')}
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Open AI Subscription Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
