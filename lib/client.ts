import { createArticlesCRUD } from './articles.ts';

type Options = {
  baseUrl: string,
  secret?: string,
}

export const createClient = (options: Options) => ({
  articles: createArticlesCRUD({
    ...options,
    baseUrl: `${options.baseUrl}/articles`,
  })
})
