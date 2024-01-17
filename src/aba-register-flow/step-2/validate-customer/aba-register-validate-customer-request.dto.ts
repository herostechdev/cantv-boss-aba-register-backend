import { IsIP, IsInt, IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class AbaRegisterValidateCustomerRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  customerClassName: string;

  @IsString()
  customerIdentificationDocument: string; // Cédula o RIF

  @IsInt()
  @IsOptional()
  orderId?: number;
}
