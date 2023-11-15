import { IsOptional, IsString } from 'class-validator';

export class CRMCustomerDto {
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
