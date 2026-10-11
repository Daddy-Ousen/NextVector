// Utility functions for NextVector

/**
 * Sorts articles strictly from newest to oldest.
 * If two articles are published on the same calendar day,
 * the higher signalRating (editorial importance) gets priority.
 * If signalRating is tied on the same day, newer timestamp gets priority.
 */
export function sortArticlesByTimeAndImportance<T extends { publishedAt: string; signalRating: number }>(articles: T[]): T[] {
  return [...articles].sort((a, b) => {
    const timeA = new Date(a.publishedAt).getTime();
    const timeB = new Date(b.publishedAt).getTime();

    // Extract calendar day prefix (YYYY-MM-DD)
    const dayA = a.publishedAt.slice(0, 10);
    const dayB = b.publishedAt.slice(0, 10);

    if (dayA !== dayB) {
      // Different days: Newer date strictly on top
      return timeB - timeA;
    }

    // Same day: Higher signalRating (importance) gets priority
    const signalDiff = (b.signalRating || 0) - (a.signalRating || 0);
    if (signalDiff !== 0) {
      return signalDiff;
    }

    // Same day and same signal rating: newer timestamp first
    return timeB - timeA;
  });
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(isoString);
  } catch {
    return isoString;
  }
}

/** Local calendar-day key (YYYY-MM-DD) for grouping. */
function localDayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** "Today", "Yesterday", or a full date such as "Wednesday, Oct 8". */
export function getDayGroupLabel(isoString: string, now: Date = new Date()): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  const key = localDayKey(date);
  if (key === localDayKey(now)) return 'Today';
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (key === localDayKey(yesterday)) return 'Yesterday';
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== now.getFullYear() ? { year: 'numeric' } : {}),
  }).format(date);
}

/** Clock time in the reader's zone, e.g. "4:30 PM". */
export function formatClockTime(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date);
}

/** Splits an already-sorted list into consecutive day groups. */
export function groupByDay<T extends { publishedAt: string }>(items: T[], now: Date = new Date()): { label: string; items: T[] }[] {
  const groups: { label: string; items: T[] }[] = [];
  for (const item of items) {
    const label = getDayGroupLabel(item.publishedAt, now);
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(item);
    else groups.push({ label, items: [item] });
  }
  return groups;
}

/**
 * Picks follow-up stories for an article: same category, most shared tags first,
 * then newest. Falls back to the newest stories from any category to fill `count`.
 */
export function pickReadNext<T extends { id: string; category: string; tags: string[]; publishedAt: string }>(
  current: T,
  all: T[],
  count = 3,
): T[] {
  const tags = new Set(current.tags);
  const time = (a: T) => new Date(a.publishedAt).getTime();
  const others = all.filter((a) => a.id !== current.id);
  const sameCategory = others
    .filter((a) => a.category === current.category)
    .map((a) => ({ a, shared: a.tags.filter((t) => tags.has(t)).length }))
    .sort((x, y) => y.shared - x.shared || time(y.a) - time(x.a))
    .map((x) => x.a);
  const picks = sameCategory.slice(0, count);
  if (picks.length < count) {
    const fill = others
      .filter((a) => !picks.includes(a))
      .sort((x, y) => time(y) - time(x));
    picks.push(...fill.slice(0, count - picks.length));
  }
  return picks;
}

export function getSignalColor(rating: number): {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  label: string;
} {
  // Badges often sit on photos, so the background is solid and blurred.
  // Only the top tier gets the brand color; the rest stay neutral.
  const badgeBg = 'bg-zinc-950/85 backdrop-blur-md';
  if (rating >= 95) {
    return {
      badgeBg,
      badgeText: 'text-emerald-400',
      badgeBorder: 'border-emerald-500/40',
      label: 'Critical Breakthrough'
    };
  }
  if (rating >= 90) {
    return {
      badgeBg,
      badgeText: 'text-zinc-100',
      badgeBorder: 'border-zinc-600',
      label: 'High Technical Signal'
    };
  }
  if (rating >= 80) {
    return {
      badgeBg,
      badgeText: 'text-zinc-200',
      badgeBorder: 'border-zinc-700',
      label: 'Substantive Progress'
    };
  }
  return {
    badgeBg,
    badgeText: 'text-zinc-300',
    badgeBorder: 'border-zinc-700',
    label: 'Standard Industry Signal'
  };
}

