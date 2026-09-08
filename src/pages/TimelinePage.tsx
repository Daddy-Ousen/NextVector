import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { Compass, Sparkles, Filter, ShieldCheck, ArrowRight } from 'lucide-react';

interface TimelinePageProps {
  events: TimelineEvent[];
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Milestones', value: 'all' },
    { label: 'AI Breakthrough', value: 'AI Breakthrough' },
    { label: 'Semiconductors', value: 'Semiconductors' },
    { label: 'Computing Architecture', value: 'Computing Architecture' },
    { label: 'Fundamental Science', value: 'Fundamental Science' },
    { label: 'Space & Quantum', value: 'Space & Quantum' },
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 p-6 md:p-10 shadow-2xl relative">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
            <Compass className="w-4 h-4" />
            <span>Chronological Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
            Technology & Science Breakthrough Timeline
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-sans mt-3 leading-relaxed">
            A verified chronological record of paradigm-shifting milestones across frontier intelligence, semiconductor lithography, and quantum physics.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setSelectedCategory(c.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
              selectedCategory === c.value
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
        {filteredEvents.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

            {/* Event Card */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800/90 p-6 hover:border-zinc-700 transition-all shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800/80 mb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400 text-sm">
                    {event.month} {event.year}
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {event.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Impact Score: {event.impactScore}/100</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-100 font-sans group-hover:text-cyan-400 transition-colors">
                {event.title}
              </h3>

              <p className="text-sm text-zinc-300 font-sans mt-2 leading-relaxed">
                {event.summary}
              </p>

              <div className="mt-4 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="text-cyan-400 font-semibold uppercase text-[10px] tracking-wider block mb-0.5">
                  Paradigm Shift:
                </span>
                <span className="text-zinc-200">{event.keyShift}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
