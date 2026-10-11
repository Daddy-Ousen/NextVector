import React, { useMemo } from 'react';
import { ArticleSummary, AIModel } from '../types';
import { SEOHead } from '../components/common/SEOHead';
import { formatDate, getCategoryBadge } from '../utils';
import { Archive } from 'lucide-react';

interface ArchivePageProps {
  articles: ArticleSummary[];
  models: AIModel[];
  onNavigate: (path: string) => void;
}

const monthLabel = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

export const ArchivePage: React.FC<ArchivePageProps> = ({ articles, models, onNavigate }) => {
  // Group newest-first articles by publication month
  const months = useMemo(() => {
    const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    const groups: { label: string; items: ArticleSummary[] }[] = [];
    for (const a of sorted) {
      const label = monthLabel(a.publishedAt);
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.items.push(a);
      else groups.push({ label, items: [a] });
    }
    return groups;
  }, [articles]);

  const sortedModels = useMemo(
    () => [...models].sort((a, b) => (a.arenaRank ?? 9999) - (b.arenaRank ?? 9999)),
    [models]
  );

  const link = (path: string) => (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 space-y-12">
      <SEOHead
        title="Complete Intelligence Archive & HTML Sitemap"
        description={`Full directory of all ${articles.length} NextVector intelligence reports and ${models.length} foundation models.`}
        canonicalPath="/archive"
      />

      <header className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <Archive className="w-4 h-4" />
          Complete Archive
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">Story Archive</h1>
        <p className="text-sm text-zinc-400">
          {articles.length} reports • {models.length} model dossiers
        </p>
      </header>

      {months.map((group) => (
        <section key={group.label} className="space-y-3">
          <h2 className="text-lg font-bold text-zinc-100">
            {group.label} <span className="text-zinc-400 font-normal">({group.items.length})</span>
          </h2>
          <ul className="divide-y divide-zinc-800/60 rounded-2xl border border-zinc-800 bg-zinc-950/60">
            {group.items.map((a) => {
              const cat = getCategoryBadge(a.category);
              return (
                <li key={a.id} className="px-4 py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-xs font-mono text-zinc-400 shrink-0 sm:w-28">{formatDate(a.publishedAt)}</span>
                  <a
                    href={`/article/${a.slug}`}
                    onClick={link(`/article/${a.slug}`)}
                    className="text-sm text-zinc-200 hover:text-emerald-400 transition-colors flex-1"
                  >
                    {a.title}
                  </a>
                  <span className="text-2xs font-mono uppercase text-zinc-400 shrink-0">{cat.shortLabel}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">
          Foundation Models <span className="text-zinc-400 font-normal">({models.length})</span>
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {sortedModels.map((m) => (
            <li key={m.id} className="flex items-baseline gap-2 min-w-0">
              <a
                href={`/models/${m.id}`}
                onClick={link(`/models/${m.id}`)}
                className="text-cyan-400 hover:underline truncate"
              >
                {m.name}
              </a>
              <span className="text-xs text-zinc-400 shrink-0">{m.developer}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
