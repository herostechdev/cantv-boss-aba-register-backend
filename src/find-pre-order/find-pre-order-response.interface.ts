import { FindPreOrderStatusConstants } from './find-pre-order-status.constants';
import { IStatusResponse } from 'src/responses/status-response.interface';

export interface IFindPreOrderResponse
  extends IStatusResponse<FindPreOrderStatusConstants> {
  orderId: number;
}
