import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SUBSTACK_URL = 'https://nextvectorr.substack.com/?r=92ang8';

interface SubstackEmbedProps {
  /** Show the "Substack Archive" link next to the sign-up note. */
  showArchiveLink?: boolean;
}

/** Substack's own sign-up form (iframe) plus the "handled by Substack" note. */
export const SubstackEmbed: React.FC<SubstackEmbedProps> = ({ showArchiveLink = true }) => (
  <div>
    <div className="rounded-lg overflow-hidden">
      <iframe
        src="https://nextvectorr.substack.com/embed"
        width="100%"
        height="155"
        style={{ border: 'none', background: 'transparent', display: 'block' }}
        frameBorder="0"
        scrolling="no"
        loading="lazy"
        title="Subscribe to The Morning Vector on Substack"
      />
    </div>
    <div className="flex items-center justify-between text-2xs text-zinc-400 mt-2.5 px-1">
      <span className="flex items-center gap-1.5 text-zinc-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        Sign-up handled by Substack
      </span>
      {showArchiveLink && (
        <a
          href="https://nextvectorr.substack.com/archive"
          target="_blank"
          rel="noopener noreferrer"
          className="tap inline-flex items-center text-emerald-400 hover:text-emerald-300 underline"
        >
          Substack Archive ↗
        </a>
      )}
    </div>
  </div>
);
