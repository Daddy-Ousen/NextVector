import React, { useState, useMemo } from 'react';
import { AIModel } from '../types';
import { ModelCard } from '../components/models/ModelCard';
import { Cpu, Search, Layers, Scale, CheckSquare, ArrowRight } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

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
        if (selectedLicense !== 'all') {
          if (selectedLicense === 'open' && m.openSourceStatus !== 'Open Weights') return false;
          if (selectedLicense === 'closed' && m.openSourceStatus === 'Open Weights') return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price-asc') return a.pricing.inputPer1M - b.pricing.inputPer1M;
        if (sortBy === 'price-desc') return b.pricing.inputPer1M - a.pricing.inputPer1M;
        return 0;
      });
  }, [models, searchQuery, selectedType, selectedLicense, sortBy]);

  return (
    <div className="space-y-10 pb-20">
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
            <Cpu className="w-4 h-4" />
            <span>Empirical AI Model Registry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
            AI Model Directory & Architecture Index
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-sans mt-3 leading-relaxed">
            Standardized technical specifications, verified benchmark performance, architectural classifications, and hardware inference metrics across leading models.
          </p>
        </div>
      </div>

      <div className="p-4 md:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model name, developer, architecture..."
              className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="name">Sort: Model Name</option>
              <option value="price-asc">Sort: Input Price (Low → High)</option>
              <option value="price-desc">Sort: Input Price (High → Low)</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer"
            >
              {modelTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>

            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer"
            >
              {licenses.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs font-mono text-zinc-400">
          <div>
            Showing <strong className="text-emerald-400">{filteredAndSortedModels.length}</strong> of {models.length} models
          </div>

          {selectedModelCompareIds.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-zinc-300">
                <strong className="text-emerald-400">{selectedModelCompareIds.length}</strong> selected for comparison
              </span>
              <button
                onClick={onOpenCompareModal}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-all flex items-center gap-1"
              >
                <span>Launch Comparison Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedModels.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            isSelectedForCompare={selectedModelCompareIds.includes(model.id)}
            onToggleCompare={onToggleModelCompare}
            onSelectDetail={onSelectModelDetail}
          />
        ))}
      </div>

      {filteredAndSortedModels.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
          <p className="text-sm font-semibold text-zinc-300">No models match your filter criteria.</p>
          <p className="text-xs font-mono text-zinc-500">Try resetting filters or adjusting search keywords.</p>
        </div>
      )}
    </div>
  );
};
