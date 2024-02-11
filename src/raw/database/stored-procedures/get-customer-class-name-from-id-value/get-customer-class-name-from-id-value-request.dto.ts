import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetCustomerClassNameFromIdValueDto extends PhoneNumberDto {
  @IsString()
  customerAttributeName: string;

  @IsString()
  value: string;
}
