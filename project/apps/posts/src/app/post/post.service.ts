import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../../../../libs/repositories/post-repository/src';
import { DEFAULT_AMOUNT, PostsError } from './post.constant';
import { CreatePostContentDto, UpdatePostContentDto } from '@project/shared/shared-dto';
import { TypeEntityAdapter } from './utils/entity-adapter';
import { PostStatus } from '@prisma/client';
import { getDate } from './utils/helpers';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) { }

  public async create(dto: CreatePostContentDto, userId: string) {
    const post = {
      ...dto,
      _userId: userId,
      createdDate: getDate(),
      postedDate: getDate(),
      status: PostStatus.published,
      likesCount: DEFAULT_AMOUNT,
      commentsCount: DEFAULT_AMOUNT,
      isReposted: false,
    };
    const postEntity = await new TypeEntityAdapter[post.type](post);
    return this.postRepository.create(postEntity);
  }

  public async update(postId: number, dto: UpdatePostContentDto, userId: string) {
    const post = await this.findByPostId(postId);
    if (userId !== post._userId) {
      throw new BadRequestException(PostsError.NotUserAuthor)
    }
    const updatedPost = { ...post, ...dto, postedDate: getDate() }
    const postEntity = await new TypeEntityAdapter[updatedPost.type](updatedPost);
    return this.postRepository.update(postId, postEntity);
  }

  public async findByPostId(id: number) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(PostsError.PostNotFound);
    }
    return post;
  }

  public async repost(id: number, userId: string) {
    const originalPost = await this.findByPostId(id);
    const isAlreadyReposted = await this.postRepository.findRepost(id, userId)
    if (isAlreadyReposted) {
      throw new BadRequestException(PostsError.AlreadyReposted)
    }
    const post = {
      ...originalPost as CreatePostContentDto,
      isReposted: true,
      _userId: userId,
      _originUserId: originalPost._userId,
      _originId: originalPost._id,
      postedDate: getDate(),
      likesCount: DEFAULT_AMOUNT,
      commentsCount: DEFAULT_AMOUNT,
    };
    const postEntity = await new TypeEntityAdapter[post.type](post);
    return this.postRepository.create(postEntity);
  }

  public async remove(postId: number, userId: string) {
    const post = await this.findByPostId(postId);
    if (userId !== post._userId) {
      throw new BadRequestException(PostsError.NotUserAuthor)
    }
    return this.postRepository.destroy(postId);
  }
}
