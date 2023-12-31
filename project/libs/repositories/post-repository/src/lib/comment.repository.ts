import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../../../../../apps/posts/src/app/comment/comment.entity';
import { IComment } from '@project/shared/app-types';
import { PrismaService } from './prisma/prisma.service';
import { adaptPrismaComment } from '../../../../../apps/posts/src/app/comment/utils/adapt-prisma-comment';
import { CommentQuery } from '@project/shared/shared-queries';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<IComment> {
    const data = { ...item.toObject(), userId: item._userId};
    delete data._userId;
    const comment = await this.prisma.comment.create({ data })
   await this.prisma.post.update({
    where:{
      postId: item.postId
    },
    data:{
      commentsCount: { increment: 1 }
    }
   })
    return adaptPrismaComment(comment);
  }

  public async findById(commentId: number): Promise<IComment> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        commentId
      }
    });
    return adaptPrismaComment(comment);
  }

  public async findByPostId(postId: number, {limit, page}:CommentQuery): Promise<IComment[] | null> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return comments.map((item) => {
      return adaptPrismaComment(item);
    })
  }

  public async destroy(commentId: number, postId:number): Promise<void> {
    await this.prisma.comment.delete({ where: {commentId} });
    await this.prisma.post.update({
      where:{
        postId
      },
      data:{
        commentsCount:{decrement:1}
      }
     })
  }
}
