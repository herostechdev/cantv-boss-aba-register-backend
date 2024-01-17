import { IsString } from 'class-validator';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';

export class GetASAPOrderDetailRequestDto
  implements IGetASAPOrderDetailRequest, IPhoneNumber
{
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  orderId: string;
}
