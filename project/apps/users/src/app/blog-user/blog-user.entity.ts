import { User } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements User {
  public _id: string;
  public avatar: string;
  public email: string;
  public name: string;
  public passwordHash: string;
  public posts: string[];
  public followUsers: string[];
  public createdAt: Date;
  public updateAt: Date;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      posts: this.posts,
      passwordHash: this.passwordHash,
      followUsers: this.followUsers,
      createdAt: this.createdAt,
      updateAt: this.updateAt,
    };
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.avatar = blogUser.avatar;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.passwordHash = blogUser.passwordHash;
    this.followUsers = blogUser.followUsers;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
