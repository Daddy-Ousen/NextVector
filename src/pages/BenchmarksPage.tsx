import React from 'react';
import { Benchmark } from '../types';
import { BenchmarkChart } from '../components/benchmarks/BenchmarkChart';
import { SEOHead } from '../components/common/SEOHead';
import { Scale, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { MODEL_COUNT } from '../data/modelCount';
import { PageHeader } from '../components/common/PageHeader';

interface BenchmarksPageProps {
  benchmarks: Benchmark[];
  onSelectModel?: (id: string) => void;
}

export const BenchmarksPage: React.FC<BenchmarksPageProps> = ({ benchmarks, onSelectModel }) => {
  const benchmarksSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `NextVector AI Benchmark Radar (${MODEL_COUNT} Models Evaluated)`,
    description: `Empirical cross-domain benchmark audit evaluating ${MODEL_COUNT} AI foundation models across LMSYS Chatbot Arena, Price-to-Performance Pareto Index, OSWorld, WebArena, SWE-bench, and Cyber-Eval.`,
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
        title={`AI Benchmarks & Evaluation Audit (${MODEL_COUNT} Models) | NextVector`}
        description={`Comprehensive ${MODEL_COUNT}-model leaderboards across LMSYS Chatbot Arena, Price-to-Performance Pareto Index, OSWorld, WebArena, SWE-bench Verified, and Cyber-Eval. Empirical data without marketing hype.`}
        canonicalPath="/benchmarks"
        schemaData={benchmarksSchema}
      />
      {/* Header */}
      <PageHeader
        eyebrow="Benchmarks & Methods"
        icon={<Scale className="w-4 h-4" />}
        title="AI Benchmark Radar & Evaluation Audit"
        description="Distinguishing genuine technological capability shifts from marketing-driven cherry-picking, benchmark saturation, and training data contamination."
      />

      {/* Main Interactive Benchmark Visualizer */}
      <BenchmarkChart benchmarks={benchmarks} onSelectModel={onSelectModel} />

      {/* Editorial Evaluation Manifesto / Truth in Benchmarking */}
      <section className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="heading-section flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>The NextVector Benchmark Evaluation Protocol</span>
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
              Comparing a model running 500ms zero-shot completion against a model executing 64k thinking tokens or 100-sample majority voting creates false equivalencies. We normalize by cost and latency.
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
