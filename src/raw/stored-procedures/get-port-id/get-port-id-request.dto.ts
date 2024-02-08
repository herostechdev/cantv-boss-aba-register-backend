import { IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetPortIdRequestDto extends PhoneNumberDto {
  @IsString()
  nsp: string;

  @IsString()
  vpi: string;

  @IsString()
  vci: string;
}
