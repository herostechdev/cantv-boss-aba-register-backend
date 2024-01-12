import { IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/phone-number.interface';

export class DeleteOrderRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  dslamportId: number;
}
