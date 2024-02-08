import { IsInt, IsOptional } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetAndRegisterQualifOfServiceDto extends PhoneNumberDto {
  @IsInt()
  @IsOptional()
  customerId?: number;
}
