import { Repository } from 'typeorm';
import { CreateEnabledEntityDto } from '../../dtos/create/create-enabled-entity.dto';
import { EnabledEntity } from '../entities/enabled-entity-entity';
import { EntityCrudService } from './entity-crud-service';
import { UpdateEnabledEntityDto } from '../../dtos/update/update-enabled-entity.dto';

export abstract class EnabledEntityCrudService<
  ENTITY_ID extends EnabledEntity,
  CREATE_DTO extends CreateEnabledEntityDto,
  UPDATE_DTO extends UpdateEnabledEntityDto,
> extends EntityCrudService<ENTITY_ID, CREATE_DTO, UPDATE_DTO> {
  constructor(protected repository: Repository<ENTITY_ID>) {
    super(repository);
  }
}
