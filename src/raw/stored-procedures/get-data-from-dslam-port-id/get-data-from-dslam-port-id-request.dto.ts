import { IsInt } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class GetDataFromDSLAMPortIdRequestDto extends PhoneNumberDto {
  @IsInt()
  dslamPortId: number;
}
