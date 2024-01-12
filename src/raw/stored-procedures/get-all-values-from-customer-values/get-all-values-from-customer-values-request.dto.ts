import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class GetAllValuesFromCustomerValuesRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  className: string;

  @IsString()
  attributeName: string;

  @IsString()
  value: string;
}
