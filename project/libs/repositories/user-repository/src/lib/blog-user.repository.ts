import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { BlogUserEntity } from '../../../../../apps/users/src/app/blog-user/blog-user.entity';
import { User } from '@project/shared/app-types';
import { BlogUserModel } from '../../../../../apps/users/src/app/blog-user/blog-user.model';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RETURNABLE_FIELDS } from './blog-user.constant';

@Injectable()
export class BlogUserRepository implements CRUDRepository<BlogUserEntity, string, User> {
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>) {
  }

  public async create(item: BlogUserEntity): Promise<User> {
    const newBlogUser = new this.blogUserModel(item);
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.blogUserModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.blogUserModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<User> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async addToFollowById(
    userId: string,
    followId: string
  ): Promise<void> {
    await this.blogUserModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { followUsers: new mongoose.Types.ObjectId(followId) },
      },
      { new: true, upsert: true }
    );
  }

  public async removeFromFollowById(
    userId: string,
    followId: string
  ): Promise<void> {
    await this.blogUserModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { followUsers: new mongoose.Types.ObjectId(followId) },
      },
      { new: true }
    );
  }

  public async getFollowByUserId(userId: string): Promise<string[] | null> {
    const user = await this.blogUserModel.findOne({ _id: userId })
    return user.followUsers;
  }

  public async findFollowersByUserId(
    userId: string
  ): Promise<User[] | null> {
    const user = await this.findById(userId);

    if (!user) {
      return null;
    }

    return this.blogUserModel
      .aggregate([
        {
          $match: {
            _id: {
              $in: [...user.followUsers],
            },
          },
        },
        { $project: RETURNABLE_FIELDS },
      ])
      .exec();
  }

}
