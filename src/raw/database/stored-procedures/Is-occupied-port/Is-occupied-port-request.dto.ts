import { IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class IsOccupiedPortRequestDto extends PhoneNumberDto {
  @IsInt()
  portId: number;
}
