import { Injectable } from '@nestjs/common';
import { IFilterField } from './filter-field.interface';

@Injectable()
export class FilterFieldsBuilder {
  constructor() {
    this.fields = new Map<string, IFilterField>();
  }

  private fields: Map<string, IFilterField>;

  addField(field: IFilterField): FilterFieldsBuilder {
    if (!field) return this;
    this.fields.set(field.field, field);
    return this;
  }

  addFields(fields: IFilterField[]): FilterFieldsBuilder {
    if (!fields || fields.length === 0) return this;
    fields.forEach((field) => this.fields.set(field.field, field));
    return this;
  }

  clear(): FilterFieldsBuilder {
    this.fields.clear();
    return this;
  }

  contains(field: string): boolean {
    return this.fields.has(field);
  }

  getMap(): Map<string, IFilterField> {
    return this.fields;
  }

  remove(field: string): FilterFieldsBuilder {
    this.fields.delete(field);
    return this;
  }
}
