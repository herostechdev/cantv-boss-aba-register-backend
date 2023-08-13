import { Inject } from '@nestjs/common';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { CommonService } from '../../services/common.service';
import { EntityId } from '../entities/entity-id';
import { FilterFieldsBuilder } from '../../filters/filter-fields-builder/filter-fields.builder';
import { FilterPredicateService } from '../../filters/filter-predicate/filter-predicate.service';
import { ICollectionRequest } from '../../dtos/collections/collection-request.interface';
import { ICollectionResponse } from '../../dtos/collections/collection-response.interface';
import { IEntityFindService } from './entity-find-service.interface';
import { IFilterCondition } from '../../filters/query-filters/filter-condition.interface';

export abstract class EntityFindService<ENTITY_ID extends EntityId>
  extends CommonService
  implements IEntityFindService<ENTITY_ID>
{
  @Inject(FilterFieldsBuilder)
  protected readonly filterFieldsBuilder: FilterFieldsBuilder;

  @Inject(FilterPredicateService)
  protected readonly filterPredicateService: FilterPredicateService;

  constructor(
    protected repository: Repository<ENTITY_ID>, // protected readonly logService: LogsService,
  ) {
    // super(logService);
    super();
  }

  async find(
    dto?: ICollectionRequest,
  ): Promise<ICollectionResponse<ENTITY_ID>> {
    try {
      const query = this.getFindQueryBuilder(dto);
      const items = await query.getMany();
      return this.getCollectionResponse(items, null, dto.offset, dto.limit);
    } catch (error) {
      this.exceptionHandler(error, error);
    }
  }

  async findAndCount(
    dto?: ICollectionRequest,
  ): Promise<ICollectionResponse<ENTITY_ID>> {
    try {
      const query = this.getFindQueryBuilder(dto);
      const [items, count] = await query.getManyAndCount();
      return this.getCollectionResponse(items, count, dto.offset, dto.limit);
    } catch (error) {
      this.exceptionHandler(error, error);
    }
  }

  private getFindQueryBuilder(
    dto?: ICollectionRequest,
  ): SelectQueryBuilder<ENTITY_ID> {
    const alias = this.constructor.name;
    const query = this.repository.createQueryBuilder(alias);
    this.setOffsetAndLimit(query, dto);
    this.customFind(query, alias);
    this.addCustomFilters(query, dto.queryFilters);
    return query;
  }

  private setOffsetAndLimit(
    query: SelectQueryBuilder<ENTITY_ID>,
    dto?: ICollectionRequest,
  ): void {
    if (
      dto &&
      dto.offset !== null &&
      dto.offset >= 0 &&
      dto.limit !== null &&
      dto.limit > 0
    ) {
      query.skip(dto.offset).take(dto.limit);
    }
  }

  protected customFind(
    query: SelectQueryBuilder<ENTITY_ID>,
    alias: string,
  ): void {
    return;
  }

  private addCustomFilters(
    query: SelectQueryBuilder<ENTITY_ID>,
    filterConditions: IFilterCondition[],
  ): void {
    const fields = this.filterFieldsBuilder.getMap();
    const conditions = this.filterPredicateService.get(
      fields,
      filterConditions,
    );
    if (!conditions) return;
    conditions.forEach((condition) => query.andWhere(condition));
  }

  async findById(id: string): Promise<ENTITY_ID> {
    try {
      const alias = this.constructor.name;
      const query = this.repository.createQueryBuilder(alias);
      return await this.customFindById(id, query, alias);
    } catch (error) {
      this.exceptionHandler(error, id);
    }
  }

  protected customFindById(
    id: string,
    query: SelectQueryBuilder<ENTITY_ID>,
    alias: string,
  ): Promise<ENTITY_ID> {
    return query.where(`${alias}.id = :id`, { id: id }).getOneOrFail();
  }

  async exists(id: string): Promise<void> {
    try {
      await this.repository.findOneOrFail({
        where: { id: id },
        select: ['id'],
      } as FindOneOptions);
    } catch (error) {
      this.exceptionHandler(error, id);
    }
  }
}
