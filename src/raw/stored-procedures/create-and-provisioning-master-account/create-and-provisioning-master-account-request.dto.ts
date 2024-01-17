import { IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class CreateAndProvisioningMasterAccountRequestDto extends PhoneNumberDto {
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
