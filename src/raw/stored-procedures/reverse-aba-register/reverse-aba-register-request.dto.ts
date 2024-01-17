import { IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class ReverseAbaRegisterRequestDto extends PhoneNumberDto {
  @IsInt()
  customerServiceId: number;
}
