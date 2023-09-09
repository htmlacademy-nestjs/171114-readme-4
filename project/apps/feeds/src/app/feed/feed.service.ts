import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../../../../libs/repositories/post-repository/src';
import { PostContentType } from '@project/shared/app-types';
import { FeedError } from './feed.constsant';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';
import { BlogUserRepository } from 'libs/repositories/user-repository/src/lib/blog-user.repository';
import { UserDetailsRdo } from './rdo/user-details.rdo';

@Injectable()
export class FeedService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: BlogUserRepository
  ) {}

  public async findFeed(id: string): Promise<PostContentType[]> {
    const follows = await this.userRepository.getFollowByUserId(id);
    if (!follows) {
      throw new NotFoundException (FeedError.PostNotFound);
    }
    const posts: PostContentType[] = []
    follows.forEach(async(item) => {
      const array = await this.postRepository.searchByUserId(item);
      posts.concat(array);
    })
    const array = await this.postRepository.searchByUserId(id);
    posts.concat(array);
    return posts;
  }

  public async findByPostId(id: number) {
    return await this.postRepository.findById(id);
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

  public async getUserDetails(id: string): Promise<UserDetailsRdo | null> {
    const userFind = await this.userRepository.findById(id);
    const postsCount = (await this.postRepository.searchByUserId(id)).length;
    const followersCount = (await this.userRepository.getFollowByUserId(id)).length;
    const userDetails: UserDetailsRdo = {
      id: userFind._id,
      avatar: userFind.avatar,
      createdAt: userFind.createdAt,
      email: userFind.email,
      name: userFind.name,
      postsCount,
      followersCount
    }
    return userDetails;
  }

  public async followUser(userId: string, followId: string): Promise<void> {
    this.userRepository.addToFollowById(userId, followId);
  }

  public async unfollowUser(userId: string, followId: string): Promise<void> {
    this.userRepository.removeFromFollowById(userId, followId);
  }
}
