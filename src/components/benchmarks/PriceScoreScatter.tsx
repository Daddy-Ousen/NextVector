import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PriceScorePoint } from '../../types';

interface PriceScoreScatterProps {
  points: PriceScorePoint[];
  onSelectModel?: (modelId: string) => void;
}

// Colors follow DESIGN_SYSTEM.md: emerald = highlighted (frontier), zinc = context.
const FRONTIER = '#34d399'; // emerald-400
const OTHER = '#71717a'; // zinc-500
const SURFACE = '#09090b'; // zinc-950 card background, used for the 2px ring around dots
const GRID = '#27272a'; // zinc-800
const AXIS_TEXT = '#a1a1aa'; // zinc-400

const HEIGHT = 340;
const M = { top: 16, right: 16, bottom: 44, left: 62 };
const HIT_RADIUS = 24;

const fmtPrice = (p: number) => `$${p.toFixed(p >= 0.1 ? 2 : 3)}`;

/**
 * Price (log scale) against Arena score for every priced model.
 * Frontier models are emerald and joined by a step line; all others are gray.
 */
export const PriceScoreScatter: React.FC<PriceScoreScatterProps> = ({ points, onSelectModel }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [hoverId, setHoverId] = useState<string | null>(null);

  // Measure before first paint, then follow resizes
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = (w: number) => setWidth(Math.max(260, Math.round(w)));
    fit(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([e]) => fit(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => {
    const prices = points.map((p) => p.price);
    const scores = points.map((p) => p.score);
    const lo = Math.floor(Math.log10(Math.min(...prices)));
    const hi = Math.ceil(Math.log10(Math.max(...prices)));
    const xTicks: number[] = [];
    for (let k = lo; k <= hi; k++) xTicks.push(Number((10 ** k).toPrecision(1)));
    const step = 50;
    const yMin = Math.floor(Math.min(...scores) / step) * step;
    const yMax = Math.ceil(Math.max(...scores) / step) * step;
    const yTicks: number[] = [];
    for (let v = yMin; v <= yMax; v += step) yTicks.push(v);
    const innerW = width - M.left - M.right;
    const innerH = HEIGHT - M.top - M.bottom;
    const x = (p: number) => M.left + ((Math.log10(p) - lo) / (hi - lo)) * innerW;
    const y = (s: number) => M.top + (1 - (s - yMin) / (yMax - yMin)) * innerH;
    return { x, y, xTicks, yTicks, innerW, innerH };
  }, [points, width]);

  const frontier = useMemo(
    () => points.filter((p) => p.frontier).sort((a, b) => a.price - b.price),
    [points]
  );

  // Step line: a frontier model's score holds until the next, pricier frontier model beats it.
  const stepPath = useMemo(() => {
    if (frontier.length === 0) return '';
    let d = `M${scale.x(frontier[0].price)},${scale.y(frontier[0].score)}`;
    for (let i = 1; i < frontier.length; i++) {
      d += ` H${scale.x(frontier[i].price)} V${scale.y(frontier[i].score)}`;
    }
    return d;
  }, [frontier, scale]);

  const hovered = points.find((p) => p.modelId === hoverId) || null;

  const handleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let best: PriceScorePoint | null = null;
    let bestD = HIT_RADIUS;
    for (const p of points) {
      const d = Math.hypot(scale.x(p.price) - mx, scale.y(p.score) - my);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    setHoverId(best ? best.modelId : null);
  };

  // Gray first, frontier on top, hovered last
  const ordered = [...points].sort(
    (a, b) => Number(a.frontier) - Number(b.frontier) || Number(a.modelId === hoverId) - Number(b.modelId === hoverId)
  );

  const tipLeft = hovered ? Math.min(Math.max(scale.x(hovered.price), 90), width - 90) : 0;
  const tipTop = hovered ? scale.y(hovered.score) : 0;
  const tipBelow = hovered ? tipTop < 90 : false;

  return (
    <figure className="space-y-3 min-w-0">
      <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-xs text-zinc-300">
          Price against Arena score for all {points.length} priced models. Up and left is better.
        </span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-2xs text-zinc-400" aria-label="Legend">
          <span className="inline-flex items-center gap-1.5">
            <svg width="22" height="10" aria-hidden="true">
              <line x1="0" y1="5" x2="22" y2="5" stroke={FRONTIER} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="11" cy="5" r="4" fill={FRONTIER} />
            </svg>
            Frontier ({frontier.length})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="10" height="10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill={OTHER} /></svg>
            Other priced models
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="10" height="10" aria-hidden="true"><circle cx="5" cy="5" r="3.5" fill={SURFACE} stroke={AXIS_TEXT} strokeWidth="1.5" /></svg>
            Pre-release
          </span>
        </span>
      </figcaption>

      <div ref={wrapRef} className="relative w-full min-w-0">
        <svg
          width="100%"
          height={HEIGHT}
          viewBox={`0 0 ${width} ${HEIGHT}`}
          role="img"
          aria-label={`Scatter chart of blended price against Arena score for ${points.length} models. ${frontier.length} models are on the frontier. The list below has the same data.`}
          onPointerMove={handleMove}
          onPointerLeave={() => setHoverId(null)}
          onClick={() => hovered && onSelectModel?.(hovered.modelId)}
          className={`block ${hovered && onSelectModel ? 'cursor-pointer' : ''}`}
        >
          {/* Grid and axes */}
          {scale.yTicks.map((v) => (
            <g key={`y${v}`}>
              <line x1={M.left} x2={width - M.right} y1={scale.y(v)} y2={scale.y(v)} stroke={GRID} strokeWidth="1" />
              <text x={M.left - 8} y={scale.y(v)} dy="0.32em" textAnchor="end" fontSize="12" fill={AXIS_TEXT} className="font-mono">
                {v}
              </text>
            </g>
          ))}
          {scale.xTicks.map((v) => (
            <g key={`x${v}`}>
              <line x1={scale.x(v)} x2={scale.x(v)} y1={M.top} y2={HEIGHT - M.bottom} stroke={GRID} strokeWidth="1" />
              <text x={scale.x(v)} y={HEIGHT - M.bottom + 18} textAnchor="middle" fontSize="12" fill={AXIS_TEXT} className="font-mono">
                ${v}
              </text>
            </g>
          ))}
          <text x={M.left + scale.innerW / 2} y={HEIGHT - 6} textAnchor="middle" fontSize="12" fill={AXIS_TEXT}>
            Blended price per 1M tokens (log scale)
          </text>
          <text
            transform={`translate(12 ${M.top + scale.innerH / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize="12"
            fill={AXIS_TEXT}
          >
            Arena score
          </text>

          {/* Frontier step line */}
          <path d={stepPath} fill="none" stroke={FRONTIER} strokeWidth="2" strokeOpacity="0.6" strokeLinejoin="round" />

          {/* Points */}
          {ordered.map((p) => {
            const color = p.frontier ? FRONTIER : OTHER;
            const isHover = p.modelId === hoverId;
            const r = (p.frontier ? 5 : 4) + (isHover ? 2 : 0);
            return (
              <circle
                key={p.modelId}
                cx={scale.x(p.price)}
                cy={scale.y(p.score)}
                r={r}
                fill={p.preRelease ? SURFACE : color}
                stroke={p.preRelease ? color : SURFACE}
                strokeWidth={2}
              />
            );
          })}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute z-10 w-44 rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-3 py-2 text-2xs shadow-xl"
            style={{ left: tipLeft, top: tipBelow ? tipTop + 14 : tipTop - 14, transform: `translate(-50%, ${tipBelow ? '0' : '-100%'})` }}
          >
            <div className="font-semibold text-zinc-100 text-xs leading-snug">{hovered.modelName}</div>
            <div className="text-zinc-400">{hovered.developer}</div>
            <div className="mt-1 flex justify-between font-mono text-zinc-200">
              <span>{fmtPrice(hovered.price)} / 1M</span>
              <span>{Math.round(hovered.score)}</span>
            </div>
            <div className="text-zinc-400">
              {hovered.frontier ? 'On the frontier' : 'Not on the frontier'}
              {hovered.preRelease ? ' · pre-release' : ''}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
};
