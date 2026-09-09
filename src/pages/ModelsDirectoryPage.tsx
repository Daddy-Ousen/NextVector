import React, { useState, useMemo } from 'react';
import { AIModel } from '../types';
import { ModelCard } from '../components/models/ModelCard';
import { ModelDecisionGuide } from '../components/models/ModelDecisionGuide';
import { SEOHead } from '../components/common/SEOHead';
import { Cpu, Search, Layers, Scale, CheckSquare, ArrowRight, LayoutGrid, Table, ArrowUpDown, ArrowUpRight, Check, Square, Compass, Sparkles } from 'lucide-react';

interface ModelsDirectoryPageProps {
  models: AIModel[];
  selectedModelCompareIds: string[];
  onToggleModelCompare: (id: string) => void;
  onOpenCompareModal: () => void;
  onSelectModelDetail: (id: string) => void;
}

export const ModelsDirectoryPage: React.FC<ModelsDirectoryPageProps> = ({
  models,
  selectedModelCompareIds,
  onToggleModelCompare,
  onOpenCompareModal,
  onSelectModelDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'guide'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('tab') === 'guide' ? 'guide' : 'leaderboard';
    }
    return 'leaderboard';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [selectedDev, setSelectedDev] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rank-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [visibleCount, setVisibleCount] = useState<number>(30);

  const modelTypes = [
    { label: 'All Architectures', value: 'all' },
    { label: 'Reasoning', value: 'Reasoning' },
    { label: 'Multimodal Foundation', value: 'Multimodal Foundation' },
    { label: 'Code & Agent', value: 'Code & Agent' },
    { label: 'Open Weights', value: 'Open Weights' },
    { label: 'Compact / Edge', value: 'Compact / Edge' },
  ];

  const licenses = [
    { label: 'All Licenses', value: 'all' },
    { label: 'Open Weights', value: 'open' },
    { label: 'Proprietary API', value: 'closed' },
  ];

  // Extract unique developers
  const developers = useMemo(() => {
    const devs = Array.from(new Set(models.map((m) => m.developer))).sort();
    return [{ label: 'All Labs & Developers', value: 'all' }, ...devs.map((d) => ({ label: d, value: d }))];
  }, [models]);

  const filteredAndSortedModels = useMemo(() => {
    return models
      .filter((m) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = m.name.toLowerCase().includes(q);
          const matchDev = m.developer.toLowerCase().includes(q);
          const matchType = m.modelType.toLowerCase().includes(q);
          if (!matchName && !matchDev && !matchType) return false;
        }
        if (selectedType !== 'all' && m.modelType !== selectedType) return false;
        if (selectedDev !== 'all' && m.developer !== selectedDev) return false;
        if (selectedLicense === 'open' && !m.openSourceStatus.includes('Open')) return false;
        if (selectedLicense === 'closed' && m.openSourceStatus.includes('Open')) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rank-asc') return (a.arenaRank || 999) - (b.arenaRank || 999);
        if (sortBy === 'rank-desc') return (b.arenaRank || 0) - (a.arenaRank || 0);
        if (sortBy === 'elo-desc') return (b.arenaElo || 0) - (a.arenaElo || 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'price-asc') return a.pricing.inputPer1M - b.pricing.inputPer1M;
        return 0;
      });
  }, [models, searchQuery, selectedType, selectedDev, selectedLicense, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      <SEOHead
        title="AI Model Directory & LMSYS Arena Leaderboard (135 Models) | NextVector"
        description="Standardized technical specifications, verified LMSYS Arena Elo ratings, hardware inference metrics, and benchmark evaluations across 135 frontier AI models."
        canonicalPath="/models"
      />
      {/* Header */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
            <Cpu className="w-4 h-4" />
            <span>LMSYS Arena Global Evaluation Registry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
            AI Model Directory & Arena Leaderboard
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-sans mt-3 leading-relaxed">
            Standardized technical specifications, verified LMSYS Arena Elo ratings, architectural classifications, and hardware inference metrics across <strong>{models.length} frontier models</strong>.
          </p>
        </div>
      </div>

      {/* View Switcher: Leaderboard vs Decision & Tradeoff Guide */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-4 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('leaderboard');
            if (typeof window !== 'undefined') {
              const url = new URL(window.location.href);
              url.searchParams.delete('tab');
              window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
            }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-md'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>LMSYS Arena Leaderboard (135 Models)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('guide');
            if (typeof window !== 'undefined') {
              const url = new URL(window.location.href);
              url.searchParams.set('tab', 'guide');
              window.history.replaceState({}, '', url.pathname + url.search);
            }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Decision Matrix & $20 Tradeoff Guide</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            Buyer's Guide
          </span>
        </button>
      </div>

      {activeTab === 'guide' ? (
        <ModelDecisionGuide onSelectModel={onSelectModelDetail} />
      ) : (
        <>
          {/* Quick Jump Callout inside Leaderboard */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono shadow-md">
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-300">
                Need help deciding which model or subscription fits your workflow?
              </span>
            </div>
            <button
              onClick={() => {
                setActiveTab('guide');
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href);
                  url.searchParams.set('tab', 'guide');
                  window.history.replaceState({}, '', url.pathname + url.search);
                }
              }}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Open Decision Matrix & $20 Tradeoff Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter, Search & View Mode Bar */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 135 models (e.g. GPT-6, Fable 5.1, Sakana, DeepSeek, Kimi)..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === 'table'
                    ? 'bg-zinc-800 text-emerald-400 font-bold border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Table View (Full Registry)"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Arena Table</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-emerald-400 font-bold border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Grid View (Spec Cards)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-zinc-200 outline-none cursor-pointer"
              >
                <option value="rank-asc" className="bg-zinc-900">Sort: Arena Rank (#1 → #135)</option>
                <option value="elo-desc" className="bg-zinc-900">Sort: Arena Elo (High → Low)</option>
                <option value="name-asc" className="bg-zinc-900">Sort: Name (A → Z)</option>
                <option value="price-asc" className="bg-zinc-900">Sort: Input Price (Low → High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-zinc-900 text-xs font-mono">
          <select
            value={selectedDev}
            onChange={(e) => setSelectedDev(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-200 outline-none focus:border-emerald-500"
          >
            {developers.map((d) => (
              <option key={d.value} value={d.value} className="bg-zinc-900">
                {d.label}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-200 outline-none focus:border-emerald-500"
          >
            {modelTypes.map((t) => (
              <option key={t.value} value={t.value} className="bg-zinc-900">
                {t.label}
              </option>
            ))}
          </select>

          <select
            value={selectedLicense}
            onChange={(e) => setSelectedLicense(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-200 outline-none focus:border-emerald-500"
          >
            {licenses.map((l) => (
              <option key={l.value} value={l.value} className="bg-zinc-900">
                {l.label}
              </option>
            ))}
          </select>

          <div className="ml-auto text-zinc-400 font-mono">
            Showing <strong className="text-emerald-400">{filteredAndSortedModels.length}</strong> of {models.length} models
          </div>
        </div>
      </div>

      {/* Comparison Drawer (Sticky if active) */}
      {selectedModelCompareIds.length > 0 && (
        <div className="sticky top-20 z-30 p-4 bg-emerald-950/90 border border-emerald-500/40 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>{selectedModelCompareIds.length} models</strong> selected for side-by-side comparison
            </span>
          </div>

          <button
            onClick={onOpenCompareModal}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-lg active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Comparison Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* VIEW MODE: High-Density Table View */}
      {viewMode === 'table' ? (
        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                  <th className="py-3.5 px-4">Model Name</th>
                  <th className="py-3.5 px-4">Developer</th>
                  <th className="py-3.5 px-4 text-right">Arena Elo</th>
                  <th className="py-3.5 px-4">Architecture</th>
                  <th className="py-3.5 px-4">Context</th>
                  <th className="py-3.5 px-4">Parameters</th>
                  <th className="py-3.5 px-4">Pricing (In/Out)</th>
                  <th className="py-3.5 px-4 text-center">Compare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredAndSortedModels.map((model) => {
                  const isSelected = selectedModelCompareIds.includes(model.id);
                  return (
                    <tr
                      key={model.id}
                      className="hover:bg-zinc-900/50 transition-colors group"
                    >
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-bold ${
                          (model.arenaRank || 999) <= 3
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : (model.arenaRank || 999) <= 10
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'text-zinc-400'
                        }`}>
                          #{model.arenaRank}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => onSelectModelDetail(model.id)}
                          className="font-bold text-zinc-100 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                        >
                          <span>{model.name}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                        </button>
                      </td>

                      <td className="py-3 px-4 text-zinc-300">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                          {model.developer}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        {model.arenaElo}
                      </td>

                      <td className="py-3 px-4 text-zinc-400">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                          {model.modelType}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-zinc-300 font-sans text-xs">
                        {model.contextWindow}
                      </td>

                      <td className="py-3 px-4 text-zinc-400 truncate max-w-[140px]" title={model.parameters}>
                        {model.parameters}
                      </td>

                      <td className="py-3 px-4 text-zinc-300">
                        ${model.pricing.inputPer1M} / ${model.pricing.outputPer1M}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onToggleModelCompare(model.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                          title={isSelected ? 'Remove from compare' : 'Add to compare'}
                        >
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Square className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW MODE: Spec Cards Grid */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedModels.slice(0, visibleCount).map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isSelectedForCompare={selectedModelCompareIds.includes(model.id)}
                onToggleCompare={onToggleModelCompare}
                onSelectDetail={onSelectModelDetail}
              />
            ))}
          </div>

          {visibleCount < filteredAndSortedModels.length && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 30)}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-200 font-bold transition-all shadow-lg cursor-pointer"
              >
                Load More Models ({visibleCount} of {filteredAndSortedModels.length})
              </button>
            </div>
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
};
