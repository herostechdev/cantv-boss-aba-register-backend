import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class IsReservedLoginRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  login: string;
}
