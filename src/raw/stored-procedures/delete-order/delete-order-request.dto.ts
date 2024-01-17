import { IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class DeleteOrderRequestDto extends PhoneNumberDto {
  @IsInt()
  dslamportId: number;
}
