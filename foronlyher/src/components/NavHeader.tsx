import React from 'react';
import { ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavHeaderProps {
  currentPage: number;
  totalPages?: number;
  onBack: () => void;
  onGoToPage?: (page: number) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  trackName?: string;
  theme?: 'dark' | 'light';
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  currentPage,
  totalPages = 11,
  onBack,
  onGoToPage,
  isPlayingAudio,
  onToggleAudio,
  trackName = 'Music',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none flex items-center justify-between">
      {/* Left side: Back Button & Page Indicator */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {currentPage > 1 && (
          <button
            onClick={onBack}
            className={`px-3 py-1.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-pill font-bold active:scale-95 ${
              isLight
                ? 'bg-white/85 text-neutral-700 hover:bg-white hover:text-rose-900 border border-neutral-200'
                : 'bg-black/40 text-neutral-200 hover:bg-black/60 hover:text-amber-300 border border-white/10'
            }`}
            title="Go to previous page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}

        {/* Page progress badge */}
        <div
          className={`px-3 py-1.5 rounded-full shadow-md backdrop-blur-md text-xs font-pill font-bold tracking-wider flex items-center gap-1.5 ${
            isLight
              ? 'bg-white/85 text-neutral-800 border border-neutral-200'
              : 'bg-black/40 text-amber-300 border border-amber-500/20'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Center: Step Dots (Hidden on tiny screens) */}
      {onGoToPage && (
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            const isPassed = pageNum < currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onGoToPage(pageNum)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-2 bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                    : isPassed
                    ? 'w-2 h-2 bg-rose-300/80 hover:bg-rose-300'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to Page ${pageNum}`}
              />
            );
          })}
        </div>
      )}

      {/* Right side: Audio Control */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={onToggleAudio}
          className={`px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-pill font-bold active:scale-95 ${
            isPlayingAudio
              ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)] animate-pulse'
              : isLight
              ? 'bg-white/85 text-neutral-700 hover:bg-white border border-neutral-200'
              : 'bg-black/40 text-neutral-300 hover:bg-black/60 border border-white/10'
          }`}
          title={isPlayingAudio ? `Pause ${trackName}` : `Play ${trackName}`}
        >
          {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">
            {isPlayingAudio ? (trackName === 'Pwede Ka Ba' ? 'Pwede Ka Ba 🎵' : 'Playing (15s)') : 'Music'}
          </span>
        </button>
      </div>
    </header>
  );
};
