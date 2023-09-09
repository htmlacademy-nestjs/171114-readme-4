import { PostType, PostStatus } from '@prisma/client';

export interface Post {
  _id?: number;
  _userId?: string;
  _originUserId?: string;
  _originId?: number;
  type: PostType;
  createdDate: string;
  postedDate: string;
  status: PostStatus;
  isReposted: boolean;
  tags?: string[];
  likesCount: number;
  commentsCount: number;
}
