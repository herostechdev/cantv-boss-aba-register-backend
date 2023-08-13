import { IFilterCondition } from './filter-condition.interface';

export interface IFilterMatcher {
  is(queryPart: string): boolean;
  getFilterCondition(queryPart: string): IFilterCondition;
}
