import React from 'react';
import { MOCK_DAILY_BRIEFING } from '../data/mockData';
import { Sparkles, Printer, ArrowRight, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

interface DailyBriefingPageProps {
  onSelectArticle: (slug: string) => void;
}

export const DailyBriefingPage: React.FC<DailyBriefingPageProps> = ({ onSelectArticle }) => {
  const briefing = MOCK_DAILY_BRIEFING;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 pt-2">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>The Morning Vector • Executive Edition</span>
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
