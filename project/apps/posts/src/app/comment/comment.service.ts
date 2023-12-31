import { Injectable, BadRequestException } from '@nestjs/common';
import { CommentRepository } from '../../../../../libs/repositories/post-repository/src/lib/comment.repository';
import { CreateCommentDto } from '@project/shared/shared-dto';
import { CommentEntity } from './comment.entity';
import { CommentQuery } from '@project/shared/shared-queries';
import { CommentsError } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) { }

  public async create(dto: CreateCommentDto, userId: string) {
    const comment = {
      ...dto,
      _userId: userId
    };

    const commentEntity = new CommentEntity(comment);

    return this.commentRepository
      .create(commentEntity);
  }

  public async findByPostId(postId: number, query: CommentQuery) {
    return await this.commentRepository.findByPostId(postId, query);
  }

  public async delete(id: number, userId: string) {
    const commentData = await this.commentRepository.findById(id)
    if (commentData._userId !== userId) {
      throw new BadRequestException(CommentsError.WrongUser)
    }
    return this.commentRepository.destroy(id, commentData.postId);
  }
}
