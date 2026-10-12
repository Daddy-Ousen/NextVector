# NextVector — rules for AI agents

NextVector (https://nextvector.rhasan.online) is a React 19 + Vite news site about AI, technology and science.
`main` deploys to Vercel on every push. The owner and only author is Robiul Hasan.

## Daily update
When the user says "Run the daily update pipeline", "Execute today's intelligence update", "daily update" or `/daily-update`:
read `.agents/skills/daily-update/SKILL.md` and follow every step in order. Do not skip steps.
`DAILY_UPDATE_PIPELINE.md` and `EDITORIAL_RULEBOOK.md` are the full reference. If they disagree with the skill, the skill wins.

## Hard rules (always)
1. **No facts from memory.** Every name, number, date and quote in an article must come from a page you opened in this session. If you cannot open the source, drop the story. Never guess a benchmark score, price, parameter count, date or quote.
2. **Never hand-edit generated files:** `src/data/modelsData.ts`, `src/data/benchmarksData.ts`, `src/data/showdownsData.ts`, `scripts/model_sources/build/site_data.json`, `public/sitemap.xml`, `public/rss.xml`, `public/llms.txt`, `public/llms-full.txt`. Scripts write them.
3. **Add articles, briefing and ticker only with `python scripts/add_articles.py`.** Do not paste article objects into `src/data/articlesData.ts` by hand (the file is 1.4 MB; hand edits break it).
4. **Never change a check to make it pass.** Do not edit `scripts/verify_daily_pipeline.py` or `scripts/add_articles.py` to silence an error. Fix the content.
5. **Never push to `main` unless `npm run build` and `npm run verify` both pass.**
6. Never commit `.env.local` (it holds the Artificial Analysis API key).
7. Every cover image is unique, on-topic and stored in `public/images/articles/`. No generic "matrix code", padlock, handshake or blue circuit images. No text drawn on images.

## State files (read first, update last)
- Start of every session: read `handoff.md` (top section) and `progress.md`.
- End of every session: add a dated line to `progress.md` → "Completed", and add a new section at the TOP of `handoff.md` with: what you did, what passed, what is open, gotchas.

## Environment
- Windows. Use `python` (3.14) and `npm`. Pillow is installed.
- Some sites block plain fetch (bbc.co.uk, openai.com return 403). Open them in the browser tool instead.
- Commands: `npm run harvest`, `python scripts/add_articles.py <file> --check`, `npm run images`, `npm run build`, `npm run verify`, `npm run lint`.

## Design and code changes
Read `DESIGN_SYSTEM.md` before changing any UI component. Model data comes only from `scripts/model_sources/curated_models.json` + `python scripts/fetch_model_sources.py` + `python scripts/build_model_data.py`.
