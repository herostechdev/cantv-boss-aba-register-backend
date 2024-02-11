import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetCustomerInstanceIdFromIdValueRequestDto extends PhoneNumberDto {
  @IsString()
  customerAttributeName: string;

  @IsString()
  value: string;
}
