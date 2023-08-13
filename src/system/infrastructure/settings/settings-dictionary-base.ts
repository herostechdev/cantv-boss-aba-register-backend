import { Repository } from 'typeorm';
import { ISetting } from './setting.interface';
import { ArrayHelper } from '../helpers/array.helper';
import { SettingFieldType } from './setting-field-type.constants';
import { SettingInputIdsAreNotDefinedException } from './exceptions/setting-input-ids-are-not-defined.exception';
import { ValidationHelper } from '../helpers/validation.helper';
import { NotAllSettingsWereLoadedException } from './exceptions/not-all-settings-were-loaded.exception';

export abstract class SettingsDictionaryBase<ITEM_ENTITY extends ISetting> {
  constructor(protected repository: Repository<ITEM_ENTITY>) {
    this.stringMap = new Map();
    this.intMap = new Map();
    this.doubleMap = new Map();
    this.floatMap = new Map();
    this.decimalMap = new Map();
    this.booleanMap = new Map();
    this.dateMap = new Map();
    this.jsonMap = new Map();
    this.arrayMap = new Map();
  }

  private readonly stringMap: Map<string, string>;
  private readonly intMap: Map<string, number>;
  private readonly doubleMap: Map<string, number>;
  private readonly floatMap: Map<string, number>;
  private readonly decimalMap: Map<string, number>;
  private readonly booleanMap: Map<string, boolean>;
  private readonly dateMap: Map<string, Date>;
  private readonly jsonMap: Map<string, any>;
  private readonly arrayMap: Map<string, string[]>;

  loadOne(id: string): Promise<void> {
    return this.load([id]);
  }

  async load(ids: string[]): Promise<void> {
    const settings = await this.findSettings(ids);
    this.checkSettingsLoaded(ids, settings);
    this.mapSettings(settings);
  }

  private findSettings(ids: string[]): Promise<ITEM_ENTITY[]> {
    if (!ValidationHelper.isArrayWithItems(ids))
      throw new SettingInputIdsAreNotDefinedException();
    return this.repository
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: ids })
      .getMany();
  }

  private checkSettingsLoaded(ids: string[], settings: ITEM_ENTITY[]): void {
    const settingIds = settings.map((s) => s.id);
    const difference = ArrayHelper.difference(ids, settingIds);
    if (difference.length > 0) {
      throw new NotAllSettingsWereLoadedException(difference);
    }
  }

  private mapSettings(settings: ITEM_ENTITY[]): void {
    settings.forEach((setting) => {
      switch (setting.fieldType) {
        case SettingFieldType.STRING:
          this.stringMap.set(setting.id, setting.stringValue);
          break;
        case SettingFieldType.INTEGER:
          this.intMap.set(setting.id, setting.intValue);
          break;
        case SettingFieldType.DOUBLE:
          this.doubleMap.set(setting.id, setting.doubleValue);
          break;
        case SettingFieldType.FLOAT:
          this.floatMap.set(setting.id, setting.floatValue);
          break;
        case SettingFieldType.DECIMAL:
          this.decimalMap.set(setting.id, setting.decimalValue);
          break;
        case SettingFieldType.BOOLEAN:
          this.booleanMap.set(setting.id, setting.booleanValue);
          break;
        case SettingFieldType.DATE:
          this.dateMap.set(setting.id, setting.dateValue);
          break;
        case SettingFieldType.JSON:
          this.jsonMap.set(setting.id, setting.jsonValue);
          break;
        case SettingFieldType.ARRAY:
          this.arrayMap.set(setting.id, setting.arrayValue);
          break;
        default:
          break;
      }
    });
  }

  clear(): void {
    this.stringMap.clear();
    this.intMap.clear();
    this.doubleMap.clear();
    this.floatMap.clear();
    this.decimalMap.clear();
    this.booleanMap.clear();
    this.dateMap.clear();
    this.jsonMap.clear();
    this.arrayMap.clear();
  }

  getString(id: string): string {
    return this.stringMap.get(id);
  }

  getInteger(id: string): number {
    return this.intMap.get(id);
  }

  getDouble(id: string): number {
    return this.doubleMap.get(id);
  }

  getFloat(id: string): number {
    return this.floatMap.get(id);
  }

  getDecimal(id: string): number {
    return this.decimalMap.get(id);
  }

  getBoolean(id: string): boolean {
    return this.booleanMap.get(id);
  }

  getDate(id: string): Date {
    return this.dateMap.get(id);
  }

  getJSON(id: string): any {
    return this.jsonMap.get(id);
  }

  getArray(id: string): string[] {
    return this.arrayMap.get(id);
  }
}
