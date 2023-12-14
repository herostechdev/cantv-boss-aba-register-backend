import { BossConstants } from './boss.constants';
import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { StringHelper } from 'src/system/infrastructure/helpers/string.helper';

export class BossHelper {
  public static getPhoneNumber(data: IPhoneNumber, delimiter = '-'): string {
    if (!data || !data.areaCode || !data.phoneNumber) return null;
    return `${data.areaCode}${delimiter ?? '-'}${data.phoneNumber}`;
  }

  public static getSerial(phoneNumber: string | number): string {
    if (!phoneNumber || StringHelper.isEmpty(String(phoneNumber))) return null;
    return String(phoneNumber).trim().substring(0, 3);
  }

  public static isNaturalPerson(customerClassName: string): boolean {
    return customerClassName === BossConstants.NATURAL_PERSON;
  }

  public static getIdentificationDocumentType(
    customerClassName: string,
  ): string {
    return BossHelper.isNaturalPerson(customerClassName)
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
