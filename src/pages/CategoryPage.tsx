import React from 'react';
import { Article, ArticleCategory } from '../types';
import { ArticleCard } from '../components/cards/ArticleCard';
import { SignalFilterBar } from '../components/filters/SignalFilterBar';
import { Sparkles, Cpu, Layers, Microscope, BookOpen, Compass } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  articles: Article[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle: (slug: string) => void;
  // Filters
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  minSignal: number;
  onMinSignalChange: (val: number) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  articles,
  bookmarkedIds,
  onToggleBookmark,
  onSelectArticle,
  selectedTag,
  onSelectTag,
  minSignal,
  onMinSignalChange,
  selectedType,
  onSelectType,
}) => {
  // Determine title and description based on categorySlug
  const getCategoryMeta = () => {
    switch (categorySlug) {
      case 'ai':
        return {
          title: 'Artificial Intelligence Intelligence',
          subtitle: 'Tracking foundation models, reasoning breakthroughs, open-weight distributions, inference scaling, and AI hardware.',
          icon: <Cpu className="w-5 h-5 text-emerald-400" />,
          filterFn: (a: Article) => a.category === 'ai',
        };
      case 'technology':
        return {
          title: 'Computing & Hardware Technology',
          subtitle: 'Deep coverage of semiconductor lithography, advanced packaging, CPUs/GPUs, RISC-V architectures, and data center thermodynamics.',
          icon: <Layers className="w-5 h-5 text-cyan-400" />,
          filterFn: (a: Article) => a.category === 'technology',
        };
      case 'science':
        return {
          title: 'Science & Discovery',
          subtitle: 'Groundbreaking developments in quantum physics, biomolecular synthesis, materials science, and energy scaling.',
          icon: <Microscope className="w-5 h-5 text-purple-400" />,
          filterFn: (a: Article) => a.category === 'science',
        };
      case 'analysis':
        return {
          title: 'News Analysis',
          subtitle: 'Rigorous explanations of why critical announcements matter beyond corporate press releases.',
          icon: <Sparkles className="w-5 h-5 text-amber-400" />,
          filterFn: (a: Article) => a.articleType === 'analysis',
        };
      case 'deep-dives':
        return {
          title: 'Technical Deep Dives',
          subtitle: 'Exhaustive engineering and architectural teardowns of modern algorithms, hardware, and scientific mechanisms.',
          icon: <BookOpen className="w-5 h-5 text-blue-400" />,
          filterFn: (a: Article) => a.articleType === 'deep-dive',
        };
      default:
        return {
          title: 'Intelligence Feed',
          subtitle: 'All verified technology, AI, and science intelligence.',
          icon: <Compass className="w-5 h-5 text-emerald-400" />,
          filterFn: () => true,
        };
    }
  };

  const meta = getCategoryMeta();

  const categoryArticles = articles.filter(meta.filterFn);

  const filteredArticles = categoryArticles.filter((a) => {
    if (a.signalRating < minSignal) return false;
    if (selectedType !== 'all' && a.articleType !== selectedType) return false;
    if (selectedTag && !a.tags.includes(selectedTag)) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Category Header */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 p-6 md:p-10 shadow-2xl relative">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3">
            {meta.icon}
            <span>Coverage Section</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
            {meta.title}
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-sans mt-3 leading-relaxed">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Signal Filter Bar */}
      <SignalFilterBar
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
        minSignal={minSignal}
        onMinSignalChange={onMinSignalChange}
        selectedType={selectedType}
        onSelectType={onSelectType}
        totalVisible={filteredArticles.length}
        totalCount={categoryArticles.length}
      />

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold">No stories match your current filters in this section.</p>
          <p className="text-xs mt-1">Try relaxing the signal score or topic filter.</p>
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
    </div>
  );
};
