import React, { useState } from 'react';
import { Benchmark } from '../../types';
import { ShieldCheck, AlertCircle, CheckCircle, BarChart3, Info } from 'lucide-react';

interface BenchmarkChartProps {
  benchmarks: Benchmark[];
  initialBenchmarkId?: string;
}

export const BenchmarkChart: React.FC<BenchmarkChartProps> = ({
  benchmarks,
  initialBenchmarkId,
}) => {
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>(
    initialBenchmarkId || benchmarks[0]?.id || ''
  );

  const activeBenchmark = benchmarks.find((b) => b.id === activeBenchmarkId) || benchmarks[0];

  if (!activeBenchmark) return null;

  const maxScore = Math.max(...activeBenchmark.leaderboard.map((item) => item.score), 100);

  return (
    <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>NextVector Benchmark Radar</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans">
            Verified AI Performance Intelligence
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Distinguishing real capability shifts from synthetic dataset memorization
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {benchmarks.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBenchmarkId(b.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeBenchmarkId === b.id
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800/80">
            <span>Model & Developer</span>
            <span>Verified Score (Pass@1)</span>
          </div>

          <div className="space-y-3.5">
            {activeBenchmark.leaderboard.map((entry, idx) => {
              const percentage = (entry.score / maxScore) * 100;
              const isTop = idx === 0;

              return (
                <div key={entry.modelName} className="group space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-zinc-500 w-4">{entry.rank}.</span>
                      <span className={`font-semibold ${isTop ? 'text-emerald-400 font-bold' : 'text-zinc-200'}`}>
                        {entry.modelName}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        ({entry.developer})
                      </span>
                      {entry.verifiedByNextVector && (
                        <span title="Verified by NextVector Labs">
                          <CheckCircle className="w-3 h-3 text-emerald-400 inline" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      {entry.costPerRun && (
                        <span className="text-[10px] text-zinc-500 hidden sm:inline">
                          {entry.costPerRun}
                        </span>
                      )}
                      <span className={`text-sm font-bold ${isTop ? 'text-emerald-400' : 'text-zinc-100'}`}>
                        {entry.score.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isTop
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-sm shadow-emerald-500/40'
                          : 'bg-zinc-600 group-hover:bg-zinc-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>What It Actually Measures</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {activeBenchmark.whatItMeasures}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Caveats & Contamination Risks</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {activeBenchmark.potentialLimitations}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Editorial Significance</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {activeBenchmark.whyItMatters}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
