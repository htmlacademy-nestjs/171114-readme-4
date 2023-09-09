import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { CreatePostContentDto } from '@project/shared/shared-dto';
import { validate } from 'class-validator';
import { adaptCreateDtoPost } from '../utils/adapt-dto-post';
import { VALIDATION_ARGUMENT_TYPE } from '../post.constant';

export class CreatePostValidationPipe implements PipeTransform {
  async transform(dto: CreatePostContentDto, { type }: ArgumentMetadata) {
    if (type === VALIDATION_ARGUMENT_TYPE) {
      let errors = [];
      const post = adaptCreateDtoPost(dto)
      errors = errors.concat(await validate(post, { validationError: { target: false }}));
      if (errors.length > 0) {
          throw new BadRequestException(errors)
      }
    }
    return dto;
  }
}
