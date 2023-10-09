import { IsString } from 'class-validator';

export class FindPreOrderRequestDto {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;
}
