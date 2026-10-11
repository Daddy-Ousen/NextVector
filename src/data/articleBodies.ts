import { ARTICLE_BODY_LOADERS } from 'virtual:article-summaries';
import { ArticleBody } from '../types';

// One stable promise per article so React's use() can suspend on it across re-renders
const bodyCache = new Map<string, Promise<ArticleBody>>();

export function loadArticleBody(articleId: string): Promise<ArticleBody> {
  let pending = bodyCache.get(articleId);
  if (!pending) {
    const loader = ARTICLE_BODY_LOADERS[articleId];
    pending = loader
      ? loader().then((m) => m.default)
      : Promise.reject(new Error(`No body chunk for article ${articleId}`));
    bodyCache.set(articleId, pending);
  }
  return pending;
}
