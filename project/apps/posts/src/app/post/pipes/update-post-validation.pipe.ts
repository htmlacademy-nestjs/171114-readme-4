import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { UpdatePostDto } from '@project/shared/shared-dto';
import { validate } from 'class-validator';
import { adaptUpdateDtoPost } from '../utils/adapt-dto-post';
import { VALIDATION_ARGUMENT_TYPE } from '../post.constant';

export class UpdatePostValidationPipe implements PipeTransform {
  async transform(dto: UpdatePostDto, { type }: ArgumentMetadata) {
    if (type === VALIDATION_ARGUMENT_TYPE) {
      let errors = [];
      const post = adaptUpdateDtoPost(dto)
      errors = errors.concat(await validate(post, { validationError: { target: false }}));
      if (errors.length > 0) {
          throw new BadRequestException(errors)
        }
    }
    return dto;
  }
}
