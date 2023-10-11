import { IsString } from 'class-validator';

export class GetASAPOrderDetailRequestDto {
  @IsString()
  orderId: string;
}
