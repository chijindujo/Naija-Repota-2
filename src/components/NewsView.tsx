import React, { useState } from 'react';
import { NewsArticle } from '../types';
import {
  Newspaper,
  Search,
  Filter,
  Clock,
  Eye,
  MessageCircle,
  MapPin,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface NewsViewProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ articles, onSelectArticle }) => {
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subCategories = [
    { id: 'all', label: 'All News Tori' },
    { id: 'politics', label: 'Politics & Govt' },
    { id: 'money', label: 'Money & Economy' },
    { id: 'naija-life', label: 'Naija Life & Community' },
    { id: 'infra', label: 'Infrastructure & Roads' },
  ];

  const filteredNews = articles.filter((art) => {
    // Exclude purely sports if not relevant
    const matchesSearch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.locationTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedSubCat === 'all') return matchesSearch;
    if (selectedSubCat === 'politics') return matchesSearch && (art.category === 'politics' || art.categoryLabel.includes('Politics'));
    if (selectedSubCat === 'money') return matchesSearch && (art.category === 'money' || art.categoryLabel.includes('Economy') || art.categoryLabel.includes('Money'));
    if (selectedSubCat === 'infra') return matchesSearch && art.categoryLabel.includes('Infrastructure');
    if (selectedSubCat === 'naija-life') return matchesSearch && (art.category === 'naija-life' || art.categoryLabel.includes('Life') || art.categoryLabel.includes('Tech'));
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header (Light Green Theme) */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full backdrop-blur-xs">
            <Newspaper className="w-3.5 h-3.5" />
            <span>NAIJA NEWS DESK</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight">
            Full Tori: Politics, Economy, Infrastructure & Naija Life
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Read verified authentic Nigerian news reported in simple, engaging Pidgin English.
          </p>
        </div>

        <div className="text-right text-xs bg-emerald-700/80 px-4 py-2 rounded-2xl border border-emerald-500 font-mono">
          {filteredNews.length} ARTICLES PUBLISHED
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news by topic, politician, state, or keywords (e.g. Tinubu, Naira, Coastal Road)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {subCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubCat === cat.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <div className="text-3xl">📰</div>
          <h3 className="text-base font-bold text-slate-900">
            No news tori match wetin you search.
          </h3>
          <p className="text-xs text-slate-500">
            Try clear your search keyword or click "All News Tori" above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubCat('all');
            }}
            className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200 transition-colors"
          >
            Show All News
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-2xs">
                  {art.categoryLabel}
                </span>
                {art.isHot && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-2xs">
                    🔥 HOT
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5 space-y-3 grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {art.locationTag} • {art.publishedAt}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-5 h-5 rounded-full object-cover border border-emerald-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-bold text-slate-700 text-[11px]">{art.author.name}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-500">
                    <span>{art.readTime}</span>
                    <span className="flex items-center gap-0.5 text-emerald-700">
                      <MessageCircle className="w-3 h-3" /> {art.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
