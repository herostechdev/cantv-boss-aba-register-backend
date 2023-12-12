import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class UpdateDslAbaRegistersRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  registerStatus: string;
}
