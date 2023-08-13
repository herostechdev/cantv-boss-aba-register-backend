import { FilterService } from '../filter.service';
import { IFilterCondition } from '../filter-condition.interface';
import { LikeFilterInvalidValueException } from './like-filter-invalid-value.exception';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export class LikeFilterService extends FilterService {
  protected get pattern(): RegExp {
    return /(?<field>\w+\.\w+)\s+(?<operator>(like|not like|llike|not llike|rlike|not rlike))\s+(?<value>.+)/;
  }

  validate(filterCondition: IFilterCondition): void {
    if (!ValidationHelper.isDefined(filterCondition.rawValue))
      throw new LikeFilterInvalidValueException();
  }

  protected setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void {
    if (filterCondition.operator === 'like')
      filterCondition.predicateLayout = `${filterCondition.field} LIKE %_VALUE_%`;
    if (filterCondition.operator === 'not like')
      filterCondition.predicateLayout = `${filterCondition.field} NOT LIKE %_VALUE_%`;
    if (filterCondition.operator === 'llike')
      filterCondition.predicateLayout = `${filterCondition.field} LIKE %_VALUE_`;
    if (filterCondition.operator === 'not llike')
      filterCondition.predicateLayout = `${filterCondition.field} NOT LIKE %_VALUE_`;
    if (filterCondition.operator === 'rlike')
      filterCondition.predicateLayout = `${filterCondition.field} LIKE _VALUE_%`;
    if (filterCondition.operator === 'not rlike')
      filterCondition.predicateLayout = `${filterCondition.field} NOT LIKE _VALUE_%`;
  }
}
