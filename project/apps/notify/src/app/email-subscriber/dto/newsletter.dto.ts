import { IsArray, IsEmail, IsString } from 'class-validator';
import { EmailError} from '../email-subscriber.constant';
import { PostContentType } from '@project/shared/app-types';

export class NewsletterDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsArray()
  public posts: PostContentType[];

  @IsString()
  public id: string;

}
