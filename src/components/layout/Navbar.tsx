import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Sparkles, Menu, X, Compass, Activity, ArrowRight, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'AI', path: '/ai' },
    { label: 'Technology', path: '/technology' },
    { label: 'Science', path: '/science' },
    { label: 'Research', path: '/research' },
    { label: 'Models', path: '/models' },
    { label: 'Benchmarks', path: '/benchmarks' },
    { label: 'Analysis', path: '/analysis' },
    { label: 'Deep Dives', path: '/deep-dives' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'About', path: '/about' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Telemetry & Signal Purity Bar */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/80 px-4 py-1.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold tracking-wide">SIGNAL PURITY: 99.4%</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="hidden sm:inline text-zinc-500">
              Editorial Rule: <span className="text-zinc-300">Less noise. More signal.</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('/briefing')}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">Daily Briefing</span>
              <span className="hidden md:inline text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                3-Min Scan
              </span>
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1 text-zinc-300 hover:text-emerald-400 transition-colors"
              title="View Bookmarks"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {bookmarksCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>
            <span className="text-zinc-700">|</span>
            <a
              href="https://rhasan.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-300 hover:text-emerald-400 transition-colors font-semibold"
              title="Founder Website"
            >
              <span>rhasan.online</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full px-4 border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/95 border-zinc-800 shadow-xl backdrop-blur-lg py-3'
            : 'bg-zinc-950/80 border-zinc-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-cyan-700 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-emerald-400 text-base tracking-tighter">
                  NV
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-extrabold text-lg tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  NextVector
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                  v2.6
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase -mt-0.5">
                Technology & AI Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-800/90 text-emerald-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Action Tools (Search & Mobile Burger) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all"
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
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 border-t border-zinc-800/80 px-2 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-mono transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};
