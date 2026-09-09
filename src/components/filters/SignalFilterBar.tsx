import React from 'react';
import { SlidersHorizontal, ShieldAlert, Sparkles, Filter, Check } from 'lucide-react';

interface SignalFilterBarProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  minSignal: number;
  onMinSignalChange: (val: number) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  totalVisible: number;
  totalCount: number;
}

export const SignalFilterBar: React.FC<SignalFilterBarProps> = ({
  selectedTag,
  onSelectTag,
  minSignal,
  onMinSignalChange,
  selectedType,
  onSelectType,
  totalVisible,
  totalCount,
}) => {
  const tags = [
    'All Topics',
    'Reasoning Models',
    'Semiconductors',
    'High-NA EUV',
    'Quantum Computing',
    'Open Weights',
    'Biotechnology',
    'Hardware Architecture',
  ];

  const types = [
    { label: 'All Formats', value: 'all' },
    { label: 'Model Reports', value: 'model-report' },
    { label: 'Deep Dives', value: 'deep-dive' },
    { label: 'Discoveries', value: 'discovery' },
    { label: 'Benchmark Reports', value: 'benchmark-report' },
  ];

  const suppressedCount = Math.max(0, totalCount - totalVisible);

  return (
    <div className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-4 shadow-xl mb-8 backdrop-blur-md">
      {/* Top row: Signal threshold & format selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3.5 border-b border-zinc-800/80">
        {/* Signal Threshold Slider / Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Signal Filter:</span>
            <span className="sm:hidden">Signal:</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {[
              { label: 'All Signal (70+)', shortLabel: '70+', value: 70 },
              { label: 'High Signal (90+)', shortLabel: '90+', value: 90 },
              { label: 'Breakthroughs (95+)', shortLabel: '95+', value: 95 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onMinSignalChange(option.value)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all whitespace-nowrap ${
                  minSignal === option.value
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span className="hidden sm:inline">{option.label}</span>
                <span className="sm:hidden">{option.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-zinc-500 hidden lg:inline">Format:</span>
          <select
            value={selectedType}
            onChange={(e) => onSelectType(e.target.value)}
            className="bg-zinc-900 border border-zinc-700/80 text-xs font-mono text-zinc-200 rounded-lg px-2.5 py-1 outline-none focus:border-emerald-500"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value} className="bg-zinc-900 text-zinc-200">
                {t.label}
              </option>
            ))}
          </select>

          {/* Noise suppression telemetry */}
          <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-800">
            Showing <strong className="text-emerald-400">{totalVisible}</strong> stories
            {suppressedCount > 0 && (
              <span className="text-zinc-500 ml-1">({suppressedCount} low-signal hidden)</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: Topic pills */}
      <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
        <span className="text-[11px] font-mono text-zinc-500 uppercase shrink-0 mr-1">
          Topics:
        </span>
        {tags.map((tag) => {
          const isSelected = selectedTag === tag || (selectedTag === '' && tag === 'All Topics');
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag === 'All Topics' ? '' : tag)}
              className={`text-xs font-mono px-3 py-1 rounded-full shrink-0 transition-all ${
                isSelected
                  ? 'bg-zinc-200 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
