import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  SkipForward,
  SkipBack,
  Headphones,
} from 'lucide-react';

export interface AudioBriefingPlayerProps {
  duration?: string;
  articleTitle: string;
  subtitle?: string;
  threeQuestions?: {
    whatHappened: string;
    whyItMatters: string;
    whatsNext: string;
  };
  keyTakeaways?: string[];
  onClose?: () => void;
}

interface BriefingSegment {
  label: string;
  text: string;
}

export const AudioBriefingPlayer: React.FC<AudioBriefingPlayerProps> = ({
  duration = '3m 30s',
  articleTitle,
  subtitle,
  threeQuestions,
  keyTakeaways,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [charProgress, setCharProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isCancelledRef = useRef(false);

  // Build the structured executive briefing segments
  const segments: BriefingSegment[] = useMemo(() => {
    const list: BriefingSegment[] = [
      {
        label: 'Executive Overview',
        text: `NextVector Executive Signal Briefing. Headline: ${articleTitle}. ${subtitle ? subtitle : ''}`.trim(),
      },
    ];

    if (threeQuestions?.whatHappened) {
      list.push({
        label: 'What Happened',
        text: `What happened: ${threeQuestions.whatHappened}`,
      });
    }

    if (threeQuestions?.whyItMatters) {
      list.push({
        label: 'Strategic Significance',
        text: `Why it matters: ${threeQuestions.whyItMatters}`,
      });
    }

    if (threeQuestions?.whatsNext) {
      list.push({
        label: "What's Next",
        text: `What could happen next: ${threeQuestions.whatsNext}`,
      });
    }

    if (keyTakeaways && keyTakeaways.length > 0) {
      const takeawaysSummary = keyTakeaways.slice(0, 3).join('. ');
      list.push({
        label: 'Key Takeaways',
        text: `Key executive takeaways: ${takeawaysSummary}.`,
      });
    }

    list.push({
      label: 'Signoff',
      text: 'This concludes the NextVector intelligence briefing for this report. For complete technical specs and citations, explore the full article.',
    });

    return list;
  }, [articleTitle, subtitle, threeQuestions, keyTakeaways]);

  // Load and configure speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      if (avail && avail.length > 0) {
        setVoices(avail);
        // Prioritize natural/neural or clear English voices
        const preferred =
          avail.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online'))) ||
          avail.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('David') || v.name.includes('Mark') || v.name.includes('Zira'))) ||
          avail.find(v => v.lang.startsWith('en')) ||
          avail[0];
        setSelectedVoice(preferred || null);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      isCancelledRef.current = true;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speak a specific segment
  const speakSegment = (index: number, speed: number = playbackSpeed, muted: boolean = isMuted) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(true);
      return;
    }

    if (index >= segments.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSegmentIndex(0);
      setCharProgress(0);
      return;
    }

    window.speechSynthesis.cancel();

    const segment = segments[index];
    const utterance = new SpeechSynthesisUtterance(segment.text);
    currentUtteranceRef.current = utterance;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = speed;
    utterance.volume = muted ? 0 : 1;
    utterance.pitch = 1.0;

    utterance.onboundary = (event) => {
      if (event.charIndex && segment.text.length > 0) {
        setCharProgress(Math.min(1, event.charIndex / segment.text.length));
      }
    };

    utterance.onend = () => {
      if (isCancelledRef.current) return;
      if (index + 1 < segments.length) {
        setCurrentSegmentIndex(index + 1);
        setCharProgress(0);
        speakSegment(index + 1, speed, muted);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentSegmentIndex(0);
        setCharProgress(0);
      }
    };

    utterance.onerror = (err) => {
      if (err.error !== 'canceled' && err.error !== 'interrupted') {
        console.warn('SpeechSynthesis error:', err);
      }
    };

    isCancelledRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        // Fallback: if not speaking after 150ms (Chromium pause bug), re-trigger
        setTimeout(() => {
          if (!window.speechSynthesis.speaking && isPlaying) {
            speakSegment(currentSegmentIndex, playbackSpeed, isMuted);
          }
        }, 150);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      isCancelledRef.current = false;
      speakSegment(currentSegmentIndex, playbackSpeed, isMuted);
    }
  };

  const handleReset = () => {
    isCancelledRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSegmentIndex(0);
    setCharProgress(0);
  };

  const handleNext = () => {
    if (currentSegmentIndex + 1 < segments.length) {
      const nextIdx = currentSegmentIndex + 1;
      setCurrentSegmentIndex(nextIdx);
      setCharProgress(0);
      if (isPlaying) {
        speakSegment(nextIdx, playbackSpeed, isMuted);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSegmentIndex > 0) {
      const prevIdx = currentSegmentIndex - 1;
      setCurrentSegmentIndex(prevIdx);
      setCharProgress(0);
      if (isPlaying) {
        speakSegment(prevIdx, playbackSpeed, isMuted);
      }
    } else {
      handleReset();
    }
  };

  const cycleSpeed = () => {
    let nextSpeed = 1;
    if (playbackSpeed === 1) nextSpeed = 1.25;
    else if (playbackSpeed === 1.25) nextSpeed = 1.5;
    else if (playbackSpeed === 1.5) nextSpeed = 2;
    else nextSpeed = 1;

    setPlaybackSpeed(nextSpeed);
    if (isPlaying && !isPaused) {
      speakSegment(currentSegmentIndex, nextSpeed, isMuted);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.volume = nextMuted ? 0 : 1;
    }
    if (isPlaying && !isPaused) {
      speakSegment(currentSegmentIndex, playbackSpeed, nextMuted);
    }
  };

  const handleClose = () => {
    handleReset();
    onClose?.();
  };

  // Jump to specific segment
  const jumpToSegment = (idx: number) => {
    setCurrentSegmentIndex(idx);
    setCharProgress(0);
    if (isPlaying) {
      speakSegment(idx, playbackSpeed, isMuted);
    }
  };

  // Calculate overall progress percentage
  const totalSegments = segments.length;
  const overallProgress = totalSegments > 0
    ? Math.min(100, Math.round(((currentSegmentIndex + charProgress) / totalSegments) * 100))
    : 0;

  const currentSegment = segments[currentSegmentIndex] || segments[0];

  return (
    <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-4 shadow-2xl backdrop-blur-md transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5" />
            AI Signal Briefing
          </span>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
            {duration}
          </span>
          {selectedVoice && (
            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 truncate max-w-[140px]" title={selectedVoice.name}>
              {selectedVoice.name.replace(/Microsoft |Google /g, '')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-200 transition-colors border border-zinc-700/50"
            title="Cycle narration speed"
          >
            {playbackSpeed}x
          </button>
          {onClose && (
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Close briefing player"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live Transcript Segment Box */}
      <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {currentSegment.label}
          </span>
          <span className="text-zinc-500">
            Segment {currentSegmentIndex + 1} of {segments.length}
          </span>
        </div>
        <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-2 italic">
          "{currentSegment.text}"
        </p>
      </div>

      {/* Segment Pills / Stepper */}
      <div className="flex items-center gap-1 mb-3">
        {segments.map((seg, idx) => (
          <button
            key={idx}
            onClick={() => jumpToSegment(idx)}
            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSegmentIndex
                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                : idx < currentSegmentIndex
                ? 'bg-emerald-700'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
            title={`Jump to ${seg.label}`}
          />
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentSegmentIndex === 0}
            className="p-1.5 hover:text-zinc-200 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            title="Previous segment"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-500/20"
            aria-label={isPlaying && !isPaused ? 'Pause' : 'Play'}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentSegmentIndex >= segments.length - 1}
            className="p-1.5 hover:text-zinc-200 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            title="Next segment"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 hover:text-zinc-200 transition-colors ml-1"
            title="Restart briefing"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleMute}
            className="p-1.5 hover:text-zinc-200 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Live Status & Audio Equalizer Animation */}
        <div className="flex items-center gap-3">
          {isPlaying && !isPaused ? (
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-0.5 h-3.5" title="Narrating">
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-3.5" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.1s] h-3" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                Speaking ({overallProgress}%)
              </span>
            </div>
          ) : isPaused ? (
            <span className="text-[11px] font-mono text-amber-400">Briefing Paused</span>
          ) : (
            <span className="text-[11px] font-mono text-zinc-400">
              Click play to listen
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
