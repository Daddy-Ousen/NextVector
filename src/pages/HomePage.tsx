import React, { useState } from 'react';
import { ArticleSummary, AIModel, Benchmark } from '../types';
import { ArticleCard } from '../components/cards/ArticleCard';
import { StoryList } from '../components/cards/StoryList';
import { ModelCard } from '../components/models/ModelCard';
import { BenchmarkChart } from '../components/benchmarks/BenchmarkChart';
import { SignalFilterBar } from '../components/filters/SignalFilterBar';
import { SEOHead } from '../components/common/SEOHead';
import { usePagedList, LoadMoreButton } from '../components/common/LoadMore';
import { sortArticlesByTimeAndImportance, formatDate } from '../utils';
import { MOCK_LIVE_SIGNALS } from '../data/mockData';
import { ArrowRight, Cpu, LayoutGrid, List } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';

type FeedView = 'grid' | 'list';
const FEED_VIEW_KEY = 'nv-feed-view';

function readFeedView(): FeedView {
  try {
    return localStorage.getItem(FEED_VIEW_KEY) === 'list' ? 'list' : 'grid';
  } catch {
    return 'grid';
  }
}

interface HomePageProps {
  articles: ArticleSummary[];
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
  // Sort articles strictly by newest first, with importance priority on the same day
  const sortedArticles = sortArticlesByTimeAndImportance(articles);

  // Hero article: Highest-importance story from the most recent publishing date
  const latestDateStr = sortedArticles[0]?.publishedAt?.slice(0, 10);
  const heroArticle = sortedArticles.find((a) => a.isHero && a.publishedAt.startsWith(latestDateStr)) || sortedArticles[0];

  // Filter remaining articles (newest to oldest)
  const filteredArticles = sortedArticles.filter((a) => {
    if (a.id === heroArticle?.id) return false;
    if (a.signalRating < minSignal) return false;
    if (selectedType !== 'all' && a.articleType !== selectedType) return false;
    if (selectedTag && !a.tags.includes(selectedTag)) return false;
    return true;
  });

  const feed = usePagedList(filteredArticles, `${minSignal}|${selectedType}|${selectedTag}`);

  const [feedView, setFeedViewState] = useState<FeedView>(readFeedView);
  const setFeedView = (view: FeedView) => {
    setFeedViewState(view);
    try {
      localStorage.setItem(FEED_VIEW_KEY, view);
    } catch {
      // View choice is a convenience; ignore storage failures
    }
  };

