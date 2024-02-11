import { IsInt, IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class PlansByCustomerClassRequestDto extends PhoneNumberDto {
  @IsString()
  customerClassName: string;

  @IsInt()
  dslamPortId: number; // GetPortidFromIp o GetPortId

  @IsString()
  @IsOptional()
  installerLogin?: string;
}
