import { FilterService } from '../filter.service';
import { IFilterCondition } from '../filter-condition.interface';
import { InFilterInvalidValuesException } from './in-filter-invalid-values.exception';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export class InFilterService extends FilterService {
  protected get pattern(): RegExp {
    return /(?<field>\w+\.\w+)\s+(?<operator>(in|not in))\s+(?<value>.+)/;
  }

  validate(filterCondition: IFilterCondition): void {
    if (!ValidationHelper.isDefined(filterCondition.rawValue))
      throw new InFilterInvalidValuesException();
    this.validateValue(filterCondition.rawValue);
  }

  protected setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void {
    if (filterCondition.operator === 'in')
      filterCondition.predicateLayout = `${filterCondition.field} IN (_VALUE_)`;
    if (filterCondition.operator === 'not in')
      filterCondition.predicateLayout = `${filterCondition.field} NOT IN (_VALUE_)`;
  }

  private validateValue(value: string): void {
    if (!value.includes(',')) throw new InFilterInvalidValuesException();
  }
}
