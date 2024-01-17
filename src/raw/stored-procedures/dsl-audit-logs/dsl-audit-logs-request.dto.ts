import { IsDate, IsIP, IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class DSLAuditLogsRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  orderId: number;

  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  activationLogin: string;

  @IsString()
  webPage: string;

  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  comments: string;

  @IsString()
  planName: string;
}
