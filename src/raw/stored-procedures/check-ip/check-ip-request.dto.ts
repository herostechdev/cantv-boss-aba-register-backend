import { IsInt, IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class CheckIpRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  dslamportId: number;

  @IsString()
  @IsOptional()
  loginInstall?: string;
}
