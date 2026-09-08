import React from 'react';
import { Article, AIModel, Benchmark } from '../types';
import { ArticleCard } from '../components/cards/ArticleCard';
import { ModelCard } from '../components/models/ModelCard';
import { BenchmarkChart } from '../components/benchmarks/BenchmarkChart';
import { SignalFilterBar } from '../components/filters/SignalFilterBar';
import { Sparkles, ArrowRight, TrendingUp, Cpu, Flame, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  models: AIModel[];
  benchmarks: Benchmark[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle: (slug: string) => void;
  onSelectModel: (id: string) => void;
  selectedModelCompareIds: string[];
  onToggleModelCompare: (id: string) => void;
  onOpenCompareModal: () => void;
  onNavigate: (path: string) => void;
  // Filters
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  minSignal: number;
  onMinSignalChange: (val: number) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  models,
  benchmarks,
  bookmarkedIds,
  onToggleBookmark,
  onSelectArticle,
  onSelectModel,
  selectedModelCompareIds,
  onToggleModelCompare,
  onOpenCompareModal,
  onNavigate,
  selectedTag,
  onSelectTag,
  minSignal,
  onMinSignalChange,
  selectedType,
  onSelectType,
}) => {
  // Hero article (e.g. Claude 3.7)
  const heroArticle = articles.find((a) => a.isHero) || articles[0];

  // Filter remaining articles
  const filteredArticles = articles.filter((a) => {
    if (a.id === heroArticle?.id) return false;
    if (a.signalRating < minSignal) return false;
    if (selectedType !== 'all' && a.articleType !== selectedType) return false;
    if (selectedTag && !a.tags.includes(selectedTag)) return false;
    return true;
  });

  // Categorized slices for section highlights
  const aiStories = articles.filter((a) => a.category === 'ai');
  const techStories = articles.filter((a) => a.category === 'technology');
  const scienceStories = articles.filter((a) => a.category === 'science');
  const deepDives = articles.filter((a) => a.articleType === 'deep-dive' || a.articleType === 'analysis');

  return (
    <div className="space-y-16 pb-12">
      {/* Live Breaking Signal Ticker */}
      <div className="w-full bg-zinc-950 border border-zinc-800/90 rounded-2xl p-3 shadow-lg flex items-center overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold shrink-0 mr-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE SIGNAL</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="animate-marquee flex items-center gap-10 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="text-zinc-200">GPT-6 Astra</span> autonomous computer & browser operator launched • OSWorld 68.4%
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-2">
              <span className="text-zinc-200">DSEwiki Incident</span> 3,700 testing agents evade sandboxes on public forum
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-2">
              <span className="text-zinc-200">Mistral AI</span> closes €3B sovereign round for 100k-chip Scandinavian cluster
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-2">
              <span className="text-zinc-200">Oxford Physics</span> Einstein's Equivalence Principle verified in quantum superposition
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-2">
              <span className="text-zinc-200">DeepMind</span> WeatherNext 3 deploys hourly 5km global forecasting worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Hero Story Section */}
      {heroArticle && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Lead Intelligence Report</span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Primary Focus: Autonomous Computer Operators & Agent Systems
            </span>
          </div>

          <ArticleCard
            article={heroArticle}
            variant="hero"
            isBookmarked={bookmarkedIds.includes(heroArticle.id)}
            onToggleBookmark={onToggleBookmark}
            onSelectArticle={onSelectArticle}
          />
        </section>
      )}

      {/* Signal Filter Bar */}
      <SignalFilterBar
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
        minSignal={minSignal}
        onMinSignalChange={onMinSignalChange}
        selectedType={selectedType}
        onSelectType={onSelectType}
        totalVisible={filteredArticles.length}
        totalCount={articles.length - 1}
      />

      {/* Primary Bento Stream */}
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans flex items-center gap-2">
              <span>Frontier Stream</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                Verified Developments
              </span>
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              Filtered for architectural significance, technical depth, and empirical validity
            </p>
          </div>

          <button
            onClick={() => onNavigate('/ai')}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All Stream</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <p className="text-sm font-semibold">No stories match your current signal filters.</p>
            <p className="text-xs mt-1">Try lowering the minimum signal threshold or resetting the format filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="grid"
                isBookmarked={bookmarkedIds.includes(article.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectArticle={onSelectArticle}
              />
            ))}
          </div>
        )}
      </section>

      {/* Signature Section 1: AI Model Radar & Database Preview */}
      <section className="rounded-3xl bg-zinc-950/80 border border-zinc-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
              <Cpu className="w-4 h-4" />
              <span>Standardized Specification Cards</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans">
              AI Model Radar & Specifications
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              Parameters, context windows, API economics, licensing, and benchmark deltas
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedModelCompareIds.length > 0 && (
              <button
                onClick={onOpenCompareModal}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Compare {selectedModelCompareIds.length} Models</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onNavigate('/models')}
              className="text-xs font-mono text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <span>Explore All Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.slice(0, 3).map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              isSelectedForCompare={selectedModelCompareIds.includes(model.id)}
              onToggleCompare={onToggleModelCompare}
              onSelectDetail={onSelectModel}
            />
          ))}
        </div>
      </section>

      {/* Signature Section 2: Benchmark Radar Watchdog */}
      <section>
        <BenchmarkChart benchmarks={benchmarks} />
      </section>

      {/* Deep Dives & Analysis Section */}
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans flex items-center gap-2">
              <span>Deep Dives & News Analysis</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                Long-Form Technical
              </span>
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              Explaining the underlying physics, math, and architectural tradeoffs behind the headlines
            </p>
          </div>

          <button
            onClick={() => onNavigate('/deep-dives')}
            className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>All Deep Dives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deepDives.slice(0, 2).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="grid"
              isBookmarked={bookmarkedIds.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
            />
          ))}
        </div>
      </section>

      {/* Trending / High-Impact Signals Bar */}
      <section className="rounded-3xl bg-zinc-950 border border-zinc-800/80 p-6">
        <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-zinc-100 font-sans">
              Highest Technical Impact Index
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Ranked by signal score & peer discussion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles
            .slice()
            .sort((a, b) => b.signalRating - a.signalRating)
            .slice(0, 3)
            .map((article, idx) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.slug)}
                className="p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 cursor-pointer transition-all flex items-start gap-3"
              >
                <span className="font-mono text-2xl font-black text-zinc-700 shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 mb-1">
                    <span>SIGNAL: {article.signalRating}/100</span>
                    <span>•</span>
                    <span className="text-zinc-400 uppercase">{article.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 line-clamp-2 hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
