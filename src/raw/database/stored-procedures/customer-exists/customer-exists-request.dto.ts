import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class CustomerExistsRequestDto extends PhoneNumberDto {
  @IsString()
  attributeName: string;

  @IsString()
  attributeValue: string;
}
