import React from 'react';
import { Benchmark } from '../types';
import { BenchmarkChart } from '../components/benchmarks/BenchmarkChart';
import { SEOHead } from '../components/common/SEOHead';
import { Scale, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { MODEL_COUNT, ARENA_RANKED_COUNT } from '../data/modelCount';
import { PageHeader } from '../components/common/PageHeader';

interface BenchmarksPageProps {
  benchmarks: Benchmark[];
  onSelectModel?: (id: string) => void;
}

export const BenchmarksPage: React.FC<BenchmarksPageProps> = ({ benchmarks, onSelectModel }) => {
  const benchmarksSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `NextVector AI Model Leaderboards (${MODEL_COUNT} Models Tracked)`,
    description: `Public leaderboard results for ${MODEL_COUNT} AI models, compiled from arena.ai (text), Artificial Analysis, OSWorld-Verified and SWE-bench Verified, plus a price vs Arena score frontier calculated from list prices.`,
    isBasedOn: ['https://arena.ai/leaderboard/text', 'https://os-world.github.io/', 'https://www.swebench.com/'],
    creator: {
      '@type': 'Person',
      name: 'Robiul Hasan',
      url: 'https://rhasan.online',
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'NextVector',
      url: 'https://nextvector.rhasan.online',
    },
  };

  return (
    <div className="space-y-12 pb-20">
      <SEOHead
        title={`AI Benchmarks: Arena, Artificial Analysis, OSWorld & SWE-bench Leaderboards | NextVector`}
        description={`Arena text scores, the Artificial Analysis Intelligence Index, OSWorld-Verified and SWE-bench Verified results, and a price vs score frontier for ${MODEL_COUNT} AI models. Every board links to its public source and date.`}
        canonicalPath="/benchmarks"
        schemaData={benchmarksSchema}
      />
      {/* Header */}
      <PageHeader
        eyebrow="Benchmarks & Methods"
        icon={<Scale className="w-4 h-4" />}
        title="AI Benchmark Leaderboards"
        description={`Results copied from public leaderboards, with the source and date for each board. We do not run these tests ourselves. We track ${MODEL_COUNT} models; ${ARENA_RANKED_COUNT} have an arena.ai text score, and the Arena board shows arena.ai's own ranks. Arena measures which chat answers people prefer, not coding or agent work.`}
      />

      {/* Main Interactive Benchmark Visualizer */}
      <BenchmarkChart benchmarks={benchmarks} onSelectModel={onSelectModel} />

      {/* Editorial Evaluation Manifesto / Truth in Benchmarking */}
      <section className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="heading-section flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>How to Read These Boards</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Why raw leaderboard percentages often deceive enterprise and developer teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 space-y-2">
            <div className="eyebrow-warn">
              1. Contamination & Memorization
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Static public datasets (like GSM8K or HumanEval) inevitably leak into web-scale pre-training data. High scores frequently reflect verbatim token memorization rather than generalized problem-solving.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 space-y-2">
            <div className="eyebrow">
              2. Test-Time Compute Disparity
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              The same model can score very differently at different reasoning settings. Arena lists each setting separately (for example "high" or "max"); we show the best one and name it. For SWE-bench and OSWorld we only show runs that use the same harness, so models are compared on equal terms.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 space-y-2">
            <div className="eyebrow">
              3. The Real-World Friction Gap
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              A model scoring 70% on isolated repo bugs can still fail dramatically in live developer environments due to context drift, ambiguous human prompts, and brittle tool schema serialization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
