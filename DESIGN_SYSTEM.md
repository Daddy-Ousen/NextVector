# NextVector Design System

Rules for all new UI code. The shared pieces live in `src/index.css` (utilities) and
`src/components/common/` (`PageHeader`, `SectionHeader`). Dark theme only.

## 1. Layout

| Use | Width | How |
|---|---|---|
| Site chrome (top bar, nav, footer) and `<main>` | 80rem + side padding | `container-page` (already on `<main>`; do not add `px-*` or `max-w-7xl mx-auto` inside pages) |
| Hub and list pages (home, /models, /benchmarks, /timeline, /research, /compare, categories) | full container | nothing extra |
| Wide text pages (FAQ, Contact, Archive, Author, Model detail) | `max-w-5xl` | left-aligned, **no** `mx-auto`, so the left edge matches the logo |
| Reading pages (article, briefing, 404) | `max-w-[42rem]` (article), `max-w-3xl` (briefing) | centered with `mx-auto` |

Article rule: everything in the article column (header, image, Triad, takeaways, body, newsletter box) uses the same width. Do not give the body text its own narrower `max-w`.

## 2. Color

| Role | Color |
|---|---|
| Brand, links, primary buttons, selected state, positive values | emerald (`emerald-400` text, `emerald-500` fills) |
| Text | `zinc-100` headings, `zinc-200/300` body, `zinc-400` secondary (never darker than `zinc-400` for text) |
| Surfaces | page `#08090d`, cards `zinc-900/50`–`zinc-950`, borders `zinc-800` |
| Warnings and caveats only | amber (`eyebrow-warn`, `amber-400`) |
| Errors and destructive actions only | red |
| Category pills only | from `getCategoryBadge()` (AI emerald, Technology cyan, Science purple, Research amber) |
| Second series in A-vs-B comparisons and charts | cyan (Compare page, comparison modal) |
| Top-3 rank medals | amber |

Not allowed: a new accent color per page or per card, third-party brand colors (e.g. Substack orange), gradients on text, decorative blurred color blobs.

Score badges (`getSignalColor`): 95+ emerald, everything else neutral zinc. Badges always have a solid blurred backing (`bg-zinc-950/85 backdrop-blur-md`) because they sit on photos.

Selected chip / filter pill: `bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold`.
Unselected: `bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200`.

## 3. Type

Fonts: Plus Jakarta Sans (400–800) for everything; JetBrains Mono for labels and data only. No serif. No `italic` (no italic font files are loaded, so the browser fakes it). No `font-black` (900 is not loaded) or `font-light`.

| Element | Class |
|---|---|
| Hub page H1 | `heading-page` (30px → 36px) — use `<PageHeader>` |
| Detail page H1 (article, model, author) | `text-3xl md:text-5xl font-extrabold tracking-tight leading-tight` |
| Section H2 | `heading-section` (20px → 24px) — use `<SectionHeader>` |
| Label above a heading | `eyebrow` (12px mono uppercase, emerald). Add `flex items-center gap-2` when it has an icon; let the icon inherit the color |
| Warning label | `eyebrow-warn` |
| Neutral field label in data (e.g. "Context") | `text-2xs font-mono uppercase tracking-wider text-zinc-400` |
| Long reading text | 16px phones, 18px desktop (`text-base md:text-lg`) |
| UI text | ≥ 13px (`text-xs`) |
| Meta, captions, table cells | ≥ 12px (`text-2xs`). Nothing smaller |

Mono is for: labels, numbers, scores, code, dates in lists, kbd. Not for headings, body text or buttons.

## 4. Shape

Three corner sizes only:
- `rounded-lg` (8px): buttons, inputs, chips, small badges, inner panels.
- `rounded-2xl` (16px): cards, panels, modals.
- `rounded-full`: pills, dots, avatars.

Do not use `rounded`, `rounded-md`, `rounded-xl` or `rounded-3xl`.

## 5. Boxes

- One level of box. A card may hold dividers (`divide-y`, `border-t`) but not more bordered cards.
- Page and section headers are never boxed. Use `<PageHeader>` / `<SectionHeader>` (one divider under them).
- Horizontal chip rows: `overflow-x-auto scrollbar-none fade-right pr-8`.

## 6. Touch and focus

(From Pass 5, still applies.) Buttons and form fields get 40px on touch screens from the base rule. Stand-alone links need `tap` plus `flex`/`inline-flex items-center`. Truncated links use `pointer-coarse:leading-10`. Focus ring is global; do not remove outlines.

## 7. Checklist for a new page or component

1. Header uses `PageHeader` or `SectionHeader`.
2. Only emerald + zinc, unless the color is in the table in §2 for that role.
3. Corners: `rounded-lg`, `rounded-2xl` or `rounded-full`.
4. No box inside a box.
5. No text under 12px, no text darker than `zinc-400`.
6. Check at 375px (touch) and 1440px: no side scroll, left edges line up with the logo.
