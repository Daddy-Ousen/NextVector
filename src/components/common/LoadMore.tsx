import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FEED_PAGE_SIZE = 24;

/**
 * Shows the first `pageSize` items and grows on demand. The count resets whenever
 * `resetKey` changes (e.g. a filter), without an effect-driven re-render.
 */
export function usePagedList<T>(items: T[], resetKey: string, pageSize = FEED_PAGE_SIZE) {
  const [state, setState] = useState({ key: resetKey, count: pageSize });
  const count = state.key === resetKey ? state.count : pageSize;
  return {
    visible: items.slice(0, count),
    remaining: Math.max(items.length - count, 0),
    showMore: () => setState({ key: resetKey, count: count + pageSize }),
  };
}

interface LoadMoreButtonProps {
  remaining: number;
  onClick: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ remaining, onClick }) => {
  if (remaining <= 0) return null;
  return (
    <div className="flex justify-center pt-8">
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4" />
        Load more stories
        <span className="text-zinc-400">({remaining} older)</span>
      </button>
    </div>
  );
};
