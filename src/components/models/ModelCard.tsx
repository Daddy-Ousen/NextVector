import React from 'react';
import { AIModel } from '../../types';
import { Cpu, Scale, ArrowUpRight, DollarSign, Layers, CheckSquare, Square } from 'lucide-react';

interface ModelCardProps {
  model: AIModel;
  isSelectedForCompare: boolean;
  onToggleCompare: (modelId: string) => void;
  onSelectDetail: (modelId: string) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isSelectedForCompare,
  onToggleCompare,
  onSelectDetail,
}) => {
  return (
    <div className="group rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700/80 transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-black/40">
      <div>
        {/* Top bar: Classification & Compare toggle */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              {model.modelType}
            </span>
          </div>

          <button
            onClick={() => onToggleCompare(model.id)}
            className={`flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md transition-colors ${
              isSelectedForCompare
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-700/40 hover:bg-zinc-800'
            }`}
          >
            {isSelectedForCompare ? (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Comparing</span>
              </>
            ) : (
              <>
                <Square className="w-3.5 h-3.5" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>

        {/* Title & Developer */}
        <div className="mb-4">
          <h3 
            onClick={() => onSelectDetail(model.id)}
            className="text-lg font-bold text-zinc-100 hover:text-emerald-400 transition-colors cursor-pointer flex items-center justify-between"
          >
            <span>{model.name}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
            <span className="text-emerald-400 font-medium">{model.developer}</span>
            <span>•</span>
            <span>{model.releaseDate}</span>
          </div>
        </div>

        {/* Standardized Specification Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80 mb-4 text-xs font-mono">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Parameters</div>
            <div className="text-zinc-200 font-semibold truncate" title={model.parameters}>
              {model.parameters}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Context Window</div>
            <div className="text-zinc-200 font-semibold truncate" title={model.contextWindow}>
              {model.contextWindow}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Pricing (In/Out)</div>
            <div className="text-zinc-200 font-semibold">
              ${model.pricing.inputPer1M} / ${model.pricing.outputPer1M}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">License</div>
            <div className="text-zinc-200 font-semibold truncate" title={model.license}>
              {model.license}
            </div>
          </div>
        </div>

        {/* Key Benchmark Badges */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
            <Scale className="w-3 h-3 text-cyan-400" />
            <span>Benchmark Highlights:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {model.benchmarks.slice(0, 2).map((b, i) => (
              <div
                key={i}
                className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/50 text-[11px] font-mono text-zinc-300"
              >
                <span className="text-zinc-400">{b.benchmarkName.split(' ')[0]}: </span>
                <span className="text-emerald-400 font-bold">{b.score}{b.unit || '%'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[150px]">
          {model.openSourceStatus}
        </span>
        <button
          onClick={() => onSelectDetail(model.id)}
          className="text-emerald-400 hover:text-emerald-300 font-mono font-medium flex items-center gap-1 hover:underline"
        >
          <span>View Report</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
