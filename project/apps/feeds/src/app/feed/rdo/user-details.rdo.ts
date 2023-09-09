import { Expose } from 'class-transformer';

export class UserDetailsRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public avatar: string;

  @Expose({ name: 'createdAt'})
  public createdAt: Date;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public postsCount: number;

  @Expose()
  public followersCount: number;
}
