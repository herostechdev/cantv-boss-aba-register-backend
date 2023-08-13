import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateItemDto } from '../../dtos/create/create-item.dto';
import { EntityCrudService } from './entity-crud-service';
import { ItemEntity } from '../entities/item-entity';
import { UpdateItemDto } from '../../dtos/update/update-item.dto';
import { IItemEntityCrudService } from './item-entity-crud-service.interface';

export abstract class ItemCrudService<
    ENTITY_ID extends ItemEntity,
    CREATE_DTO extends CreateItemDto,
    UPDATE_DTO extends UpdateItemDto,
  >
  extends EntityCrudService<ENTITY_ID, CREATE_DTO, UPDATE_DTO>
  implements IItemEntityCrudService<ENTITY_ID, CREATE_DTO, UPDATE_DTO>
{
  constructor(protected repository: Repository<ENTITY_ID>) {
    super(repository);
  }

  async findByName(name: string): Promise<ENTITY_ID> {
    try {
      const alias = this.constructor.name;
      const query = this.repository.createQueryBuilder(alias);
      return await this.customFindByName(name, query, alias);
    } catch (error) {
      this.exceptionHandler(error, name);
    }
  }

  protected customFindByName(
    name: string,
    query: SelectQueryBuilder<ENTITY_ID>,
    alias: string,
  ): Promise<ENTITY_ID> {
    return query.where(`${alias}.name = :name`, { name: name }).getOneOrFail();
  }
}
