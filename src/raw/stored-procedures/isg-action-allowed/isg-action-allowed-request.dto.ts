import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class ISGActionAllowedRequestDto implements IPhoneNumber {
  @IsString()
  @IsOptional()
  areaCode: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  groupName: string;

  @IsString()
  action: string;
}
