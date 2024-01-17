import { IsIP, IsInt, IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class AbaRegisterValidateCustomerRequestDto extends PhoneNumberDto {
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
