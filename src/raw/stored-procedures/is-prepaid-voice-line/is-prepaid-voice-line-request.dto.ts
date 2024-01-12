import { IsOptional } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class IsPrepaidVoiceLineRequestDto implements IPhoneNumber {
  @IsOptional()
  areaCode: string;

  @IsOptional()
  phoneNumber: string;
}
