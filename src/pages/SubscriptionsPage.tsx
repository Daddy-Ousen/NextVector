import React from 'react';
import { ModelDecisionGuide } from '../components/models/ModelDecisionGuide';
import { SEOHead } from '../components/common/SEOHead';
import { Sparkles, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { GUIDE_PICKS } from '../data/showdownsData';
import { MODEL_DATA_AS_OF } from '../data/modelsData';

interface SubscriptionsPageProps {
  onSelectModel: (modelId: string) => void;
  onNavigate: (path: string) => void;
}

const pick = (id: string) => GUIDE_PICKS.find((p) => p.id === id);

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({
  onSelectModel,
  onNavigate,
}) => {
  const top = pick('top-arena');
  const value = pick('value');
  const open = pick('open');

  // Answers use only generated data; plan prices are left to the vendors' own pages
  const subscriptionFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which AI model scores highest right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: top
            ? `Among generally released models we track, ${top.modelName} (${top.developer}) has the highest arena.ai text score: ${top.metric}. List price: ${top.price}. Data checked ${MODEL_DATA_AS_OF}.`
            : 'See the Arena leaderboard on our benchmarks page.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best value AI model for API use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: value
            ? `${value.modelName} has the highest Arena score among models under $1 per 1M tokens (blended 3 input : 1 output): ${value.metric}.`
            : 'See the price vs Arena score frontier on our benchmarks page.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which open-weights model scores highest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: open ? `${open.modelName} (${open.developer}): ${open.metric}.` : 'See the model directory, filtered to open weights.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which subscription plan should I buy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We do not track consumer plans, because what each plan includes changes often. First pick the model that fits your work using the guide on this page, then check which plan includes it on the vendor\'s pricing page.',
        },
      },
    ],
  };

  return (
    <div className="space-y-10 pb-24">
      <SEOHead
        title="AI Model Buyer's Guide: Best Model by Score, Price & Use | NextVector"
        description={`Pick an AI model by data: highest arena.ai score, best score per dollar, best open-weights model, computer use and coding results. Every pick shows its rule and source. Data checked ${MODEL_DATA_AS_OF}.`}
        canonicalPath="/subscriptions"
        schemaData={subscriptionFaqSchema}
        tags={['Best AI Model', 'AI Model Comparison', 'AI Buyer Guide', 'Best Value LLM', 'Open Weights Models']}
      />

      <PageHeader
        eyebrow={<>AI Buyer's Guide</>}
        icon={<Sparkles className="w-4 h-4" />}
        title="Which AI Model Should You Use?"
        description="Picks chosen by stated rules over public leaderboards and list prices. No vendor commissions."
      />

      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Independent. NextVector receives no affiliate commissions or vendor payments.</span>
        </div>
        <button
          onClick={() => onNavigate('/compare/claude-vs-chatgpt')}
          className="text-emerald-400 hover:underline flex items-center gap-1 shrink-0 font-bold"
        >
          <span>View Claude vs ChatGPT Showdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {top && value && (
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 text-xs space-y-2">
          <div className="eyebrow flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Short Answer</span>
          </div>
          <p className="text-zinc-300 leading-relaxed font-sans text-sm">
            Highest Arena score: <strong>{top.modelName}</strong> ({top.metric}; {top.price}). Best score under $1 per 1M
            tokens: <strong>{value.modelName}</strong> ({value.metric}). Data checked {MODEL_DATA_AS_OF}.
          </p>
        </div>
      )}

      <ModelDecisionGuide onSelectModel={onSelectModel} />
    </div>
  );
};
