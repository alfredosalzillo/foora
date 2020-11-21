import { createCRUD, createRetrieve, createRetrieveAll, CRUDMethodConfig } from './crud.ts';

type Options = {
  baseUrl: string,
  secret?: string,
}
export type User = {
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
}

export type Articles = {
  type_of: 'article';
  id: number;
  title: string;
  description: string;
  cover_image: string;
  readable_publish_date: string;
  social_image: string;
  tag_list: string;
  tags: string[];
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  created_at: string;
  edited_at?: any;
  crossposted_at?: any;
  published_at: string;
  last_comment_at: string;
  body_html: string;
  body_markdown: string;
  user: User;
}
export type ArticleSummary = {
  type_of: 'article';
  id: number;
  title: string;
  description: string;
  cover_image: string;
  published_at: string;
  tag_list: string[];
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  published_timestamp: string;
  user: User;
}
export type CreateArticleData = {
  title?: string;
  body_markdown: string;
  published?: boolean;
  series?: string;
  main_image?: string;
  canonical_url?: string;
  description?: string;
  organization_id?: number;
  tags?: string[];
}
type Paginated<T> = {
  page?: number,
  per_page?: number,
} & T;
export type ReadArticlesOptions = Paginated<{
  tag?: string,
  tags?: string[],
  tags_exclude?: string[],
  username?: string,
  state?: 'fresh' | 'rising' | 'all',
  top?: number,
  collection_id?: number,
}>
export type UpdateArticleData = Partial<CreateArticleData>;
export const createArticlesCRUD = ({ baseUrl, secret }: Options) => {
  const base = createCRUD<Articles, ArticleSummary, CreateArticleData, UpdateArticleData, ReadArticlesOptions,
    'create' | 'update' | 'retrieve' | 'retrieveAll'>({
    baseUrl,
    secret,
    methods: {
      create: { private: true },
      update: { private: true },
      retrieve: {},
      retrieveAll: {}
    },
  });
  const byPath = createRetrieve<Articles, string>({
    secret,
    baseUrl,
    method: {
      private: false,
    },
  });
  const mine = createRetrieveAll<ArticleSummary, Paginated<never>>({
    secret,
    baseUrl: `${baseUrl}/me`,
    method: {
      private: true,
    },
  });
  const minePublished = createRetrieveAll<ArticleSummary, Paginated<never>>({
    secret,
    baseUrl: `${baseUrl}/me`,
    method: {
      private: true,
    },
  });
  const mineUnpublished = createRetrieveAll<ArticleSummary, Paginated<never>>({
    secret,
    baseUrl: `${baseUrl}/me`,
    method: {
      private: true,
    },
  });
  const mineAll= createRetrieveAll<ArticleSummary, Paginated<never>>({
    secret,
    baseUrl: `${baseUrl}/me`,
    method: {
      private: true,
    },
  });
  return {
    ...base,
    byPath,
    mine,
    minePublished,
    mineUnpublished,
    mineAll,
  };
}
