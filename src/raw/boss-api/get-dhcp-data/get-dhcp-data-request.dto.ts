import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetDHCPDataRequestDto extends PhoneNumberDto {
  @IsString()
  ipAddress: string;
}
