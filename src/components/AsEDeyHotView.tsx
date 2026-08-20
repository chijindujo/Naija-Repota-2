import React from 'react';
import { NewsArticle } from '../types';
import {
  Flame,
  Radio,
  Clock,
  MessageCircle,
  Share2,
  TrendingUp,
  Zap,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface AsEDeyHotViewProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const AsEDeyHotView: React.FC<AsEDeyHotViewProps> = ({ articles, onSelectArticle }) => {
  const hotStories = articles.filter(
    (a) => a.isHot || a.category === 'as-e-dey-hot' || a.isBreaking
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner (High Energy As E Dey Hot Red/Emerald Gradient) */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full backdrop-blur-xs">
            <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>BREAKING VIRAL WIRE</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight">
            As E Dey Hot: Breaking Tori, Viral Gist & Entertainment
          </h1>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            Fresh updates wey just drop for Nigeria streets, social media, government houses, and entertainment circles!
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-black/40 text-amber-300 px-4 py-2 rounded-2xl border border-amber-400/40 text-xs font-mono font-bold">
          <Radio className="w-4 h-4 text-red-400 animate-ping" />
          <span>LIVE WIRE UPDATES</span>
        </div>
      </div>

      {/* Breaking Stream Timeline / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column: Hot Articles List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {hotStories.map((art, idx) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                  <Flame className="w-3 h-3" /> HOT
                </span>
              </div>

              <div className="space-y-2 grow flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="font-extrabold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      {art.categoryLabel}
                    </span>
                    <span className="text-slate-400 font-semibold">• {art.publishedAt}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {art.locationTag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                  <span className="font-bold text-slate-700">{art.author.name}</span>
                  <div className="flex items-center space-x-3 text-emerald-700 font-semibold">
                    <span>{art.readTime}</span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> {art.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Trending Hashtags & Street Gossip (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Trending Naija Hashtags</span>
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { tag: '#MinimumWage', count: '142K Gist Posts' },
                { tag: '#DollarDrop', count: '98K Gist Posts' },
                { tag: '#OsimhenGoals', count: '87K Gist Posts' },
                { tag: '#BurnaLondonStadium', count: '76K Gist Posts' },
                { tag: '#CoastalHighway', count: '54K Gist Posts' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold text-emerald-950">{item.tag}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-950 text-white p-5 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <Zap className="w-4 h-4" />
              <span>Got Hot Gist For Your Street?</span>
            </div>
            <p className="text-emerald-200 leading-relaxed">
              Snap picture or shoot video, send am give Naija Repota newsroom make we broadcast am sharp sharp!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
