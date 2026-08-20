import React, { useState } from 'react';
import { VideoStory } from '../types';
import { SAMPLE_VIDEOS } from '../data/newsData';
import {
  X,
  Play,
  Share2,
  Check,
  Eye,
  Clock,
  User,
  Tv,
  Sparkles,
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoStory | null;
  onClose: () => void;
  onSelectAnotherVideo?: (video: VideoStory) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onSelectAnotherVideo,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!video) return null;

  const handleShare = () => {
    const text = `🎥 *WATCH NAIJA REPOTA VIDEO* 🇳🇬\n\n"${video.title}"\n\nWatch full video here: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-emerald-500/30 flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Naija Repota Video Player • Live Stream
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            poster={video.thumbnailUrl}
            className="w-full h-full object-contain"
          >
            Your browser no support HTML5 video.
          </video>
        </div>

        {/* Video Info and Controls */}
        <div className="p-4 sm:p-6 space-y-4 bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-md">
                {video.category}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {video.title}
              </h2>
            </div>

            <button
              onClick={handleShare}
              className="self-start sm:self-center flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Video Link Copied!' : 'Share Video'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {video.description}
          </p>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Repota: {video.reporter}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{video.timeAgo}</span>
              </span>
            </div>
            <div className="flex items-center space-x-3 text-emerald-400 font-mono text-xs">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {video.views} views
              </span>
              <span>• Duration: {video.duration}</span>
            </div>
          </div>

          {/* Related Videos Playlist */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-emerald-400" />
              <span>More Real-Time Videos & Gist</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_VIDEOS.filter((v) => v.id !== video.id).map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectAnotherVideo && onSelectAnotherVideo(v)}
                  className="bg-slate-950 hover:bg-slate-800 p-2 rounded-xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center space-x-2.5 group"
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                    <img
                      src={v.thumbnailUrl}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300">
                      {v.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">{v.duration} • {v.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
