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
    shortAnswer: 'OpenAI GPT-6 Astra ranks #1 globally on LMSYS Arena (1420 Elo), while Claude Opus 5.5 ranks #4 (1417 Elo) and leads in formal Lean 4 mathematical proof certification and 1M context retention.',
    detailedAnswer: 'As of September 2026, the frontier AI landscape has diverged into specialized domain leaders. For autonomous operating system execution and general computer use, OpenAI GPT-6 Astra leads with 68.4% on OSWorld and 1420 LMSYS Elo. For deep software engineering, formal mathematical reasoning, and full-repository refactoring, Anthropic Claude Opus 5.5 is widely preferred due to its native Lean 4 verification and 1M token context window. For pure economic efficiency, DeepSeek-V4.1-Flash leads the Pareto frontier at $0.14 per 1M input tokens.',
  },
  {
    id: 'faq-claude-vs-chatgpt',
    category: 'models',
    question: 'Claude vs ChatGPT: Which should you choose in 2026?',
    shortAnswer: 'Choose Claude (Claude Opus 5.5 / Sonnet 5) for coding, large documents (1M tokens), and nuanced reasoning. Choose ChatGPT (GPT-6 Astra / GPT-5.6 Sol) for computer automation, web browsing, and multimodal voice.',
    detailedAnswer: 'If your daily workflow revolves around programming, reviewing complex codebases, or drafting technical research, Claude Pro ($20/mo) provides significantly higher coding accuracy (75.8% SWE-bench Verified) and vastly superior prompt caching discounts ($0.20/1M tokens). If you need an autonomous agent that navigates desktop software, browses the live web with interactive tools, and processes real-time voice, ChatGPT Plus ($20/mo) provides superior multi-tool flexibility.',
  },
  {
    id: 'faq-best-ai-subscription',
    category: 'subscriptions',
    question: 'What is the best AI subscription to get in 2026?',
    shortAnswer: 'For most developers and professionals, Claude Pro ($20/mo) or ChatGPT Plus ($20/mo) deliver the highest value. The optimal power-user setup on a $100/mo budget combines Claude Pro ($20) + Cursor ($20) + $60 in developer API credits.',
    detailedAnswer: 'Individual subscriptions should be matched to your primary work modality. ChatGPT Plus ($20) provides GPT-6 Astra (with hourly caps) and GPT-5.6 Sol. Claude Pro ($20) provides Claude Opus 5.5, Sonnet 5, and Artifacts 2.0. Power users who have a $100/mo budget get the most leverage by pairing a single $20 desktop subscription (Claude Pro) with an IDE assistant like Cursor Pro ($20) and allocating the remaining $60 to developer API keys (Anthropic, DeepSeek, and Google) for unmetered batch tasks.',
  },
  {
    id: 'faq-chatgpt-pro-200',
    category: 'subscriptions',
    question: 'Is the $200/month ChatGPT Pro subscription worth it?',
    shortAnswer: 'Only for full-time quantitative researchers, algorithmic traders, or autonomous agent operators who require unmetered maximum-compute reasoning on GPT-6 Astra Operator.',
    detailedAnswer: 'ChatGPT Pro ($200/mo) provides unrestricted access to OpenAI\'s maximum-compute reasoning tiers without standard hourly message limits. However, for 98% of software engineers and corporate knowledge workers, spending $20 on Claude Pro plus $50–$100 on developer API tokens provides 5x–10x greater operational value and prevents vendor lock-in.',
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
    question: 'How often are the LMSYS Arena and SWE-bench leaderboards updated?',
    shortAnswer: 'NextVector updates benchmark ratings daily from verified public harnesses (LMSYS Chatbot Arena, SWE-bench Verified, OSWorld, and WebArena).',
    detailedAnswer: 'Our evaluation engine ingests newly published Elo evaluations and verified benchmark runs daily. Each entry records the model developer, parameter scale, input/output pricing per million tokens, context window limit, and official evaluation date to guarantee absolute transparency.',
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
    shortAnswer: 'Leading open-weight models (DeepSeek-V4-Pro, Qwen 3.5, Mistral 3B) achieve within 15 Elo points of proprietary frontier models at 80–90% lower hosting cost.',
    detailedAnswer: 'In 2026, the gap between proprietary frontier models and open-weight architectures has closed dramatically on standard coding and math benchmarks. While proprietary APIs (GPT-6 Astra, Claude Opus 5.5) retain a distinct edge on complex multi-step tool orchestration and autonomous desktop actions, open-weight models deployed on private enterprise clusters offer total data privacy and zero API rate-limit bottlenecks.',
  },
  {
    id: 'faq-benchmark-submission',
    category: 'platform',
    question: 'How can AI labs submit model benchmark results to NextVector?',
    shortAnswer: 'Labs can submit audited evaluation logs, model weights, or API access endpoints to benchmarks@nextvector.rhasan.online.',
    detailedAnswer: 'To ensure data integrity, NextVector only indexes model benchmarks that include reproducible evaluation scripts, public test harness logs (e.g. Inspect, LM-Eval-Harness, SWE-bench Docker containers), or verified LMSYS Chatbot Arena battle IDs. Disclosures are audited by our editorial desk within 24 hours.',
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
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-4 sm:px-6">
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
      <header className="border-b border-zinc-800/80 pb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Knowledge Base &amp; Intelligence Q&amp;A</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-100 font-sans tracking-tight leading-tight">
              Frequently Asked Questions <span className="text-zinc-600 font-light">—</span>{' '}
              <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Frontier AI &amp; Platform Intelligence
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md leading-relaxed border-l-2 border-emerald-500/50 pl-3">
            Concise, empirical answers to the most queried questions in artificial intelligence, model benchmarks, subscription tradeoffs, and editorial methodology.
          </p>
        </div>
      </header>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., 'Claude vs ChatGPT', 'best subscription', 'Elo ratings')..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors shadow-lg"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
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
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
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
          <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 text-xs font-mono">
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
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
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
                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-emerald-500/20 text-xs font-mono">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[10px] mb-1">
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
      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Need technical verification on a specific foundation model?</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.('/models')}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Model Directory (135)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate?.('/contact')}
            className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Contact Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
