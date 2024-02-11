import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetCSIdAndPlanNameFromLoginRequestDto extends PhoneNumberDto {
  @IsString()
  login: string;
}
