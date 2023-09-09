import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class VideoPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'http://example.com'
  })
  @Expose()
  public link: string;
}
