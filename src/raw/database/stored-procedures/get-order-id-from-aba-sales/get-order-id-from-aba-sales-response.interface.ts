import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetOrderIdFromABASalesStatusConstants } from './get-order-id-from-aba-sales-status.constants';

export interface IGetOrderIdFromABASalesResponse
  extends IStatusResponse<GetOrderIdFromABASalesStatusConstants> {
  orderId: number;
}
