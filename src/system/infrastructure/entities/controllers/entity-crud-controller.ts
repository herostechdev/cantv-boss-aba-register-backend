import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { AuthToken } from '../../decorators/auth-token.decorator';
import { CreateEntityDto } from '../../dtos/create/create-entity.dto';
import { EntityId } from '../entities/entity-id';
import { HttpExceptionFilter } from '../../exceptions/exception-filters/http-exception.filter';
import { ICollectionResponse } from '../../dtos/collections/collection-response.interface';
import { IEntityCrudService } from '../services/entity-crud-service.interface';
import { IFilterCondition } from '../../filters/query-filters/filter-condition.interface';
import { IPagination } from '../../dtos/collections/pagination.interface';
import { Pagination } from '../../decorators/pagination.decorator';
import { QueryFilters } from '../../filters/query-filters/query-filters.decorator';
import { UpdateEntityDto } from '../../dtos/update/update-entity.dto';
import { HttpCodeConstants } from '../../helpers/http-code-constants';
import { ContextHelper } from '../../contexts/context.helper';

export abstract class EntityCrudController<
  ENTITY_ID extends EntityId,
  CREATE_DTO extends CreateEntityDto,
  UPDATE_DTO extends UpdateEntityDto,
> {
  protected constructor(
    protected entityCrudService: IEntityCrudService<
      ENTITY_ID,
      CREATE_DTO,
      UPDATE_DTO
    >,
  ) {}

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async find(
    @AuthToken() authToken: string,
    @Pagination() pagination: IPagination,
    @QueryFilters() queryFilters?: IFilterCondition[],
  ): Promise<ICollectionResponse<ENTITY_ID>> {
    ContextHelper.get(authToken, {
      limit: pagination.limit,
      offset: pagination.offset,
      queryFilters: queryFilters,
    });
    return this.entityCrudService.find({
      limit: pagination.limit,
      offset: pagination.offset,
      queryFilters: queryFilters,
    });
  }

  @Get('findAndCount')
  @UseFilters(new HttpExceptionFilter())
  async findAndCount(
    @AuthToken() authToken: string,
    @Pagination() pagination: IPagination,
    @QueryFilters() queryFilters?: IFilterCondition[],
  ): Promise<ICollectionResponse<ENTITY_ID>> {
    return this.entityCrudService.findAndCount({
      limit: pagination.limit,
      offset: pagination.offset,
      queryFilters: queryFilters,
    });
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  findById(
    @AuthToken() authToken: string,
    @Param('id') id: string,
  ): Promise<ENTITY_ID> {
    return this.entityCrudService.findById(id);
  }

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_201_CREATED)
  @UseFilters(new HttpExceptionFilter())
  create(
    @AuthToken() authToken: string,
    @Body() dto: CREATE_DTO,
  ): Promise<ENTITY_ID> {
    return this.entityCrudService.create(dto);
  }

  @Put(':id')
  @UseFilters(new HttpExceptionFilter())
  update(
    @AuthToken() authToken: string,
    @Param('id') id: string,
    @Body() dto: UPDATE_DTO,
  ): Promise<ENTITY_ID> {
    return this.entityCrudService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpCodeConstants.HTTP_204_NO_CONTENT)
  @UseFilters(new HttpExceptionFilter())
  delete(
    @AuthToken() authToken: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.entityCrudService.delete(id);
  }
}
