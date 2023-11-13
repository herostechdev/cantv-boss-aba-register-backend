import { IsIP, IsInt, IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class ConfirmRegistrationRequestDto implements IPhoneNumber {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerType: string;

  @IsInt()
  @IsOptional()
  orderId?: number;

  @IsString()
  @IsOptional()
  abaPlan?: string;

  @IsString()
  @IsOptional()
  installerLogin?: string;

  @IsString()
  @IsOptional()
  contractLogin?: string;
}
