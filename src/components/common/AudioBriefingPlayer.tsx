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
  Radio,
  Sliders,
  ChevronDown,
  Check,
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

interface VoiceProfile {
  id: string;
  name: string;
  label: string;
  role: string;
  description: string;
  preferredPitch: number;
  rateMultiplier: number;
  voiceMatcher: (v: SpeechSynthesisVoice) => boolean;
}

const VOICE_PROFILES: VoiceProfile[] = [
  {
    id: 'zira-anchor',
    name: 'Zira',
    label: 'Zira — Studio Anchor',
    role: 'Female • Broadcast Pitch',
    description: 'Articulate news anchor tone with natural prosody and crisp clarity.',
    preferredPitch: 1.04,
    rateMultiplier: 0.96,
    voiceMatcher: (v) => v.name.includes('Zira'),
  },
  {
    id: 'david-broadcast',
    name: 'David',
    label: 'David — Deep Radio Host',
    role: 'Male • Calibrated Baritone',
    description: 'Calibrated lower pitch that eliminates harsh metallic TTS buzzing.',
    preferredPitch: 0.91,
    rateMultiplier: 0.93,
    voiceMatcher: (v) => v.name.includes('David'),
  },
  {
    id: 'mark-analyst',
    name: 'Mark',
    label: 'Mark — Tech Analyst',
    role: 'Male • Neutral Pace',
    description: 'Direct, analytical presentation optimized for rapid data digests.',
    preferredPitch: 0.98,
    rateMultiplier: 0.98,
    voiceMatcher: (v) => v.name.includes('Mark'),
  },
];

/**
 * Transforms dense technical article text into natural, conversational
 * broadcast script prose (similar to an executive radio/podcast report).
 * Eliminates harsh colons, database labels, technical abbreviations,
 * and awkward punctuation that trigger robotic offline TTS cadence.
 */
