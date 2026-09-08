import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, X } from 'lucide-react';

interface AudioBriefingPlayerProps {
  duration?: string;
  articleTitle: string;
  keyTakeaways?: string[];
  onClose?: () => void;
}

export const AudioBriefingPlayer: React.FC<AudioBriefingPlayerProps> = ({
  duration = '3m 30s',
  articleTitle,
  keyTakeaways,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (1 * playbackSpeed);
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Audio Signal Briefing
          </span>
          <span className="text-[11px] font-mono text-zinc-400">({duration})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleSpeed}
            className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-mono text-zinc-300 transition-colors"
            title="Change playback speed"
          >
            {playbackSpeed}x
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Close player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-zinc-300 font-medium truncate mb-3">
        {articleTitle}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-3 cursor-pointer">
        <div
          className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlay}
            className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 hover:text-zinc-200 transition-colors"
            title="Restart briefing"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 hover:text-zinc-200 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-[11px] font-mono text-zinc-400">
          {isPlaying ? (
            <span className="text-emerald-400 font-medium">Playing AI narration...</span>
          ) : (
            <span>Listen in 2 minutes</span>
          )}
        </div>
      </div>
    </div>
  );
};
