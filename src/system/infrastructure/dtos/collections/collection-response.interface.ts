import { IFilterField } from '../../filters/filter-fields-builder/filter-field.interface';

export interface ICollectionResponse<T> {
  count: number;
  offset?: number;
  limit?: number;
  filterFields?: IFilterField[];
  items: T[];
}