export function getCategoryBadge(category: string): { label: string; shortLabel: string; color: string } {
  switch (category) {
    case 'ai':
      return { 
        label: 'Artificial Intelligence', 
        shortLabel: 'AI', 
        color: 'text-emerald-400 border-emerald-500/40 bg-zinc-950/85 backdrop-blur-md' 
      };
    case 'technology':
      return { 
        label: 'Technology', 
        shortLabel: 'Tech', 
        color: 'text-cyan-400 border-cyan-500/40 bg-zinc-950/85 backdrop-blur-md' 
      };
    case 'science':
      return { 
        label: 'Science & Discovery', 
        shortLabel: 'Science', 
        color: 'text-purple-400 border-purple-500/40 bg-zinc-950/85 backdrop-blur-md' 
      };
    case 'research':
      return { 
        label: 'Research Explained', 
        shortLabel: 'Research', 
        color: 'text-amber-400 border-amber-500/40 bg-zinc-950/85 backdrop-blur-md' 
      };
    default:
      return { 
        label: category.toUpperCase(), 
        shortLabel: category.toUpperCase(), 
        color: 'text-zinc-400 border-zinc-700 bg-zinc-950/85 backdrop-blur-md' 
      };
  }
}

export function getArticleTypeBadge(type: string): { label: string; shortLabel: string } {
  switch (type) {
    case 'breaking': return { label: 'Breaking News', shortLabel: 'Breaking' };
    case 'analysis': return { label: 'News Analysis', shortLabel: 'Analysis' };
    case 'deep-dive': return { label: 'Deep Dive', shortLabel: 'Deep Dive' };
    case 'model-report': return { label: 'Model Report', shortLabel: 'Report' };
    case 'benchmark-report': return { label: 'Benchmark Report', shortLabel: 'Benchmark' };
    case 'research-explained': return { label: 'Research Explained', shortLabel: 'Research' };
    case 'discovery': return { label: 'Discovery', shortLabel: 'Discovery' };
    case 'industry-watch': return { label: 'Industry Watch', shortLabel: 'Watch' };
    default: return { label: type, shortLabel: type };
  }
}

export function getArticleTypeLabel(type: string): string {
  return getArticleTypeBadge(type).label;
}

// Local Storage for Bookmarks
export function getSavedBookmarks(): string[] {
  try {
    const saved = localStorage.getItem('nextvector_bookmarks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(articleId: string): string[] {
  const current = getSavedBookmarks();
  const updated = current.includes(articleId)
    ? current.filter(id => id !== articleId)
    : [...current, articleId];
  try {
    localStorage.setItem('nextvector_bookmarks', JSON.stringify(updated));
  } catch {
    // Storage unavailable (private mode / quota): keep the change for this session only
  }
  return updated;
}

/**
 * Benchmark score as text. Scores are stored as "58.2%", "1338" (Elo) or plain numbers.
 * Adds "%" only to a bare number that is a percentage (not Elo, not an index, 100 or less).
 */
export function formatBenchmarkScore(b: { benchmarkName: string; score: number | string; unit?: string }): string {
  const score = String(b.score);
  if (b.unit) return `${score}${b.unit}`;
  if (score.includes('%')) return score;
  const name = b.benchmarkName.toLowerCase();
  const isPercent = !/elo|index|pareto/.test(name) && Number(score) <= 100;
  return isPercent ? `${score}%` : score;
}

/** "$4.00" for a per-1M-token price; prices with a third decimal keep it ("$0.075", "$0.435"). null = no public price. */
export function formatPrice(v: number | null | undefined): string {
  if (v === null || v === undefined) return 'Not public';
  const digits = v < 10 && Math.abs(v * 100 - Math.round(v * 100)) > 1e-9 ? 3 : 2;
  return `$${v.toFixed(digits)}`;
}

/** "$4.00 / $20.00" (input / output per 1M tokens) or "Not public". */
export function formatPricePair(pricing: { inputPer1M: number | null; outputPer1M: number | null }): string {
  if (pricing.inputPer1M === null || pricing.outputPer1M === null) return 'Not public';
  return `${formatPrice(pricing.inputPer1M)} / ${formatPrice(pricing.outputPer1M)}`;
}

/** Blended price per 1M tokens at 3 input : 1 output, as used on the Price vs Score board. */
export function blendedPrice(pricing: { inputPer1M: number | null; outputPer1M: number | null }): number | null {
  if (pricing.inputPer1M === null || pricing.outputPer1M === null) return null;
  return (3 * pricing.inputPer1M + pricing.outputPer1M) / 4;
}

/** A model's own result on a named benchmark (exact name match), or undefined. */
export function findBenchmark<T extends { benchmarks: { benchmarkName: string }[] }>(model: T, name: string) {
  return model.benchmarks.find((b) => b.benchmarkName === name) as T['benchmarks'][number] | undefined;
}
