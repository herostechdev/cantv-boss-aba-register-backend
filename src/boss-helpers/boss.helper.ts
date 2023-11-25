import { BossConstants } from './boss.constants';
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

  public static getIdentificationDocumentType(
    customerClassName: string,
  ): string {
    return customerClassName === BossConstants.NATURAL_PERSON
      ? BossConstants.NATIONAL_IDENTIFICATION_DOCUMENT_TYPE
      : BossConstants.FISCAL_IDENTIFICATION_DOCUMENT_TYPE;
  }

  public static getAutomaticCustomerUserName(
    areaCode: string,
    phoneNumber: string,
    customerIdentificationDocument: string,
  ): string {
    return `${areaCode}${phoneNumber}_${customerIdentificationDocument}`;
  }
}
