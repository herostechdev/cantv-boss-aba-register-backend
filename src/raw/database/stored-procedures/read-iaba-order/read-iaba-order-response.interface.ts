import { IStatusResponse } from 'src/boss/status-response.interface';
import { ReadIABAOrderStatusConstants } from './read-iaba-order-status.constants';

export type IReadIABAOrderResponse =
  IStatusResponse<ReadIABAOrderStatusConstants>;
