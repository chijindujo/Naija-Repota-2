import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Search, X, Clock, MapPin, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  onSelectArticle: (art: NewsArticle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const results = articles.filter((a) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.locationTag.toLowerCase().includes(q) ||
      a.categoryLabel.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all Nigerian news, sports, politics, video gist..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-slate-400 space-y-2">
              <p>Type anything make you search Naija Repota news wire...</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {['#MinimumWage', '#Osimhen', '#DollarRate', '#CoastalRoad', '#NPFL'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag.replace('#', ''))}
                    className="bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors font-semibold"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No news tori found for "{query}". Try another word.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Search Results ({results.length}):
              </div>
              {results.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.2 rounded border border-emerald-200 uppercase">
                      {art.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                      {art.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      📍 {art.locationTag} • {art.publishedAt}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
