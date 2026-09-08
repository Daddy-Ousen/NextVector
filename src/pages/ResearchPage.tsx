import React, { useState } from 'react';
import { ResearchPaper } from '../types';
import { BookOpen, ExternalLink, ArrowRight, Layers, CheckCircle2, FlaskConical, Rocket } from 'lucide-react';

interface ResearchPageProps {
  papers: ResearchPaper[];
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ papers }) => {
  const [selectedField, setSelectedField] = useState<string>('all');

  const fields = [
    { label: 'All Fields', value: 'all' },
    { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
    { label: 'Quantum Science', value: 'Quantum Science' },
    { label: 'Biotechnology', value: 'Biotechnology' },
    { label: 'Materials Science', value: 'Materials Science' },
  ];

  const filteredPapers = selectedField === 'all'
    ? papers
    : papers.filter((p) => p.field === selectedField);

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 p-6 md:p-10 shadow-2xl relative">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Academic Rigor • Accessible Analysis</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight leading-tight">
            Research Explained: Frontier Papers Decoded
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-sans mt-3 leading-relaxed">
            Deconstructing foundational ArXiv preprints and peer-reviewed studies without stripping away essential mathematics, physical bounds, or algorithmic innovations.
          </p>
        </div>
      </div>

      {/* Field Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {fields.map((f) => (
          <button
            key={f.value}
            onClick={() => setSelectedField(f.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
              selectedField === f.value
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Paper Cards List */}
      <div className="space-y-6">
        {filteredPapers.map((paper) => {
          const isPaper = paper.stage === 'Paper';
          const isProto = paper.stage === 'Prototype';
          const isProduct = paper.stage === 'Product / Scale';

          return (
            <div
              key={paper.id}
              className="rounded-2xl bg-zinc-950 border border-zinc-800/80 p-6 md:p-8 hover:border-zinc-700 transition-all shadow-xl"
            >
              {/* Header: Field & Progression Pipeline */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400">
                    {paper.field}
                  </span>
                  {paper.arxivId && (
                    <span className="text-xs font-mono text-zinc-500">
                      arXiv:{paper.arxivId}
                    </span>
                  )}
                </div>

                {/* Pipeline Stage Tracker */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-500 mr-1 text-[11px] uppercase tracking-wider">Pipeline:</span>
                  <span className={`px-2 py-0.5 rounded-full border ${isPaper ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 font-bold' : 'text-zinc-500 border-zinc-800'}`}>
                    Paper
                  </span>
                  <span className="text-zinc-600">→</span>
                  <span className={`px-2 py-0.5 rounded-full border ${isProto ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 font-bold' : 'text-zinc-500 border-zinc-800'}`}>
                    Prototype
                  </span>
                  <span className="text-zinc-600">→</span>
                  <span className={`px-2 py-0.5 rounded-full border ${isProduct ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold' : 'text-zinc-500 border-zinc-800'}`}>
                    Product
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans leading-snug">
                  {paper.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mt-2">
                  <span className="text-zinc-200">{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ' et al.' : ''}</span>
                  <span>•</span>
                  <span>{paper.institution}</span>
                  <span>•</span>
                  <span>{paper.publishedDate}</span>
                </div>
              </div>

              {/* High-Signal Dual Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-6">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Plain English Translation</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                    {paper.plainEnglishBreakdown}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Technical Architecture & Mechanism</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {paper.technicalDepth}
                  </p>
                </div>
              </div>

              {/* Footer timeline and link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-3 border-t border-zinc-800/80 text-zinc-400">
                <div>
                  Commercial Horizon: <strong className="text-zinc-200">{paper.commercialTimeline}</strong>
                </div>
                <a
                  href={paper.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>Read Primary Source Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
