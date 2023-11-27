import {
  IsBoolean,
  IsDate,
  IsIP,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class ValidateTechnicalFeasibilityRequestDto implements IPhoneNumber {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  registerDate?: string;

  @IsString()
  @IsOptional()
  registerStatus?: string;

  @IsString()
  @IsOptional()
  loginInstall?: string;

  @IsInt()
  @IsOptional()
  orderId?: number;

  @IsString()
  nsp: string;

  @IsInt()
  vpi: number;

  @IsInt()
  vci: number;

  @IsBoolean()
  isAutoInstallation: boolean;
}
