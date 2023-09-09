import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PostRdo } from './post.rdo';

export class PhotoPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Post photo',
    example: 'example.jpg'
  })
  @Expose()
  public photo: string;
}
