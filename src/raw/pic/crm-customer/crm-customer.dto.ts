import { IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class CRMCustomerDto extends PhoneNumberDto {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  identificationDocument?: string;

  @IsString()
  @IsOptional()
  fiscalNumber?: string;
}
