import React from 'react';
import { SubscriptionGuide, PLANS_CHECKED } from '../components/models/SubscriptionGuide';
import { SEOHead } from '../components/common/SEOHead';
import { Sparkles, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { GUIDE_PICKS } from '../data/showdownsData';

interface SubscriptionsPageProps {
  onSelectModel: (modelId: string) => void;
  onNavigate: (path: string) => void;
}

const top = GUIDE_PICKS.find((p) => p.id === 'top-arena');
const topCoding = GUIDE_PICKS.find((p) => p.id === 'aa-coding');

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({
  onSelectModel,
  onNavigate,
}) => {
  // Plan facts copied from vendor pricing pages on PLANS_CHECKED (see SubscriptionGuide.tsx header)
  const subscriptionFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best AI subscription to get in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `For most people, ChatGPT Plus ($20/mo) or Claude Pro ($20/mo). Claude Pro includes ${top?.modelName ?? 'Claude Opus 5.5'}, the released model with the highest arena.ai text score, plus Claude Code. ChatGPT Plus includes GPT-6.1 Sol, GPT-6 Astra and GPT-5.6 Sol, plus voice chats and image creation. Google AI Pro ($19.99/mo) suits Gmail and Drive users and adds 5 TB of storage. Plans checked ${PLANS_CHECKED}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is Claude Pro or ChatGPT Plus better for coding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Claude Pro is the usual pick for coding. Anthropic models lead the Artificial Analysis Coding Index (${topCoding ? `${topCoding.modelName}: ${topCoding.metric.replace('AA Coding Index ', '')}` : 'Claude Fable 5.1'}), and Claude Pro includes the Claude Code agent. ChatGPT Plus includes Codex, so it also works for coding.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is the ChatGPT Pro subscription worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ChatGPT Pro comes in three tiers: $100, $200 and $500 per month. It adds GPT-5.6 Sol Pro, more GPT-6 Astra reasoning, Dot (an always-on agent) and maximum deep research. It is worth it only if you hit the Plus limits every day. Most people get more from a $20 plan plus pay-per-use API credits.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best AI setup for a $100/month budget?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For developers: Claude Pro ($20/mo) or Cursor Pro ($20/mo) plus about $80 of API credits (a cheap model such as DeepSeek for bulk work, a top model for hard problems). For everyone else: one $100 plan from the lab you use most (Claude Max 5x, ChatGPT Pro 100 or Google AI Ultra).',
        },
      },
    ],
  };

  return (
    <div className="space-y-10 pb-24">
      <SEOHead
        title="Best AI Subscriptions to Get (2026 Buyer's Guide) — ChatGPT Plus vs Claude Pro | NextVector"
        description={`Plain-English 2026 AI subscription buyer's guide. Compare ChatGPT Plus ($20), Claude Pro ($20), Google AI Pro ($19.99), Cursor Pro and the $100–$200 plans. Prices checked on vendor pages ${PLANS_CHECKED}.`}
        canonicalPath="/subscriptions"
        schemaData={subscriptionFaqSchema}
        tags={[
          'Best AI Subscription',
          'Best AI Subscription to Get',
          'ChatGPT Plus vs Claude Pro',
          'AI Plans Comparison',
          'ChatGPT Pro',
          'Google AI Pro',
          'AI Buyer Guide 2026',
        ]}
      />

      <PageHeader
        eyebrow={<>2026 AI Buyer's Guide</>}
        icon={<Sparkles className="w-4 h-4" />}
        title={<>Best AI Subscriptions to Get in 2026 <span className="text-zinc-400">— ChatGPT Plus vs Claude Pro</span></>}
        description="A plain breakdown of the $20/mo plans, $100/mo power-user setups, and $100–$200/mo top tiers. Zero vendor commissions."
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

      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 text-xs space-y-2">
        <div className="eyebrow flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>Short Answer: Which $20 Plan?</span>
        </div>
        <p className="text-zinc-300 leading-relaxed font-sans text-sm">
          If you write, research or code, choose <strong>Claude Pro ($20/mo)</strong>. It includes {top?.modelName ?? 'Claude Opus 5.5'}, the top released model on Arena, and Claude Code.
          If you want voice chats, image creation and the GPT-6 models, choose <strong>ChatGPT Plus ($20/mo)</strong>.
          If you live in Gmail and Google Drive, choose <strong>Google AI Pro ($19.99/mo)</strong>, which also adds 5 TB of storage.
          With $100 to spend, see the budget planner below.
        </p>
      </div>

      <SubscriptionGuide onSelectModel={onSelectModel} />
    </div>
  );
};
