import { IsInt } from 'class-validator';

export class GetStateFromSerialRequestDto {
  @IsInt()
  areaCode: number;

  @IsInt()
  phoneNumber: number;
}
