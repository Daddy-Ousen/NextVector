import React from 'react';
import { ModelDecisionGuide } from '../components/models/ModelDecisionGuide';
import { SEOHead } from '../components/common/SEOHead';
import { Sparkles, Compass, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

interface SubscriptionsPageProps {
  onSelectModel: (modelId: string) => void;
  onNavigate: (path: string) => void;
}

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({
  onSelectModel,
  onNavigate,
}) => {
  const subscriptionFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best AI subscription to get in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For individual developers and knowledge workers, ChatGPT Plus ($20/mo) and Claude Pro ($20/mo) remain the top two choices. Claude Pro is superior for complex multi-file coding, formal logic, and prose writing due to Claude Opus 5.5 and Sonnet 5 with 1M context. ChatGPT Plus is superior for autonomous operating system navigation, web browsing integration, and multimodal voice interactions with GPT-6 Astra (limited caps) and GPT-5.6 Sol.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Claude Pro or ChatGPT Plus better for coding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Claude Pro is widely preferred by software engineers for whole-file refactoring and architectural cleanliness, achieving 73.4% on SWE-bench Verified with native Lean 4 formal verification. ChatGPT Plus offers GPT-6 Astra for terminal navigation, but has stricter hourly rate limits on peak reasoning passes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the $200/month ChatGPT Pro subscription worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ChatGPT Pro ($200/month) is only justified for full-time quantitative researchers and autonomous agent operators who require unmetered, max-compute reasoning on GPT-6 Astra Operator with unrestricted desktop navigation. For most developers, spending $20 on Claude Pro plus $50–$80 on developer API credits (DeepSeek, Gemini, Anthropic) delivers far greater operational leverage.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best AI setup for a $100/month budget?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The optimal $100/month "Power User Stack" is: (1) Claude Pro ($20/mo) for primary coding and reasoning, (2) Cursor Pro or GitHub Copilot ($20/mo) for IDE inline autocompletion, and (3) $60/month in OpenRouter / DeepSeek API credits for ultra-low-cost high-volume batch processing.',
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-24 px-4 sm:px-6">
      <SEOHead
        title="Best AI Subscriptions to Get (2026 Buyer's Guide) — ChatGPT Plus vs Claude Pro | NextVector"
        description="Comprehensive, unbiased 2026 AI subscription buyer's guide. Direct comparison of ChatGPT Plus ($20), Claude Pro ($20), Gemini Advanced ($20), and ChatGPT Pro ($200). Know what models and rate limits are included before subscribing."
        canonicalPath="/subscriptions"
        schemaData={subscriptionFaqSchema}
        tags={[
          'Best AI Subscription',
          'Best AI Subscription to Get',
          'ChatGPT Plus vs Claude Pro',
          'AI Plans Comparison',
          'ChatGPT Pro 200',
          'Gemini Advanced',
          'AI Buyer Guide 2026',
        ]}
      />

      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Independent editorial intelligence. NextVector receives zero affiliate commissions or vendor subsidies.</span>
        </div>
        <button
          onClick={() => onNavigate('/compare/claude-vs-chatgpt')}
          className="text-emerald-400 hover:underline flex items-center gap-1 shrink-0 font-bold"
        >
          <span>View Claude vs ChatGPT Showdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Embedded Deep Decision Guide */}
      <ModelDecisionGuide onSelectModel={onSelectModel} />
    </div>
  );
};
