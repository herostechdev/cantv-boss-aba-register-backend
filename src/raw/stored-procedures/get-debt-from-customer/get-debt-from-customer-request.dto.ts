import { IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class GetDebtFromCustomerRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  customerInstanceId: number;
}
