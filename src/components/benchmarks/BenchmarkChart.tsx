import React, { useState, useMemo } from 'react';
import { Benchmark } from '../../types';
import { ShieldCheck, AlertCircle, CheckCircle, BarChart3, Info, Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface BenchmarkChartProps {
  benchmarks: Benchmark[];
  initialBenchmarkId?: string;
  onSelectModel?: (modelId: string) => void;
}

export const BenchmarkChart: React.FC<BenchmarkChartProps> = ({
  benchmarks,
  initialBenchmarkId,
  onSelectModel,
}) => {
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>(
    initialBenchmarkId || benchmarks[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllEntries, setShowAllEntries] = useState(false);

  const activeBenchmark = benchmarks.find((b) => b.id === activeBenchmarkId) || benchmarks[0];

  // Check if active benchmark is Elo-based (like LMSYS Chatbot Arena)
  const isElo = activeBenchmark?.category === 'Overall Arena Elo' || (activeBenchmark?.leaderboard[0]?.score > 150);

  // Maximum and minimum scores for normalization
  const maxScore = useMemo(() => {
    if (!activeBenchmark) return 100;
    return Math.max(...activeBenchmark.leaderboard.map((item) => item.score), 100);
  }, [activeBenchmark]);

  const minScore = useMemo(() => {
    if (!activeBenchmark || !isElo) return 0;
    return Math.min(...activeBenchmark.leaderboard.map((item) => item.score));
  }, [activeBenchmark, isElo]);

  // Filtered leaderboard entries based on search query
  const filteredEntries = useMemo(() => {
    if (!activeBenchmark) return [];
    if (!searchQuery.trim()) return activeBenchmark.leaderboard;
    const q = searchQuery.toLowerCase().trim();
    return activeBenchmark.leaderboard.filter(
      (entry) =>
        entry.modelName.toLowerCase().includes(q) ||
        entry.developer.toLowerCase().includes(q) ||
        entry.rank.toString() === q
    );
  }, [activeBenchmark, searchQuery]);

  // Displayed entries (top 15 by default unless expanded or searching)
  const displayedEntries = useMemo(() => {
    if (searchQuery.trim() || showAllEntries) {
      return filteredEntries;
    }
    return filteredEntries.slice(0, 15);
  }, [filteredEntries, searchQuery, showAllEntries]);

  if (!activeBenchmark) return null;

  return (
    <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-8 shadow-2xl">
      {/* Header & Benchmark Switcher Pills */}
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

        {/* Benchmark selection tabs */}
        <div className="flex flex-wrap gap-2">
          {benchmarks.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setActiveBenchmarkId(b.id);
                setSearchQuery('');
                setShowAllEntries(false);
              }}
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

      {/* Leaderboard Toolbar: Search & Counts */}
      {activeBenchmark.leaderboard.length > 10 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 pb-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeBenchmark.leaderboard.length} models or labs...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span>
              Showing <strong className="text-emerald-400">{displayedEntries.length}</strong> of{' '}
              {filteredEntries.length} {isElo ? 'Arena models' : 'benchmarked models'}
            </span>
            {filteredEntries.length > 15 && !searchQuery.trim() && (
              <button
                onClick={() => setShowAllEntries(!showAllEntries)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-emerald-400 hover:text-emerald-300 text-xs font-mono font-medium transition-colors flex items-center gap-1"
              >
                <span>{showAllEntries ? 'Show Top 15 Only' : `Show All ${filteredEntries.length}`}</span>
                {showAllEntries ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        {/* Left: Interactive Visual Leaderboard Bars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800/80">
            <span>Model & Developer</span>
            <span>{isElo ? 'Arena Elo Rating' : 'Verified Score (Pass@1)'}</span>
          </div>

          <div className="space-y-3.5">
            {displayedEntries.map((entry, idx) => {
              // For Elo, visually accentuate relative spread across top to bottom
              let percentage: number;
              if (isElo) {
                const range = Math.max(maxScore - minScore, 100);
                percentage = Math.max(25, Math.min(100, 25 + ((entry.score - minScore) / range) * 75));
              } else {
                percentage = (entry.score / maxScore) * 100;
              }

              const isTop = entry.rank === 1;

              return (
                <div key={`${entry.rank}-${entry.modelName}`} className="group space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-mono text-[11px] w-6 ${entry.rank <= 3 ? 'text-amber-400 font-bold' : 'text-zinc-500'}`}>
                        #{entry.rank}
                      </span>
                      {onSelectModel ? (
                        <button
                          onClick={() => {
                            const modelId = `model-${entry.modelName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            onSelectModel(modelId);
                          }}
                          className={`font-semibold text-left transition-colors hover:underline hover:text-emerald-300 flex items-center gap-1 ${
                            isTop ? 'text-emerald-400 font-bold' : 'text-zinc-200'
                          }`}
                        >
                          <span>{entry.modelName}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                        </button>
                      ) : (
                        <span className={`font-semibold ${isTop ? 'text-emerald-400 font-bold' : 'text-zinc-200'}`}>
                          {entry.modelName}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-zinc-500">
                        ({entry.developer})
                      </span>
                      {entry.verifiedByNextVector && (
                        <span title="Verified by NextVector Labs">
                          <CheckCircle className="w-3 h-3 text-emerald-400 inline" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono shrink-0">
                      {entry.costPerRun && (
                        <span className="text-[10px] text-zinc-500 hidden sm:inline">
                          {entry.costPerRun}
                        </span>
                      )}
                      <span className={`text-sm font-bold ${isTop ? 'text-emerald-400' : 'text-zinc-100'}`}>
                        {isElo ? `${Math.round(entry.score)} Elo` : `${entry.score.toFixed(1)}%`}
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isTop
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-sm shadow-emerald-500/40'
                          : entry.rank <= 5
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500'
                          : 'bg-zinc-600 group-hover:bg-zinc-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {displayedEntries.length === 0 && (
              <div className="p-8 text-center text-xs font-mono text-zinc-500 border border-zinc-800/80 rounded-2xl">
                No models match "{searchQuery}". Try searching by lab (e.g. OpenAI, Anthropic, DeepSeek, Alibaba, Sakana).
              </div>
            )}
          </div>

          {/* Bottom toggle if many entries */}
          {filteredEntries.length > 15 && !searchQuery.trim() && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setShowAllEntries(!showAllEntries)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <span>{showAllEntries ? 'Collapse to Top 15 Models' : `Show All ${filteredEntries.length} Arena Models`}</span>
                {showAllEntries ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Right: Editorial Context & Caveats */}
        <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-4 self-start sticky top-24">
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
