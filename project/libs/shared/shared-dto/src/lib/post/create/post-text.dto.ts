import { ApiProperty } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";
import { PostAnnouncementLength, PostTitleLength, TextPostLength } from "../post-dto.constant";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateTextPostDto extends CreatePostDto{
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @IsString()
  @MinLength(TextPostLength.Min)
  @MaxLength(TextPostLength.Max)
  public text: string;
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @MinLength(PostTitleLength.Min)
  @MaxLength(PostTitleLength.Max)
  public title: string;
  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  @IsString()
  @MinLength(PostAnnouncementLength.Min)
  @MaxLength(PostAnnouncementLength.Max)
  public announcement: string;
}
