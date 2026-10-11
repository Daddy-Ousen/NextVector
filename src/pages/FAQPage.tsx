import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Cpu,
  DollarSign,
  BarChart2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { MODEL_COUNT } from '../data/modelCount';
import { ALL_MODELS, MODEL_DATA_AS_OF } from '../data/modelsData';
import { GUIDE_PICKS, PRESET_SHOWDOWNS } from '../data/showdownsData';

const pick = (id: string) => GUIDE_PICKS.find((p) => p.id === id);
const TOP = pick('top-arena');
const VALUE = pick('value');
const OPEN = pick('open');
const OSW = pick('computer-use');
const CLAUDE_VS_CHATGPT = PRESET_SHOWDOWNS.find((s) => s.slug === 'claude-vs-chatgpt');
// Arena gap between the best open-weights and the best proprietary released model
const released = ALL_MODELS.filter((m) => m.arenaElo && !m.preRelease);
const bestOpen = released.filter((m) => m.openSourceStatus === 'Open Weights').sort((a, b) => (b.arenaElo ?? 0) - (a.arenaElo ?? 0))[0];
const bestClosed = released.filter((m) => m.openSourceStatus !== 'Open Weights').sort((a, b) => (b.arenaElo ?? 0) - (a.arenaElo ?? 0))[0];
import { PageHeader } from '../components/common/PageHeader';

interface FAQItem {
  id: string;
  category: 'models' | 'subscriptions' | 'methodology' | 'platform';
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-best-model-2026',
    category: 'models',
    question: 'What is the best AI model in 2026?',
    shortAnswer: TOP ? `By arena.ai text score, ${TOP.modelName} (${TOP.developer}) leads the generally released models we track: ${TOP.metric}. Data checked ${MODEL_DATA_AS_OF}.` : 'See the Arena leaderboard on our benchmarks page.',
    detailedAnswer: [
      TOP && `Highest Arena score: ${TOP.modelName} (${TOP.metric}; ${TOP.price}).`,
      VALUE && `Best Arena score under $1 per 1M tokens (blended): ${VALUE.modelName} (${VALUE.metric}).`,
      OPEN && `Best open-weights model: ${OPEN.modelName} (${OPEN.metric}).`,
      OSW && `Computer use (OSWorld-Verified): ${OSW.modelName} (${OSW.metric}).`,
      '"Best" depends on the task: Arena measures chat preference, not coding or agent work. Each pick links to its source on our benchmarks page.',
    ].filter(Boolean).join(' '),
  },
  {
    id: 'faq-claude-vs-chatgpt',
    category: 'models',
    question: 'Claude vs ChatGPT: Which should you choose in 2026?',
    shortAnswer: CLAUDE_VS_CHATGPT ? `${CLAUDE_VS_CHATGPT.verdictA.title} ${CLAUDE_VS_CHATGPT.verdictA.points.join(' ')} ${CLAUDE_VS_CHATGPT.verdictB.title} ${CLAUDE_VS_CHATGPT.verdictB.points.join(' ')}` : 'See our Claude vs ChatGPT showdown.',
    detailedAnswer: CLAUDE_VS_CHATGPT ? `${CLAUDE_VS_CHATGPT.executiveVerdict} Data checked ${MODEL_DATA_AS_OF}.` : '',
  },
  {
    id: 'faq-best-ai-subscription',
    category: 'subscriptions',
    question: 'What is the best AI subscription to get?',
    shortAnswer: 'Pick the model first, then the plan. Our buyer\'s guide picks models by stated rules over public data; consumer plans change often, so check what each plan includes on the vendor\'s pricing page.',
    detailedAnswer: 'We do not track consumer subscription plans, their usage limits or which models each plan includes, because vendors change them often. Use the decision guide to choose a model by Arena score, price, open weights or task results, then confirm on the vendor\'s pricing page that your plan includes it.',
  },
  {
    id: 'faq-chatgpt-pro-200',
    category: 'subscriptions',
    question: 'Is a high-end AI subscription worth it?',
    shortAnswer: 'Only if you hit the usage limits of the cheaper plan often. We do not track plan limits; compare them on the vendor\'s pricing page.',
    detailedAnswer: 'For API use, our model pages give list prices and a cost calculator, so you can estimate monthly spend for your token volume and compare it with a subscription price. Plan limits are set by each vendor and change often, so we do not quote them.',
  },
  {
    id: 'faq-signal-rating-formula',
    category: 'methodology',
    question: 'How are NextVector Signal Ratings (1–100) calculated?',
    shortAnswer: 'Signal Ratings use a deterministic 4-part formula: Architectural Novelty (30%), Empirical Benchmark Verification (30%), Practical Engineering Utility (25%), and Primary Source Reliability (15%).',
    detailedAnswer: 'NextVector enforces strict editorial rules against hype and press releases. Every story receives a score from 1 to 100: stories rated 90+ denote paradigm-shifting releases backed by peer-reviewed preprints or replicated leaderboards. Stories below 70 are filtered out from the primary stream. NextVector maintains a zero-clickbait policy and audits every technical disclosure against primary data.',
  },
  {
    id: 'faq-leaderboard-updates',
    category: 'methodology',
    question: 'Where do the model and benchmark numbers come from?',
    shortAnswer: `From public sources only: arena.ai (text leaderboard), OSWorld-Verified, swebench.com, OpenRouter's model catalog and the labs' own price pages. Last checked ${MODEL_DATA_AS_OF}.`,
    detailedAnswer: 'We save a dated copy of each source and build the model pages from it. We do not run the tests ourselves. Each model page lists its sources, and each leaderboard names its source and date. If a source does not list a value (for example parameter count), we show "Not disclosed" or "Not listed" instead of estimating it.',
  },
  {
    id: 'faq-independence',
    category: 'platform',
    question: 'Is NextVector affiliated with OpenAI, Anthropic, or any AI lab?',
    shortAnswer: 'No. NextVector is 100% editorially independent and accepts zero vendor sponsorships, affiliate kickbacks, or access-conditioned coverage.',
    detailedAnswer: 'Founded and edited by Robiul Hasan, NextVector operates under an independent editorial charter: "Less noise. More signal." Coverage is driven exclusively by empirical merit, technical reproducibility, and mathematical verification. Neither OpenAI, Anthropic, Google, Meta, nor any cloud hyperscaler holds any equity or editorial influence over NextVector.',
  },
  {
    id: 'faq-open-weights-vs-proprietary',
    category: 'models',
    question: 'What is the state of open-weight models vs proprietary APIs in 2026?',
    shortAnswer: bestOpen && bestClosed
      ? `On arena.ai, the best open-weights model we track (${bestOpen.name}, ${bestOpen.arenaElo}) is ${(bestClosed.arenaElo ?? 0) - (bestOpen.arenaElo ?? 0)} points behind the best proprietary one (${bestClosed.name}, ${bestClosed.arenaElo}).`
      : 'See the model directory, filtered to open weights.',
    detailedAnswer: 'Open weights let you run a model on your own hardware, which keeps data in-house and avoids API rate limits, but you pay for the GPUs and operations. The model directory has an "Open Weights" filter and lists each model\'s licence.',
  },
  {
    id: 'faq-benchmark-submission',
    category: 'platform',
    question: 'How can AI labs submit model benchmark results to NextVector?',
    shortAnswer: 'Send corrections with a link to the public source to benchmarks@nextvector.rhasan.online.',
    detailedAnswer: 'We only list results that appear on a public leaderboard (arena.ai, OSWorld-Verified, swebench.com) or prices from an official price page or OpenRouter. If a number on our site is wrong or out of date, send the link and we will update the dated snapshot.',
  },
];

