import { Repository } from 'typeorm';
import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { EntityId } from '../entities/entity-id';
import { IdAndEntityIdAreDistincsException } from '../../exceptions/id-and-entity-id-are-distincts.exception';
import { IEntityCrudService } from './entity-crud-service.interface';
import { UpdateEntityDto } from '../../dtos/update/update-entity.dto';
import { EntityFindService } from './entity-find-service';

export abstract class EntityCrudService<
    ENTITY_ID extends EntityId,
    CREATE_DTO extends CreateEntityDto,
    UPDATE_DTO extends UpdateEntityDto,
  >
  extends EntityFindService<ENTITY_ID>
  implements IEntityCrudService<ENTITY_ID, CREATE_DTO, UPDATE_DTO>
{
  constructor(
    protected repository: Repository<ENTITY_ID>, // protected readonly logService: LogsService,
  ) {
    // super(logService);
    super(repository);
  }

  async create(dto: CREATE_DTO): Promise<ENTITY_ID> {
    try {
      return await this.customCreate(dto);
    } catch (error) {
      this.exceptionHandler(error, dto);
    }
  }

  protected abstract customCreate(entity: CREATE_DTO): Promise<ENTITY_ID>;

  async update(id: string, dto: Partial<UPDATE_DTO>): Promise<ENTITY_ID> {
    try {
      if (!id || id !== dto?.id) {
        throw new IdAndEntityIdAreDistincsException(id, dto?.id);
      }
      await this.customUpdate(id, dto);
      return await this.findById(id);
    } catch (error) {
      this.exceptionHandler(error, id);
    }
  }

  protected customUpdate(id: string, dto: Partial<UPDATE_DTO>): Promise<void> {
    return null;
  }

  async delete(id: number | string): Promise<void> {
    try {
      const ids = this.getIds(id);
      await this.repository.delete(ids);
      return await this.customDelete(ids);
    } catch (error) {
      this.exceptionHandler(error, id);
    }
  }

  protected customDelete(ids: number[]): Promise<void> {
    return null;
  }
}
