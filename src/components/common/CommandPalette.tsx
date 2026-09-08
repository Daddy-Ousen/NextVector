import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Cpu, BarChart2, BookOpen, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { MOCK_ARTICLES, MOCK_MODELS, MOCK_BENCHMARKS, MOCK_RESEARCH_PAPERS } from '../../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (type: string, id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? MOCK_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : MOCK_ARTICLES.slice(0, 3);

  const filteredModels = query.trim()
    ? MOCK_MODELS.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.developer.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : MOCK_MODELS.slice(0, 2);

  const filteredBenchmarks = query.trim()
    ? MOCK_BENCHMARKS.filter(
        (b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : MOCK_BENCHMARKS.slice(0, 2);

  const filteredPapers = query.trim()
    ? MOCK_RESEARCH_PAPERS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.field.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2)
    : [];

  const handleSelect = (type: string, id: string) => {
    onNavigate(type, id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 bg-zinc-950/50">
          <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search high-signal articles, AI models, benchmarks, research papers..."
            className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 font-sans text-sm md:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:text-zinc-200 text-zinc-500 transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results Stream */}
        <div className="overflow-y-auto p-3 space-y-4 text-left">
          {/* Articles Section */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Intelligence & Articles</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleSelect('article', article.slug)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/80 text-left group transition-colors"
                  >
                    <div className="flex-1 pr-3">
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {article.subtitle}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {article.signalRating}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Models Section */}
          {filteredModels.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Models Database</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleSelect('model', model.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/80 text-left group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                        <span>{model.name}</span>
                        <span className="text-[11px] text-zinc-400 font-mono">({model.developer})</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">
                        {model.parameters} • {model.contextWindow} • {model.openSourceStatus}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Benchmarks Section */}
          {filteredBenchmarks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Benchmarks & Evaluation</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredBenchmarks.map((bench) => (
                  <button
                    key={bench.id}
                    onClick={() => handleSelect('benchmark', bench.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/80 text-left group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-purple-400 transition-colors">
                        {bench.name}
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {bench.whatItMeasures}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Research Papers Section */}
          {filteredPapers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Research Papers</span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredPapers.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => handleSelect('research', paper.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/80 text-left group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-amber-400 transition-colors">
                        {paper.title}
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {paper.institution} • {paper.stage}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length === 0 && filteredModels.length === 0 && filteredBenchmarks.length === 0 && (
            <div className="py-12 text-center text-zinc-500">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for keywords like "Claude", "Reasoning", "Quantum", or "ASML"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <span className="text-zinc-300">Articles, Models, Benchmarks, Papers</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Select</span>
            <CornerDownLeft className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
