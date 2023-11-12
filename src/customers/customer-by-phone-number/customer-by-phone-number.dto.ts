import { IsString } from 'class-validator';

export class CustomerByPhoneNumberDto {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;
}
