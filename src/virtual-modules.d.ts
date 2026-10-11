declare module 'virtual:article-summaries' {
  export const ARTICLE_SUMMARIES: import('./types').ArticleSummary[];
  export const ARTICLE_BODY_LOADERS: Record<string, () => Promise<{ default: import('./types').ArticleBody }>>;
}
