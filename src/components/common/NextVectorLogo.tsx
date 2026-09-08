import React from 'react';

export interface NextVectorLogoProps {
  /** Size of the logo icon in pixels (default: 36) */
  size?: number;
  /** Whether to show the container squircle background (default: true) */
  withContainer?: boolean;
  /** Whether to render the brand wordmark next to the icon (default: false) */
  showWordmark?: boolean;
  /** Subtitle/tagline to display under the wordmark */
  tagline?: string;
  /** Version badge text (e.g. "v2.6", or null to hide) */
  version?: string | null;
  /** Custom additional CSS classes */
  className?: string;
}

export const NextVectorLogo: React.FC<NextVectorLogoProps> = ({
  size = 36,
  withContainer = true,
  showWordmark = false,
  tagline = 'Technology & AI Intelligence',
  version = 'v2.6',
  className = '',
}) => {
  const iconContent = (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transform transition-transform group-hover:scale-105 duration-200"
    >
      <defs>
        {/* Signal Emerald Gradient for 'N' */}
        <linearGradient id="nvEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Core Cyan Gradient for Vector Chevron '>' */}
        <linearGradient id="nvCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>

        {/* Dynamic Vector Glow */}
        <filter id="nvGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#10B981" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Group with Glow */}
      <g filter="url(#nvGlowEffect)">
        {/* Left Vertical Stem of 'N' */}
        <rect
          x="14"
          y="18"
          width="15"
          height="64"
          rx="3.5"
          fill="url(#nvEmeraldGrad)"
        />

        {/* Diagonal Stroke of 'N' */}
        <path
          d="M 27 18.5 C 28.5 17.5 30.8 17.8 32 19.5 L 53 58 L 53 79.5 C 53 81.5 51 83 49 82.5 L 43.5 81 C 42 80.5 40.8 79 40 77.5 L 22 30 C 21 28 21.8 25 24 23.5 Z"
          fill="url(#nvEmeraldGrad)"
          opacity="0.95"
        />

        {/* Forward Vector Chevron '>' (The Vector Direction) */}
        <path
          d="M 51 18.5 C 52.8 17.2 55.2 17.2 57 18.5 L 87.5 46.5 C 89.5 48.2 89.5 51.8 87.5 53.5 L 57 81.5 C 55.2 82.8 52.8 82.8 51 81.5 L 47 77.5 C 45.2 75.8 45.2 73 47 71.2 L 69.5 50 L 47 28.8 C 45.2 27 45.2 24.2 47 22.5 Z"
          fill="url(#nvCyanGrad)"
        />

        {/* Aperture Signal Coordinate Node */}
        <circle cx="70.5" cy="50" r="4.2" fill="#09090B" stroke="#38BDF8" strokeWidth="2.2" />
        <circle cx="70.5" cy="50" r="1.6" fill="#34D399" />
      </g>
    </svg>
  );

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {withContainer ? (
        <div
          className="rounded-xl bg-zinc-950/90 border border-zinc-800/80 p-1 flex items-center justify-center shadow-lg shadow-emerald-950/20 group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10 transition-all"
          style={{ width: size + 8, height: size + 8 }}
        >
          {iconContent}
        </div>
      ) : (
        iconContent
      )}

      {showWordmark && (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-xl tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
              NextVector
            </span>
            {version && (
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700/80 text-zinc-400 tracking-wide">
                {version}
              </span>
            )}
          </div>
          {tagline && (
            <p className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase -mt-0.5 font-medium">
              {tagline}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
