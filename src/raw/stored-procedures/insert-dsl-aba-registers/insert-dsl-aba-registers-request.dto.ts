import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class InsertDslAbaRegistersRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  registerStatus: string;

  @IsString()
  registerDate: string;

  @IsString()
  @IsOptional()
  loginInstall?: string;
}
