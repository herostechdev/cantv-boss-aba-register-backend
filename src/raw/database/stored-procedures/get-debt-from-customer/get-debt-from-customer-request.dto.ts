import { IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetDebtFromCustomerRequestDto extends PhoneNumberDto {
  @IsInt()
  customerInstanceId: number;
}
