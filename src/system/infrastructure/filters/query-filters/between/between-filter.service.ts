import { BetweenFilterInvalidValuesException } from './between-filter-invalid-values.exception';
import { FilterService } from '../filter.service';
import { IFilterCondition } from '../filter-condition.interface';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export class BetweenFilterService extends FilterService {
  protected get pattern(): RegExp {
    return /(?<field>\w+\.\w+)\s+(?<operator>(btw|not btw))\s+(?<value>.+)/;
  }

  validate(filterCondition: IFilterCondition): void {
    if (!ValidationHelper.isDefined(filterCondition.rawValue))
      throw new BetweenFilterInvalidValuesException();
    this.validateValue(filterCondition.rawValue);
  }

  protected setValueAndPredicateLayout(
    filterCondition: IFilterCondition,
  ): void {
    const values = this.getValues(filterCondition.rawValue);
    filterCondition.value = values;
    if (filterCondition.operator === 'btw')
      filterCondition.predicateLayout = `${filterCondition.field} BETWEEN _LEFT_VALUE_ AND _RIGHT_VALUE_`;
    if (filterCondition.operator === 'not btw')
      filterCondition.predicateLayout = `${filterCondition.field} NOT BETWEEN _LEFT_VALUE_ AND _RIGHT_VALUE_`;
  }

  private validateValue(value: string): void {
    const values = this.getValues(value);
    if (
      !ValidationHelper.isDefined(values[0]) ||
      !ValidationHelper.isDefined(values[1]) ||
      values[1] !== 'and' ||
      !ValidationHelper.isDefined(values[2])
    )
      throw new BetweenFilterInvalidValuesException();
  }

  private getValues(value: string): string[] {
    const regex = /(?<value1>.+)\s+(?<operator>(and))\s+(?<value2>.+)/;
    const result = regex.exec(value);
    return [result.groups.value1, result.groups.operator, result.groups.value2];
  }
}