function naturalizeForBroadcast(text: string): string {
  if (!text) return '';
  return text
    // Replace percentages with spoken words
    .replace(/(\d+(?:\.\d+)?)\s*%/g, '$1 percent')
    // Replace currencies
    .replace(/\$(\d+(?:\.\d+)?)\s*(?:million|M)\b/gi, '$1 million dollars')
    .replace(/\$(\d+(?:\.\d+)?)\s*(?:billion|B)\b/gi, '$1 billion dollars')
    .replace(/\$(\d+(?:\.\d+)?)/g, '$1 dollars')
    // Smooth out AI/tech acronyms for speech synthesizers
    .replace(/\bPass@1\b/gi, 'pass at one')
    .replace(/\bPass@(\d+)\b/gi, 'pass at $1')
    .replace(/\bGUI\b/g, 'graphical interface')
    .replace(/\bAPI\b/g, 'A-P-I')
    .replace(/\bAPIs\b/g, 'A-P-Is')
    .replace(/\bLLMs?\b/gi, 'foundation models')
    .replace(/\bVDI\b/g, 'virtual desktop infrastructure')
    .replace(/\bSOTA\b/gi, 'state of the art')
    .replace(/\bOSWorld\b/gi, 'O-S World')
    .replace(/\bWebArena\b/gi, 'Web Arena')
    .replace(/\bSWE-bench\b/gi, 'S-W-E bench')
    .replace(/\bCyber-Eval\b/gi, 'Cyber Eval')
    .replace(/\bCTF\b/gi, 'C-T-F')
    .replace(/\be\.g\.,?\s*/gi, 'for example, ')
    .replace(/\bi\.e\.,?\s*/gi, 'that is, ')
    .replace(/\betc\./gi, 'and so on')
    .replace(/\bvs\.?\b/gi, 'versus')
    // Replace abrupt punctuation with conversational breath pauses
    .replace(/—/g, ', ')
    .replace(/--/g, ', ')
    .replace(/\s*:\s*/g, '. ')
    .replace(/;\s*/g, ', ')
    .replace(/[*_#`~\[\]\(\)]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Web Audio API Acoustic Studio Warmth Generator
 * Generates an ultra-subtle 60-220Hz warm broadcast room presence.
 * Masks digital quantization artifacts and makes synthetic voices
 * sound like they are sitting in an acoustic sound booth.
 */
class StudioAmbienceEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isRunning = false;

  start() {
    if (this.isRunning) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.045;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = 220; // Warm low-end studio floor

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.03; // Very subtle acoustic floor

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noiseNode.start();
      this.isRunning = true;
    } catch (e) {
      console.warn('StudioAmbience could not start:', e);
    }
  }

  stop() {
    if (!this.isRunning) return;
    try {
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.close();
        this.ctx = null;
      }
    } catch (e) {
      // ignore
    }
    this.isRunning = false;
  }
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
  const [studioWarmthEnabled, setStudioWarmthEnabled] = useState(true);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  // Available voices & selected persona
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('zira-anchor');

  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isCancelledRef = useRef(false);
  const pauseTimerRef = useRef<any>(null);
  const ambienceEngineRef = useRef<StudioAmbienceEngine>(new StudioAmbienceEngine());

  // Adapt article data into conversational NPR/Bloomberg style broadcast prose
  const segments: BriefingSegment[] = useMemo(() => {
    const cleanTitle = naturalizeForBroadcast(articleTitle);
    const cleanSubtitle = subtitle ? naturalizeForBroadcast(subtitle) : '';

    const list: BriefingSegment[] = [
      {
        label: 'The Lead Story',
        text: `Welcome to the NextVector signal briefing. In our lead report: ${cleanTitle}. ${cleanSubtitle}`.trim(),
      },
    ];

    if (threeQuestions?.whatHappened) {
      const cleanHappened = naturalizeForBroadcast(threeQuestions.whatHappened);
      list.push({
        label: 'The Breakthrough',
        text: `Here are the details of the development: ${cleanHappened}`,
      });
    }

    if (threeQuestions?.whyItMatters) {
      const cleanMatters = naturalizeForBroadcast(threeQuestions.whyItMatters);
      list.push({
        label: 'Strategic Significance',
        text: `Why this matters for the industry: ${cleanMatters}`,
      });
    }

    if (threeQuestions?.whatsNext) {
      const cleanNext = naturalizeForBroadcast(threeQuestions.whatsNext);
      list.push({
        label: 'Future Outlook',
        text: `Looking at what happens next: ${cleanNext}`,
      });
    }

    if (keyTakeaways && keyTakeaways.length > 0) {
      const cleanTakeaways = keyTakeaways.slice(0, 3).map(t => naturalizeForBroadcast(t));
      const ordinals = ['First', 'Second', 'And third'];
      const formatted = cleanTakeaways
        .map((t, idx) => `${ordinals[idx] || 'Next'}: ${t}`)
        .join('. ');

      list.push({
        label: 'Core Takeaways',
        text: `Here are the essential executive takeaways. ${formatted}.`,
      });
    }

    list.push({
      label: 'Signoff',
      text: "That concludes today's NextVector intelligence briefing. For full technical specifications and benchmark evaluations, explore the complete analysis below.",
    });

    return list;
  }, [articleTitle, subtitle, threeQuestions, keyTakeaways]);

  // Load voices and pick default persona
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      if (avail && avail.length > 0) {
        setVoices(avail);
        // Default to Zira if available, otherwise first English voice
        const hasZira = avail.some(v => v.name.includes('Zira'));
        if (hasZira) {
          setSelectedProfileId('zira-anchor');
        } else {
          const hasDavid = avail.some(v => v.name.includes('David'));
          if (hasDavid) setSelectedProfileId('david-broadcast');
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      isCancelledRef.current = true;
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      ambienceEngineRef.current.stop();
    };
  }, []);

  // Determine active voice profile and matching voice object
  const activeProfile = useMemo(() => {
    return VOICE_PROFILES.find(p => p.id === selectedProfileId) || VOICE_PROFILES[0];
  }, [selectedProfileId]);

  const activeVoice = useMemo(() => {
    if (!voices.length) return null;
    return voices.find(v => activeProfile.voiceMatcher(v)) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];
  }, [voices, activeProfile]);

  // Speak a specific segment with calibrated pitch, speed, and breathing pauses
  const speakSegment = (
    index: number,
    speed: number = playbackSpeed,
    muted: boolean = isMuted,
    profile: VoiceProfile = activeProfile
  ) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(true);
      return;
    }

    if (index >= segments.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSegmentIndex(0);
      setCharProgress(0);
      ambienceEngineRef.current.stop();
      return;
    }

    window.speechSynthesis.cancel();
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    const segment = segments[index];
    const utterance = new SpeechSynthesisUtterance(segment.text);
    currentUtteranceRef.current = utterance;

    if (activeVoice) {
      utterance.voice = activeVoice;
    }

    // Apply hand-calibrated prosody pitch & speed
    utterance.pitch = profile.preferredPitch;
    utterance.rate = Math.max(0.7, Math.min(2.0, speed * profile.rateMultiplier));
    utterance.volume = muted ? 0 : 1;

    // Track speaking progress within the segment
    utterance.onboundary = (event) => {
      if (event.charIndex && segment.text.length > 0) {
        setCharProgress(Math.min(1, event.charIndex / segment.text.length));
      }
    };

    // Human-like breathing micro-pause (350ms) between segments
    utterance.onend = () => {
      if (isCancelledRef.current) return;
      if (index + 1 < segments.length) {
        setCurrentSegmentIndex(index + 1);
        setCharProgress(0);
        pauseTimerRef.current = setTimeout(() => {
          if (!isCancelledRef.current) {
            speakSegment(index + 1, speed, muted, profile);
          }
        }, 350);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentSegmentIndex(0);
        setCharProgress(0);
        ambienceEngineRef.current.stop();
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

    if (studioWarmthEnabled && !muted) {
      ambienceEngineRef.current.start();
    }

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
        if (studioWarmthEnabled && !isMuted) ambienceEngineRef.current.start();
        setTimeout(() => {
          if (!window.speechSynthesis.speaking && isPlaying) {
            speakSegment(currentSegmentIndex, playbackSpeed, isMuted, activeProfile);
          }
        }, 150);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
        ambienceEngineRef.current.stop();
      }
    } else {
      isCancelledRef.current = false;
      speakSegment(currentSegmentIndex, playbackSpeed, isMuted, activeProfile);
    }
  };

  const handleReset = () => {
    isCancelledRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    ambienceEngineRef.current.stop();
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
        speakSegment(nextIdx, playbackSpeed, isMuted, activeProfile);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSegmentIndex > 0) {
      const prevIdx = currentSegmentIndex - 1;
      setCurrentSegmentIndex(prevIdx);
      setCharProgress(0);
      if (isPlaying) {
        speakSegment(prevIdx, playbackSpeed, isMuted, activeProfile);
      }
    } else {
      handleReset();
    }
  };

  const cycleSpeed = () => {
    let nextSpeed = 1;
    if (playbackSpeed === 1) nextSpeed = 1.25;
    else if (playbackSpeed === 1.25) nextSpeed = 1.5;
    else if (playbackSpeed === 1.5) nextSpeed = 0.9;
    else nextSpeed = 1;

    setPlaybackSpeed(nextSpeed);
    if (isPlaying && !isPaused) {
      speakSegment(currentSegmentIndex, nextSpeed, isMuted, activeProfile);
    }
  };

  const handleSelectProfile = (profile: VoiceProfile) => {
    setSelectedProfileId(profile.id);
    setShowVoiceMenu(false);
    if (isPlaying && !isPaused) {
      speakSegment(currentSegmentIndex, playbackSpeed, isMuted, profile);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.volume = nextMuted ? 0 : 1;
    }
    if (nextMuted) {
      ambienceEngineRef.current.stop();
    } else if (isPlaying && !isPaused && studioWarmthEnabled) {
      ambienceEngineRef.current.start();
    }
  };

  const handleToggleStudioWarmth = () => {
    const nextVal = !studioWarmthEnabled;
    setStudioWarmthEnabled(nextVal);
    if (nextVal && isPlaying && !isPaused && !isMuted) {
      ambienceEngineRef.current.start();
    } else {
      ambienceEngineRef.current.stop();
    }
  };

  const handleClose = () => {
    handleReset();
    onClose?.();
  };

  const jumpToSegment = (idx: number) => {
    setCurrentSegmentIndex(idx);
    setCharProgress(0);
    if (isPlaying) {
      speakSegment(idx, playbackSpeed, isMuted, activeProfile);
    }
  };

  const totalSegments = segments.length;
  const overallProgress = totalSegments > 0
    ? Math.min(100, Math.round(((currentSegmentIndex + charProgress) / totalSegments) * 100))
    : 0;

  const currentSegment = segments[currentSegmentIndex] || segments[0];

  return (
    <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-4 shadow-2xl backdrop-blur-md transition-all relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" />
            Executive Signal Briefing
          </span>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/40">
            {duration}
          </span>
        </div>

        {/* Voice Selector & Controls */}
        <div className="flex items-center gap-2 relative">
          {/* Voice Persona Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowVoiceMenu(!showVoiceMenu)}
              className="px-2.5 py-1 rounded bg-zinc-800/90 hover:bg-zinc-700 text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5 border border-zinc-700/60 transition-colors"
              title="Select calibrated broadcast voice"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeProfile.name}</span>
              <span className="text-[10px] text-zinc-500 hidden sm:inline">({activeProfile.preferredPitch > 1 ? 'Anchor' : 'Radio'})</span>
              <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
            </button>

            {/* Dropdown Menu */}
            {showVoiceMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-zinc-900 border border-zinc-700/80 rounded-xl shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold border-b border-zinc-800 mb-1">
                  Calibrated Broadcast Voices
                </div>
                {VOICE_PROFILES.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => handleSelectProfile(prof)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-start justify-between gap-2 ${
                      prof.id === selectedProfileId
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        {prof.label}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 font-sans leading-tight">
                        {prof.description}
                      </div>
                    </div>
                    {prof.id === selectedProfileId && (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}

                <div className="mt-1 pt-1.5 border-t border-zinc-800/80 px-2.5 py-1 text-[10px] text-zinc-500 italic">
                  Tuned pitch & prosody eliminates robotic timbre.
                </div>
              </div>
            )}
          </div>

          {/* Studio Warmth Toggle */}
          <button
            onClick={handleToggleStudioWarmth}
            className={`px-2 py-1 rounded text-xs font-mono font-medium flex items-center gap-1 transition-colors border ${
              studioWarmthEnabled
                ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-400'
                : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700/40 text-zinc-400'
            }`}
            title={studioWarmthEnabled ? 'Studio warmth active (masks digital voice artifacts)' : 'Enable studio acoustic warmth'}
          >
            <Sliders className="w-3 h-3" />
            <span className="hidden md:inline">Warmth</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-200 transition-colors border border-zinc-700/50"
            title="Cycle broadcast speed"
          >
            {playbackSpeed}x
          </button>

          {/* Close Button */}
          {onClose && (
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Close briefing"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Broadcast Transcript Card (Live Naturalized Prose) */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3.5 mb-3 shadow-inner">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
          <span className="text-emerald-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {currentSegment.label}
          </span>
          <span className="text-zinc-500 font-medium">
            Section {currentSegmentIndex + 1} of {segments.length}
          </span>
        </div>
        <p className="text-xs md:text-sm text-zinc-200 font-sans leading-relaxed line-clamp-3 italic">
          "{currentSegment.text}"
        </p>
      </div>

      {/* Segment Stepper Pills */}
      <div className="flex items-center gap-1.5 mb-3">
        {segments.map((seg, idx) => (
          <button
            key={idx}
            onClick={() => jumpToSegment(idx)}
            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSegmentIndex
                ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]'
                : idx < currentSegmentIndex
                ? 'bg-emerald-700'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
            title={`Jump to: ${seg.label}`}
          />
        ))}
      </div>

      {/* Primary Playback Bar */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentSegmentIndex === 0}
            className="p-1.5 hover:text-zinc-200 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            title="Previous section"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-500/25 font-bold"
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
            title="Next section"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 hover:text-zinc-200 transition-colors ml-1"
            title="Restart from beginning"
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

        {/* Live Status & Equalizer Waves */}
        <div className="flex items-center gap-3">
          {isPlaying && !isPaused ? (
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-0.5 h-3.5" title="Narrating broadcast">
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-3.5" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.1s] h-3" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                Narrating ({overallProgress}%)
              </span>
            </div>
          ) : isPaused ? (
            <span className="text-[11px] font-mono text-amber-400">Briefing Paused</span>
          ) : (
            <span className="text-[11px] font-mono text-zinc-400">
              Press play to listen
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
