import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bookmark,
  Sparkles,
  Menu,
  X,
  Clock,
  ChevronDown,
  ArrowRight,
  Layers,
  Scale,
  BarChart3,
  DollarSign,
  Cpu,
  Microscope,
  BookOpen,
  Activity,
  Flame,
} from 'lucide-react';
import { NextVectorLogo } from '../common/NextVectorLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
}

interface DropdownItem {
  label: string;
  sublabel: string;
  path: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NEWS_DROPDOWN_ITEMS: DropdownItem[] = [
  {
    label: 'Artificial Intelligence',
    sublabel: 'Frontier LLMs, autonomous agents & compute',
    path: '/ai',
    badge: 'Hot',
    icon: Sparkles,
  },
  {
    label: 'Computing & Hardware',
    sublabel: 'Semiconductors, cloud, cyber & quantum',
    path: '/technology',
    icon: Cpu,
  },
  {
    label: 'Science & Biotech',
    sublabel: 'Genomics, space exploration & clean energy',
    path: '/science',
    icon: Microscope,
  },
  {
    label: 'Daily Briefing Scan',
    sublabel: '3-minute executive morning signal vector',
    path: '/briefing',
    badge: 'Daily',
    icon: Activity,
  },
  {
    label: 'Technical Deep Dives',
    sublabel: 'First-principles systems & architecture analysis',
    path: '/deep-dives',
    icon: BookOpen,
  },
];

const MODELS_DROPDOWN_ITEMS: DropdownItem[] = [
  {
    label: 'Model Spec Directory',
    sublabel: '135 frontier & open architectures with specs',
    path: '/models',
    badge: '135 Models',
    icon: Layers,
  },
  {
    label: 'Head-to-Head Compare',
    sublabel: '10 in-depth architectural model showdowns',
    path: '/compare',
    badge: '10 Showdowns',
    icon: Scale,
  },
  {
    label: 'Benchmark Radar Hub',
    sublabel: '6 empirical leaderboards (Arena Elo, SWE-bench)',
    path: '/benchmarks',
    badge: '6 Boards',
    icon: BarChart3,
  },
  {
    label: 'Subscription & Buyer Guide',
    sublabel: 'Plus vs Pro vs Team pricing, quotas & ROI',
    path: '/subscriptions',
    badge: '2026 Guide',
    icon: DollarSign,
  },
];

function formatLiveDateTime(): string {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
  const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  return `${weekday}, ${month} ${day}, ${year} • ${hours}:${minutes} UTC`;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  bookmarksCount,
  onOpenBookmarks,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(formatLiveDateTime);

  // Desktop Dropdown State
  const [activeDropdown, setActiveDropdown] = useState<'news' | 'models' | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Mobile Accordion State
  const [mobileNewsExpanded, setMobileNewsExpanded] = useState(true);
  const [mobileModelsExpanded, setMobileModelsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Update live clock every 30 seconds
    const interval = setInterval(() => {
      setCurrentDateTime(formatLiveDateTime());
    }, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (dropdown: 'news' | 'models') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  // Determine active parents
  const isNewsActive = [
    '/ai',
    '/technology',
    '/science',
    '/briefing',
    '/analysis',
    '/deep-dives',
  ].some((p) => currentPath === p || currentPath.startsWith(p + '/'));

  const isModelsActive = [
    '/models',
    '/compare',
    '/subscriptions',
    '/benchmarks',
    '/guide',
  ].some((p) => currentPath === p || currentPath.startsWith(p + '/'));

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Telemetry & Signal Purity Bar */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/80 px-2.5 sm:px-4 py-1.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-zinc-400 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
            <div className="flex items-center gap-1.5 text-emerald-400 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="hidden sm:inline font-semibold tracking-wide whitespace-nowrap">
                SIGNAL PURITY: 99.4%
              </span>
              <span className="sm:hidden font-semibold tracking-wide whitespace-nowrap">99.4%</span>
            </div>
            <span className="text-zinc-700 shrink-0">|</span>
            <div
              className="flex items-center gap-1.5 text-zinc-300 font-mono shrink-0"
              title="Live Publication Timestamp (UTC)"
            >
              <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="font-medium tracking-tight text-zinc-200 whitespace-nowrap hidden sm:inline">
                {currentDateTime}
              </span>
              <span className="font-medium tracking-tight text-zinc-200 whitespace-nowrap sm:hidden">
                {currentDateTime.includes('•') ? currentDateTime.split('•')[1]?.trim() : currentDateTime}
              </span>
            </div>
            <span className="hidden xl:inline text-zinc-700">|</span>
            <span className="hidden xl:inline text-zinc-500 whitespace-nowrap">
              Editorial Rule: <span className="text-zinc-300">Less noise. More signal.</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('/briefing')}
              className="flex items-center gap-1 sm:gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-[11px] hidden sm:inline whitespace-nowrap">
                Daily Briefing
              </span>
              <span className="font-semibold text-[10px] sm:hidden whitespace-nowrap">Briefing</span>
              <span className="hidden md:inline text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                3-Min Scan
              </span>
            </button>
            <span className="text-zinc-700 shrink-0">|</span>
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1 text-zinc-300 hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
              title="View Bookmarks"
            >
              <Bookmark className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-[11px] whitespace-nowrap">Saved</span>
              {bookmarksCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full px-4 border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/95 border-zinc-800 shadow-xl backdrop-blur-lg py-3'
            : 'bg-zinc-950/80 border-zinc-900 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand (Clicking logo goes Home) */}
          <div
            onClick={() => handleLinkClick('/')}
            className="cursor-pointer group shrink-0"
          >
            <NextVectorLogo
              size={28}
              withContainer={true}
              showWordmark={true}
              tagline="Technology & AI Intelligence"
            />
          </div>

          {/* Desktop Streamlined Navigation (5 Key Groups) */}
          <div
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-1.5 xl:gap-2"
          >
            {/* 1. NEWS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('news')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'news' ? null : 'news')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isNewsActive || activeDropdown === 'news'
                    ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
                aria-expanded={activeDropdown === 'news'}
              >
                <span>News</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'news' ? 'rotate-180 text-emerald-400' : 'text-zinc-500'
                  }`}
                />
              </button>

              {/* News Flyout Menu */}
              {activeDropdown === 'news' && (
                <div
                  className="absolute top-full left-0 mt-2 w-84 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('news')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold border-b border-zinc-800/80 mb-1">
                    Editorial Coverage & Formats
                  </div>
                  <div className="space-y-1">
                    {NEWS_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isItemActive = currentPath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleLinkClick(item.path)}
                          className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between group cursor-pointer border ${
                            isItemActive
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'hover:bg-zinc-900/80 border-transparent hover:border-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-2 rounded-lg border transition-colors shrink-0 ${
                                isItemActive
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div
                                className={`text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                                  isItemActive
                                    ? 'text-emerald-300'
                                    : 'text-zinc-200 group-hover:text-emerald-300'
                                }`}
                              >
                                <span>{item.label}</span>
                              </div>
                              <div className="text-[11px] text-zinc-500 font-sans leading-tight mt-0.5 truncate group-hover:text-zinc-400">
                                {item.sublabel}
                              </div>
                            </div>
                          </div>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-700/80 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 shrink-0 ml-2">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. AI MODELS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('models')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'models' ? null : 'models')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isModelsActive || activeDropdown === 'models'
                    ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
                aria-expanded={activeDropdown === 'models'}
              >
                <span>AI Models</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'models' ? 'rotate-180 text-emerald-400' : 'text-zinc-500'
                  }`}
                />
              </button>

              {/* Models Flyout Menu */}
              {activeDropdown === 'models' && (
                <div
                  className="absolute top-full left-0 mt-2 w-92 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('models')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold border-b border-zinc-800/80 mb-1">
                    Model Intelligence & Benchmarks
                  </div>
                  <div className="space-y-1">
                    {MODELS_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isItemActive =
                        currentPath === item.path || currentPath.startsWith(item.path + '/');
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleLinkClick(item.path)}
                          className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between group cursor-pointer border ${
                            isItemActive
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'hover:bg-zinc-900/80 border-transparent hover:border-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-2 rounded-lg border transition-colors shrink-0 ${
                                isItemActive
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div
                                className={`text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                                  isItemActive
                                    ? 'text-emerald-300'
                                    : 'text-zinc-200 group-hover:text-emerald-300'
                                }`}
                              >
                                <span>{item.label}</span>
                              </div>
                              <div className="text-[11px] text-zinc-500 font-sans leading-tight mt-0.5 truncate group-hover:text-zinc-400">
                                {item.sublabel}
                              </div>
                            </div>
                          </div>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-700/80 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 shrink-0 ml-2">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. RESEARCH EXPLAINED */}
            <button
              onClick={() => handleLinkClick('/research')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                currentPath === '/research'
                  ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
              }`}
            >
              Research
            </button>

            {/* 4. BREAKTHROUGH TIMELINE */}
            <button
              onClick={() => handleLinkClick('/timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                currentPath === '/timeline'
                  ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
              }`}
            >
              Timeline
            </button>

            {/* 5. ABOUT */}
            <button
              onClick={() => handleLinkClick('/about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                currentPath === '/about'
                  ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
              }`}
            >
              About
            </button>
          </div>

          {/* Action Tools (Search & Mobile Burger) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Search Intelligence...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-500">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Accordions for News & AI Models) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 border-t border-zinc-800/80 px-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile: News Accordion */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">
              <button
                onClick={() => setMobileNewsExpanded(!mobileNewsExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono font-bold text-zinc-300 hover:text-white cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>News & Editorial Coverage</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform text-zinc-500 ${
                    mobileNewsExpanded ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              {mobileNewsExpanded && (
                <div className="px-2 pb-2 space-y-1 border-t border-zinc-800/60 pt-1.5">
                  {NEWS_DROPDOWN_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isItemActive = currentPath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleLinkClick(item.path)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          isItemActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{item.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile: AI Models Accordion */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">
              <button
                onClick={() => setMobileModelsExpanded(!mobileModelsExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono font-bold text-zinc-300 hover:text-white cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Models & Intelligence</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform text-zinc-500 ${
                    mobileModelsExpanded ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              {mobileModelsExpanded && (
                <div className="px-2 pb-2 space-y-1 border-t border-zinc-800/60 pt-1.5">
                  {MODELS_DROPDOWN_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isItemActive =
                      currentPath === item.path || currentPath.startsWith(item.path + '/');
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleLinkClick(item.path)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          isItemActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{item.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Mobile Links */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => handleLinkClick('/research')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                  currentPath === '/research'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <span>Research Explained</span>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
              </button>

              <button
                onClick={() => handleLinkClick('/timeline')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                  currentPath === '/timeline'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <span>Breakthrough Timeline</span>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
              </button>

              <button
                onClick={() => handleLinkClick('/about')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                  currentPath === '/about'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <span>About & Editorial Mission</span>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
