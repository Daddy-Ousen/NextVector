import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowLeft, Search } from 'lucide-react';

interface NotFoundPageProps {
  path: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const SUGGESTED_LINKS = [
  { label: 'Latest News', path: '/' },
  { label: 'AI Model Directory', path: '/models' },
  { label: 'Benchmark Radar', path: '/benchmarks' },
  { label: 'Complete Archive', path: '/archive' },
];

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ path, onNavigate, onOpenSearch }) => {
  return (
    <div className="max-w-3xl mx-auto py-16 pb-24 text-center space-y-8">
      <SEOHead
        title="Page Not Found"
        description="The page you requested does not exist on NextVector."
        canonicalPath={path}
        noindex
      />

      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Error 404 • Page Not Found</div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">Page not found</h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Nothing is published at <code className="font-mono text-zinc-300 break-all">{path}</code>. The link may be mistyped or the report may have moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <button
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm hover:border-zinc-700 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
          Search NextVector
        </button>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
        {SUGGESTED_LINKS.map((link) => (
          <li key={link.path}>
            <a
              href={link.path}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate(link.path);
                }
              }}
              className="tap inline-flex items-center text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
