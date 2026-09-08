import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/cards/ArticleCard';
import { ExternalLink, Mail, ShieldCheck, Cpu, Server, Terminal, CheckCircle, Search } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface AuthorPageProps {
  articles: Article[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const AuthorPage: React.FC<AuthorPageProps> = ({
  articles,
  bookmarkedIds,
  onToggleBookmark,
  onSelectArticle,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const authorArticles = useMemo(() => {
    return articles.filter((a) => {
      if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Hero Bio Banner */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar / Portrait */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-zinc-800 to-zinc-900 p-1 border border-zinc-700/80 shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-zinc-900 flex flex-col items-center justify-center text-emerald-400 font-mono font-extrabold text-3xl">
                <span>RH</span>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase mt-0.5">NextVector</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-zinc-950 p-1.5 rounded-xl shadow-lg border-2 border-zinc-950" title="Verified Editorial Lead">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Bio Details */}
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Founder & Editor-in-Chief</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                Dhaka (UTC+6)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold">
                Systems Architecture & AI
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight">
                Robiul Hasan
              </h1>
              <p className="text-sm md:text-base text-zinc-400 font-sans mt-2 leading-relaxed max-w-3xl">
                IT Infrastructure & Systems Support Engineer, Cybersecurity Practitioner, and Founder of <strong className="text-zinc-200">NextVector</strong>. Combining enterprise infrastructure operations, zero-trust endpoint defenses, and empirical AI capability evaluation to deliver high-signal intelligence without marketing noise.
              </p>
            </div>

            {/* Social & External Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://rhasan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>rhasan.online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Daddy-Ousen"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Daddy-Ousen</span>
              </a>

              <a
                href="https://linkedin.com/in/robiul-hasan-401296137"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="mailto:rhasan229@gmail.com"
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Focus & Editorial Manifesto Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Server className="w-4 h-4" />
            <span>Systems & Enterprise IT</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Years of frontline MSP operations overseeing 2,500+ enterprise endpoints, zero-trust Entra ID / Intune identity architectures, and 99.9% data continuity via Datto & Acronis BCDR appliances.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>Empirical AI Evaluation</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Direct auditing of frontier foundation models, agentic computer-use frameworks (OSWorld, WebArena), and crowdsourced Bradley-Terry LMSYS Arena Elo ratings to separate genuine capability shifts from synthetic benchmark contamination.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>Editorial Standard</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            NextVector operates on an uncompromising rule: <strong className="text-zinc-100">Less noise. More signal.</strong> Every article rigorously answers: <em>What happened? Why does it matter? What could happen next?</em>
          </p>
        </div>
      </div>

      {/* Published Reports Section */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans flex items-center gap-2">
              <span>Published Intelligence Reports</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {authorArticles.length} Articles
              </span>
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Peer-grade technical investigations and breakthrough breakdowns by Robiul Hasan
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['all', 'ai', 'technology', 'science'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-zinc-950 font-bold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search inside author reports */}
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic, keyword, or technology..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={bookmarkedIds.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
            />
          ))}
        </div>

        {authorArticles.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 text-xs font-mono">
            No articles match your search query.
          </div>
        )}
      </div>
    </div>
  );
};
