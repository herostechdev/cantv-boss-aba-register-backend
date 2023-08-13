import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { EntityId } from '../entities/entity-id';
import { UpdateEntityDto } from '../../dtos/update/update-entity.dto';
import { IEntityCrudService } from './entity-crud-service.interface';

export interface IItemEntityCrudService<
  ENTITY_ID extends EntityId,
  CREATE_DTO extends CreateEntityDto,
  UPDATE_DTO extends UpdateEntityDto,
> extends IEntityCrudService<ENTITY_ID, CREATE_DTO, UPDATE_DTO> {
  findByName(name: string): Promise<ENTITY_ID>;
}
