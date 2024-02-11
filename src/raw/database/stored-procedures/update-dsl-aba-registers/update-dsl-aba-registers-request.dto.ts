import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class UpdateDslAbaRegistersRequestDto extends PhoneNumberDto {
  @IsString()
  registerStatus: string;
}
