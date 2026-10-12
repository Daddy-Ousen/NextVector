import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Compass,
} from 'lucide-react';
import { ALL_MODELS, MODEL_DATA_AS_OF } from '../../data/modelsData';
import { GUIDE_PICKS } from '../../data/showdownsData';

interface SubscriptionGuideProps {
  onSelectModel: (modelId: string) => void;
}

/**
 * Plain-language subscription & budget guide (restored layout from before the 2026-10-11 data rebuild).
 * Plan prices and contents are copied from the vendors' own pricing pages on PLANS_CHECKED:
 *   claude.com/pricing, support.claude.com (Max prices), chatgpt.com/pricing, help.openai.com (Pro tiers),
 *   gemini.google/subscriptions + blog.google (Ultra), cursor.com/pricing + cursor.com/docs/models, runpod.io/pricing.
 * Model ranks, scores and API prices are read from generated data (scripts/build_model_data.py), never typed here.
 */
export const PLANS_CHECKED = 'October 12, 2026';

type BudgetTier = '20' | '100' | '200';
type UseCaseCategory = 'all' | 'coding' | 'reasoning' | 'context' | 'rag';

const byId = new Map(ALL_MODELS.map((m) => [m.id, m]));
const model = (id: string) => byId.get(id);
const nameOf = (id: string) => model(id)?.name ?? id;

const usd = (n: number) => (n >= 0.1 ? `$${n.toFixed(2)}` : `$${Number(n.toFixed(3))}`);
const inPrice = (id: string) => model(id)?.pricing.inputPer1M ?? 0;
const outPrice = (id: string) => model(id)?.pricing.outputPer1M ?? 0;
const priceLine = (id: string) => `${usd(inPrice(id))} / ${usd(outPrice(id))} per 1M tokens`;
const cachedLine = (id: string) => {
  const c = model(id)?.pricing.cachedInputPer1M;
  return c != null ? `${usd(c)} per 1M` : 'not listed';
};
// Blended price = (3 x input + 1 x output) / 4, the same rule as the benchmarks page
const blended = (id: string) => (3 * inPrice(id) + outPrice(id)) / 4;
const tokensFor = (budget: number, id: string) => Math.round(budget / blended(id));
const cheaperPct = (expensiveId: string, cheapId: string) => Math.round((1 - blended(cheapId) / blended(expensiveId)) * 100);
const jobCost = (id: string, jobs: number, inTokens: number, outTokens: number) =>
  (jobs * (inTokens * inPrice(id) + outTokens * outPrice(id))) / 1e6;
const arenaText = (id: string) => {
  const m = model(id);
  return m?.arenaRank ? `Arena #${m.arenaRank} · ${m.arenaElo}` : 'No Arena score yet';
};
const arenaRank = (id: string) => {
  const m = model(id);
  return m?.arenaRank ? `Arena #${m.arenaRank}` : 'No Arena score yet';
};

// Model ids used on this page
const OPUS = 'model-claude-opus-5-5';
const SONNET = 'model-claude-sonnet-5-5';
const FABLE = 'model-claude-fable-5-1';
const GPT61SOL = 'model-gpt-6-1-sol';
const ASTRA = 'model-gpt-6-astra';
const GPT6SOL = 'model-gpt-6-sol';
const SOL = 'model-gpt-5-6-sol';
const TERRA = 'model-gpt-5-6-terra';
const LUNA = 'model-gpt-5-6-luna';
const GEMINI_FLASH = 'model-gemini-3-8-flash';
const DS_FLASH = 'model-deepseek-v4-1-flash';
const DS_PRO = 'model-deepseek-v4-pro-0813';
const DS_V4_FLASH = 'model-deepseek-v4-flash';
const QWEN27 = 'model-qwen3-8-27b';
const GROK_2M = 'model-grok-4-20';
const openPick = GUIDE_PICKS.find((p) => p.id === 'open');

interface UseCaseGuideItem {
  id: string;
  category: UseCaseCategory;
  title: string;
  subtitle: string;
  description: string;
  frontierPick: { modelId: string; badge: string; tierAvailability: string; why: string };
  valuePick: { modelId: string; tierAvailability: string; why: string };
  speedPick: { modelId: string; metric: string; tierAvailability: string };
  localPick?: { modelId: string; tierAvailability: string };
  proTip: string;
}

