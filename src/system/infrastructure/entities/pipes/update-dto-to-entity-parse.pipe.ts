import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { EntityId } from '../entities/entity-id';

@Injectable()
export class UpdateDtoToEntityParsePipe<
  ENTITY_ID_DTO extends CreateEntityDto,
  ENTITY_ID extends EntityId,
> implements PipeTransform<ENTITY_ID_DTO, ENTITY_ID>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(source: ENTITY_ID_DTO, metadata: ArgumentMetadata): ENTITY_ID {
    const target: EntityId = {
      ...source,
    };
    return target as ENTITY_ID;
  }
}
