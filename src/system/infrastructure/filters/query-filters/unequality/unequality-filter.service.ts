import { UnequalityFilterInvalidValueException } from './unequality-filter-invalid-value.exception';
import { FilterService } from '../filter.service';
import { IFilterCondition } from '../filter-condition.interface';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export class UnequalityFilterService extends FilterService {
  protected get pattern(): RegExp {
    return /(?<field>\w+\.\w+)\s+(?<operator>(gt|gte|lt|lte))\s+(?<value>.+)/;
  }

  validate(filterCondition: IFilterCondition): void {
    if (!ValidationHelper.isDefined(filterCondition.rawValue))
      throw new UnequalityFilterInvalidValueException();
  }

  protected setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void {
    if (filterCondition.operator === 'gt')
      filterCondition.predicateLayout = `${filterCondition.field} > _VALUE_`;
    if (filterCondition.operator === 'gte')
      filterCondition.predicateLayout = `${filterCondition.field} >= _VALUE_`;
    if (filterCondition.operator === 'lt')
      filterCondition.predicateLayout = `${filterCondition.field} < _VALUE_`;
    if (filterCondition.operator === 'lte')
      filterCondition.predicateLayout = `${filterCondition.field} <= _VALUE_`;
  }
}
