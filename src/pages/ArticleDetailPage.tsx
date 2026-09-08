import React, { useState } from 'react';
import { Article, AIModel, Benchmark, ResearchPaper } from '../types';
import { ThreeQuestionsBlock } from '../components/common/ThreeQuestionsBlock';
import { SignalRatingBadge } from '../components/common/SignalRatingBadge';
import { AudioBriefingPlayer } from '../components/common/AudioBriefingPlayer';
import { getCategoryBadge, formatRelativeTime, getArticleTypeLabel } from '../utils';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Check, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  BarChart2, 
  ExternalLink,
  BookOpen,
  Headphones
} from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  relatedModel?: AIModel;
  relatedBenchmark?: Benchmark;
  relatedPaper?: ResearchPaper;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onBack: () => void;
  onSelectModel: (id: string) => void;
  onSelectBenchmark: (id: string) => void;
  onSelectPaper: (id: string) => void;
  onSelectAuthor?: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  relatedModel,
  relatedBenchmark,
  relatedPaper,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onSelectModel,
  onSelectBenchmark,
  onSelectPaper,
  onSelectAuthor,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const categoryStyle = getCategoryBadge(article.category);
  const typeLabel = getArticleTypeLabel(article.articleType);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 mb-6 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Intelligence Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAudioPlayer(!showAudioPlayer)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors border ${
              showAudioPlayer
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showAudioPlayer ? 'Hide Audio' : 'Audio Briefing'}</span>
          </button>

          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 border-zinc-800'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Copy link to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Article Audio Briefing Drawer */}
      {showAudioPlayer && (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <AudioBriefingPlayer
            articleTitle={article.title}
            subtitle={article.subtitle}
            threeQuestions={article.threeQuestions}
            duration={article.audioDuration || '4m 15s'}
            keyTakeaways={article.keyTakeaways}
            onClose={() => setShowAudioPlayer(false)}
          />
        </div>
      )}

      {/* Article Header & Editorial Badges */}
      <header className="space-y-6 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${categoryStyle}`}>
            {article.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            {typeLabel}
          </span>
          <SignalRatingBadge score={article.signalRating} size="md" showDetails />
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 font-sans leading-relaxed">
          {article.subtitle}
        </p>

        {/* Metadata & Author Review Badge */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <div
              onClick={onSelectAuthor}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs shrink-0 cursor-pointer hover:border-emerald-500 transition-colors"
            >
              RH
            </div>
            <div>
              <div className="text-zinc-200 font-bold flex items-center gap-2 flex-wrap">
                <button
                  onClick={onSelectAuthor}
                  className="hover:text-emerald-400 hover:underline transition-colors flex items-center gap-1"
                >
                  <span>{article.author.name}</span>
                </button>
                {article.author.verified && (
                  <span title="Verified Staff Researcher / Editorial Lead">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                )}
                {article.author.website && (
                  <a
                    href={article.author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500 flex items-center gap-1 transition-all"
                  >
                    <span>rhasan.online</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
              <div className="text-[11px] text-zinc-400">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 mb-8 max-h-[460px] bg-zinc-950">
        <img
          src={article.coverImage}
          alt={article.coverImageAlt || article.title}
          className="w-full h-full object-cover"
        />
        {article.coverImageAlt && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-zinc-950/80 backdrop-blur-sm text-[11px] font-mono text-zinc-400">
            {article.coverImageAlt}
          </div>
        )}
      </div>

      {/* Signature Editorial Feature: The Three Questions Block */}
      <section className="mb-10">
        <ThreeQuestionsBlock questions={article.threeQuestions} />
      </section>

      {/* Executive Key Takeaways */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <section className="mb-10 rounded-2xl bg-zinc-950 border border-zinc-800 p-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Executive Takeaways</span>
          </div>
          <ul className="space-y-2.5 text-sm text-zinc-200 font-sans">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Main Body Content */}
      <article className="prose prose-invert max-w-none space-y-6 text-zinc-200 font-sans text-base md:text-lg leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="text-zinc-300 leading-relaxed font-sans">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Technical Specifications Table (if applicable) */}
      {article.technicalSpecs && (
        <section className="mt-12 rounded-2xl bg-zinc-950 border border-zinc-800 p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Technical Parameters & Verified Specifications</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(article.technicalSpecs).map(([key, val]) => (
              <div key={key} className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">{key}</div>
                <div className="text-sm font-mono font-bold text-zinc-100 mt-0.5">{val}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Intelligence Modules (Model / Benchmark / Paper) */}
      {(relatedModel || relatedBenchmark || relatedPaper) && (
        <section className="mt-12 pt-8 border-t border-zinc-800 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Linked Intelligence Entities
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedModel && (
              <div
                onClick={() => onSelectModel(relatedModel.id)}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Model Spec Sheet</span>
                </div>
                <div className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {relatedModel.name}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  {relatedModel.parameters} • {relatedModel.openSourceStatus}
                </div>
              </div>
            )}

            {relatedBenchmark && (
              <div
                onClick={() => onSelectBenchmark(relatedBenchmark.id)}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 mb-1">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Benchmark Leaderboard</span>
                </div>
                <div className="text-sm font-bold text-zinc-100 group-hover:text-purple-400 transition-colors">
                  {relatedBenchmark.name}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  {relatedBenchmark.category}
                </div>
              </div>
            )}

            {relatedPaper && (
              <div
                onClick={() => onSelectPaper(relatedPaper.id)}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Research Breakdown</span>
                </div>
                <div className="text-sm font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {relatedPaper.title}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  {relatedPaper.institution}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Author Bio Box */}
      <section className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div
            onClick={onSelectAuthor}
            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-bold text-emerald-400 text-lg shrink-0 cursor-pointer hover:border-emerald-500 transition-colors"
          >
            RH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-zinc-100">{article.author.name}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Founder & Editor-in-Chief
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl font-sans leading-relaxed">
              IT Infrastructure & Systems Support Engineer, Cybersecurity Practitioner, and Founder of NextVector.
              Filtering noise with peer-grade technical rigor.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onSelectAuthor}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
          >
            Author Profile
          </button>
          <a
            href="https://rhasan.online"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1"
          >
            <span>rhasan.online</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Citations & Primary Sources */}
      {article.citations && article.citations.length > 0 && (
        <section className="mt-10 p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono">
          <div className="text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
            Primary Sources & Verification Audit
          </div>
          <ul className="space-y-1.5">
            {article.citations.map((cite, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-emerald-400">•</span>
                <a
                  href={cite.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-emerald-400 underline flex items-center gap-1"
                >
                  <span>{cite.title}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-zinc-500">({cite.source})</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
