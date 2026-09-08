import React, { useState } from 'react';
import { AIModel } from '../types';
import { ArrowLeft, Cpu, DollarSign, Scale, ExternalLink, HardDrive, ShieldAlert, CheckCircle, Calculator } from 'lucide-react';

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

  const estimatedCost = (
    inputTokensMillions * model.pricing.inputPer1M +
    outputTokensMillions * model.pricing.outputPer1M
  ).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Models Directory</span>
        </button>

        <button
          onClick={() => onCompareWithOthers(model.id)}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
        >
          Add to Comparison Tray
        </button>
      </div>

      {/* Model Spec Sheet Header */}
      <header className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-10 shadow-2xl relative">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-700 text-emerald-400 font-bold">
            {model.modelType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            {model.openSourceStatus}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
            {model.releaseDate}
          </span>
          {model.arenaRank && (
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
              <span>LMSYS Arena #{model.arenaRank}</span>
              {model.arenaElo && <span>• {model.arenaElo} Elo</span>}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight">
          {model.name}
        </h1>

        <div className="flex items-center gap-3 text-sm font-mono text-zinc-400 mt-2">
          <span>Developer: <strong className="text-zinc-200">{model.developer}</strong></span>
          <span>•</span>
          <span>License: <strong className="text-zinc-200">{model.license}</strong></span>
        </div>

        {/* Primary Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80 text-xs font-mono">
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Parameters</div>
            <div className="text-base font-bold text-zinc-100 mt-1">{model.parameters}</div>
          </div>
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Context Window</div>
            <div className="text-base font-bold text-zinc-100 mt-1">{model.contextWindow}</div>
          </div>
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Pricing (Input)</div>
            <div className="text-base font-bold text-emerald-400 mt-1">${model.pricing.inputPer1M} / 1M</div>
          </div>
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Pricing (Output)</div>
            <div className="text-base font-bold text-zinc-100 mt-1">${model.pricing.outputPer1M} / 1M</div>
          </div>
        </div>
      </header>

      {/* Architecture & Hardware Requirements */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>Architecture & Training Notes</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {model.architectureNotes}
          </p>
          <div className="pt-2 text-xs font-mono text-zinc-400">
            Supported Modalities: <span className="text-zinc-200">{model.modalities.join(', ')}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            <HardDrive className="w-4 h-4" />
            <span>Hardware & Inference Footprint</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {model.hardwareRequirements}
          </p>
        </div>
      </section>

      {/* Verified Benchmarks & Generational Deltas */}
      <section className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
          <Scale className="w-4 h-4" />
          <span>Verified Benchmark Performance</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 uppercase">
                <th className="py-2.5 px-3">Benchmark Name</th>
                <th className="py-2.5 px-3">Verified Score</th>
                <th className="py-2.5 px-3">Generational Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {model.benchmarks.map((bench, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/40">
                  <td className="py-3 px-3 text-zinc-200 font-semibold">{bench.benchmarkName}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold text-sm">
                    {bench.score}{bench.unit || '%'}
                  </td>
                  <td className="py-3 px-3 text-zinc-400">{bench.vsPreviousGen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Improvements vs Known Limitations */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
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
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
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

      {/* Interactive Token Economics Calculator */}
      <section className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            <Calculator className="w-4 h-4" />
            <span>Interactive Operational Token Cost Estimator</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">Based on published API rates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">Input Tokens (Millions / mo):</label>
            <input
              type="number"
              min="0"
              value={inputTokensMillions}
              onChange={(e) => setInputTokensMillions(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">Output Tokens (Millions / mo):</label>
            <input
              type="number"
              min="0"
              value={outputTokensMillions}
              onChange={(e) => setOutputTokensMillions(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 flex flex-col justify-center">
            <div className="text-[11px] font-mono text-zinc-400 uppercase">Estimated Monthly API Cost:</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
              ${estimatedCost}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
