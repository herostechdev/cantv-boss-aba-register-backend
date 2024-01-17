import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class GetCustomerInstanceIdFromIdValueRequestDto
  implements IPhoneNumber
{
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerAttributeName: string;

  @IsString()
  value: string;
}
