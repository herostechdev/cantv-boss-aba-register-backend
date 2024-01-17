import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetAbaPlanForKenanRequestDto extends PhoneNumberDto {
  @IsString()
  technicalPlanName: string;
}
