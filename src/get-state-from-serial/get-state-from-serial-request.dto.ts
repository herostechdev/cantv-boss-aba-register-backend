import { IsInt } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class GetStateFromSerialRequestDto implements IPhoneNumber {
  @IsInt()
  areaCode: number;

  @IsInt()
  phoneNumber: number;
}
