import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostAuthorLength, QuotePostLength } from '../post-dto.constant';

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Text of post  quote',
    example: 'Quote'
  })
  @IsString()
  @MinLength(QuotePostLength.Min)
  @MaxLength(QuotePostLength.Max)
  public text: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  @IsString()
  @MinLength(PostAuthorLength.Min)
  @MaxLength(PostAuthorLength.Max)
  public author: string;
}