  // Categorized slices for section highlights (inheriting chronological order)
  const aiStories = filteredArticles.filter((a) => a.category === 'ai');
  const techStories = filteredArticles.filter((a) => a.category === 'technology');
  const scienceStories = filteredArticles.filter((a) => a.category === 'science');
  const deepDives = filteredArticles.filter((a) => a.articleType === 'deep-dive' || a.articleType === 'analysis');

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://nextvector.rhasan.online/#website',
        url: 'https://nextvector.rhasan.online/',
        name: 'NextVector',
        alternateName: ['NextVector AI', 'NextVector Intelligence'],
        description: 'High-signal AI news, foundation models, verified benchmarks, and research intelligence.',
        publisher: {
          '@id': 'https://nextvector.rhasan.online/#organization',
        },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://nextvector.rhasan.online/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': ['Organization', 'NewsMediaOrganization'],
        '@id': 'https://nextvector.rhasan.online/#organization',
        name: 'NextVector',
        alternateName: ['NextVector AI', 'NextVector Intelligence'],
        legalName: 'NextVector Media',
        url: 'https://nextvector.rhasan.online/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nextvector.rhasan.online/brand/nextvector-logo.jpg',
          width: 512,
          height: 512,
        },
        image: 'https://nextvector.rhasan.online/brand/nextvector-brand-system.jpg',
        description: 'Independent technology intelligence platform filtering noise to surface verified foundation models, LMSYS Arena benchmarks, and frontier AI breakthroughs.',
        publishingPrinciples: 'https://nextvector.rhasan.online/about',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'editorial',
            email: 'editor@nextvector.rhasan.online',
            url: 'https://nextvector.rhasan.online/contact',
            availableLanguage: ['English'],
          },
        ],
        knowsAbout: [
          'https://www.wikidata.org/wiki/Q11660',
          'https://www.wikidata.org/wiki/Q2539',
          'Artificial Intelligence',
          'Large Language Models',
          'Foundation Models',
          'LMSYS Chatbot Arena',
          'SWE-bench Verified',
          'Semiconductor Compute Fabrics',
          'Autonomous AI Agents',
        ],
        sameAs: [
          'https://github.com/Daddy-Ousen',
          'https://nextvectorr.substack.com',
          'https://rhasan.online',
        ],
        founder: {
          '@type': 'Person',
          '@id': 'https://rhasan.online/#person',
          name: 'Robiul Hasan',
          jobTitle: 'Founder & Editor-in-Chief',
          url: 'https://rhasan.online',
          sameAs: [
            'https://rhasan.online',
            'https://github.com/Daddy-Ousen',
            'https://nextvectorr.substack.com',
          ],
        },
      },
    ],
  };

  return (
    <div className="space-y-12 pb-12">
      <SEOHead
        title="NextVector — AI News, Frontier Model Benchmarks & Intelligence"
        description="Real-time AI news, verified frontier model benchmarks, LMSYS Chatbot Arena rankings, model showdowns (Claude vs ChatGPT, Opus vs GPT-6), and high-signal research intelligence. Less noise. More signal."
        canonicalPath="/"
        schemaData={homeSchema}
        tags={[
          'AI news',
          'latest AI info',
          'best models',
          'best AI subscription to get',
          'claude vs chatgpt',
          'opus vs gpt 6',
          'Chatbot Arena leaderboard',
          'frontier AI models',
          'SWE-bench verified',
        ]}
      />

      {/* News-first top: small H1 line, then the lead story right away */}
      <div className="space-y-4">
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-1">
          <h1 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">
            AI News, Model Benchmarks &amp; Research
          </h1>
          {sortedArticles[0] && (
            <p className="text-xs text-zinc-400">
              Updated {formatDate(sortedArticles[0].publishedAt)}
            </p>
          )}
        </header>

        {heroArticle && (
          <section aria-label="Top story">
            <ArticleCard
              article={heroArticle}
              variant="hero"
              isBookmarked={bookmarkedIds.includes(heroArticle.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
            />
          </section>
        )}
      </div>

      {/* Breaking ticker (items set by the daily pipeline) */}
      <div className="w-full bg-zinc-950 border border-zinc-800/90 rounded-2xl p-2.5 sm:p-3 pointer-coarse:py-1 shadow-lg flex items-center overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mr-1 sm:mr-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="whitespace-nowrap">Breaking</span>
        </div>
        <div className="fade-edges overflow-hidden whitespace-nowrap min-w-0 flex-1">
          <div className="animate-marquee flex items-center gap-8 sm:gap-10 text-xs text-zinc-400 pl-8">
            {[...MOCK_LIVE_SIGNALS, ...MOCK_LIVE_SIGNALS].map((sig, idx) => (
              <React.Fragment key={`${sig.id}-${idx}`}>
                <button
                  type="button"
                  onClick={() => sig.articleSlug && onSelectArticle(sig.articleSlug)}
                  className={`tap inline-flex items-center gap-2 transition-colors text-left shrink-0 ${
                    sig.articleSlug ? 'hover:text-emerald-400 cursor-pointer' : ''
                  }`}
                >
                  <span className="text-zinc-200 font-semibold">{sig.tag}</span>
                  <span>{sig.text}</span>
                </button>
                <span className="text-zinc-700 select-none shrink-0">•</span>
              </React.Fragment>
            ))}
          </div>
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
        totalCount={articles.length - 1}
      />

      {/* Primary Bento Stream */}
      <section>
        <SectionHeader
          title="Latest Stories"
          description="Newest first"
          actions={<>
            <div className="flex rounded-lg border border-zinc-800 bg-zinc-900 p-0.5" role="group" aria-label="Story layout">
              {([
                { view: 'grid', label: 'Cards', Icon: LayoutGrid },
                { view: 'list', label: 'List', Icon: List },
              ] as const).map(({ view, label, Icon }) => (
                <button
                  key={view}
                  onClick={() => setFeedView(view)}
                  aria-pressed={feedView === view}
                  title={`${label} view`}
                  aria-label={`${label} view`}
                  className={`tap flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    feedView === view ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => onNavigate('/ai')}
              className="tap flex text-xs text-emerald-400 hover:text-emerald-300 items-center gap-1 whitespace-nowrap"
            >
              <span>All AI news</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>}
        />

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <p className="text-sm font-semibold">No stories match your current signal filters.</p>
            <p className="text-xs mt-1">Try lowering the minimum signal threshold or resetting the format filter.</p>
          </div>
        ) : (
          <>
          {feedView === 'list' ? (
            <StoryList articles={feed.visible} onSelectArticle={onSelectArticle} />
          ) : (
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
          )}
          <LoadMoreButton remaining={feed.remaining} onClick={feed.showMore} />
          </>
        )}
      </section>

      {/* Signature Section 1: AI Model Radar & Database Preview */}
      <section>
        <SectionHeader
          eyebrow="Model Specs"
          icon={<Cpu className="w-4 h-4" />}
          title="AI Models at a Glance"
          description="Parameters, context windows, API economics, licensing, and benchmark deltas"
          actions={<>
            {selectedModelCompareIds.length > 0 && (
              <button
                onClick={onOpenCompareModal}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Compare {selectedModelCompareIds.length} Models</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onNavigate('/models')}
              className="tap text-xs text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <span>Explore All {models.length} Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>}
        />

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
        <BenchmarkChart benchmarks={benchmarks} onSelectModel={onSelectModel} />
      </section>

      {/* Deep Dives & Analysis Section */}
      <section>
        <SectionHeader
          eyebrow="Long-Form Technical"
          title="Deep Dives & Analysis"
          description="Explaining the underlying physics, math, and architectural tradeoffs behind the headlines"
          actions={
            <button
              onClick={() => onNavigate('/deep-dives')}
              className="tap text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              <span>All Deep Dives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        />

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
      <section>
        <SectionHeader title="Highest-Rated Stories" description="Ranked by Signal score" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles
            .slice()
            .sort((a, b) => b.signalRating - a.signalRating)
            .slice(0, 3)
            .map((article, idx) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.slug)}
                className="p-4 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 cursor-pointer transition-all flex items-start gap-3"
              >
                <span className="font-mono text-2xl font-bold text-zinc-500 shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-2xs font-mono text-emerald-400 mb-1">
                    <span>Signal {article.signalRating}/100</span>
                    <span>•</span>
                    <span className="text-zinc-400 uppercase">{article.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-200 line-clamp-3 hover:text-emerald-400 transition-colors">
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
