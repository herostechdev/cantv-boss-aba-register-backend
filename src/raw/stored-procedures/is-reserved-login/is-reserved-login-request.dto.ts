import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class IsReservedLoginRequestDto extends PhoneNumberDto {
  @IsString()
  login: string;
}
