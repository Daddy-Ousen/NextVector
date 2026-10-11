import path from 'node:path';
import { runnerImport, type Plugin } from 'vite';

/**
 * Splits src/data/articlesData.ts at build time so the app never ships every article body up front.
 *
 *  - `virtual:article-summaries` holds the card/list fields of every article (title, cover, tags,
 *    signal, Three Questions, ...) plus a lazy loader per article body.
 *  - `virtual:article-body/<id>` holds one article's heavy fields (full text, takeaways, citations,
 *    specs). Each becomes its own small chunk, fetched only when that article is opened.
 *
 * articlesData.ts stays the single source of truth; the daily pipeline keeps editing it as before.
 */

const SUMMARIES_ID = 'virtual:article-summaries';
const BODY_PREFIX = 'virtual:article-body/';
const RESOLVED_PREFIX = '\0';

// Fields moved out of the summary into the per-article body chunk
const BODY_FIELDS = ['content', 'keyTakeaways', 'citations', 'technicalSpecs'] as const;

type RawArticle = Record<string, unknown> & {
  id: string;
  author: unknown;
};

export function articleSplitPlugin(): Plugin {
  const articlesFile = path.resolve(import.meta.dirname, 'src/data/articlesData.ts');
  let cache: Promise<RawArticle[]> | null = null;

  const loadArticles = () => {
    cache ??= runnerImport<{ ALL_ARTICLES: RawArticle[] }>(articlesFile, { configFile: false, logLevel: 'error' })
      .then((r) => r.module.ALL_ARTICLES);
    return cache;
  };

  return {
    name: 'nextvector-article-split',

    resolveId(id) {
      if (id === SUMMARIES_ID || id.startsWith(BODY_PREFIX)) return RESOLVED_PREFIX + id;
      return null;
    },

    async load(id) {
      if (!id.startsWith(RESOLVED_PREFIX)) return null;
      const virtualId = id.slice(RESOLVED_PREFIX.length);
      if (virtualId !== SUMMARIES_ID && !virtualId.startsWith(BODY_PREFIX)) return null;

      this.addWatchFile(articlesFile);
      const articles = await loadArticles();

      if (virtualId === SUMMARIES_ID) {
        // Authors are shared objects; emit each once instead of repeating them per article
        const authors: string[] = [];
        const rows = articles.map((a) => {
          const summary: Record<string, unknown> = { ...a };
          for (const f of BODY_FIELDS) delete summary[f];
          delete summary.author;
          const authorJson = JSON.stringify(a.author);
          let idx = authors.indexOf(authorJson);
          if (idx === -1) idx = authors.push(authorJson) - 1;
          return `{...${JSON.stringify(summary)},author:AUTHORS[${idx}]}`;
        });
        const loaders = articles.map(
          (a) => `${JSON.stringify(a.id)}:()=>import(${JSON.stringify(BODY_PREFIX + a.id)})`
        );
        return [
          `const AUTHORS=[${authors.join(',')}];`,
          `export const ARTICLE_SUMMARIES=[${rows.join(',\n')}];`,
          `export const ARTICLE_BODY_LOADERS={${loaders.join(',\n')}};`,
        ].join('\n');
      }

      const articleId = virtualId.slice(BODY_PREFIX.length);
      const article = articles.find((a) => a.id === articleId);
      if (!article) throw new Error(`Unknown article id "${articleId}"`);
      const body: Record<string, unknown> = {};
      for (const f of BODY_FIELDS) if (article[f] !== undefined) body[f] = article[f];
      return `export default ${JSON.stringify(body)};`;
    },

    // Dev server: re-split when the source data changes
    handleHotUpdate({ file, server }) {
      if (path.resolve(file) !== articlesFile) return;
      cache = null;
      for (const mod of server.moduleGraph.idToModuleMap.values()) {
        if (mod.id?.startsWith(RESOLVED_PREFIX + 'virtual:article-')) server.moduleGraph.invalidateModule(mod);
      }
      server.ws.send({ type: 'full-reload' });
      return [];
    },
  };
}
