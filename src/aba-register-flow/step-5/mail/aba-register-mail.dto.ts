import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class AbaRegisterMailDto implements IPhoneNumber {
  @IsString()
  areaCode: string | number;

  @IsString()
  phoneNumber: string | number;
}
