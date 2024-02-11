import { IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class AbaRegisterRequestDto extends PhoneNumberDto {
  @IsInt()
  dslamPortId: number;

  @IsInt()
  customerServiceId: number;
}
