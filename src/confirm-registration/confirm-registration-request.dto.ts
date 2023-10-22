import { IsIP, IsInt, IsOptional, IsString } from 'class-validator';

export class ConfirmRegistrationRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  clientType: string;

  @IsInt()
  @IsOptional()
  orderId?: number;

  @IsString()
  abaPlan: string;
}
