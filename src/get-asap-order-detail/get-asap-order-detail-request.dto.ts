import { IsString } from 'class-validator';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';

export class GetASAPOrderDetailRequestDto
  implements IGetASAPOrderDetailRequest
{
  @IsString()
  orderId: string;
}
