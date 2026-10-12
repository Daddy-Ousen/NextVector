---
name: daily-update
description: Runs the NextVector daily intelligence update — harvest live news, check for new AI models, write 5+ sourced articles, update the daily briefing and ticker, build, verify, commit, push, and draft The Morning Vector newsletter. Use when the user says "Run the daily update pipeline", "Execute today's intelligence update", "daily update", or /daily-update.
---

# NextVector daily update

Do the steps in order. Do not skip a step. Do not stop early unless a step says STOP.
Run all commands from the project root `D:\AntigravityProjects\News`.

## Golden rule
Write only what you read today on a primary source page. If you did not read it, do not write it.
A short, true article is correct. A long article with one invented number is a failure.

---

## Step 1 — Context and date
1. Read the top section of `handoff.md` and the "Completed" list in `progress.md`.
2. Run:
   ```
   python -c "from datetime import datetime, timezone; print(datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC %A'))"
   ```
3. Write down TODAY (UTC date). The news window is the last 48 hours. The model window is the last 72 hours.
4. Run `git status`. If there are uncommitted changes you did not make, STOP and ask the user.

## Step 2 — Harvest leads
1. Run `npm run harvest`. It prints every lead and saves `pipeline_runs/harvest-TODAY.json`.
2. Read the whole output: Hacker News, BBC, arXiv, MODEL WATCH (OpenRouter, Hugging Face).
3. Also check the lab news pages yourself: anthropic.com/news, openai.com/news, blog.google/technology/ai, deepmind.google/discover/blog, ai.meta.com/blog, mistral.ai/news, x.ai/news, nvidia newsroom. Keep only items dated inside the 48-hour window.
4. A harvest item is a lead, not a fact. Hacker News titles and tweets are never a source on their own.

## Step 3 — Pick the stories
1. Pick at least 5 stories. 5 is the minimum, not the limit. Do not take all of them from one outlet.
2. Prefer: new AI models and papers, chips and infrastructure, security, science and space. Skip pure opinion posts, personnel gossip and minor product tweaks.
3. Duplicate check: for each story, search `src/data/articlesData.ts` for its key name (company + product). If it is already covered and there is no real new development, drop it.
4. Write a short list: story, primary source URL, publish date of the source.

## Step 4 — Read the primary sources
For each story:
1. Open the primary source: the lab or company announcement, the arXiv abstract page, the court or government document, or the original news report. Use the browser tool if plain fetch is blocked.
2. Confirm the source date is inside the 48-hour window. If not, drop the story.
3. Copy the facts you will use into your notes: numbers, names, dates, short quotes, each with its URL.
4. If a detail is only "reported" by others, say "reported by <outlet>" or leave it out.
5. If you cannot open any primary source for a story, drop the story and pick another.

## Step 5 — New model check (zero-miss)
1. Look at MODEL WATCH in the harvest output. "NEW - not in curated_models.json" means the site does not track that model yet.
2. For each real new language model release (not an image model, not a fine-tune of a fine-tune, not a robotics checkpoint):
   - Write a dedicated article about it (counts toward the 5).
   - Add it to `scripts/model_sources/curated_models.json` → `models`, following the `_readme` in that file. Use only keys you can see in the snapshot or on the source page (`or` = the OpenRouter id shown in the harvest). Never type scores or prices by hand.
   - Run `python scripts/fetch_model_sources.py` then `python scripts/build_model_data.py`. If the build says a key is not found, fix the key or remove the model. Do not guess.
3. If you are not sure a model entry is correct, do not add it. Write it in `handoff.md` as an open item.
4. If there is no new model, write "Model watch: no new models in 72h" in your notes.

## Step 6 — Cover images
For each article pick one photo that shows the real subject (the hardware, the place, the lab, the instrument).
- Space and science: NASA, ESA, ESO, NOAA public images. Tech: Unsplash photo that matches the topic.
- Put the direct image URL (for Unsplash: `https://images.unsplash.com/photo-...?w=1600&q=80`) in `coverImage`. The script downloads it, resizes it and blocks re-used photos.
- Banned: matrix code, padlocks on keyboards, handshakes, abstract blue circuits, any image with text or charts drawn on it.
- `coverImageAlt`: say what the photo shows and how it links to the story.

