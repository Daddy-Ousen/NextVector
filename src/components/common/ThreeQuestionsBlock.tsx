import React from 'react';
import { ThreeQuestions } from '../../types';
import { HelpCircle, Zap, Compass } from 'lucide-react';

interface ThreeQuestionsBlockProps {
  questions: ThreeQuestions;
  compact?: boolean;
}

export const ThreeQuestionsBlock: React.FC<ThreeQuestionsBlockProps> = ({ questions, compact = false }) => {
  if (compact) {
    return (
      <div className="space-y-2 text-xs border-t border-zinc-800/80 pt-3 mt-3">
        <div className="flex items-start gap-2">
          <span className="eyebrow shrink-0 w-12">What:</span>
          <p className="text-zinc-300 line-clamp-2">{questions.whatHappened}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="eyebrow shrink-0 w-12">Why:</span>
          <p className="text-zinc-300 line-clamp-2">{questions.whyItMatters}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="eyebrow shrink-0 w-12">Next:</span>
          <p className="text-zinc-300 line-clamp-2">{questions.whatsNext}</p>
        </div>
      </div>
    );
  }

  const items = [
    { icon: HelpCircle, label: '1. What happened?', text: questions.whatHappened },
    { icon: Zap, label: '2. Why does it matter?', text: questions.whyItMatters },
    { icon: Compass, label: "3. What's next?", text: questions.whatsNext },
  ];

  // One card, sections split by dividers (no cards inside the card).
  return (
    <section className="my-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 md:p-7">
      <p className="eyebrow mb-4">NextVector Editorial Triad</p>
      <div className="divide-y divide-zinc-800">
        {items.map(({ icon: Icon, label, text }) => (
          <div key={label} className="py-5 first:pt-0 last:pb-0">
            <p className="flex items-center gap-2 mb-2 text-base font-bold text-zinc-100">
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{label}</span>
            </p>
            <p className="text-base text-zinc-200 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
