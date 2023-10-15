import { IsString } from 'class-validator';

export class GetOrderIdFromABASalesRequestDto {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;
}
