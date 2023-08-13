import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { ValidationHelper } from '../../helpers/validation.helper';

@Injectable()
export class ValidationExcludesEntityIdFieldsPipe<
  ENTITY_ID_DTO extends CreateEntityDto,
> implements PipeTransform<ENTITY_ID_DTO, ENTITY_ID_DTO>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(source: ENTITY_ID_DTO, metadata: ArgumentMetadata): ENTITY_ID_DTO {
    if (
      ValidationHelper.isDefined(source) &&
      (ValidationHelper.isDefined(source.id) ||
        ValidationHelper.isDefined(source.createdAt) ||
        ValidationHelper.isDefined(source.updatedAt))
    ) {
      throw new BadRequestException();
    }
    return source;
  }
}
