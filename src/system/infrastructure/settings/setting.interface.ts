import { IItemEntity } from '../entities/interfaces/item-entity.interface';
import { SettingFieldType } from './setting-field-type.constants';

export interface ISetting extends IItemEntity {
  fieldType: SettingFieldType;
  stringValue: string;
  intValue: number;
  doubleValue: number;
  floatValue: number;
  decimalValue: number;
  booleanValue: boolean;
  dateValue: Date;
  jsonValue: any;
  arrayValue: string[];
}