const USE_CASE_GUIDES: UseCaseGuideItem[] = [
  {
    id: 'guide-coding',
    category: 'coding',
    title: 'Coding & AI Agents',
    subtitle: 'Writing code, fixing bugs, changing many files, running tools',
    description:
      'For work where the AI changes real code across many files, runs commands, and must get it right.',
    frontierPick: {
      modelId: FABLE,
      badge: `AA Coding Index ${model(FABLE)?.aaCoding ?? ''}`,
      tierAvailability: 'Claude Pro: paid from extra usage credits. Claude Max: up to 50% of weekly limits. Also on the API.',
      why: 'Highest Artificial Analysis Coding Index of all models we track.',
    },
    valuePick: {
      modelId: DS_FLASH,
      tierAvailability: `API at ${priceLine(DS_FLASH)}. Open weights (${model(DS_FLASH)?.license}).`,
      why: `${arenaText(DS_FLASH)} for a small fraction of flagship prices.`,
    },
    speedPick: {
      modelId: GEMINI_FLASH,
      metric: `${arenaRank(GEMINI_FLASH)} · ${usd(inPrice(GEMINI_FLASH))} per 1M input`,
      tierAvailability: 'In Google AI Pro ($19.99/mo), Cursor and the Gemini API.',
    },
    localPick: {
      modelId: DS_PRO,
      tierAvailability: 'Open weights on Hugging Face. A very large model: it needs server GPUs, not a home PC.',
    },
    proTip: `Let a cheap model write the first draft and the tests (${nameOf(DS_FLASH)} or ${nameOf(GEMINI_FLASH)}). Send only the hard bugs to ${nameOf(FABLE)} or ${nameOf(OPUS)}.`,
  },
  {
    id: 'guide-reasoning',
    category: 'reasoning',
    title: 'Hard Thinking: Maths, Science & Analysis',
    subtitle: 'Step-by-step reasoning, proofs, data analysis, research questions',
    description: 'For questions that need many careful steps, where a quick guess is not good enough.',
    frontierPick: {
      modelId: OPUS,
      badge: `AA Intelligence Index ${model(OPUS)?.aaIntelligence ?? ''}`,
      tierAvailability: `In Claude Pro ($20/mo), Max and Team. API at ${priceLine(OPUS)}.`,
      why: 'Highest Artificial Analysis Intelligence Index, and the highest Arena score of all released models.',
    },
    valuePick: {
      modelId: DS_PRO,
      tierAvailability: `API at ${priceLine(DS_PRO)}. Open weights (${model(DS_PRO)?.license}).`,
      why: `AA Intelligence Index ${model(DS_PRO)?.aaIntelligence ?? '—'} (${nameOf(OPUS)}: ${model(OPUS)?.aaIntelligence ?? '—'}) at a much lower price.`,
    },
    speedPick: {
      modelId: SONNET,
      metric: `AA Intelligence Index ${model(SONNET)?.aaIntelligence ?? '—'} · half the Opus price`,
      tierAvailability: 'In Claude Free, Pro, Max and Team, and the API.',
    },
    localPick: {
      modelId: QWEN27,
      tierAvailability: '27B parameters. Compressed to 4-bit (about 14 GB), it fits on one 24 GB graphics card (for example RTX 4090) with Ollama or LM Studio.',
    },
    proTip: `Use ${nameOf(SONNET)} for most questions. Switch to ${nameOf(OPUS)} only when an answer must be right on a hard problem. For thousands of questions through the API, ${nameOf(DS_PRO)} costs about ${cheaperPct(OPUS, DS_PRO)}% less than ${nameOf(OPUS)}.`,
  },
  {
    id: 'guide-context',
    category: 'context',
    title: 'Very Long Documents (1M+ Tokens)',
    subtitle: 'Whole codebases, books, legal files, long transcripts',
    description:
      'For reading a very large amount of text in one go. One million tokens is roughly 750,000 words.',
    frontierPick: {
      modelId: OPUS,
      badge: `${model(OPUS)?.contextWindow} context (API)`,
      tierAvailability: 'In Claude Pro ($20/mo) and the API. Chat apps can allow less text than the API.',
      why: 'Top released model with a 1M-token window.',
    },
    valuePick: {
      modelId: GEMINI_FLASH,
      tierAvailability: 'In Google AI Pro ($19.99/mo) and the Gemini API.',
      why: `${model(GEMINI_FLASH)?.contextWindow} context at ${usd(inPrice(GEMINI_FLASH))} per 1M input tokens${model(GEMINI_FLASH)?.pricing.note ? ` (${model(GEMINI_FLASH)?.pricing.note})` : ''}.`,
    },
    speedPick: {
      modelId: GROK_2M,
      metric: `Largest window we track: ${model(GROK_2M)?.contextWindow}`,
      tierAvailability: `xAI API at ${priceLine(GROK_2M)}.`,
    },
    localPick: {
      modelId: DS_V4_FLASH,
      tierAvailability: `Open weights with a ${model(DS_V4_FLASH)?.contextWindow} window. Needs server GPUs.`,
    },
    proTip: `Prompt caching makes repeat questions on the same long document much cheaper. Cached input costs ${cachedLine(OPUS)} on ${nameOf(OPUS)} (normal: ${usd(inPrice(OPUS))}) and ${cachedLine(DS_PRO)} on ${nameOf(DS_PRO)}.`,
  },
  {
    id: 'guide-rag',
    category: 'rag',
    title: 'High-Volume Business Jobs',
    subtitle: 'Thousands of emails, support tickets, sorting and data extraction',
    description: 'For apps and back-office jobs that send the AI thousands or millions of requests every day.',
    frontierPick: {
      modelId: SOL,
      badge: 'Best OpenAI Arena score',
      tierAvailability: `In ChatGPT Plus ($20/mo). API at ${priceLine(SOL)}.`,
      why: "OpenAI's highest-ranked model on Arena.",
    },
    valuePick: {
      modelId: DS_PRO,
      tierAvailability: `API at ${priceLine(DS_PRO)}. Open weights (${model(DS_PRO)?.license}).`,
      why: `100M tokens cost about ${usd(blended(DS_PRO) * 100)} instead of ${usd(blended(SOL) * 100)} on ${nameOf(SOL)} (3:1 input to output).`,
    },
    speedPick: {
      modelId: GEMINI_FLASH,
      metric: `${arenaRank(GEMINI_FLASH)} · ${usd(blended(GEMINI_FLASH))} per 1M blended`,
      tierAvailability: 'Gemini API and Google AI Studio.',
    },
    localPick: {
      modelId: QWEN27,
      tierAvailability: 'Apache 2.0 licence: you can run it on your own servers for commercial use and keep all data in-house.',
    },
    proTip: `The 90/10 rule: send about 90% of routine jobs to a cheap model (${nameOf(DS_PRO)} or ${nameOf(GEMINI_FLASH)}). Send only the hard 10% to ${nameOf(SOL)} or ${nameOf(OPUS)}.`,
  },
];

