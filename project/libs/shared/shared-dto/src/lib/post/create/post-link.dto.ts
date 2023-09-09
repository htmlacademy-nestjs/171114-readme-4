import { IsString, IsUrl, MaxLength } from "class-validator";
import { CreatePostDto } from "./create-post.dto";
import { ApiProperty } from '@nestjs/swagger';
import { LINK_DESCRIPTION_LENGTH } from "../post-dto.constant";

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Link text',
    example: 'http://example.com'
  })
  @IsUrl()
  public link: string;
  @ApiProperty({
    description: 'Description of post  link',
    example: 'Description'
  })
  @IsString()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
