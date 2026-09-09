import React from 'react';
import { Article } from '../../types';
import { SignalRatingBadge } from '../common/SignalRatingBadge';
import { ThreeQuestionsBlock } from '../common/ThreeQuestionsBlock';
import { getCategoryBadge, formatRelativeTime, getArticleTypeLabel } from '../../utils';
import { Clock, Bookmark, ArrowUpRight, Headphones } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'grid' | 'compact';
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle: (slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'grid',
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
}) => {
  const categoryStyle = getCategoryBadge(article.category);
  const typeLabel = getArticleTypeLabel(article.articleType);

  // HERO VARIANT
  if (variant === 'hero') {
    return (
      <article className="group relative rounded-3xl bg-zinc-950 border border-zinc-800/90 overflow-hidden shadow-2xl transition-all duration-300 hover:border-zinc-700/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Hero Image Section */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[480px] overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.coverImageAlt || article.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-zinc-950/50 lg:to-zinc-950" />
            
            {/* Top overlay badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono border backdrop-blur-md ${categoryStyle.color}`}>
                  {categoryStyle.label}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-900/80 border border-zinc-700 text-zinc-300 backdrop-blur-md">
                  {typeLabel}
                </span>
              </div>
              <SignalRatingBadge score={article.signalRating} size="md" showDetails />
            </div>
          </div>

          {/* Hero Content Section */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-3">
                <span>{formatRelativeTime(article.publishedAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTimeMinutes} min read
                </span>
                {article.audioDuration && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Headphones className="w-3.5 h-3.5" />
                      {article.audioDuration}
                    </span>
                  </>
                )}
              </div>

              <h2
                onClick={() => onSelectArticle(article.slug)}
                className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight leading-tight hover:text-emerald-400 cursor-pointer transition-colors"
              >
                {article.title}
              </h2>

              <p className="mt-3 text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
                {article.subtitle}
              </p>

              {/* Three Questions preview */}
              <div className="mt-5">
                <ThreeQuestionsBlock questions={article.threeQuestions} compact />
              </div>
            </div>

            {/* Author & Action footer */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="text-xs font-bold text-zinc-200">{article.author.name}</div>
                  <div className="text-[11px] font-mono text-zinc-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => onToggleBookmark(article.id, e)}
                  className={`p-2 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onSelectArticle(article.slug)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
                >
                  <span>Read Signal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // COMPACT TICKER / LIST VARIANT
  if (variant === 'compact') {
    return (
      <div 
        onClick={() => onSelectArticle(article.slug)}
        className="group p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/60 hover:border-zinc-700 cursor-pointer transition-all flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${categoryStyle.color}`}>
              {categoryStyle.label}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {formatRelativeTime(article.publishedAt)}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-1">
            {article.threeQuestions.whatHappened}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <SignalRatingBadge score={article.signalRating} size="sm" />
          <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    );
  }

  // STANDARD BENTO GRID VARIANT
  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-black/50">
      <div>
        {/* Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt || article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border backdrop-blur-md ${categoryStyle.color}`}>
              {categoryStyle.label}
            </span>
            <SignalRatingBadge score={article.signalRating} size="sm" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span>{typeLabel}</span>
            <span>•</span>
            <span>{article.readTimeMinutes}m read</span>
          </div>

          <h3
            onClick={() => onSelectArticle(article.slug)}
            className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {article.title}
          </h3>

          <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {article.subtitle}
          </p>

          <ThreeQuestionsBlock questions={article.threeQuestions} compact />
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-zinc-800/60 text-xs text-zinc-400">
        <div className="flex items-center gap-2 pt-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="truncate max-w-[120px] font-medium text-zinc-300">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-3">
          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            className={`p-1.5 rounded-md hover:bg-zinc-800 transition-colors ${
              isBookmarked ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onSelectArticle(article.slug)}
            className="text-emerald-400 hover:text-emerald-300 font-mono font-medium flex items-center gap-1 hover:underline"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
