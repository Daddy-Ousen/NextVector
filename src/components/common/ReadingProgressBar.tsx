import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  /** Element whose scroll-through is measured (the article). */
  targetRef: React.RefObject<HTMLElement | null>;
}

/** Thin bar fixed to the top of the window that fills as the reader scrolls through the article. */
export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ targetRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total <= 0 ? 1 : Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(value);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 inset-x-0 h-1 z-[60] pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-emerald-400 origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
