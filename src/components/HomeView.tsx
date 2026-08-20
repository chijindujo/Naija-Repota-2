import React from 'react';
import { NewsArticle, VideoStory, NavPage } from '../types';
import { SAMPLE_VIDEOS } from '../data/newsData';
import {
  Play,
  Flame,
  Clock,
  Eye,
  TrendingUp,
  ChevronRight,
  Tv,
  Camera,
  MessageCircle,
  Share2,
  Sparkles,
  ArrowRight,
  MapPin,
  Trophy,
} from 'lucide-react';

interface HomeViewProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onSelectVideo: (video: VideoStory) => void;
  setCurrentPage: (page: NavPage) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  articles,
  onSelectArticle,
  onSelectVideo,
  setCurrentPage,
}) => {
  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const hotArticles = articles.filter((a) => a.isHot || a.category === 'as-e-dey-hot').slice(0, 4);
  const sportsArticles = articles.filter((a) => a.category === 'sports').slice(0, 3);
  const newsArticles = articles.filter((a) => a.category === 'politics' || a.category === 'news').slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Section: Lead Story & Real-time As E Dey Hot sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Lead Story Card (7 cols) */}
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="lg:col-span-7 group cursor-pointer bg-white rounded-3xl overflow-hidden border border-emerald-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="relative aspect-video sm:aspect-16/10 overflow-hidden bg-slate-900">
            <img
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                LEAD TORI
              </span>
              <span className="bg-white/90 backdrop-blur-xs text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full">
                {featuredArticle.categoryLabel}
              </span>
            </div>

            {/* Title & Caption on image */}
            <div className="absolute bottom-4 inset-x-4 space-y-1 text-white">
              <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {featuredArticle.locationTag} • {featuredArticle.publishedAt}
              </span>
              <h2 className="text-lg sm:text-2xl font-black leading-tight text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                {featuredArticle.title}
              </h2>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3 bg-white">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
              {featuredArticle.summary}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-6 h-6 rounded-full object-cover border border-emerald-300"
                  referrerPolicy="no-referrer"
                />
                <span className="font-bold text-slate-800">{featuredArticle.author.name}</span>
              </div>

              <div className="flex items-center space-x-4 text-emerald-700 font-semibold">
                <span>{featuredArticle.readTime}</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {featuredArticle.commentsCount} comments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: As E Dey Hot Quick Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-emerald-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  As E Dey Hot (Breaking)
                </h3>
                <p className="text-[11px] text-slate-500">Live fresh updates as e dey drop</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('as-e-dey-hot')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
            >
              <span>See All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick list of hot stories */}
          <div className="space-y-3.5 divide-y divide-slate-100">
            {hotArticles.map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="pt-3 first:pt-0 group cursor-pointer flex items-start space-x-3"
              >
                <span className="text-lg font-black text-emerald-600/60 font-mono w-5">
                  0{idx + 1}
                </span>
                <div className="space-y-1 grow">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold bg-red-50 text-red-600 px-2 py-0.2 rounded">
                      {art.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">• {art.publishedAt}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold">Get breaking alerts for WhatsApp?</span>
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-xl text-xs hover:bg-emerald-700 transition-colors shadow-2xs"
            >
              Join Group
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Video Highlights & Pictures Stream (User explicitly requested real-time pictures and videos) */}
      <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 space-y-6 shadow-xl border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-2xl">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Real-Time Pictures & Video Desk
                </h2>
              </div>
              <p className="text-xs text-emerald-200">
                Watch raw video footages, press conferences, drone inspections, and street gist across Nigeria
              </p>
            </div>
          </div>

          <span className="text-xs bg-emerald-950 text-emerald-300 font-mono px-3 py-1.5 rounded-xl border border-emerald-800 self-start sm:self-center">
            {SAMPLE_VIDEOS.length} LIVE RECORDINGS
          </span>
        </div>

        {/* Video Cards Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="bg-slate-950 hover:bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-400/50 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded">
                  {video.duration}
                </span>

                <span className="absolute top-2 left-2 bg-emerald-600/90 text-[10px] font-extrabold uppercase text-white px-2 py-0.5 rounded">
                  {video.category}
                </span>
              </div>

              <div className="p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{video.views} views</span>
                  <span>{video.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Grid: Full News (Tori) + Sports Gist (Trophy) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Full News & Infrastructure (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-600 rounded-sm" />
              <span>Full Tori & Naija News</span>
            </h2>
            <button
              onClick={() => setCurrentPage('news')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>See More News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {newsArticles.map((art) => (
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
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-2xs">
                    {art.categoryLabel}
                  </span>
                </div>

                <div className="p-4 space-y-2 grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      📍 {art.locationTag} • {art.publishedAt}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                    <span className="font-bold text-slate-700">{art.author.name}</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sports Gist Section (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <span>Sport Gist</span>
            </h2>
            <button
              onClick={() => setCurrentPage('sports')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>More Sports</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {sportsArticles.map((sport) => (
              <div
                key={sport.id}
                onClick={() => onSelectArticle(sport)}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group flex items-start space-x-3"
              >
                <img
                  src={sport.imageUrl}
                  alt={sport.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 overflow-hidden">
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded">
                    {sport.categoryLabel}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {sport.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">{sport.publishedAt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Match Scoreboard Widget */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2 text-xs">
            <div className="font-black text-emerald-950 flex items-center justify-between">
              <span>⚽ NPFL MATCH SCORE</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">FT</span>
            </div>
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Remo Stars FC</span>
              <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">2 - 1</span>
              <span>Enyimba FC</span>
            </div>
            <p className="text-[11px] text-emerald-800 italic">
              Goal: Sikiru Alimi 88' (Remo Stars move to table top).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
