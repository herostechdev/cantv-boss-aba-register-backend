import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { EntityId } from '../entities/entity-id';
import { UpdateEntityDto } from '../../dtos/update/update-entity.dto';
import { IEntityFindService } from './entity-find-service.interface';

export interface IEntityCrudService<
  ENTITY_ID extends EntityId,
  CREATE_DTO extends CreateEntityDto,
  UPDATE_DTO extends UpdateEntityDto,
> extends IEntityFindService<ENTITY_ID> {
  create(entity: CREATE_DTO): Promise<ENTITY_ID>;

  update(id: string, entity: Partial<UPDATE_DTO>): Promise<ENTITY_ID>;

  delete(id: string): Promise<void>;
}
