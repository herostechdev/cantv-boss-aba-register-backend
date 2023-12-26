import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class AbaRegisterLoginRequestDto implements IPhoneNumber {
  @IsString()
  @IsOptional()
  areaCode: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  userlogin: string;

  @IsString()
  password: string;
}
