import React from 'react';
import { ArticleSummary } from '../../types';
import { groupByDay, formatClockTime, getCategoryBadge } from '../../utils';

interface StoryListProps {
  articles: ArticleSummary[];
  onSelectArticle: (slug: string) => void;
}

/** Compact headline list grouped by day ("Today", "Yesterday", then dates). */
export const StoryList: React.FC<StoryListProps> = ({ articles, onSelectArticle }) => {
  // Strict time order so each local day forms one group (the feed sorts by UTC day + importance)
  const byTime = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const groups = groupByDay(byTime);
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.label} aria-label={group.label}>
          <h3 className="text-sm font-bold text-zinc-200 pb-2 mb-1 border-b border-zinc-800">
            {group.label}
          </h3>
          <ul className="divide-y divide-zinc-800/60">
            {group.items.map((article) => {
              const badge = getCategoryBadge(article.category);
              return (
                <li key={article.id}>
                  <a
                    href={`/article/${article.slug}`}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        onSelectArticle(article.slug);
                      }
                    }}
                    className="group flex items-baseline gap-3 sm:gap-4 py-3"
                  >
                    <time
                      dateTime={article.publishedAt}
                      className="w-16 shrink-0 text-xs font-mono tabular-nums text-zinc-400"
                    >
                      {formatClockTime(article.publishedAt)}
                    </time>
                    <span className="flex-1 min-w-0 text-base text-zinc-100 group-hover:text-emerald-400 transition-colors leading-snug">
                      {article.title}
                    </span>
                    <span className={`hidden sm:inline shrink-0 text-2xs px-2 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.shortLabel}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};
