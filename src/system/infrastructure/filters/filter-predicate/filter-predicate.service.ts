import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { FieldBooleanInvalidException } from './field-boolean-invalid.exeption';
import { FieldDateInvalidException } from './field-date-invalid.exeption';
import { FieldNumberInvalidException } from './field-number-invalid.exeption';
import { IFilterCondition } from '../query-filters/filter-condition.interface';
import { IFilterField } from '../filter-fields-builder/filter-field.interface';

@Injectable()
export class FilterPredicateService {
  get(
    fields: Map<string, IFilterField>,
    filterConditions: IFilterCondition[],
  ): string[] {
    if (!filterConditions) return null;
    return filterConditions
      .map((filterCondition) => {
        if (!fields.has(filterCondition.field)) return null;
        return this.getPredicate(
          filterCondition,
          fields.get(filterCondition.field),
        );
      })
      .filter((filterCondition) => filterCondition !== null);
  }

  private getPredicate(
    filterCondition: IFilterCondition,
    field: IFilterField,
  ): string {
    switch (filterCondition.operator) {
      case 'btw':
      case 'not btw':
        return this.getBetweenPredicate(filterCondition, field);
      case 'eq':
      case 'not eq':
      case 'in':
      case 'not in':
      case 'like':
      case 'not like':
      case 'llike':
      case 'not llike':
      case 'rlike':
      case 'not rlike':
      case 'is null':
      case 'is not null':
      case 'gt':
      case 'gte':
      case 'lt':
      case 'lte':
        return this.getCommonPredicate(filterCondition, field);
      default:
        return null;
    }
  }

  private getCommonPredicate(
    filterCondition: IFilterCondition,
    field: IFilterField,
  ): string {
    const value: string = Array.isArray(filterCondition.value)
      ? filterCondition.value[0]
      : filterCondition.value;
    return filterCondition.predicateLayout.replace(
      '__VALUE_',
      this.formatValue(field, value),
    );
  }

  private getBetweenPredicate(
    filterCondition: IFilterCondition,
    field: IFilterField,
  ): string {
    return filterCondition.predicateLayout
      .replace(
        '_LEFT_VALUE_',
        this.formatValue(field, filterCondition.value[0]),
      )
      .replace(
        '_RIGHT_VALUE_',
        this.formatValue(field, filterCondition.value[1]),
      );
  }

  private formatValue(field: IFilterField, value: string): string {
    switch (field.fieldType) {
      case 'number':
        return this.getNumber(field.field, value);
      case 'boolean':
        return this.getBoolean(field.field, value);
      case 'date':
        return this.getDate(field.field, value);
      default:
        return this.getString(field.field, value);
    }
  }

  private getNumber(field: string, value: string): string {
    if (Number.isNaN(value))
      throw new FieldNumberInvalidException(field, value);
    return value;
  }

  private getBoolean(field: string, value: string): string {
    if (value !== 'true' && value !== 'false')
      throw new FieldBooleanInvalidException(field, value);
    return value;
  }

  private getDate(field: string, value: string): string {
    if (!DateTime.fromFormat(value, 'dd/MM/yyyy').isValid)
      throw new FieldDateInvalidException(field, value);
    return `'${value}'`;
  }

  private getString(field: string, value: string): string {
    return `'${value}'`;
  }
}
