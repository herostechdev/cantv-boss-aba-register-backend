import { IsInt, IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class CheckIpRequestDto extends PhoneNumberDto {
  @IsInt()
  dslamportId: number;

  @IsString()
  @IsOptional()
  loginInstall?: string;
}
