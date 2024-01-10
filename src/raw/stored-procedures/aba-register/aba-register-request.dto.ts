import { IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class AbaRegisterRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  dslamPortId: number;

  @IsInt()
  customerServiceId: number;

  @IsString()
  attributeValues: string;
}
