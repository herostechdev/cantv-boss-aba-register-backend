import { IsIP, IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class GetAbaDataRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsInt()
  orderId: number;
}
