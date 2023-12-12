import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class CRMCustomerDto implements IPhoneNumber {
  @IsString()
  areaCode: string | number;

  @IsString()
  phoneNumber: string | number;

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
