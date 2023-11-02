import { IsIP, IsInt, IsOptional, IsString } from 'class-validator';

export class ValidateCustomerRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  customerType: string;

  @IsInt()
  @IsOptional()
  orderId?: number;
}
