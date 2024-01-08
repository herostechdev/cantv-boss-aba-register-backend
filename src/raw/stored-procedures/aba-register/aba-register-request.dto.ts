import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class AbaRegisterRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  dslamPortId: string;

  @IsString()
  customerServiceId: string;

  @IsString()
  attributeValues: string;
}
