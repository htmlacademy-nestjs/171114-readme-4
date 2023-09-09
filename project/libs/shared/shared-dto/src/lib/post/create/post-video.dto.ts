import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';
import { PostTitleLength, PostsError, RegExpPattern  } from '../post-dto.constant';

export class CreateVideoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @MinLength(PostTitleLength.Min)
  @MaxLength(PostTitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://youtu.be/FZ-9nWbJLqU?si=ntqU3BB49B8wZppQ'
  })
  @IsUrl()
  @Matches(RegExpPattern.Video, {message: PostsError.WrongSourse})
  public link: string;
}
