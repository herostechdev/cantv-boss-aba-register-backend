import { IsIP, IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetAbaDataRequestDto extends PhoneNumberDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsInt()
  orderId: number;
}
