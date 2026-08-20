import React, { useState } from 'react';
import { NewsArticle } from '../types';
import {
  Trophy,
  Play,
  Flame,
  Clock,
  Eye,
  MessageCircle,
  MapPin,
  Calendar,
  Shield,
} from 'lucide-react';

interface SportsViewProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
}

export const SportsView: React.FC<SportsViewProps> = ({
  articles,
  onSelectArticle,
  onOpenVideoModal,
}) => {
  const [selectedSportTab, setSelectedSportTab] = useState<string>('all');

  const sportsArticles = articles.filter(
    (a) => a.category === 'sports' || a.categoryLabel.toLowerCase().includes('sport')
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner (Light Green Theme with Sports Vibe) */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full backdrop-blur-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>NAIJA SPORTS ARENA</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight">
            Super Eagles, Premier League, NPFL & Global Sports Gist
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            All the hottest football transfers, match highlights, Osimhen goals, and viewing centre arguments in Pidgin!
          </p>
        </div>

        {/* Live Match Alert Widget */}
        <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-400/40 text-xs space-y-1 text-emerald-100 font-mono self-stretch sm:self-auto">
          <div className="text-amber-300 font-bold flex items-center justify-between">
            <span>⚽ UPCOMING QUALIFIER</span>
            <span className="bg-red-500 text-white px-1.5 py-0.2 rounded text-[10px] animate-pulse">LIVE SOON</span>
          </div>
          <div className="font-sans font-bold text-white text-sm">
            Nigeria 🇳🇬 vs 🇿🇦 South Africa
          </div>
          <div className="text-[11px] text-emerald-300">
            Godswill Akpabio Stadium, Uyo • 5:00 PM
          </div>
        </div>
      </div>

      {/* Sports Fixtures & Scores Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-emerald-800 font-bold uppercase">NPFL Matchday 28</div>
            <div className="font-bold text-slate-900 mt-0.5">Remo Stars 2 - 1 Enyimba FC</div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">FT</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-emerald-800 font-bold uppercase">Premier League</div>
            <div className="font-bold text-slate-900 mt-0.5">Arsenal vs Manchester City</div>
          </div>
          <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px]">Sun 4:30PM</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-emerald-800 font-bold uppercase">Europa League</div>
            <div className="font-bold text-slate-900 mt-0.5">Lookman Hat-trick Trophy</div>
          </div>
          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">Star Gist</span>
        </div>
      </div>

      {/* Sports Articles Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sportsArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle(art)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-2xs">
                {art.categoryLabel}
              </span>
              {art.isVideo && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
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
                <span className="font-bold text-slate-700 text-[11px]">{art.author.name}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                  <MessageCircle className="w-3 h-3" /> {art.commentsCount} comments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
