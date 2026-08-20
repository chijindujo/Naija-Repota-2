import React, { useState } from 'react';
import { NewsArticle, CommentItem } from '../types';
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  Eye,
  Clock,
  MapPin,
  Check,
  Play,
  Sparkles,
  ThumbsUp,
  User,
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onLikeArticle: (articleId: string) => void;
  onAddComment: (articleId: string, comment: CommentItem) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onLikeArticle,
  onAddComment,
  onOpenVideoModal,
}) => {
  const [commentText, setCommentText] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [userLocation, setUserLocation] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!article) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLikeArticle(article.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: 'comm-' + Date.now(),
      author: authorName.trim() || 'Naija Reader',
      location: userLocation.trim() || 'Lagos',
      text: commentText.trim(),
      createdAt: 'Just now',
      likes: 0,
    };

    onAddComment(article.id, newComment);
    setCommentText('');
  };

  const handleShare = () => {
    const text = `📰 *${article.title}*\n\nRead full Pidgin tori on Naija Repota: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-emerald-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Floating Control Bar */}
        <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
              {article.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {article.readTime}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
              title="Share Tori"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div className="p-4 sm:p-7 overflow-y-auto grow space-y-6 text-slate-800">
          {/* Article Header */}
          <div className="space-y-3">
            {article.isHot && (
              <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-black px-2.5 py-0.5 rounded-md border border-red-200">
                🔥 AS E DEY HOT
              </span>
            )}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-3 border-y border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-emerald-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-slate-900">{article.author.name}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{article.locationTag}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.publishedAt}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image or Attached Video */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            {article.isVideo && article.videoUrl && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => onOpenVideoModal && onOpenVideoModal(article.videoUrl!, article.title)}
                  className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 font-bold text-xs"
                >
                  <Play className="w-6 h-6 fill-white" />
                  <span>Play Real-Time Video ({article.videoDuration})</span>
                </button>
              </div>
            )}
            {article.imageCaption && (
              <div className="bg-slate-900/90 text-slate-300 text-[11px] p-2.5 px-4 font-medium italic">
                📸 {article.imageCaption}
              </div>
            )}
          </div>

          {/* Quick Summary Pill in Pidgin */}
          <div className="bg-emerald-50/80 border-l-4 border-emerald-500 p-4 rounded-r-xl space-y-1">
            <div className="text-[11px] font-black uppercase text-emerald-800 tracking-wider">
              KOKO OF THE TORI (SUMMARY):
            </div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Main Story Paragraphs in Nigerian Pidgin */}
          <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-100 hover:bg-emerald-50 text-emerald-800 font-semibold text-xs px-3 py-1 rounded-lg transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Engagement Reaction Bar (Light Green Theme) */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isLiked
                    ? 'bg-red-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                <span>{article.likesCount + (isLiked ? 1 : 0)} Likes</span>
              </button>

              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{article.viewsCount.toLocaleString()} Views</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied!' : 'Share on WhatsApp'}</span>
            </button>
          </div>

          {/* Comments / Tok Your Mind Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Tok Your Mind (Comments • {article.comments.length})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your Name (e.g. Bro Segun, Sister Chioma)"
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="Your City/Area (e.g. Surulere, Wuse 2)"
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Wetin you think about this tori? Drop your comment here..."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-emerald-500 leading-relaxed"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-2.5">
              {article.comments.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Nobody never comment on this tori yet. Be the first person to tok your mind!
                </div>
              ) : (
                article.comments.map((comm) => (
                  <div
                    key={comm.id}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{comm.author}</span>
                        {comm.location && (
                          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.2 rounded">
                            📍 {comm.location}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[11px]">{comm.createdAt}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{comm.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
