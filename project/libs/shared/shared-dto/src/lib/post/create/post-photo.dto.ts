import { IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post photo id',
    example: '1'
  })
  @IsString()
  public photo: string;
}