const routerJobs = [
  { label: '10 long answers', modelId: OPUS, cost: jobCost(OPUS, 10, 5000, 2000) },
  { label: '50 code edits', modelId: SOL, cost: jobCost(SOL, 50, 10000, 2000) },
  { label: '2,000 short questions', modelId: DS_FLASH, cost: jobCost(DS_FLASH, 2000, 1000, 500) },
];
const routerTotal = routerJobs.reduce((s, j) => s + j.cost, 0);

export const SubscriptionGuide: React.FC<SubscriptionGuideProps> = ({ onSelectModel }) => {
  const [activeBudget, setActiveBudget] = useState<BudgetTier>('20');
  const [activeCategory, setActiveCategory] = useState<UseCaseCategory>('all');
  const [selectedSubTab, setSelectedSubTab] = useState<'consumer' | 'pro'>('consumer');
  const [selected20Tab, setSelected20Tab] = useState<'deepseek' | 'cursor' | 'router'>('deepseek');
  const [selected100Tab, setSelected100Tab] = useState<'multisub' | 'api100' | 'team100'>('multisub');
  const [selected200Tab, setSelected200Tab] = useState<'chatgptpro' | 'api200' | 'cloudgpu'>('chatgptpro');

  const filteredGuides =
    activeCategory === 'all' ? USE_CASE_GUIDES : USE_CASE_GUIDES.filter((g) => g.category === activeCategory);

  const ds20 = tokensFor(20, DS_FLASH);
  const ds100 = tokensFor(100, DS_PRO);
  const ds200 = tokensFor(200, DS_PRO);
  const frontier100 = tokensFor(100, FABLE);
  const frontier200 = tokensFor(200, FABLE);

  return (
    <div className="space-y-12">
      {/* 1. HERO HEADER */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>NextVector Buyer's Guide • Plans checked {PLANS_CHECKED}</span>
          </div>

          <h2 className="heading-section">The 2026 Model Decision Matrix & Budget Tradeoff Engine</h2>
          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Stop overpaying for AI. Match your task to the right plan or model, see what you get for{' '}
            <strong>$20, $100, and $200/month</strong>, and check what each plan includes before you subscribe.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase block">Top Released Model</span>
            <span className="text-lg font-bold text-zinc-100">{nameOf(OPUS)}</span>
            <span className="text-2xs text-emerald-400 block">{arenaRank(OPUS)} • Claude Pro ($20), Max, API</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase block">Best OpenAI Model</span>
            <span className="text-lg font-bold text-zinc-100">{nameOf(SOL)}</span>
            <span className="text-2xs text-emerald-400 block">{arenaRank(SOL)} • ChatGPT Plus ($20), API</span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase block">Best Google Model</span>
            <span className="text-lg font-bold text-zinc-100">{nameOf(GEMINI_FLASH)}</span>
            <span className="text-2xs text-emerald-400 block">{arenaRank(GEMINI_FLASH)} • Google AI Pro ($19.99), API</span>
          </div>
          {openPick && (
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase block">Best Open-Weights</span>
              <span className="text-lg font-bold text-zinc-100">{openPick.modelName}</span>
              <span className="text-2xs text-emerald-400 block">{arenaRank(openPick.modelId)} • Open weights & API</span>
            </div>
          )}
        </div>
        <p className="text-2xs text-zinc-400 mt-4">
          Arena ranks from arena.ai, checked {MODEL_DATA_AS_OF}. Arena #1 is an unreleased preview, so it is left out.
        </p>
      </div>

      {/* PLAN ACCESS CHECK */}
      <div className="p-4 md:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs shadow-lg">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="eyebrow-warn">What the $20 plans include ({PLANS_CHECKED})</span>
            <p className="text-zinc-300 leading-relaxed font-sans text-xs">
              <strong>ChatGPT Plus ($20/mo)</strong> includes <strong>GPT-6.1 Sol, GPT-6 Astra and GPT-6 Sol</strong>, plus{' '}
              <strong>GPT-5.6 Sol, Terra and Luna</strong>. <strong>ChatGPT Pro</strong> ($100, $200 or $500/mo) gives more GPT-6 Astra use and adds GPT-5.6 Sol Pro.
              <br className="my-1" />
              <strong>Claude Pro ($20/mo)</strong> includes <strong>Opus 5.5, Sonnet 5.5 and Haiku 5.5</strong>, plus Claude Code.{' '}
              <strong>Claude Fable 5.1</strong> costs extra usage credits on Pro and is part of Max. <strong>Claude Mythos 5.1</strong> is not in any plan (Project Glasswing partners only).
            </p>
          </div>
        </div>
        <div className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-2xs font-bold">
          Checked on vendor pages
        </div>
      </div>

      {/* 2. THE MULTI-TIER BUDGET TRADEOFF ENGINE ($20, $100, $200) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <Coins className="w-4 h-4" />
              <span>Budget Planner</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">
              Budget Tradeoff: Where Should You Spend Your AI Budget?
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Pick your monthly budget. Compare a chat subscription, pay-per-use API credits, and other options.
            </p>
          </div>

          {/* Budget Tier Selector */}
          <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl shrink-0 overflow-x-auto max-w-full scrollbar-none">
            <span className="text-2xs text-zinc-400 pl-2 pr-1 hidden sm:inline">Budget:</span>
            {(['20', '100', '200'] as BudgetTier[]).map((b) => (
              <button
                key={b}
                onClick={() => setActiveBudget(b)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeBudget === b ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="hidden sm:inline">${b} / Month</span>
                <span className="sm:hidden">${b}/mo</span>
              </button>
            ))}
          </div>
        </div>

        {/* ----------------- $20 BUDGET TIER ----------------- */}
        {activeBudget === '20' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-zinc-400">
                Options for a <strong>$20/Month</strong> budget:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto max-w-full scrollbar-none">
                {[
                  { id: 'deepseek' as const, label: `~${ds20}M Tokens` },
                  { id: 'cursor' as const, label: 'Cursor Pro ($20)' },
                  { id: 'router' as const, label: 'Pay-As-You-Go' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelected20Tab(t.id)}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      selected20Tab === t.id ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* $20 Path 1: Consumer Web Sub */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 1 (Chat Plan)
                    </span>
                    <span className="text-lg font-bold text-zinc-100 whitespace-nowrap">$20 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">One Chat Subscription</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Buy <strong>ChatGPT Plus</strong>, <strong>Claude Pro</strong> or <strong>Google AI Pro</strong> ($19.99). You get an app on web, phone and desktop. No setup.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>ChatGPT Plus:</strong> GPT-6 and GPT-5.6 models, voice chats, image creation, deep research and Codex.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Claude Pro:</strong> Opus 5.5 for hard tasks, Sonnet 5.5 for daily work, Haiku 5.5 for speed, plus Claude Code and Projects.</span>
                    </div>
                    <div className="flex items-start gap-2 text-amber-400/90 pt-1">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Usage limits:</strong> Claude limits reset every 5 hours, plus a weekly cap. ChatGPT says "limits apply". Neither gives an exact message count.</span>
                    </div>
                    <div className="flex items-start gap-2 text-amber-400/90">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Unused usage does not carry over. Claude Pro and ChatGPT Plus give no API credits for your own apps.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-zinc-400">
                  Best for: Daily chat, writing, homework help, brainstorming.
                </div>
              </div>

              {/* $20 Path 2: Token Volume / Tool */}
              <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      {selected20Tab === 'deepseek' && 'Option 2 (Token Volume)'}
                      {selected20Tab === 'cursor' && 'Option 2 (Coding Editor)'}
                      {selected20Tab === 'router' && 'Option 2 (API Router)'}
                    </span>
                    <span className="text-lg font-bold text-emerald-400 whitespace-nowrap">
                      {selected20Tab === 'deepseek' && '$20 Total'}
                      {selected20Tab === 'cursor' && '$20 / Month'}
                      {selected20Tab === 'router' && '$20 Deposit'}
                    </span>
                  </div>

                  {selected20Tab === 'deepseek' && (
                    <>
                      <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                        <span>~{ds20}M Tokens on {nameOf(DS_FLASH)}</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        At <strong>{usd(inPrice(DS_FLASH))} in / {usd(outPrice(DS_FLASH))} out</strong> per 1M tokens, $20 buys about{' '}
                        <strong>{ds20} million tokens</strong> (3 parts input to 1 part output). {arenaText(DS_FLASH)}.
                      </p>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Input price:</span>
                          <span className="text-emerald-400 font-semibold">{usd(inPrice(DS_FLASH))} / 1M tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Output price:</span>
                          <span className="text-emerald-400 font-semibold">{usd(outPrice(DS_FLASH))} / 1M tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Rough size:</span>
                          <span className="text-emerald-400 font-semibold">~{Math.round((ds20 * 750_000) / 100_000)} novels of text*</span>
                        </div>
                      </div>
                      <p className="text-2xs text-zinc-400">*Our estimate: 1M tokens ≈ 750,000 words; a novel ≈ 100,000 words.</p>
                    </>
                  )}

                  {selected20Tab === 'cursor' && (
                    <>
                      <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                        <span>Coding Editor With Many Models (Cursor Pro)</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        Instead of paying $40/mo for two chat plans, one $20 editor plan gives you models from Anthropic, OpenAI and Google, such as{' '}
                        <strong>{nameOf(SONNET)}, {nameOf(SOL)} and {nameOf(GEMINI_FLASH)}</strong>.
                      </p>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Two chat plans:</span>
                          <span className="line-through text-zinc-400">$40.00 / mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Cursor Pro:</span>
                          <span className="text-emerald-400 font-semibold">$20.00 / mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Usage:</span>
                          <span className="text-emerald-400 font-semibold">Set amount included; extra is billed</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selected20Tab === 'router' && (
                    <>
                      <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                        <span>Pay Per Use Across Many Providers</span>
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        Put $20 into an API router (OpenRouter, Together) or direct API keys. You pay only for what you use. <strong>No monthly plan.</strong>
                      </p>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                        {routerJobs.map((j) => (
                          <div key={j.label} className="flex justify-between gap-2">
                            <span className="text-zinc-400">{j.label}:</span>
                            <span className="text-zinc-300 font-semibold text-right">
                              {usd(j.cost)} ({nameOf(j.modelId)})
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between border-t border-zinc-800 pt-1 text-emerald-400">
                          <span>Total spent:</span>
                          <span>{usd(routerTotal)} (leaves {usd(20 - routerTotal)})</span>
                        </div>
                      </div>
                      <p className="text-2xs text-zinc-400">
                        Our example at list prices: long answer = 5K tokens in, 2K out; code edit = 10K in, 2K out; short question = 1K in, 500 out.
                      </p>
                    </>
                  )}

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    {selected20Tab === 'cursor' ? (
                      <>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Switch between Claude, GPT and Gemini models inside the editor.</span>
                        </div>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Agent mode and cloud agents that work on your code for you.</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>No 5-hour chat limits. API rate limits still apply.</span>
                        </div>
                        <div className="flex items-start gap-2 text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Works with open apps (LibreChat, TypingMind, Cline, Aider).</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-emerald-400 font-semibold">
                  Best for: Developers who want the most use per dollar.
                </div>
              </div>

              {/* $20 Path 3: Free / Self-Hosted */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 3 (Zero Cost)
                    </span>
                    <span className="text-lg font-bold text-emerald-400 whitespace-nowrap">$0 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">Run a Free Model on Your Own Computer</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Download an open model and run it on your own hardware with Ollama, vLLM or LM Studio.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>{nameOf(QWEN27)}</strong> ({model(QWEN27)?.license}): {arenaText(QWEN27)}. Fits one 24 GB graphics card at 4-bit.
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Private: your data stays on your machine. Works offline. No usage limits.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-400">
                      <AlertTriangle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>Needs a strong computer (for example RTX 4090/5090 or Apple Silicon with 32 GB+). Weaker than the top paid models.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-zinc-400">
                  Best for: Strict privacy, offline use & hobbyists.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- $100 BUDGET TIER ----------------- */}
        {activeBudget === '100' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-zinc-400">
                Options for a <strong>$100/Month</strong> power-user budget:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto max-w-full scrollbar-none">
                {[
                  { id: 'multisub' as const, label: 'Three-Plan Bundle' },
                  { id: 'api100' as const, label: `~${ds100}M Tokens` },
                  { id: 'team100' as const, label: 'Team Seats' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelected100Tab(t.id)}
                    className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      selected100Tab === t.id ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* $100 Path 1: Bundle */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 1 (Bundle)
                    </span>
                    <span className="text-lg font-bold text-zinc-100 whitespace-nowrap">$100 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">Three $20 Plans + API Credits</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Get OpenAI, Anthropic and a coding editor, and keep money for pay-per-use API calls.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">ChatGPT Plus:</span>
                      <span className="text-zinc-200 font-semibold text-right">$20 (GPT-6 + GPT-5.6)</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Claude Pro:</span>
                      <span className="text-zinc-200 font-semibold text-right">$20 (Opus 5.5 + Sonnet 5.5)</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Cursor Pro:</span>
                      <span className="text-zinc-200 font-semibold text-right">$20 (coding editor)</span>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-zinc-800 pt-1 text-emerald-400">
                      <span>API credits:</span>
                      <span className="text-right">$40 / mo (pay per use)</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>When one plan hits its limit, switch to the other.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Or pay $100 for one lab with much higher limits: Claude Max 5x, ChatGPT Pro 100 or Google AI Ultra.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-zinc-400">
                  Best for: Consultants and product leads who use every app.
                </div>
              </div>

              {/* $100 Path 2: API Tokens */}
              <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      Option 2 (API Credits)
                    </span>
                    <span className="text-lg font-bold text-emerald-400 whitespace-nowrap">$100 in Credits</span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                    <span>~{ds100}M Tokens on {nameOf(DS_PRO)}</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Buy API credits and run coding agents and scripts with them, through tools like Cline and Aider.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">{nameOf(DS_PRO)}:</span>
                      <span className="text-emerald-400 font-semibold">~{ds100}M tokens</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Top models instead:</span>
                      <span className="text-zinc-200 font-semibold text-right">~{frontier100}M tokens ({nameOf(FABLE)} / {nameOf(ASTRA)})</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Repeat (cached) input:</span>
                      <span className="text-emerald-400 font-semibold">{cachedLine(DS_PRO)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Enough for automatic tests and code clean-up running in the background.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Prompt caching cuts repeat costs: {nameOf(OPUS)} cached input is {cachedLine(OPUS)}.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-emerald-400 font-semibold">
                  Best for: Software engineers running coding agents a lot.
                </div>
              </div>

              {/* $100 Path 3: Team Tier */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 3 (Team Seats)
                    </span>
                    <span className="text-lg font-bold text-emerald-400 whitespace-nowrap">$75 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">Claude Team / ChatGPT Business (3 Seats)</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Business plans for small teams: $25 per person per month on either (or $20 if you pay yearly).
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>More usage:</strong> Claude Team gives more usage than Pro. Premium seats ($125) give 5x more.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Shared work:</strong> One bill, admin controls and single sign-on (SSO).</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Your data:</strong> OpenAI says Business data is not used for training by default.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-zinc-400">
                  Best for: Small teams, startups & agencies.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- $200 BUDGET TIER ----------------- */}
        {activeBudget === '200' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-zinc-400">
                Options for a <strong>$200/Month</strong> heavy-user budget:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto max-w-full scrollbar-none">
                {[
                  { id: 'chatgptpro' as const, label: 'Top-Tier Plans ($200)' },
                  { id: 'api200' as const, label: `~${ds200}M Tokens` },
                  { id: 'cloudgpu' as const, label: 'Rented Cloud GPU' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelected200Tab(t.id)}
                    className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      selected200Tab === t.id ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* $200 Path 1: Top plans */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      Option 1 (Top Plan)
                    </span>
                    <span className="text-lg font-bold text-emerald-400 whitespace-nowrap">$200 / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">ChatGPT Pro 200, Claude Max 20x or Google AI Ultra</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Each lab's $200 plan. You get far more use of its best models in the normal app.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">ChatGPT Pro 200:</span>
                      <span className="text-emerald-400 font-semibold text-right">More GPT-6 Astra + GPT-5.6 Sol Pro</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Claude Max 20x:</span>
                      <span className="text-emerald-400 font-semibold text-right">20x Pro usage + Fable 5.1</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Google AI Ultra:</span>
                      <span className="text-emerald-400 font-semibold text-right">Deep Think + 30 TB storage</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>No setup and no API keys. Each includes an agent: Dot, Claude Code or Gemini Agent.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Claude Max 20x also includes $200/mo in API credits.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-emerald-400 font-semibold">
                  Best for: People who hit the $20 limits every day.
                </div>
              </div>

              {/* $200 Path 2: API */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 2 (API Credits)
                    </span>
                    <span className="text-lg font-bold text-zinc-100 whitespace-nowrap">$200 in Credits</span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-100 font-sans">API Credits for Many Agents</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Put $200 into API credits to run coding agents on long, many-step jobs.
                  </p>

                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-1.5 text-xs text-zinc-300">
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">{nameOf(DS_PRO)}:</span>
                      <span className="text-emerald-400 font-semibold">~{ds200}M tokens</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-400">Top models instead:</span>
                      <span className="text-zinc-200 font-semibold text-right">~{frontier200}M tokens ({nameOf(FABLE)} / {nameOf(ASTRA)})</span>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-zinc-800 pt-1 text-emerald-400">
                      <span>Agents:</span>
                      <span>Run several at once</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Full access to <strong>{nameOf(FABLE)}</strong> ({priceLine(FABLE)}) and <strong>{nameOf(ASTRA)}</strong> ({priceLine(ASTRA)}).
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Pay only for what you use. No monthly plan.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-zinc-400">
                  Best for: AI engineers and teams building agents.
                </div>
              </div>

              {/* $200 Path 3: Cloud GPU */}
              <div className="lg:col-span-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between relative shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                      Option 3 (Cloud GPU)
                    </span>
                    <span className="text-lg font-bold text-emerald-400 whitespace-nowrap">$250+ / Month</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">Rent a Cloud GPU (RunPod / Lambda)</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Rent one 24 GB graphics card all month and run an open model on it. RunPod lists an RTX 4090 at $0.34 to $0.89 per hour: about $250 to $650 for a full month (730 hours). This is over the $200 budget.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Fixed cost:</strong> No per-message fees. You pay for GPU time.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Your data:</strong> Prompts stay on your rented server. No AI company sees them.</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Run {nameOf(QWEN27)} or your own fine-tuned version of it.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900 text-xs text-zinc-400">
                  Best for: Strict privacy rules and non-stop batch jobs.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Takeaway Summary Box */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3 text-xs font-sans">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-zinc-200">NextVector Rule of Thumb:</span>
            {activeBudget === '20' && (
              <p className="text-zinc-400 leading-relaxed">
                For most people, one $20 plan is enough. <strong>Claude Pro</strong> gives you {nameOf(OPUS)}, the top released model on Arena, and Claude Code.{' '}
                <strong>ChatGPT Plus</strong> gives you the GPT-6 models, voice and image creation. <strong>Google AI Pro</strong> ($19.99) suits Gmail and Drive users and adds 5 TB of storage.
                If you mostly write code, <strong>Cursor Pro ($20)</strong> or <strong>$20 of API credits (~{ds20}M tokens)</strong> gives more use with no 5-hour limits.
              </p>
            )}
            {activeBudget === '100' && (
              <p className="text-zinc-400 leading-relaxed">
                At $100/mo, do not buy five separate plans. Developers: <strong>Cursor Pro ($20) + $80 of API credits</strong> (a cheap model like {nameOf(DS_PRO)} for bulk work, {nameOf(OPUS)} for hard problems).
                Everyone else: one heavy plan from the lab you like (<strong>Claude Max 5x, ChatGPT Pro 100 or Google AI Ultra</strong>, all $100/mo).
              </p>
            )}
            {activeBudget === '200' && (
              <p className="text-zinc-400 leading-relaxed">
                At $200/mo, choose by how you work. If you want everything inside one app, take <strong>ChatGPT Pro 200, Claude Max 20x or Google AI Ultra</strong>.
                If you write code and use terminal agents (Cline, Claude Code, Aider), <strong>$200 of API credits</strong> buys about {ds200}M tokens of {nameOf(DS_PRO)}, or about {frontier200}M tokens of {nameOf(FABLE)} / {nameOf(ASTRA)}.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE USE-CASE DECISION MATRIX */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Pick by Task</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">When to Use Which Model: Use-Case Matrix</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Ranks and prices from our model data (checked {MODEL_DATA_AS_OF}). Plan access checked {PLANS_CHECKED}.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { label: 'All Tasks', value: 'all' },
              { label: 'Coding & Agents', value: 'coding' },
              { label: 'Hard Thinking', value: 'reasoning' },
              { label: 'Long Documents', value: 'context' },
              { label: 'High Volume', value: 'rag' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as UseCaseCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="border-b border-zinc-850 pb-3">
                  <span className="eyebrow block mb-1">{guide.subtitle}</span>
                  <h4 className="text-lg font-bold text-zinc-100 font-sans">{guide.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-sans leading-relaxed">{guide.description}</p>
                </div>

                <div className="space-y-3">
                  {/* Best Pick */}
                  <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-2xs font-mono uppercase font-bold px-1.5 py-0.2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🥇 Best Pick
                        </span>
                        <span className="text-xs text-zinc-400">{arenaText(guide.frontierPick.modelId)}</span>
                      </div>
                      <button
                        onClick={() => onSelectModel(guide.frontierPick.modelId)}
                        className="text-sm font-bold text-zinc-100 hover:text-emerald-400 cursor-pointer transition-colors inline-flex items-center gap-1 text-left"
                      >
                        <span>{nameOf(guide.frontierPick.modelId)}</span>
                        <ArrowRight className="w-3 h-3 text-zinc-400" />
                      </button>
                      <p className="text-2xs text-zinc-400 leading-normal font-sans">
                        {guide.frontierPick.why} <span className="text-zinc-300">({guide.frontierPick.badge})</span>
                      </p>
                      <div className="text-2xs text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        {guide.frontierPick.tierAvailability}
                      </div>
                    </div>
                    <span className="text-2xs text-zinc-300 bg-zinc-800 px-2 py-1 rounded-lg shrink-0">
                      {usd(inPrice(guide.frontierPick.modelId))} / 1M in
                    </span>
                  </div>

                  {/* Value Pick */}
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-2xs font-mono uppercase font-bold px-1.5 py-0.2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          💰 Best Value
                        </span>
                        <span className="text-2xs text-emerald-400 font-bold">
                          {cheaperPct(guide.frontierPick.modelId, guide.valuePick.modelId)}% cheaper
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectModel(guide.valuePick.modelId)}
                        className="text-sm font-bold text-zinc-100 hover:text-emerald-400 cursor-pointer transition-colors inline-flex items-center gap-1 text-left"
                      >
                        <span>{nameOf(guide.valuePick.modelId)}</span>
                        <ArrowRight className="w-3 h-3 text-zinc-400" />
                      </button>
                      <p className="text-2xs text-zinc-300 leading-normal font-sans">{guide.valuePick.why}</p>
                      <div className="text-2xs text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        {guide.valuePick.tierAvailability}
                      </div>
                    </div>
                    <span className="text-2xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-1 rounded-lg shrink-0 border border-emerald-500/30">
                      {usd(inPrice(guide.valuePick.modelId))} / 1M in
                    </span>
                  </div>

                  {/* Lighter & Open-weights row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => onSelectModel(guide.speedPick.modelId)}
                      className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                    >
                      <span className="text-2xs text-zinc-400 block uppercase">⚡ Lighter Pick</span>
                      <span className="text-zinc-200 font-semibold group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                        {nameOf(guide.speedPick.modelId)}
                        <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <p className="text-2xs text-zinc-400 mt-0.5">{guide.speedPick.metric}</p>
                      <span className="text-2xs text-zinc-400 block mt-1">{guide.speedPick.tierAvailability}</span>
                    </button>

                    {guide.localPick && (
                      <button
                        onClick={() => guide.localPick && onSelectModel(guide.localPick.modelId)}
                        className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                      >
                        <span className="text-2xs text-zinc-400 block uppercase">🔒 Open-Weights</span>
                        <span className="text-zinc-200 font-semibold group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                          {nameOf(guide.localPick.modelId)}
                          <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <p className="text-2xs text-emerald-400 mt-0.5">{model(guide.localPick.modelId)?.license}</p>
                        <span className="text-2xs text-zinc-400 block mt-1">{guide.localPick.tierAvailability}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg text-2xs text-zinc-400 font-sans border-l-2 border-l-emerald-500">
                <span className="font-bold text-zinc-300">NextVector Take: </span>
                {guide.proTip}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUBSCRIPTION BUYER'S GUIDE MATRIX ($20 vs $100-$200) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="eyebrow flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Subscription Buyer's Guide</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 font-sans mt-1">Which Paid Plan Should You Buy?</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Side-by-side plans, checked on each vendor's pricing page on {PLANS_CHECKED}. US prices; other countries can differ.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
            <button
              onClick={() => setSelectedSubTab('consumer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSubTab === 'consumer' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              $20/Month Plans
            </button>
            <button
              onClick={() => setSelectedSubTab('pro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSubTab === 'pro' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              $100 – $200 Plans
            </button>
          </div>
        </div>

        {/* $20 PLANS */}
        {selectedSubTab === 'consumer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Claude Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Anthropic</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Claude Pro</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Claude on web, desktop and phone with <strong>Opus 5.5</strong>, <strong>Sonnet 5.5</strong> and <strong>Haiku 5.5</strong>. $17/mo if you pay yearly.
                </p>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-emerald-300 font-semibold">
                    <span>Opus 5.5</span>
                    <span className="text-2xs text-zinc-400 font-normal">Hard tasks</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-400 font-semibold">
                    <span>Sonnet 5.5</span>
                    <span className="text-2xs text-zinc-400 font-normal">Daily work</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span>Haiku 5.5</span>
                    <span className="text-2xs text-zinc-400 font-normal">Fastest</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-1 text-2xs text-zinc-400">Older models: Opus 5, Sonnet 5, Fable 5, Opus 4.8 and more</div>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Claude Code (coding agent) included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Projects, web search, Claude in Chrome</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-2xs text-amber-300/90 leading-tight">
                  ⚠️ <strong>Note:</strong> Claude Fable 5.1 costs extra usage credits on Pro. Claude Mythos 5.1 is not in any plan.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Writers, researchers & coders.
              </div>
            </div>

            {/* ChatGPT Plus */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">OpenAI</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">ChatGPT Plus</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  ChatGPT with the <strong>GPT-6</strong> models (6.1 Sol, Astra, Sol, Luna) and <strong>GPT-5.6 Sol, Terra and Luna</strong>.
                </p>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-xs">
                  {[GPT61SOL, ASTRA, GPT6SOL, SOL, TERRA].map((id, i) => (
                    <div
                      key={id}
                      className={`flex justify-between items-center ${i < 2 ? 'text-emerald-400 font-semibold' : 'text-zinc-300'}`}
                    >
                      <span>{nameOf(id)}</span>
                      <span className="text-2xs text-zinc-400 font-normal">{arenaText(id)}</span>
                    </div>
                  ))}
                  <div className="border-t border-zinc-800 pt-1 text-2xs text-zinc-400 flex justify-between">
                    <span>{nameOf(LUNA)}</span>
                    <span>{arenaText(LUNA)}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Voice chats and image creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Deep research, Projects and Codex</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-2xs text-amber-300/90 leading-tight">
                  ⚠️ <strong>Note:</strong> Cheaper option: ChatGPT Go ($8/mo) has GPT-6 Luna and more messages than Free, and may show ads.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> All-round use, voice & images.
              </div>
            </div>

            {/* Google AI Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Google</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">$19.99 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Google AI Pro</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Gemini with <strong>{nameOf(GEMINI_FLASH)}</strong> ({arenaRank(GEMINI_FLASH)}) and <strong>Gemini 3.1 Pro</strong>, about 4x the Free usage, plus 5 TB of Google storage.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>5 TB storage for Gmail, Drive and Photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Image and video creation, Deep Research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gemini inside Gmail, Docs and Sheets</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-2xs text-emerald-400 leading-tight">
                  ✨ <strong>Bonus:</strong> Share with up to 5 family members. YouTube Premium Lite in some countries.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Google users & families.
              </div>
            </div>

            {/* Cursor Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Coding Editor</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">$20 / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Cursor Pro</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  A code editor (built on VS Code) with an AI agent. Choose <strong>{nameOf(OPUS)}</strong>, <strong>{nameOf(SOL)}</strong>, <strong>{nameOf(GEMINI_FLASH)}</strong> and more.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Anthropic, OpenAI & Google models for $20</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Agent mode and cloud agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Set usage included; extra use is billed</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-2xs text-emerald-400 leading-tight">
                  ✨ <strong>Developer Value:</strong> One plan instead of separate Claude and ChatGPT plans for coding.
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Professional software engineers.
              </div>
            </div>
          </div>
        )}

        {/* $100 - $200 PLANS */}
        {selectedSubTab === 'pro' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* ChatGPT Pro */}
            <div className="rounded-2xl bg-zinc-950 border border-emerald-500/50 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-2xl shadow-emerald-950/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">OpenAI</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">$100 / $200 / $500</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">ChatGPT Pro</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Three usage tiers (Pro 100, Pro 200, Pro 500). Pro reasoning with <strong>GPT-6 Astra</strong>, plus <strong>GPT-5.6 Sol Pro</strong>.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dot, an always-on agent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Longer Codex sessions, maximum deep research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pro 500 only: "Ultrafast" GPT-6 Astra and GPT-6.1 Sol</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Heavy ChatGPT users & founders.
              </div>
            </div>

            {/* Claude Max */}
            <div className="rounded-2xl bg-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Anthropic</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">$100 / $200</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Claude Max (5x / 20x)</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Everything in Pro with <strong>5x ($100)</strong> or <strong>20x ($200)</strong> the Pro usage per 5-hour window.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Claude Fable 5.1 (up to 50% of weekly limits)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>$100 or $200/mo of API credits included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Priority access at busy times</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Heavy Claude Code users & researchers.
              </div>
            </div>

            {/* Google AI Ultra */}
            <div className="rounded-2xl bg-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Google</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">$100 / $200</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Google AI Ultra</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  About 5x ($100, 20 TB) or 20x ($200, 30 TB) the AI Pro usage, with the <strong>Deep Think</strong> reasoning mode.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gemini Agent (US, English only)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Most image, music and video creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>YouTube Premium in some countries</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Creators & heavy Google users.
              </div>
            </div>

            {/* Frontier API Pool */}
            <div className="rounded-2xl bg-zinc-950 border border-emerald-500/40 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Direct API</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">$100 - $200 Pool</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Top-Model API Keys</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Pay-per-use access to <strong>{nameOf(FABLE)}</strong> and <strong>{nameOf(ASTRA)}</strong> (both {priceLine(FABLE)}).
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>The labs' most powerful public models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cached input from {cachedLine(FABLE)} ({nameOf(FABLE)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Runs coding agents (Claude Code, Cline)</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-emerald-300">Best for:</strong> Developers building agents & automation.
              </div>
            </div>

            {/* Dedicated Cloud Instance */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Self-Hosted Cloud</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold">$250+ / mo</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-100 font-sans">Rented Cloud GPU</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  One 24 GB cloud GPU (for example an RTX 4090 on RunPod) running <strong>{nameOf(QWEN27)}</strong> all day with vLLM.
                </p>
                <div className="space-y-1.5 text-xs text-zinc-300 font-sans pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Fixed monthly cost, no per-message fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Your prompts stay on your server</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>No AI company usage limits</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-900 text-2xs text-zinc-400">
                <strong className="text-zinc-300">Best for:</strong> Strict privacy & non-stop batch jobs.
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
