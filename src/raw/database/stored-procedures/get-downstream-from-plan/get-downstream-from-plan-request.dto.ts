import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class GetDownstreamFromPlanRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  desiredPlan: string;
}
