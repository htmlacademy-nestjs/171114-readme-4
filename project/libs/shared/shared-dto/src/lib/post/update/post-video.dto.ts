import { ApiProperty } from '@nestjs/swagger';
import { UpdatePostDto } from './update-post.dto';
import { IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';
import { PostTitleLength, PostsError, RegExpPattern } from '../post-dto.constant';

export class UpdateVideoPostDto extends UpdatePostDto{
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostTitleLength.Min)
  @MaxLength(PostTitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  @IsOptional()
  @IsUrl()
  @Matches(RegExpPattern.Video, {message: PostsError.WrongSourse})
    public link?: string;
}
