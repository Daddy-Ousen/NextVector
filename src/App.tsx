import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { BookmarksModal } from './components/common/BookmarksModal';
import { ModelComparisonModal } from './components/models/ModelComparisonModal';

import { HomePage } from './pages/HomePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ModelsDirectoryPage } from './pages/ModelsDirectoryPage';
import { ModelDetailPage } from './pages/ModelDetailPage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { ResearchPage } from './pages/ResearchPage';
import { TimelinePage } from './pages/TimelinePage';
import { DailyBriefingPage } from './pages/DailyBriefingPage';
import { CategoryPage } from './pages/CategoryPage';

import { MOCK_ARTICLES, MOCK_MODELS, MOCK_BENCHMARKS, MOCK_RESEARCH_PAPERS, MOCK_TIMELINE } from './data/mockData';
import { getSavedBookmarks, toggleBookmark } from './utils';
import { CheckCircle2, Info } from 'lucide-react';
import './App.css';

export function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => getSavedBookmarks());

  // Model comparison state
  const [compareModelIds, setCompareModelIds] = useState<string[]>([
    'model-gpt-6-astra',
    'model-muse-spark',
  ]);

  // Global filters
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [minSignal, setMinSignal] = useState<number>(70);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Browser navigation history listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBookmark = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleBookmark(articleId);
    setBookmarkedIds(updated);
    if (updated.includes(articleId)) {
      showToast('Article saved to your intelligence bookmarks.');
    } else {
      showToast('Article removed from saved bookmarks.');
    }
  };

  const handleToggleModelCompare = (modelId: string) => {
    if (compareModelIds.includes(modelId)) {
      setCompareModelIds(compareModelIds.filter((id) => id !== modelId));
      showToast('Model removed from comparison tray.');
    } else {
      if (compareModelIds.length >= 4) {
        showToast('Maximum 4 models can be compared at once.');
        return;
      }
      setCompareModelIds([...compareModelIds, modelId]);
      showToast('Model added to comparison tray.');
    }
  };

  const handleCommandPaletteSelect = (type: string, id: string) => {
    if (type === 'article') {
      navigateTo(`/article/${id}`);
    } else if (type === 'model') {
      navigateTo(`/models/${id}`);
    } else if (type === 'benchmark') {
      navigateTo('/benchmarks');
    } else if (type === 'research') {
      navigateTo('/research');
    }
  };

  // Render Page Content based on currentPath
  const renderCurrentPage = () => {
    // 1. Article Detail: /article/:slug
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      const article = MOCK_ARTICLES.find((a) => a.slug === slug) || MOCK_ARTICLES[0];
      const relatedModel = article.relatedModelId
        ? MOCK_MODELS.find((m) => m.id === article.relatedModelId)
        : undefined;
      const relatedBenchmark = article.relatedBenchmarkId
        ? MOCK_BENCHMARKS.find((b) => b.id === article.relatedBenchmarkId)
        : undefined;
      const relatedPaper = article.relatedPaperId
        ? MOCK_RESEARCH_PAPERS.find((p) => p.id === article.relatedPaperId)
        : undefined;

      return (
        <ArticleDetailPage
          article={article}
          relatedModel={relatedModel}
          relatedBenchmark={relatedBenchmark}
          relatedPaper={relatedPaper}
          isBookmarked={bookmarkedIds.includes(article.id)}
          onToggleBookmark={handleToggleBookmark}
          onBack={() => navigateTo('/')}
          onSelectModel={(id) => navigateTo(`/models/${id}`)}
          onSelectBenchmark={() => navigateTo('/benchmarks')}
          onSelectPaper={() => navigateTo('/research')}
        />
      );
    }

    // 2. Model Detail: /models/:id
    if (currentPath.startsWith('/models/') && currentPath !== '/models') {
      const modelId = currentPath.replace('/models/', '');
      const model = MOCK_MODELS.find((m) => m.id === modelId) || MOCK_MODELS[0];
      return (
        <ModelDetailPage
          model={model}
          onBack={() => navigateTo('/models')}
          onCompareWithOthers={(id) => {
            handleToggleModelCompare(id);
            setIsCompareModalOpen(true);
          }}
        />
      );
    }

    // 3. Models Directory: /models
    if (currentPath === '/models') {
      return (
        <ModelsDirectoryPage
          models={MOCK_MODELS}
          selectedModelCompareIds={compareModelIds}
          onToggleModelCompare={handleToggleModelCompare}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
          onSelectModelDetail={(id) => navigateTo(`/models/${id}`)}
        />
      );
    }

    // 4. Benchmarks Hub: /benchmarks
    if (currentPath === '/benchmarks') {
      return (
        <BenchmarksPage
          benchmarks={MOCK_BENCHMARKS}
          onSelectModel={(id) => navigateTo(`/models/${id}`)}
        />
      );
    }

    // 5. Research Explained: /research
    if (currentPath === '/research') {
      return <ResearchPage papers={MOCK_RESEARCH_PAPERS} />;
    }

    // 6. Timeline: /timeline
    if (currentPath === '/timeline') {
      return <TimelinePage events={MOCK_TIMELINE} />;
    }

    // 7. Daily Briefing: /briefing
    if (currentPath === '/briefing') {
      return (
        <DailyBriefingPage
          onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
        />
      );
    }

    // 8. Categories: /ai, /technology, /science, /analysis, /deep-dives
    if (['/ai', '/technology', '/science', '/analysis', '/deep-dives'].includes(currentPath)) {
      const categorySlug = currentPath.replace('/', '');
      return (
        <CategoryPage
          categorySlug={categorySlug}
          articles={MOCK_ARTICLES}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          minSignal={minSignal}
          onMinSignalChange={setMinSignal}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      );
    }

    // Default: Home Page
    return (
      <HomePage
        articles={MOCK_ARTICLES}
        models={MOCK_MODELS}
        benchmarks={MOCK_BENCHMARKS}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
        onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
        onSelectModel={(id) => navigateTo(`/models/${id}`)}
        selectedModelCompareIds={compareModelIds}
        onToggleModelCompare={handleToggleModelCompare}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onNavigate={navigateTo}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        minSignal={minSignal}
        onMinSignalChange={setMinSignal}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
    );
  };

  const selectedCompareModels = MOCK_MODELS.filter((m) =>
    compareModelIds.includes(m.id)
  );

  const bookmarkedArticles = MOCK_ARTICLES.filter((a) =>
    bookmarkedIds.includes(a.id)
  );

  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderCurrentPage()}
      </main>

      {/* Global Modals & Dialogs */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleCommandPaletteSelect}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onRemoveBookmark={(id) => {
          const updated = toggleBookmark(id);
          setBookmarkedIds(updated);
        }}
        onSelectArticle={(slug) => {
          setIsBookmarksOpen(false);
          navigateTo(`/article/${slug}`);
        }}
      />

      <ModelComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        models={selectedCompareModels}
        onRemoveModel={(id) => {
          setCompareModelIds(compareModelIds.filter((mId) => mId !== id));
        }}
        onSelectModelDetail={(id) => {
          setIsCompareModalOpen(false);
          navigateTo(`/models/${id}`);
        }}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
