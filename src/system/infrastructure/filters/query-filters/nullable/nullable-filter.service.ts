import { FilterService } from '../filter.service';
import { IFilterCondition } from '../filter-condition.interface';

export class NullableFilterService extends FilterService {
  protected get pattern(): RegExp {
    return /(?<field>\w+\.\w+)\s+(?<operator>(is null|is not null))/;
  }

  validate(filterCondition: IFilterCondition): void {
    return;
  }

  protected setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void {
    if (filterCondition.operator === 'is null')
      filterCondition.predicateLayout = `${filterCondition.field} IS NULL`;
    if (filterCondition.operator === 'is not null')
      filterCondition.predicateLayout = `${filterCondition.field} IS NOT NULL`;
  }
}
