import { BossConstants } from './boss.constants';
import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { StringHelper } from 'src/system/infrastructure/helpers/string.helper';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export class BossHelper {
  public static get applicationName(): string {
    return process.env.APP_NAME ?? BossConstants.UNKNOWN;
  }

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

  public static getIdentificationDocument(
    identificationDocument: string,
  ): string {
    if (
      !ValidationHelper.isDefined(identificationDocument) ||
      !['V', 'E', 'P', 'J', 'G', 'T'].includes(
        identificationDocument.substring(0, 1),
      )
    ) {
      return identificationDocument;
    }
    return identificationDocument.substring(1);
  }
}
