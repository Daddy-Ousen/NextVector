import React, { useState } from 'react';
import { AIModel } from '../types';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft, Cpu, Scale, ExternalLink, HardDrive, ShieldAlert, CheckCircle, Calculator, BookOpen } from 'lucide-react';
import { formatBenchmarkScore, formatPrice } from '../utils';

interface ModelDetailPageProps {
  model: AIModel;
  onBack: () => void;
  onCompareWithOthers: (id: string) => void;
}

export const ModelDetailPage: React.FC<ModelDetailPageProps> = ({
  model,
  onBack,
  onCompareWithOthers,
}) => {
  // Simple token cost calculator
  const [inputTokensMillions, setInputTokensMillions] = useState(10);
  const [outputTokensMillions, setOutputTokensMillions] = useState(2);

  const hasPrice = model.pricing.inputPer1M !== null && model.pricing.outputPer1M !== null;
  const estimatedCost = hasPrice
    ? (inputTokensMillions * (model.pricing.inputPer1M ?? 0) + outputTokensMillions * (model.pricing.outputPer1M ?? 0)).toFixed(2)
    : null;

  return (
    <div className="max-w-5xl space-y-10 pb-20">
      <SEOHead
        title={`${model.name}: Specs, Price & Benchmarks`}
        description={model.summary || `${model.developer}'s ${model.name}. Context: ${model.contextWindow}.`}
        canonicalPath={`/models/${model.id}`}
        tags={model.modalities}
      />
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Models Directory</span>
        </button>

        <button
          onClick={() => onCompareWithOthers(model.id)}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 transition-colors"
        >
          Add to Comparison Tray
        </button>
      </div>

      {/* Model Spec Sheet Header */}
      <header className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 md:p-10 shadow-2xl relative">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3 py-1 rounded-full text-xs bg-zinc-900 border border-zinc-700 text-emerald-400 font-bold">
            {model.modelType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-zinc-900 border border-zinc-800 text-zinc-300">
            {model.openSourceStatus}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-zinc-900 border border-zinc-800 text-zinc-400">
            {model.releaseDate}
          </span>
          {model.arenaRank && (
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
              <span>Arena #{model.arenaRank}</span>
              {model.arenaElo && <span>• {model.arenaElo}</span>}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight">
          {model.name}
        </h1>

        <div className="flex items-center gap-3 text-sm text-zinc-400 mt-2">
          <span>Developer: <strong className="text-zinc-200">{model.developer}</strong></span>
          <span>•</span>
          <span>License: <strong className="text-zinc-200">{model.license}</strong></span>
        </div>

        {/* Primary Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80 text-xs">
          <div className="p-4 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
            <div className="text-2xs text-zinc-400 uppercase tracking-wider">Parameters</div>
            <div className="text-base font-bold text-zinc-100 mt-1">{model.parameters}</div>
          </div>
          <div className="p-4 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
            <div className="text-2xs text-zinc-400 uppercase tracking-wider">Context Window</div>
            <div className="text-base font-bold text-zinc-100 mt-1">{model.contextWindow}</div>
          </div>
          <div className="p-4 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
            <div className="text-2xs text-zinc-400 uppercase tracking-wider">Input / 1M tokens</div>
            <div className="text-base font-bold text-emerald-400 mt-1">{formatPrice(model.pricing.inputPer1M)}</div>
          </div>
          <div className="p-4 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
            <div className="text-2xs text-zinc-400 uppercase tracking-wider">Output / 1M tokens</div>
            <div className="text-base font-bold text-zinc-100 mt-1">{formatPrice(model.pricing.outputPer1M)}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-400">
          {model.pricing.cachedInputPer1M != null && <>Cached input: {formatPrice(model.pricing.cachedInputPer1M)} / 1M. </>}
          {model.pricing.note && <>{model.pricing.note}. </>}
          {model.pricing.source && <>Price source: {model.pricing.source}. </>}
          {model.releaseDateSource && <>Date: {model.releaseDateSource}.</>}
        </p>
      </header>

      {/* Architecture & Hardware Requirements */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="eyebrow flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Summary</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {model.summary || model.architectureNotes}
          </p>
          <div className="pt-2 text-xs text-zinc-400">
            Supported Modalities: <span className="text-zinc-200">{model.modalities.join(', ')}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="eyebrow flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            <span>How to Run It</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {model.hardwareRequirements}
          </p>
        </div>
      </section>

      {/* Benchmark results, each linked to its public leaderboard */}
      <section className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
        <div className="eyebrow flex items-center gap-2">
          <Scale className="w-4 h-4" />
          <span>Benchmark Results</span>
        </div>
        {model.benchmarks.length === 0 && (
          <p className="text-sm text-zinc-400">No public leaderboard result for this model in our sources yet.</p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase">
                <th className="py-2.5 px-3">Benchmark</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Run details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {model.benchmarks.map((bench, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/40">
                  <td className="py-3 px-3 text-zinc-200 font-semibold">
                    {bench.sourceUrl ? (
                      <a href={bench.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 inline-flex items-center gap-1">
                        {bench.benchmarkName} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : bench.benchmarkName}
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-bold text-sm">
                    {formatBenchmarkScore(bench)}
                  </td>
                  <td className="py-3 px-3 text-zinc-400">{bench.vsPreviousGen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Improvements vs Known Limitations (only shown when sourced text exists) */}
      {(model.keyImprovements.length > 0 || model.knownLimitations.length > 0) && (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="eyebrow flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Key Strengths & Improvements</span>
          </div>
          <ul className="space-y-2 text-sm text-zinc-300 font-sans list-disc list-inside">
            {model.keyImprovements.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="eyebrow-warn flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Known Limitations & Caveats</span>
          </div>
          <ul className="space-y-2 text-sm text-zinc-400 font-sans list-disc list-inside">
            {model.knownLimitations.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* Interactive Token Economics Calculator */}
      {hasPrice && (
      <section className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="eyebrow flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Interactive Operational Token Cost Estimator</span>
          </div>
          <span className="text-xs text-zinc-400">List price, no cache or batch discounts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Input Tokens (Millions / mo):</label>
            <input
              type="number"
              min="0"
              value={inputTokensMillions}
              onChange={(e) => setInputTokensMillions(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Output Tokens (Millions / mo):</label>
            <input
              type="number"
              min="0"
              value={outputTokensMillions}
              onChange={(e) => setOutputTokensMillions(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 flex flex-col justify-center">
            <div className="text-2xs font-mono text-zinc-400 uppercase">Estimated Monthly API Cost:</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              ${estimatedCost}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Sources */}
      {model.sources && model.sources.length > 0 && (
        <section className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="eyebrow flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Sources</span>
          </div>
          <ul className="space-y-1.5 text-sm">
            {model.sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="tap inline-flex items-center gap-1 text-emerald-400 hover:underline">
                  {src.label} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
          {model.dataAsOf && <p className="text-xs text-zinc-400">Data checked {model.dataAsOf}. Missing values mean no public source lists them.</p>}
        </section>
      )}
    </div>
  );
};
