import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class CreateAndProvisioningMasterAccountRequestDto
  implements IPhoneNumber
{
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
