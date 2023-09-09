export const API_TAG_NAME = 'feeds';

export const FeedError = {
  PostNotFound: 'Publication is not found',
  EmptyList: 'There are no posts that can be loaded',
} as const;

export const FeedMessages = {
  ShowSingle: 'Publication is showing',
  ShowAll: 'List of publications is showing',
  NewsSent: 'Publications sent',
  UserDetails: 'Details information of user',
  FollowUser: 'Follow user',
} as const;

export const FeedPath = {
  Main: 'feed',
  Id: ':id',
  Search: 'search',
  Details: ':id/details',
  Follow: ':id/details/follow',
  Unfollow: ':id/details/follow/unsubscribe'
} as const;
