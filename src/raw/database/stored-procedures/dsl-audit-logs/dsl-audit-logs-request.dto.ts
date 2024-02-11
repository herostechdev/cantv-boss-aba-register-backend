import { IsIP, IsInt, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class DSLAuditLogsRequestDto extends PhoneNumberDto {
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