## Step 7 — Write the batch file
1. Copy `pipeline_runs/TEMPLATE.json` to `pipeline_runs/TODAY.json` (for example `pipeline_runs/2026-10-12.json`).
2. Fill one object per article. Field rules:
   - Do NOT add `id` or `author`. The script adds them.
   - `slug`: lowercase-kebab-case, unique. `category`: ai | technology | science | research.
   - `articleType`: breaking | analysis | deep-dive | model-report | benchmark-report | research-explained | discovery | industry-watch.
   - `signalRating`: whole number 70–100. 95+ only for a historic event.
   - `publishedAt`: the current UTC time when you write, like `2026-10-12T08:15:00Z`. Never a future time. Space articles 15 minutes apart.
   - `readTimeMinutes`: words ÷ 200, rounded up.
   - `tags`: 5 or more. `keyTakeaways`: 3 or more facts.
   - `threeQuestions`: `whatHappened`, `whyItMatters`, `whatsNext`, each more than 80 characters.
   - `content`: a list of paragraphs (not one string). First paragraph names the source you read. Each paragraph adds a fact, figure, mechanism, quote or limit that is NOT already in `threeQuestions` (No-Restating Rule). End with what is not known yet. Length follows the source: usually 400–1,200 words. Never pad.
   - `citations`: every primary URL you used, as `{ "title", "url", "source" }`. Only URLs you opened.
   - `relatedModelId`: only if the article is about a tracked model (id from `curated_models.json`).
   - `isHero: true` on exactly one article: today's lead story. `isFeatured: true` on 1–2 others.
3. Fill `briefing`: date like `Monday, October 12, 2026` (the TODAY weekday and date), a 2-sentence summary, exactly 5 items that link to today's articles.
4. Fill `signals`: exactly 5 ticker items, tag 1–4 words, text 95 characters or fewer, linked to today's articles.

## Step 8 — Check, then write
1. Run `python scripts/add_articles.py pipeline_runs/TODAY.json --check`
2. If it prints FAIL, fix every listed problem in the JSON and run the check again. Repeat until "CHECK PASSED".
3. Run `python scripts/add_articles.py pipeline_runs/TODAY.json` (no `--check`). It writes the articles, cover images, briefing and ticker.
4. Run it only once. If you run it twice, it refuses because the slugs now exist. That is correct.

## Step 9 — Timeline (most days: skip)
Only if a story is a historic shift with signalRating 95+: add one entry at the top of `MOCK_TIMELINE_EVENTS` in `src/data/mockData.ts` (fields: id `time-YYYY-MM-DD-short`, year, month like `'Oct 12'`, title, category from the 5 allowed, summary, impactScore 95–100, keyShift, articleSlug). Otherwise do nothing.

## Step 10 — Build and verify
Run, in order:
```
npm run images
npm run build
npm run verify
```
- All three must succeed. `npm run verify` must end with "ALL 8 RELEASE GATES PASSED".
- If something fails, read the error, fix the content (JSON values, image, curated model key), and run again. To change an article after Step 8, edit its fields in `src/data/articlesData.ts` with a small exact edit, then rebuild.
- A "[WARN] Briefing date" line means the briefing was not updated. Fix it.

## Step 11 — Self-audit before commit
For each new article, re-open its main citation and check: every number in `threeQuestions`, `keyTakeaways`, `technicalSpecs` and `content` appears on that page or another cited page. Remove anything you cannot find. If you changed anything, run Step 10 again.

## Step 12 — Commit and push
```
git status
git add src/data public/images/articles public/sitemap.xml public/rss.xml public/llms.txt public/llms-full.txt public/ai-summary.json scripts/model_sources vercel.json newsletters
git commit -m "feat(intelligence): daily briefing and articles update [TODAY]"
git push origin main
```
Never add `.env.local` or `pipeline_runs/`. If `git push` fails, report it; do not force-push.

## Step 13 — Newsletter
Write `newsletters/TODAY-the-morning-vector.md` using the template in `DAILY_UPDATE_PIPELINE.md` Stage 7. Use only facts already in today's articles. Links: `https://nextvector.rhasan.online/article/<slug>`. Commit and push it (`git add newsletters`, commit `docs(newsletter): The Morning Vector [TODAY]`). Show the full newsletter text to the user in chat.

## Step 14 — State files and report
1. `progress.md` → "Completed": one dated line (article ids, model changes, checks passed, commit hash).
2. `handoff.md`: new section at the top: what was done, stories dropped and why, model watch result, open items, gotchas.
3. Commit and push these two files (`docs: record daily run [TODAY]`).
4. Tell the user: articles added (title + slug), model watch result, checks passed, commit hashes, anything they must do.
