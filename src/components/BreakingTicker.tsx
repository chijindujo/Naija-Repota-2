import React, { useState, useEffect } from 'react';
import { BREAKING_TICKER } from '../data/newsData';
import { Flame, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

interface BreakingTickerProps {
  onSelectHeadline?: (text: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ onSelectHeadline }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_TICKER.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="bg-white rounded-2xl border border-emerald-200/90 p-2 sm:p-2.5 shadow-2xs flex items-center justify-between gap-3 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ticker Tag with Light Green and Flame */}
      <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl shrink-0 font-black text-xs uppercase tracking-wider border border-emerald-200">
        <Flame className="w-4 h-4 text-red-500 animate-bounce" />
        <span className="hidden sm:inline">AS E DEY HOT:</span>
        <span className="sm:hidden">HOT:</span>
      </div>

      {/* Ticker Content */}
      <div className="grow overflow-hidden relative h-6 flex items-center">
        <div
          onClick={() => onSelectHeadline && onSelectHeadline(BREAKING_TICKER[currentIndex])}
          className="text-xs sm:text-sm font-bold text-slate-800 truncate cursor-pointer hover:text-emerald-700 transition-colors animate-in fade-in duration-300 w-full"
        >
          {BREAKING_TICKER[currentIndex]}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-1 shrink-0">
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + BREAKING_TICKER.length) % BREAKING_TICKER.length)
          }
          className="p-1 rounded-lg hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors"
          aria-label="Previous headline"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % BREAKING_TICKER.length)}
          className="p-1 rounded-lg hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors"
          aria-label="Next headline"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
