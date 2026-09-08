import React from 'react';
import { Article } from '../../types';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';
import { SignalRatingBadge } from './SignalRatingBadge';
import { formatRelativeTime } from '../../utils';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onRemoveBookmark: (articleId: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onRemoveBookmark,
  onSelectArticle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-400 fill-current" />
            <h3 className="text-base font-bold text-zinc-100 font-sans">
              Saved Intelligence ({bookmarkedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-zinc-700" />
              <p className="text-sm font-medium">No saved articles yet</p>
              <p className="text-xs mt-1">Click the bookmark icon on any article card to save for later reading.</p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 flex items-start justify-between gap-3 group transition-all"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectArticle(article.slug);
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                    <span className="uppercase text-emerald-400">{article.category}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(article.publishedAt)}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                    {article.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <SignalRatingBadge score={article.signalRating} size="sm" />
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 rounded transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
