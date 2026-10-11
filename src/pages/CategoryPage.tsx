import React from 'react';
import { ArticleSummary, ArticleCategory } from '../types';
import { ArticleCard } from '../components/cards/ArticleCard';
import { SignalFilterBar } from '../components/filters/SignalFilterBar';
import { sortArticlesByTimeAndImportance } from '../utils';
import { SEOHead } from '../components/common/SEOHead';
import { usePagedList, LoadMoreButton } from '../components/common/LoadMore';
import { Sparkles, Cpu, Layers, Microscope, BookOpen, Compass } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';

interface CategoryPageProps {
  categorySlug: string;
  articles: ArticleSummary[];
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
          title: 'Artificial Intelligence',
          subtitle: 'Tracking foundation models, reasoning breakthroughs, open-weight distributions, inference scaling, and AI hardware.',
          icon: <Cpu className="w-4 h-4" />,
          filterFn: (a: ArticleSummary) => a.category === 'ai',
        };
      case 'technology':
        return {
          title: 'Computing & Hardware Technology',
          subtitle: 'Deep coverage of semiconductor lithography, advanced packaging, CPUs/GPUs, RISC-V architectures, and data center thermodynamics.',
          icon: <Layers className="w-4 h-4" />,
          filterFn: (a: ArticleSummary) => a.category === 'technology',
        };
      case 'science':
        return {
          title: 'Science & Discovery',
          subtitle: 'Groundbreaking developments in quantum physics, biomolecular synthesis, materials science, and energy scaling.',
          icon: <Microscope className="w-4 h-4" />,
          filterFn: (a: ArticleSummary) => a.category === 'science',
        };
      case 'analysis':
        return {
          title: 'News Analysis',
          subtitle: 'Rigorous explanations of why critical announcements matter beyond corporate press releases.',
          icon: <Sparkles className="w-4 h-4" />,
          filterFn: (a: ArticleSummary) => a.articleType === 'analysis',
        };
      case 'deep-dives':
        return {
          title: 'Technical Deep Dives',
          subtitle: 'Exhaustive engineering and architectural teardowns of modern algorithms, hardware, and scientific mechanisms.',
          icon: <BookOpen className="w-4 h-4" />,
          filterFn: (a: ArticleSummary) => a.articleType === 'deep-dive',
        };
      default:
        return {
          title: 'All News',
          subtitle: 'Every story on technology, AI, and science, newest first.',
          icon: <Compass className="w-4 h-4" />,
          filterFn: () => true,
        };
    }
  };

  const meta = getCategoryMeta();

  const categoryArticles = sortArticlesByTimeAndImportance(articles.filter(meta.filterFn));

  const filteredArticles = categoryArticles.filter((a) => {
    if (a.signalRating < minSignal) return false;
    if (selectedType !== 'all' && a.articleType !== selectedType) return false;
    if (selectedTag && !a.tags.includes(selectedTag)) return false;
    return true;
  });
  const feed = usePagedList(filteredArticles, `${categorySlug}|${minSignal}|${selectedType}|${selectedTag}`);

  const seoTitle =
    categorySlug === 'ai'
      ? 'AI News & Frontier Intelligence | Latest AI Info — NextVector'
      : `${meta.title} | NextVector`;

  const seoDescription =
    categorySlug === 'ai'
      ? 'Breaking artificial intelligence news, verified frontier model disclosures, LLM benchmarks, and AI safety intelligence. Less noise. More signal.'
      : meta.subtitle;

  const seoKeywords =
    categorySlug === 'ai'
      ? ['AI news', 'latest AI info', 'artificial intelligence news', 'frontier AI models', 'LLM benchmarks', 'AI safety']
      : [categorySlug, 'technology news', 'NextVector intelligence'];

  return (
    <div className="space-y-8 pb-16">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/${categorySlug}`}
        tags={seoKeywords}
      />
      {/* Category Header */}
      <PageHeader
        eyebrow="Coverage Section"
        icon={meta.icon}
        title={meta.title}
        description={meta.subtitle}
      />

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
        <div className="py-20 text-center text-zinc-400 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold">No stories match your current filters in this section.</p>
          <p className="text-xs mt-1">Try relaxing the signal score or topic filter.</p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed.visible.map((article) => (
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
        <LoadMoreButton remaining={feed.remaining} onClick={feed.showMore} />
        </>
      )}
    </div>
  );
};
