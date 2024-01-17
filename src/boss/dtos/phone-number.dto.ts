import { IsString } from 'class-validator';
import { IPhoneNumber } from './phone-number.interface';

export class PhoneNumberDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;
}
