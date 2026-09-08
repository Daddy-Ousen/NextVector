import React, { useState } from 'react';
import { getSignalColor } from '../../utils';
import { ShieldCheck, Info } from 'lucide-react';

interface SignalRatingBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const SignalRatingBadge: React.FC<SignalRatingBadgeProps> = ({
  score,
  size = 'md',
  showDetails = false
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const colorStyle = getSignalColor(score);

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-semibold'
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 rounded-full border font-mono transition-all cursor-help ${colorStyle.badgeBg} ${colorStyle.badgeText} ${colorStyle.badgeBorder} ${sizeClasses[size]}`}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80" />
        <span className="font-bold">{score}</span>
        <span className="text-[10px] opacity-70">/100</span>
        {showDetails && (
          <span className="hidden sm:inline-block pl-1 border-l border-current/20 text-[11px] font-sans font-medium">
            {colorStyle.label}
          </span>
        )}
      </div>

      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 w-72 p-3.5 bg-zinc-900/95 border border-zinc-700/80 rounded-xl shadow-2xl backdrop-blur-md z-50 text-left pointer-events-none transition-all">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NextVector Signal Score</span>
            </div>
            <span className={`text-xs font-mono font-bold ${colorStyle.badgeText}`}>
              {score}/100
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-normal mb-2">
            {score >= 95
              ? 'Top-tier breakthrough with validated physical or empirical evidence.'
              : score >= 90
              ? 'High technical significance with architectural implications.'
              : 'Substantive verified industry or research development.'}
          </p>
          <div className="space-y-1 text-[10px] font-mono text-zinc-400">
            <div className="flex justify-between">
              <span>Marketing Noise Filtered:</span>
              <span className="text-emerald-400 font-semibold">&gt;92%</span>
            </div>
            <div className="flex justify-between">
              <span>Primary Source Verification:</span>
              <span className="text-zinc-200 font-semibold">Confirmed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
