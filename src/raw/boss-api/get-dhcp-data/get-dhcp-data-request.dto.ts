import { IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class GetDHCPDataRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  ipAddress: string;
}
