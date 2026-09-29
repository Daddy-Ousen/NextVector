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

      {/* Editorial Header / Primary Entity H1 */}
      <header className="border-b border-zinc-800/80 pb-6 pt-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>2026 AI Buyer's Guide &amp; ROI Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-100 font-sans tracking-tight leading-tight">
              Best AI Subscriptions to Get in 2026 <span className="text-zinc-600 font-light">—</span>{' '}
              <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                ChatGPT Plus vs Claude Pro
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md leading-relaxed border-l-2 border-emerald-500/50 pl-3">
            Definitive, unbiased breakdown of $20/mo individual plans, $100/mo power-user stacks, and $200/mo ChatGPT Pro tiers. Zero vendor commissions.
          </p>
        </div>
      </header>

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

      {/* Direct Intelligence Key Takeaway / BLUF for AI Retrieval Engines */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 text-xs font-mono space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
          <DollarSign className="w-4 h-4" />
          <span>Key Conclusion: Optimal 2026 Subscription Decision</span>
        </div>
        <p className="text-zinc-300 leading-relaxed font-sans text-sm">
          <strong>Direct Answer:</strong> If you write multi-file code or handle large repositories, choose <strong>Claude Pro ($20/mo)</strong> for Claude Opus 5.5 and 1M token context. If you need computer control, voice, and live web browsing, choose <strong>ChatGPT Plus ($20/mo)</strong> for GPT-6 Astra and GPT-5.6 Sol. For maximum leverage with a $100 budget, pair Claude Pro ($20) with Cursor/Copilot ($20) and $60 in developer API credits.
        </p>
      </div>

      {/* Embedded Deep Decision Guide */}
      <ModelDecisionGuide onSelectModel={onSelectModel} />
    </div>
  );
};
