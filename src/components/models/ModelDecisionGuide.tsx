import React from 'react';
import { Compass, ArrowRight, ExternalLink, Info } from 'lucide-react';
import { GUIDE_PICKS } from '../../data/showdownsData';
import { PRICE_PERFORMANCE_LEADERBOARD_ENTRIES } from '../../data/benchmarksData';
import { MODEL_DATA_AS_OF } from '../../data/modelsData';

interface ModelDecisionGuideProps {
  onSelectModel: (modelId: string) => void;
}

// Consumer plans change often and we do not track them; link to the vendors instead of quoting them.
const PLAN_PAGES = [
  { label: 'Claude plans (Anthropic)', url: 'https://claude.com/pricing' },
  { label: 'ChatGPT plans (OpenAI)', url: 'https://openai.com/chatgpt/pricing/' },
  { label: 'Gemini API pricing (Google)', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
];

/**
 * Decision guide built only from generated data (scripts/build_model_data.py).
 * Each pick states the rule that chose it, so readers can check it against the boards.
 */
export const ModelDecisionGuide: React.FC<ModelDecisionGuideProps> = ({ onSelectModel }) => {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <div className="eyebrow flex items-center gap-2">
          <Compass className="w-4 h-4" />
          <span>Model Decision Guide</span>
        </div>
        <h2 className="heading-section">Which model fits the job?</h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Each pick below comes from a fixed rule over public data: the arena.ai text leaderboard, OSWorld-Verified,
          SWE-bench Verified and list prices. The rule is shown under each pick. Data checked {MODEL_DATA_AS_OF}.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDE_PICKS.map((pick) => (
          <div key={pick.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-3">
            <div className="eyebrow">{pick.title}</div>
            <a
              href={`/models/${pick.modelId}`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onSelectModel(pick.modelId);
                }
              }}
              className="tap inline-flex items-center gap-1.5 text-lg font-bold text-zinc-100 hover:text-emerald-400"
            >
              {pick.modelName}
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="text-xs text-zinc-400">{pick.developer}</div>
            <div className="text-sm text-emerald-400 font-semibold">{pick.metric}</div>
            <div className="text-xs text-zinc-300">List price: {pick.price}</div>
            <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800 pt-3 mt-auto">
              <span className="text-zinc-300 font-semibold">Rule: </span>
              {pick.rule}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="heading-section">Price vs Arena score frontier</h3>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Models where no cheaper model has a higher Arena score. Blended price = (3 × input + 1 × output) / 4 per 1M tokens, at list price.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-400 uppercase">
                <th className="p-3">Model</th>
                <th className="p-3">Developer</th>
                <th className="p-3 text-right">Arena score</th>
                <th className="p-3 text-right">Blended price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {PRICE_PERFORMANCE_LEADERBOARD_ENTRIES.map((e) => (
                <tr key={e.modelName}>
                  <td className="p-3">
                    {e.modelId ? (
                      <button onClick={() => onSelectModel(e.modelId as string)} className="font-semibold text-zinc-100 hover:text-emerald-400 text-left">
                        {e.modelName}
                      </button>
                    ) : (
                      e.modelName
                    )}
                    {e.note && <span className="ml-2 text-2xs text-zinc-400">({e.note})</span>}
                  </td>
                  <td className="p-3 text-zinc-400">{e.developer}</td>
                  <td className="p-3 text-right font-mono text-emerald-400">{e.score}</td>
                  <td className="p-3 text-right font-mono text-zinc-300">{e.costPerRun?.replace(' / 1M blended', '')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
        <div className="eyebrow-warn flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>Before you pick</span>
        </div>
        <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Arena measures which answers people prefer in chat. It is not a coding or agent test.</li>
          <li>The shared-harness SWE-bench runs end in early 2026, so the newest models have no result there yet.</li>
          <li>List prices leave out caching, batch discounts and long-prompt surcharges. Check the price notes on each model page.</li>
          <li>Consumer plans (monthly subscriptions) change often and are not in our data. Check the vendor pages:</li>
        </ul>
        <ul className="flex flex-wrap gap-3 text-sm">
          {PLAN_PAGES.map((p) => (
            <li key={p.url}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="tap inline-flex items-center gap-1 text-emerald-400 hover:underline">
                {p.label} <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
