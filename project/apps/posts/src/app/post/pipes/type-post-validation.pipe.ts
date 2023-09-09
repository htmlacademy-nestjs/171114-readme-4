import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PostType } from '@project/shared/app-types';
import { CreatePostDto, UpdatePostDto } from '@project/shared/shared-dto';
import { PostsError } from '../post.constant';

export class TypePostValidationPipe implements PipeTransform {
  async transform(dto: CreatePostDto | UpdatePostDto) {
    if(!dto.type || !Object.values<string>(PostType).includes(dto.type)){
      throw new BadRequestException(PostsError.WrongType)
    }
    return dto;
  }
}
