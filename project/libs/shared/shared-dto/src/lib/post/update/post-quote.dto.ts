import { ApiProperty } from '@nestjs/swagger';
import { UpdatePostDto } from './update-post.dto';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PostAuthorLength, QuotePostLength } from '../post-dto.constant';

export class UpdateQuotePostDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Text of post  quote',
    example: 'Quote'
  })
  @IsString()
  @IsOptional()
  @MinLength(QuotePostLength.Min)
  @MaxLength(QuotePostLength.Max)
  public text?: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  @IsString()
  @IsOptional()
  @MinLength(PostAuthorLength.Min)
  @MaxLength(PostAuthorLength.Max)
  public author?: string;
}
