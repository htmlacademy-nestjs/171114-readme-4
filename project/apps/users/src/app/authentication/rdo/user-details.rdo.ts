import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public avatar: string;

  @Expose({ name: 'createdAt'})
  public registrationDate: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public postsCount: number;

  @Expose()
  public writersCount: number;
}