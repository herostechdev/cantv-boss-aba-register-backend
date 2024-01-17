import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class GetAbaDataFromRequestsRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;
}
