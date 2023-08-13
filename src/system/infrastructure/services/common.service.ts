import { Inject } from '@nestjs/common';
import { ICollectionResponse } from '../dtos/collections/collection-response.interface';
import { ExceptionsService } from './exceptions.service';
import { SettingsDictionary } from '../settings/settings.dictionary';
import { IFilterField } from '../filters/filter-fields-builder/filter-field.interface';

export abstract class CommonService extends ExceptionsService {
  @Inject(SettingsDictionary)
  protected readonly settingsDictionary: SettingsDictionary;

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
