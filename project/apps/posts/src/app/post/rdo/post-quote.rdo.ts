import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class QuotePostRdo extends PostRdo {
  @ApiProperty({
    description: 'Text of Post  quote',
    example: 'Quote'
  })
  @Expose()
  public quote: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Author'
  })
  @Expose()
  public author: string;
}
