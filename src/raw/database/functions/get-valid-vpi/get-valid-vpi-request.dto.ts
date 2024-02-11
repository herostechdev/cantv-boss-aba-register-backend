import { IsInt, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetValidVPIRequestDto extends PhoneNumberDto {
  @IsString()
  nspIP: string;

  @IsInt()
  invalidVPI: number;
}
