import { IsDate, IsIP, IsInt, IsString } from 'class-validator';

export class DSLAuditLogsRequestDto {
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

  @IsDate()
  webPage: Date;

  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  comments: number;

  @IsString()
  planName: number;
}
