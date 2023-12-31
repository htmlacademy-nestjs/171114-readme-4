import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Post ID'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'User Ids who liked'
  })
  @Expose()
  public likedByUsersIds: string[];
}
