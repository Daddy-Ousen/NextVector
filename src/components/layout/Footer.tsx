import React from 'react';
import { Mail, ShieldCheck, Zap, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { NextVectorLogo } from '../common/NextVectorLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 mt-20 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Editorial Manifesto & Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-zinc-800/80">
          <div className="lg:col-span-7 space-y-4">
            <div className="cursor-pointer group inline-block" onClick={() => onNavigate('/')}>
              <NextVectorLogo
                size={26}
                withContainer={true}
                showWordmark={true}
                version={null}
                tagline="Technology & AI Intelligence"
              />
            </div>

            <p className="text-lg text-zinc-200 font-serif italic max-w-xl">
              "Technology is moving extremely fast. We identify the developments worth paying attention to. Less noise. More signal."
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-xl">
              NextVector is an independent digital intelligence platform dedicated to surfacing genuine technological progress and scientific breakthroughs. Every report rigorously answers three core questions: <strong className="text-zinc-200">What happened? Why does it matter? What could happen next?</strong>
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero Clickbait Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                Primary Source Verified
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Peer-Grade Analysis
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  <Mail className="w-4 h-4" />
                  <span>The Morning Vector</span>
                </div>
                <a
                  href="https://nextvectorr.substack.com/?r=92ang8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-[#FF6719] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Substack Edition</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <h4 className="text-base font-bold text-zinc-100">
                The 3-Minute Executive Signal Briefing
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Join 45,000+ AI researchers, systems architects, and technology leaders. Delivered every weekday via Substack.
              </p>
            </div>

            <div className="mt-4">
              <div className="rounded-xl overflow-hidden bg-white shadow-lg border border-zinc-700/60">
                <iframe
                  src="https://nextvectorr.substack.com/embed"
                  width="100%"
                  height="155"
                  style={{ border: 'none', background: 'white', display: 'block' }}
                  frameBorder="0"
                  scrolling="no"
                  title="Subscribe to The Morning Vector on Substack"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2.5 px-1">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Official Substack Instant Verification
                </span>
                <a
                  href="https://nextvectorr.substack.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Substack Archive ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-zinc-800/80 text-xs font-mono">
          <div>
            <h5 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Coverage Areas</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/ai')} className="hover:text-emerald-400 transition-colors">
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/technology')} className="hover:text-emerald-400 transition-colors">
                  Semiconductors & Hardware
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/science')} className="hover:text-emerald-400 transition-colors">
                  Science & Quantum Physics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/research')} className="hover:text-emerald-400 transition-colors">
                  Research Explained
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Intelligence Hubs</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/models')} className="hover:text-emerald-400 transition-colors">
                  AI Model Spec Database
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/benchmarks')} className="hover:text-emerald-400 transition-colors">
                  Benchmark Radar & Caveats
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/timeline')} className="hover:text-emerald-400 transition-colors">
                  Technology Timeline
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/briefing')} className="hover:text-emerald-400 transition-colors">
                  Daily Briefing Scan
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Editorial Formats</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/analysis')} className="hover:text-emerald-400 transition-colors">
                  News Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/deep-dives')} className="hover:text-emerald-400 transition-colors">
                  Technical Deep Dives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/models')} className="hover:text-emerald-400 transition-colors">
                  Model Release Reports
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/benchmarks')} className="hover:text-emerald-400 transition-colors">
                  Benchmark Deconstruction
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Standards & Mission</h5>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-emerald-400 transition-colors text-left">
                  About Editor (Robiul Hasan)
                </button>
              </li>
              <li>
                <a
                  href="https://rhasan.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 text-emerald-400 font-semibold"
                >
                  <span>rhasan.online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://nextvectorr.substack.com/?r=92ang8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6719] transition-colors inline-flex items-center gap-1 text-zinc-300 font-medium"
                >
                  <span>Substack Publication</span>
                  <ExternalLink className="w-3 h-3 text-[#FF6719]" />
                </a>
              </li>
              <li>The Three-Question Framework</li>
              <li>Signal vs. Noise Algorithm</li>
              <li>Primary Source Auditing</li>
              <li>Evaluation Lab Methodology</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} NextVector Intelligence. Founded and Edited by{' '}
            <a
              href="https://rhasan.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-semibold"
            >
              Robiul Hasan
            </a>{' '}
            (Dhaka). Filter the noise.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/about')} className="hover:text-emerald-400 transition-colors">
              Editorial Lead
            </button>
            <span>Privacy Protocol</span>
            <span>Editorial Charter</span>
            <span>Status: Operational (100%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
