import { IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class PlanByClassClientRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerClassName: string;

  @IsInt()
  dslamPortId: number; // GetPortidFromIp o GetPortId

  @IsString()
  installerLogin: string;
}
