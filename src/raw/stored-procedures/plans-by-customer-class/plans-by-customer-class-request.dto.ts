import { IsInt, IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class PlansByCustomerClassRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerClassName: string;

  @IsInt()
  dslamPortId: number; // GetPortidFromIp o GetPortId

  @IsString()
  @IsOptional()
  installerLogin?: string;
}
