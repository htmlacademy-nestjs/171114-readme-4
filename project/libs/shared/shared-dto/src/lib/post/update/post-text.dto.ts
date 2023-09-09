import { ApiProperty } from '@nestjs/swagger';
import { UpdatePostDto } from './update-post.dto';
import { PostAnnouncementLength, PostTitleLength, TextPostLength } from '../post-dto.constant';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateTextPostDto extends UpdatePostDto{
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @IsString()
  @IsOptional()
  @MinLength(TextPostLength.Min)
  @MaxLength(TextPostLength.Max)
  public text?: string;

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
    description: 'Announcement of post',
    example: 'Text'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostAnnouncementLength.Min)
  @MaxLength(PostAnnouncementLength.Max)
  public announcement?: string;
}
