import { IsIP, IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class IsIPAllowedRequestDto implements IPhoneNumber {
  @IsString()
  @IsOptional()
  areaCode: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;
}
