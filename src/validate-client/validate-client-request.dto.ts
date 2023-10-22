import { IsDate, IsIP, IsInt, IsOptional, IsString } from 'class-validator';

export class ValidateClientRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  clientType: string;

  @IsInt()
  @IsOptional()
  orderId?: number;
}
