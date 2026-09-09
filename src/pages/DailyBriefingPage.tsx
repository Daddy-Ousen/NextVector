import React, { useState } from 'react';
import { MOCK_DAILY_BRIEFING } from '../data/mockData';
import { Sparkles, Printer, ArrowRight, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { NextVectorLogo } from '../components/common/NextVectorLogo';

interface DailyBriefingPageProps {
  onSelectArticle: (slug: string) => void;
}

export const DailyBriefingPage: React.FC<DailyBriefingPageProps> = ({ onSelectArticle }) => {
  const briefing = MOCK_DAILY_BRIEFING;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('nv_subscribed') === 'true';
  });

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nv_subscribed', 'true');
        localStorage.setItem('nv_subscriber_email', email.trim());
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 pt-2">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <NextVectorLogo size={22} withContainer={true} showWordmark={false} />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Morning Vector • Executive Edition</span>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Scan</span>
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-serif tracking-tight">
          Daily Intelligence Briefing
        </h1>
        <div className="text-sm font-mono text-zinc-400 mt-2">
          {briefing.date} • Estimated Read Time: 3 minutes
        </div>

        {/* Executive Summary Block */}
        <div className="mt-6 p-5 rounded-2xl bg-zinc-950 border border-emerald-500/20 text-zinc-200 font-sans text-base leading-relaxed italic border-l-4 border-l-emerald-500">
          "{briefing.summary}"
        </div>
      </div>

      {/* Structured Briefing Items */}
      <div className="space-y-8">
        {briefing.items.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-2xl bg-zinc-950 border border-zinc-800/90 p-6 md:p-8 space-y-4 hover:border-zinc-700 transition-colors shadow-lg"
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-500">0{idx + 1}.</span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 uppercase text-zinc-300">
                  {item.category}
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full font-bold ${
                  item.urgency === 'Critical Signal'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {item.urgency}
              </span>
            </div>

            <h3 className="text-xl font-bold text-zinc-100 font-sans leading-snug">
              {item.headline}
            </h3>

            <div className="space-y-3 text-sm font-sans">
              <div>
                <strong className="text-zinc-200 block text-xs font-mono uppercase text-zinc-500 mb-1">
                  The Development:
                </strong>
                <p className="text-zinc-300 leading-relaxed">{item.summary}</p>
              </div>

              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <strong className="text-emerald-400 block text-xs font-mono uppercase tracking-wider mb-1">
                  Why It Matters:
                </strong>
                <p className="text-zinc-200 leading-relaxed text-xs md:text-sm">
                  {item.whyItMatters}
                </p>
              </div>
            </div>

            {item.articleSlug && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onSelectArticle(item.articleSlug!)}
                  className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>Read Full Intelligence Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Direct Newsletter Delivery Subscription Box */}
      <div className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-emerald-500/30 p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div className="flex items-center gap-3">
            <NextVectorLogo size={28} withContainer={true} showWordmark={false} />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>The Morning Vector</span>
              </div>
              <h4 className="text-lg font-bold text-zinc-100 font-sans mt-0.5">
                Get Tomorrow's Briefing Delivered to Your Inbox
              </h4>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold shrink-0">
            06:00 UTC Daily
          </span>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
          Join 45,000+ AI researchers, systems architects, and venture partners who read The Morning Vector before markets open. Rigorous primary-source deconstruction, zero fluff.
        </p>

        {subscribed ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-mono text-emerald-300 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-bold text-emerald-400">Subscribed to The Morning Vector</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('nv_subscribed');
                      localStorage.removeItem('nv_subscriber_email');
                    }
                  }}
                  className="text-zinc-400 hover:text-zinc-200 underline text-xs"
                >
                  Change Email
                </button>
                <a
                  href="https://nextvectorr.substack.com/?r=92ang8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-200 underline shrink-0 text-xs"
                >
                  Substack Archive ↗
                </a>
              </div>
            </div>
            {typeof window !== 'undefined' && localStorage.getItem('nv_subscriber_email') && (
              <p className="text-zinc-400 text-xs">
                Subscription email: <span className="text-zinc-100 font-semibold">{localStorage.getItem('nv_subscriber_email')}</span>
              </p>
            )}
            <div className="pt-1">
              <a
                href={`https://nextvectorr.substack.com/subscribe?email=${encodeURIComponent(typeof window !== 'undefined' ? localStorage.getItem('nv_subscriber_email') || '' : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold text-xs inline-flex items-center gap-1"
              >
                Confirm / Manage Your Subscription on Substack ↗
              </a>
            </div>
          </div>
        ) : (
          <div>
            <form
              action="https://nextvectorr.substack.com/subscribe"
              method="get"
              target="_blank"
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@domain.com"
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-xs font-mono text-zinc-100 placeholder-zinc-500 outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-md active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <span>Subscribe Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-zinc-500 mt-2.5 font-mono">
              Official Substack portal: <a href="https://nextvectorr.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="text-[#FF6719] hover:underline">nextvectorr.substack.com/subscribe ↗</a>
            </p>
          </div>
        )}
      </div>

      {/* Verification footer */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2 text-xs font-mono text-zinc-500">
        <div className="flex items-center justify-center gap-1.5 text-zinc-400 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Curated by NextVector Editorial Board</span>
        </div>
        <p>
          Each item has been verified against primary technical source papers, engineering logs, or hardware patents.
        </p>
      </div>
    </div>
  );
};