interface FAQPageProps {
  onNavigate?: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<string[]>(['faq-best-model-2026', 'faq-claude-vs-chatgpt']);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.shortAnswer.toLowerCase().includes(q) ||
        item.detailedAnswer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://nextvector.rhasan.online/faq#faq',
    name: 'NextVector AI Knowledge Base & Frequently Asked Questions',
    description: 'Comprehensive answers to essential AI questions: top foundation models, Claude vs ChatGPT showdowns, subscription buyer guides, and signal rating methodology.',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.shortAnswer} ${item.detailedAnswer}`,
      },
    })),
  };

  return (
    <div className="max-w-5xl space-y-12 pb-20">
      <SEOHead
        title="Frequently Asked Questions (FAQ) — Frontier AI Models & Intelligence | NextVector"
        description="Comprehensive answers to the most common AI questions in 2026: What is the best AI model? Claude vs ChatGPT comparison, best AI subscriptions ($20 vs $200), and NextVector's signal rating formula."
        canonicalPath="/faq"
        schemaData={faqSchema}
        tags={[
          'AI FAQ',
          'Best AI model 2026',
          'Claude vs ChatGPT',
          'Best AI subscription to get',
          'ChatGPT Pro 200',
          'NextVector Signal Rating',
          'AI Benchmarks FAQ',
        ]}
      />

      {/* Primary Entity Header H1 */}
      <PageHeader
        eyebrow={<>Knowledge Base &amp; Q&amp;A</>}
        icon={<HelpCircle className="w-4 h-4" />}
        title={<>Frequently Asked Questions <span className="text-zinc-400">— AI Models &amp; NextVector</span></>}
        description="Concise, empirical answers to the most queried questions in artificial intelligence, model benchmarks, subscription tradeoffs, and editorial methodology."
      />

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., 'Claude vs ChatGPT', 'best subscription', 'Elo ratings')..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-lg"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'models', label: 'Frontier Models' },
            { id: 'subscriptions', label: 'Subscription Guides' },
            { id: 'methodology', label: 'Evaluation Methodology' },
            { id: 'platform', label: 'Platform & Independence' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs">
            No questions matched your query. Contact our editorial desk directly at{' '}
            <a href="mailto:editor@nextvector.rhasan.online" className="text-emerald-400 hover:underline">
              editor@nextvector.rhasan.online
            </a>.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-zinc-950 border border-zinc-800/90 overflow-hidden shadow-lg transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="space-y-1.5">
                    <span className="eyebrow">
                      {item.category}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-zinc-100 font-sans tracking-tight">
                      {item.question}
                    </h2>
                  </div>
                  <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-zinc-800/60 space-y-3">
                    {/* Front-loaded Key Takeaway / BLUF */}
                    <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-emerald-500/20 text-xs">
                      <span className="eyebrow block mb-1">
                        Executive Takeaway (Direct Answer)
                      </span>
                      <p className="text-zinc-200 leading-relaxed font-sans">{item.shortAnswer}</p>
                    </div>

                    <div className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans space-y-2 pt-1">
                      <p>{item.detailedAnswer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Cross-Navigation Hubs */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Need technical verification on a specific foundation model?</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.('/models')}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Model Directory ({MODEL_COUNT})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate?.('/contact')}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Contact Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
