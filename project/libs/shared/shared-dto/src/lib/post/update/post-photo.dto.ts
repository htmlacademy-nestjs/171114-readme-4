import { ApiProperty } from '@nestjs/swagger';
import { UpdatePostDto } from './update-post.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePhotoPostDto  extends UpdatePostDto{
  @ApiProperty({
    description: 'Post photo id',
    example: '1'
  })
  @IsString()
  @IsOptional()
  public photo?: string;
}
