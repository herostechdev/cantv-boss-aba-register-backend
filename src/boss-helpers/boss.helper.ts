import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { StringHelper } from 'src/system/infrastructure/helpers/string.helper';

export class BossHelper {
  public static getPhoneNumber(data: IPhoneNumber): string {
    if (!data || !data.areaCode || data.phoneNumber) return null;
    return `${data.areaCode}-${data.phoneNumber}`;
  }

  public static getSerial(phoneNumber: string | number): string {
    if (!phoneNumber || StringHelper.isEmpty(String(phoneNumber))) return null;
    return String(phoneNumber).trim().substring(0, 3);
  }
}
