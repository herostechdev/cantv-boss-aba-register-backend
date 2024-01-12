import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class GetCustomerClassNameFromIdValueDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerAttributeName: string;

  @IsString()
  value: string;
}
