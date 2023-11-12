import { IsOptional, IsString } from 'class-validator';

export class CRMCustomerDto {
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
