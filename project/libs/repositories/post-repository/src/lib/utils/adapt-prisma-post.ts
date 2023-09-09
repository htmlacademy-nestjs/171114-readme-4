import { Post } from "@prisma/client";
import { PostContentType, PostStatus, PostType } from "@project/shared/app-types";

export function adaptPrismaPost(prismaPost: Post | null): PostContentType {
  if (prismaPost) {
    const post = {
      ...prismaPost,
      createdDate: prismaPost.createdDate.toISOString(),
      postedDate: prismaPost.postedDate.toISOString(),
      type: prismaPost.type as PostType,
      status: prismaPost.status as PostStatus,
      _id: prismaPost.postId,
      _userId: prismaPost.userId,
      _originUserId: prismaPost.originUserId
    };
    delete prismaPost.postId;
    delete prismaPost.userId;
    delete prismaPost.originUserId;
    return post;
  }
  return null;
}
