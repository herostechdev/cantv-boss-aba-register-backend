import { IsDate, IsIP, IsInt, IsOptional, IsString } from 'class-validator';

export class ValidateTechnicalFeasibilityRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsDate()
  @IsOptional()
  registerDate?: Date;

  @IsString()
  @IsOptional()
  registerStatus?: string;

  @IsString()
  @IsOptional()
  loginInstall?: string;

  @IsInt()
  @IsOptional()
  orderId?: number;
}
