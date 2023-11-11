import { StringHelper } from 'src/system/infrastructure/helpers/string.helper';

export class BossHelper {
  public static getSerial(phoneNumber: string | number): string {
    if (!phoneNumber || StringHelper.isEmpty(String(phoneNumber))) return null;
    return String(phoneNumber).trim().substring(0, 3);
  }
}
