import React from 'react';
import { ThreeQuestions } from '../../types';
import { HelpCircle, Zap, Compass, CheckCircle2 } from 'lucide-react';

interface ThreeQuestionsBlockProps {
  questions: ThreeQuestions;
  compact?: boolean;
}

export const ThreeQuestionsBlock: React.FC<ThreeQuestionsBlockProps> = ({ questions, compact = false }) => {
  if (compact) {
    return (
      <div className="space-y-2 text-xs border-t border-zinc-800/80 pt-3 mt-3">
        <div className="flex items-start gap-2">
          <span className="font-mono text-blue-400 font-semibold shrink-0 uppercase tracking-wider text-[10px]">What:</span>
          <p className="text-zinc-300 line-clamp-1">{questions.whatHappened}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-mono text-emerald-400 font-semibold shrink-0 uppercase tracking-wider text-[10px]">Why:</span>
          <p className="text-zinc-300 line-clamp-1">{questions.whyItMatters}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-mono text-purple-400 font-semibold shrink-0 uppercase tracking-wider text-[10px]">Next:</span>
          <p className="text-zinc-300 line-clamp-1">{questions.whatsNext}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 p-5 md:p-7 shadow-2xl relative overflow-hidden">
      {/* Editorial Watermark Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-zinc-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            NextVector Editorial Triad
          </span>
        </div>
        <div className="text-[11px] font-mono text-zinc-400 bg-zinc-800/70 px-3 py-1 rounded-full border border-zinc-700/60">
          Core Signal Framework
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Question 1: What Happened? */}
        <div className="flex flex-col bg-zinc-950/60 rounded-xl p-5 border-t-2 border-blue-500/80 border-x border-b border-zinc-800/60 hover:border-blue-500/40 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-blue-400 font-mono text-xs uppercase tracking-wider font-bold">
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>1. What Happened?</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {questions.whatHappened}
          </p>
        </div>

        {/* Question 2: Why Does It Matter? */}
        <div className="flex flex-col bg-zinc-950/60 rounded-xl p-5 border-t-2 border-emerald-500/80 border-x border-b border-zinc-800/60 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
            <Zap className="w-4 h-4 shrink-0" />
            <span>2. Why Does It Matter?</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {questions.whyItMatters}
          </p>
        </div>

        {/* Question 3: What's Next? */}
        <div className="flex flex-col bg-zinc-950/60 rounded-xl p-5 border-t-2 border-purple-500/80 border-x border-b border-zinc-800/60 hover:border-purple-500/40 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-purple-400 font-mono text-xs uppercase tracking-wider font-bold">
            <Compass className="w-4 h-4 shrink-0" />
            <span>3. What's Next?</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {questions.whatsNext}
          </p>
        </div>
      </div>
    </div>
  );
};
