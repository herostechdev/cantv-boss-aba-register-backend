import { IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class InsertDslAbaRegistersRequestDto extends PhoneNumberDto {
  @IsString()
  registerStatus: string;

  @IsString()
  registerDate: string;

  @IsString()
  @IsOptional()
  loginInstall?: string;
}
