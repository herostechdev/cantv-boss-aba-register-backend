import { IsOptional, IsString } from 'class-validator';

export class CRMGetCustomerDto {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  identificacionDocument?: string;

  @IsString()
  @IsOptional()
  fiscalNumber?: string;
}
