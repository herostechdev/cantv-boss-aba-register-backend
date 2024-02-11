import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class UpdatePasswordFromLoginRequestDto implements IPhoneNumber {
  @IsString()
  @IsOptional()
  areaCode: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  repeatedPassword: string;
}
