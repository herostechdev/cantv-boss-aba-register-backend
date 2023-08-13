import { Get, Param, UseFilters } from '@nestjs/common';
import { AuthToken } from '../../decorators/auth-token.decorator';
import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { EntityCrudController } from './entity-crud-controller';
import { EntityId } from '../entities/entity-id';
import { HttpExceptionFilter } from '../../exceptions/exception-filters/http-exception.filter';
import { IItemEntityCrudService } from '../services/item-entity-crud-service.interface';
import { UpdateEntityDto } from '../../dtos/update/update-entity.dto';

export abstract class ItemEntityCrudController<
  ENTITY_ID extends EntityId,
  CREATE_DTO extends CreateEntityDto,
  UPDATE_DTO extends UpdateEntityDto,
> extends EntityCrudController<ENTITY_ID, CREATE_DTO, UPDATE_DTO> {
  protected constructor(
    protected entityCrudService: IItemEntityCrudService<
      ENTITY_ID,
      CREATE_DTO,
      UPDATE_DTO
    >,
  ) {
    super(entityCrudService);
  }

  @Get('findByName/:name')
  @UseFilters(new HttpExceptionFilter())
  findById(
    @AuthToken() authToken: string,
    @Param('name') name: string,
  ): Promise<ENTITY_ID> {
    return this.entityCrudService.findByName(name);
  }
}
