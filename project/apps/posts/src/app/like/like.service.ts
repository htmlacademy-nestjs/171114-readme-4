import { BadRequestException, Injectable } from '@nestjs/common';
import { LikeRepository } from '../../../../../libs/repositories/post-repository/src/lib/like.repository';
import { LikeEntity } from './like-entity';
import { PostRepository } from '../../../../../libs/repositories/post-repository/src';
import { LikesError } from './like.constant';

@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly PostRepository: PostRepository,
  ) { }

  private async checkPostedStatus(id: number) {
    const PostStatus = (await this.PostRepository.findById(id)).status;
    return PostStatus === 'published';
  }

  public async create(postId: number, userId: string) {
    const like = { postId, likedByUsersIds: [userId] };
    const likeEntity = new LikeEntity(like);
    return this.likeRepository.create(likeEntity);
  }

  public async findByPostId(postId: number) {
    return await this.likeRepository.findById(postId);
  }

  public async changeLikePost(postId: number, userId: string) {
    const status = await this.checkPostedStatus(postId);
    if (!status) {
      throw new BadRequestException(LikesError.PostNotPosted)
    }

    const likesInfo = await this.findByPostId(postId)
    if (!likesInfo) {
      return await this.create(postId, userId)
    }

    const likesData = likesInfo.likedByUsersIds;
    let updatedList: string[];
    if (!likesData.includes(userId)) {
      updatedList = likesData.concat(userId);
    } else {
      updatedList = likesData.filter((item) => item !== userId);
    }
    const likeEntity = new LikeEntity({
      postId,
      likedByUsersIds: updatedList,
    });
    return this.likeRepository.update(postId, likeEntity);
  }
}
