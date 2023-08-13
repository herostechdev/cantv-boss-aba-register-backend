import { IFilterCondition } from './filter-condition.interface';
import { IFilterMatcher } from './filter-matcher.interface';

export abstract class FilterService implements IFilterMatcher {
  protected abstract get pattern(): RegExp;

  is(queryPart: string): boolean {
    return this.pattern.test(queryPart);
  }

  getFilterCondition(queryPart: string): IFilterCondition {
    const filterCondition = this.match(queryPart);
    this.validate(filterCondition);
    this.setValueAndPredicateLayout(filterCondition);
    return filterCondition;
  }

  private match(queryPart: string): IFilterCondition {
    const result = this.pattern.exec(queryPart);
    return {
      field: result.groups.field,
      operator: result.groups.operator.toLowerCase(),
      rawValue: result.groups.value,
      value: result.groups.value,
      predicateLayout: null,
    };
  }

  protected abstract validate(filterCondition: IFilterCondition): void;

  protected abstract setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void;
}
