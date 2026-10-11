import React from 'react';

interface SectionHeaderProps {
  /** Small label above the title (rendered with the `eyebrow` style). */
  eyebrow?: React.ReactNode;
  /** Icon shown before the eyebrow text. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Links or controls on the right. */
  actions?: React.ReactNode;
}

/** Standard header for a section inside a page: H2, optional label and actions, one divider. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, icon, title, description, actions }) => (
  <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 mb-6 border-b border-zinc-800 pb-3">
    <div className="min-w-0">
      {eyebrow && (
        <p className="eyebrow flex items-center gap-2 mb-1">
          {icon}
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className="heading-section">{title}</h2>
      {description && <p className="text-sm text-zinc-400 mt-1">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
  </div>
);
