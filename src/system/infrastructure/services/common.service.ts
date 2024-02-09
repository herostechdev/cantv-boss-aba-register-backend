import { ICollectionResponse } from '../dtos/collections/collection-response.interface';
import { ExceptionsService } from './exceptions.service';
import { IFilterField } from '../filters/filter-fields-builder/filter-field.interface';
import { Logger } from '@nestjs/common';

export abstract class CommonService extends ExceptionsService {
  protected readonly logger = new Logger();

  protected getIds(id: number | string): number[] {
    if (typeof id === 'number') return [id];
    return id.split(',').map((id) => parseInt(id));
  }

  protected getCollectionResponse<ENTITY>(
    items?: ENTITY[],
    count?: number,
    offset?: number,
    limit?: number,
    filterFields?: IFilterField[],
  ): ICollectionResponse<ENTITY> {
    items = items ?? [];
    filterFields = filterFields ?? [];
    return {
      count: this.getCount(items.length, count),
      offset: offset,
      limit: limit,
      filterFields: filterFields,
      items: items,
    };
  }

  private getCount(itemsLength: number, count?: number): number {
    count = count ?? 0;
    return count > itemsLength ? count : itemsLength;
  }
}
