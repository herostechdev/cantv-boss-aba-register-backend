import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetAllValuesFromCustomerValuesRequestDto extends PhoneNumberDto {
  @IsString()
  className: string;

  @IsString()
  attributeName: string;

  @IsString()
  value: string;
}
