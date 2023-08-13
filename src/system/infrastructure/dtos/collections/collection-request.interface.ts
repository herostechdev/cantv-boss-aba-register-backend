import { IFilterCondition } from '../../filters/query-filters/filter-condition.interface';
import { IPagination } from './pagination.interface';

export interface ICollectionRequest extends IPagination {
  queryFilters?: IFilterCondition[];
}
