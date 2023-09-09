import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class LinkPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Description of post  link',
    example: 'Description'
  })
  @Expose()
  public description: string;
}
