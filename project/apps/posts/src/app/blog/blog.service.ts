import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../../../../libs/repositories/post-repository/src';
import { PostContentType } from '@project/shared/app-types';
import { BlogError } from './blog.constant';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';


@Injectable()
export class BlogService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  public async findByPostId(id: number) {
    const post  = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException (BlogError.PostNotFound);
    }
    return post;
  }

  public async showAll(query:PostQuery): Promise<PostContentType[]> {
    return this.postRepository.findAll(query);
  }

  public async getPosts (): Promise<PostContentType[]> {
    return this.postRepository.getFullList();
  }

  public async searchByTitle(query:SearchPostsQuery): Promise<PostContentType[]> {
    return this.postRepository.searchByTitle(query);
  }

  public async showDrafts(userId:string): Promise<PostContentType[]> {
    return this.postRepository.findDrafts(userId);
  }
}
