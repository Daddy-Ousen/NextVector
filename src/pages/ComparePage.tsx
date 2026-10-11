import React, { useState, useMemo, useEffect } from 'react';
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
  Flame,
} from 'lucide-react';
import { MODEL_COUNT } from '../data/modelCount';
import { MODEL_DATA_AS_OF } from '../data/modelsData';
import { PRESET_SHOWDOWNS } from '../data/showdownsData';
import { PageHeader } from '../components/common/PageHeader';
import { formatPrice, formatBenchmarkScore, findBenchmark } from '../utils';

interface ComparePageProps {
  slug?: string;
  models: AIModel[];
  onSelectModelDetail: (id: string) => void;
  onNavigate: (path: string) => void;
  notFound?: React.ReactNode;
}

// Unknown showdown slugs render the not-found page instead of a duplicate of the default showdown
export const ComparePage: React.FC<ComparePageProps> = (props) => {
  if (props.slug && !PRESET_SHOWDOWNS.some((p) => p.slug === props.slug)) {
    return <>{props.notFound}</>;
  }
  return <ComparePageContent {...props} />;
};

const ComparePageContent: React.FC<ComparePageProps> = ({
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
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Sync state if slug changes
  useEffect(() => {
    setSelectedIdA(currentPreset.modelIdA);
    setSelectedIdB(currentPreset.modelIdB);
  }, [currentPreset]);

  const modelA = models.find((m) => m.id === selectedIdA) || models[0];
  const modelB = models.find((m) => m.id === selectedIdB) || models[1] || models[0];

  const filteredShowdowns = useMemo(() => {
    if (selectedCategoryFilter === 'all') return PRESET_SHOWDOWNS;
    return PRESET_SHOWDOWNS.filter((p) => p.category === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

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
    <div className="space-y-12 pb-24">
      <SEOHead
        title={currentPreset.seoTitle}
        description={currentPreset.seoDescription}
        canonicalPath={canonicalPath}
        schemaData={faqSchema}
        tags={[
          'AI Comparison',
          'Claude vs ChatGPT',
          'Opus vs GPT 6',
          'Gemini vs ChatGPT',
          'Grok vs ChatGPT',
          'DeepSeek vs OpenAI',
          'AI Benchmarks 2026',
          'Best AI Models',
        ]}
      />

      {/* 1. HERO & SHOWDOWN SELECTOR */}
      <PageHeader
        eyebrow="Head-to-Head Model Comparison"
        icon={<Scale className="w-4 h-4" />}
        title={currentPreset.name}
        description={<>Side-by-side data for {MODEL_COUNT} models: arena.ai text score, list price, context window, licence and public benchmark results. Every line is built from sourced data checked {MODEL_DATA_AS_OF}.</>}
      >
        <div className="mt-5 space-y-2 max-w-4xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none fade-right pb-1 pr-8">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {['all', ...Array.from(new Set(PRESET_SHOWDOWNS.map((p) => p.category)))].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer shrink-0 ${
                  selectedCategoryFilter === cat
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat === 'all' ? `All ${PRESET_SHOWDOWNS.length} Showdowns` : cat}
              </button>
            ))}
          </div>

          {/* Showdown Navigation Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {filteredShowdowns.map((p) => {
              const isActive = p.slug === currentPreset.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => onNavigate(`/compare/${p.slug}`)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
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
      </PageHeader>

      {/* 2. THE INVERTED PYRAMID EXECUTIVE VERDICT (GEO Optimized for AI Overviews) */}
      <section className="rounded-2xl bg-zinc-950 border border-emerald-500/30 p-6 md:p-8 space-y-6 shadow-xl relative">
        <div className="eyebrow flex items-center gap-2.5">
          <Award className="w-4 h-4" />
          <span>What the Data Shows</span>
        </div>

        <p className="text-base sm:text-lg text-zinc-200 font-sans leading-relaxed">
          {currentPreset.executiveVerdict}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/80">
          <div className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentPreset.verdictA.title}</span>
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans">
              {currentPreset.verdictA.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentPreset.verdictB.title}</span>
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans">
              {currentPreset.verdictB.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
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
            <h2 className="heading-section">
              Side-by-Side Architectural Specifications
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Select any model from the {MODEL_COUNT}-model registry to compare in real time
            </p>
          </div>

          {/* Model Selectors */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto min-w-0">
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="min-w-0 flex-1 sm:flex-none sm:max-w-xs bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.developer})
                </option>
              ))}
            </select>
            <span className="text-xs text-zinc-400 font-bold">VS</span>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="min-w-0 flex-1 sm:flex-none sm:max-w-xs bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500"
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
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-normal cursor-pointer"
                    >
                      Spec Sheet <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-xs text-zinc-400 block font-normal mt-0.5">
                    {modelA.developer}
                  </span>
                </th>
                <th className="p-4 text-zinc-100 w-3/8 font-bold text-base border-l border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span>{modelB.name}</span>
                    <button
                      onClick={() => onSelectModelDetail(modelB.id)}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-normal cursor-pointer"
                    >
                      Spec Sheet <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-xs text-zinc-400 block font-normal mt-0.5">
                    {modelB.developer}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 font-sans text-xs sm:text-sm">
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Arena text score</td>
                <td className="p-4 border-l border-zinc-800 font-mono font-bold text-emerald-400 text-base">
                  {modelA.arenaElo ? `${modelA.arenaElo} ±${modelA.arenaCI} (#${modelA.arenaRank})` : 'Not on Arena'}
                </td>
                <td className="p-4 border-l border-zinc-800 font-mono font-bold text-cyan-400 text-base">
                  {modelB.arenaElo ? `${modelB.arenaElo} ±${modelB.arenaCI} (#${modelB.arenaRank})` : 'Not on Arena'}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Type / Parameters</td>
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
                  {formatPrice(modelA.pricing.inputPer1M)} / 1M tokens
                </td>
                <td className="p-4 border-l border-zinc-800 font-mono text-cyan-400 font-bold">
                  {formatPrice(modelB.pricing.inputPer1M)} / 1M tokens
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">API Output Pricing</td>
                <td className="p-4 border-l border-zinc-800 font-mono text-zinc-300">
                  {formatPrice(modelA.pricing.outputPer1M)} / 1M tokens
                </td>
                <td className="p-4 border-l border-zinc-800 font-mono text-zinc-300">
                  {formatPrice(modelB.pricing.outputPer1M)} / 1M tokens
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
              {['OSWorld-Verified', 'SWE-bench Verified'].map((bench) => {
                const a = findBenchmark(modelA, bench);
                const b = findBenchmark(modelB, bench);
                return (
                  <tr key={bench}>
                    <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">{bench}</td>
                    <td className="p-4 border-l border-zinc-800 text-zinc-200">{a ? formatBenchmarkScore(a) : <span className="text-zinc-400">No result in source</span>}</td>
                    <td className="p-4 border-l border-zinc-800 text-zinc-200">{b ? formatBenchmarkScore(b) : <span className="text-zinc-400">No result in source</span>}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="p-4 font-mono text-zinc-400 font-semibold bg-zinc-900/20">Listed since</td>
                <td className="p-4 border-l border-zinc-800 text-zinc-300">{modelA.releaseDate}</td>
                <td className="p-4 border-l border-zinc-800 text-zinc-300">{modelB.releaseDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (Citable for AI Overviews & Perplexity) */}
      <section className="space-y-6 pt-6 border-t border-zinc-800">
        <div className="space-y-1">
          <div className="eyebrow flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="heading-section">
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
      <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
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
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Open AI Subscription Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
