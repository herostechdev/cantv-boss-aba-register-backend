import { EqualityFilterInvalidValueException } from './equality-filter-invalid-value.exception';
import { FilterService } from '../filter.service';
import { IFilterCondition } from '../filter-condition.interface';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export class EqualityFilterService extends FilterService {
  protected get pattern(): RegExp {
    return /(?<field>\w+\.\w+)\s+(?<operator>(eq|not eq))\s+(?<value>.+)/;
  }

  validate(filterCondition: IFilterCondition): void {
    if (!ValidationHelper.isDefined(filterCondition.rawValue))
      throw new EqualityFilterInvalidValueException();
  }

  protected setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void {
    if (filterCondition.operator === 'eq')
      filterCondition.predicateLayout = `${filterCondition.field} = _VALUE_`;
    if (filterCondition.operator === 'not eq')
      filterCondition.predicateLayout = `${filterCondition.field} <> _VALUE_`;
  }
}
