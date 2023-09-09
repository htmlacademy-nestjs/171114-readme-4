import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@project/shared/app-types';
import { ArrayMaxSize, IsEnum, IsOptional, Matches, MaxLength, MinLength, NotContains } from 'class-validator';
import { PostsError, RegExpPattern, TagParam } from '../post-dto.constant';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  @IsEnum(PostType)
  public type: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'posted'
  })
  @IsOptional()
  @IsEnum(PostStatus)
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  @IsOptional()
  @NotContains(' ', {each:true, message: PostsError.SpacesInTag})
  @Matches(RegExpPattern.Tag, {each:true, message:PostsError.WrongTagStart})
  @MinLength(TagParam.MinLength, {each:true})
  @MaxLength(TagParam.MaxLength, {each:true})
  @ArrayMaxSize(TagParam.Amount)
  public tags?:string[];
}
