import { IsOptional, IsString } from 'class-validator';
import { ICRMGetCustomerRequestBody } from './crm-get-customer-request-body.interface';

export class CRMGetCustomerRequestDto implements ICRMGetCustomerRequestBody {
  @IsString()
  @IsOptional()
  CUST_ID?: string;

  @IsString()
  @IsOptional()
  NATIONAL_ID?: string;

  @IsString()
  @IsOptional()
  TAXPAYER_ID?: string;
}
