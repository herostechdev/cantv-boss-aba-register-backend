import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class CreateAndProvisioningCustomerRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerClassName: string;

  @IsString()
  attributeValues: string;

  @IsString()
  customerIdentificationDocument: string;

  @IsString()
  technicalPlanName: string;

  @IsString()
  customerAddress1: string;

  @IsString()
  @IsOptional()
  customerAddress2?: string;

  @IsString()
  customerCity: string;

  @IsString()
  customerState: string;

  @IsString()
  @IsOptional()
  zipCode?: string;
}
