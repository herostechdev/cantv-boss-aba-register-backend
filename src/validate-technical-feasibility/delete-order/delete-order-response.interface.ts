import { IStatusResponse } from 'src/responses/status-response.interface';
import { DeleteOrderStatusConstants } from './delete-order-status.constants';

export type IDeleteOrderResponse = IStatusResponse<DeleteOrderStatusConstants>;
