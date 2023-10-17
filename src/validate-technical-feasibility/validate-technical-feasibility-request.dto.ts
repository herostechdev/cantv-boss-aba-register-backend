import { IsDate, IsIP, IsInt, IsString } from 'class-validator';

export class ValidateTechnicalFeasibilityRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsDate()
  registerDate: Date;

  @IsString()
  registerStatus: string;

  @IsString()
  loginInstall: string;

  @IsInt()
  orderId: number;
}
