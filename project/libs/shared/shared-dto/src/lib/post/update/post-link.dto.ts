import { ApiProperty } from '@nestjs/swagger';
import { UpdatePostDto } from './update-post.dto';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { LINK_DESCRIPTION_LENGTH } from '../post-dto.constant';

export class UpdateLinkPostDto  extends UpdatePostDto{
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @IsUrl()
  @IsOptional()
  public link?: string;
  @ApiProperty({
    description: 'Description of post  link',
    example: 'Description'
  })
  @IsString()
  @IsOptional()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
