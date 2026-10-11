import React from 'react';

interface PageHeaderProps {
  /** Small label above the title (rendered with the `eyebrow` style). */
  eyebrow?: React.ReactNode;
  /** Icon shown before the eyebrow text. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links shown on the right on wide screens. */
  actions?: React.ReactNode;
  /** Extra content under the description (stats, chips). */
  children?: React.ReactNode;
}

/** Standard header for hub and list pages: no box, one divider, one H1 size. */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  icon,
  title,
  description,
  actions,
  children,
}) => (
  <header className="border-b border-zinc-800/80 pb-6 md:pb-8">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div className="max-w-3xl min-w-0">
        {eyebrow && (
          <p className="eyebrow flex items-center gap-2 mb-3">
            {icon}
            <span>{eyebrow}</span>
          </p>
        )}
        <h1 className="heading-page">{title}</h1>
        {description && (
          <p className="mt-3 text-base text-zinc-400 leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
    {children}
  </header>
);
