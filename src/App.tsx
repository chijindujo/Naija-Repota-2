import React, { useState } from 'react';
import { NavPage, NewsArticle, VideoStory, CommentItem, ContactMessage } from './types';
import { NEWS_ARTICLES, SAMPLE_VIDEOS } from './data/newsData';
import { Navbar } from './components/Navbar';
import { BreakingTicker } from './components/BreakingTicker';
import { HomeView } from './components/HomeView';
import { NewsView } from './components/NewsView';
import { SportsView } from './components/SportsView';
import { AsEDeyHotView } from './components/AsEDeyHotView';
import { ContactView } from './components/ContactView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SearchModal } from './components/SearchModal';
import { NaijaRepotaLogo } from './components/NaijaRepotaLogo';
import {
  Send,
  PhoneCall,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  Tv,
  Flame,
  Newspaper,
  Trophy,
  Home,
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [articles, setArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Like article handler
  const handleLikeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          return {
            ...a,
            likesCount: a.likesCount + 1,
          };
        }
        return a;
      })
    );
    showToast('You like this tori!');
  };

  // Add comment handler
  const handleAddComment = (articleId: string, comment: CommentItem) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          const updated = {
            ...a,
            commentsCount: a.commentsCount + 1,
            comments: [comment, ...a.comments],
          };
          if (selectedArticle && selectedArticle.id === articleId) {
            setSelectedArticle(updated);
          }
          return updated;
        }
        return a;
      })
    );
    showToast('Your comment don post live!');
  };

  // Handle contact tip
  const handleSendMessage = (msg: ContactMessage) => {
    showToast('Gist don reach our newsroom desk!');
  };

  // Open attached video from article
  const handleOpenVideoFromArticle = (videoUrl: string, title: string) => {
    const matched = SAMPLE_VIDEOS.find((v) => v.videoUrl === videoUrl) || {
      id: 'vid-custom-' + Date.now(),
      title,
      description: 'Real-time video footage from Naija Repota correspondents.',
      videoUrl,
      thumbnailUrl: selectedArticle?.imageUrl || SAMPLE_VIDEOS[0].thumbnailUrl,
      duration: '02:45',
      views: '15.4K',
      category: 'Real-Time Video',
      timeAgo: 'Just now',
      reporter: selectedArticle?.author.name || 'Naija Repota Desk',
    };
    setSelectedVideo(matched);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-950 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border border-emerald-500 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar with Light Green Styling */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContactTip={() => {
          setCurrentPage('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 grow space-y-6">
        {/* Breaking News Ticker in Pidgin */}
        <BreakingTicker
          onSelectHeadline={(headline) => {
            const matched = articles.find(
              (a) => headline.includes(a.title.slice(0, 20)) || a.isBreaking
            );
            if (matched) {
              setSelectedArticle(matched);
            } else {
              setCurrentPage('as-e-dey-hot');
            }
          }}
        />

        {/* Dynamic Page Views */}
        {currentPage === 'home' && (
          <HomeView
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onSelectVideo={(vid) => setSelectedVideo(vid)}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'news' && (
          <NewsView
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {currentPage === 'sports' && (
          <SportsView
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenVideoModal={handleOpenVideoFromArticle}
          />
        )}

        {currentPage === 'as-e-dey-hot' && (
          <AsEDeyHotView
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView onSendMessage={handleSendMessage} />
        )}
      </main>

      {/* Clean Footer (Light Green & Slate Theme) */}
      <footer className="bg-white border-t border-emerald-200 mt-12 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-1.5">
              <NaijaRepotaLogo size="md" showText={true} />
              <p className="text-xs text-slate-500 max-w-sm">
                Nigeria number 1 authentic Pidgin news, sports, entertainment, and real-time video platform.
              </p>
            </div>

            {/* Quick Footer Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-slate-700">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-700 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('news');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-700 transition-colors"
              >
                Full News
              </button>
              <button
                onClick={() => {
                  setCurrentPage('sports');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-700 transition-colors"
              >
                Sports Gist
              </button>
              <button
                onClick={() => {
                  setCurrentPage('as-e-dey-hot');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-700 transition-colors text-red-600"
              >
                🔥 As E Dey Hot
              </button>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-700 transition-colors"
              >
                Contact Newsroom
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-2">
            <div>
              © 2026 Naija Repota Media. All Rights Reserved. Naija Tori in Simple Pidgin.
            </div>
            <div>
              Lagos • Abuja • Port Harcourt • Kano • Uyo
            </div>
          </div>
        </div>
      </footer>

      {/* Article Detail Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onLikeArticle={handleLikeArticle}
        onAddComment={handleAddComment}
        onOpenVideoModal={handleOpenVideoFromArticle}
      />

      {/* Real-time Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onSelectAnotherVideo={(vid) => setSelectedVideo(vid)}
      />

      {/* Global News Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />
    </div>
  );
}
