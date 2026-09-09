// Utility functions for NextVector
import { Article } from '../types';

/**
 * Sorts articles strictly from newest to oldest.
 * If two articles are published on the same calendar day,
 * the higher signalRating (editorial importance) gets priority.
 * If signalRating is tied on the same day, newer timestamp gets priority.
 */
export function sortArticlesByTimeAndImportance(articles: Article[]): Article[] {
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

export function getSignalColor(rating: number): {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  label: string;
} {
  if (rating >= 95) {
    return {
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-400',
      badgeBorder: 'border-emerald-500/30',
      label: 'Critical Breakthrough'
    };
  }
  if (rating >= 90) {
    return {
      badgeBg: 'bg-cyan-500/10',
      badgeText: 'text-cyan-400',
      badgeBorder: 'border-cyan-500/30',
      label: 'High Technical Signal'
    };
  }
  if (rating >= 80) {
    return {
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-400',
      badgeBorder: 'border-blue-500/30',
      label: 'Substantive Progress'
    };
  }
  return {
    badgeBg: 'bg-zinc-500/10',
    badgeText: 'text-zinc-400',
    badgeBorder: 'border-zinc-500/30',
    label: 'Standard Industry Signal'
  };
}

export function getCategoryBadge(category: string): { label: string; color: string } {
  switch (category) {
    case 'ai':
      return { label: 'Artificial Intelligence', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    case 'technology':
      return { label: 'Technology', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' };
    case 'science':
      return { label: 'Science & Discovery', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' };
    case 'research':
      return { label: 'Research Explained', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    default:
      return { label: category.toUpperCase(), color: 'text-zinc-400 border-zinc-700 bg-zinc-800' };
  }
}

export function getArticleTypeLabel(type: string): string {
  switch (type) {
    case 'breaking': return 'Breaking News';
    case 'analysis': return 'News Analysis';
    case 'deep-dive': return 'Deep Dive';
    case 'model-report': return 'Model Report';
    case 'benchmark-report': return 'Benchmark Report';
    case 'research-explained': return 'Research Explained';
    case 'discovery': return 'Discovery';
    case 'industry-watch': return 'Industry Watch';
    default: return type;
  }
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
  try {
    const current = getSavedBookmarks();
    const updated = current.includes(articleId)
      ? current.filter(id => id !== articleId)
      : [...current, articleId];
    localStorage.setItem('nextvector_bookmarks', JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
