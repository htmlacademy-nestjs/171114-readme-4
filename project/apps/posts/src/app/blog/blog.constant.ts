export const API_TAG_NAME = 'blog';

export const BlogError = {
  PostNotFound: 'Publication is not found',
  EmptyList: 'There are no posts that can be loaded',
} as const;

export const BlogMessages = {
  ShowSingle: 'Publication is showing',
  ShowAll: 'List of publications is showing',
  NewsSent: 'Publications sent',
} as const;

export const BlogPath = {
  Main: 'blog',
  Id: ':id',
  Drafts: 'drafts',
  Search: 'search',
  SendNewsletter: 'send-news',
} as const;
