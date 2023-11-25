import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetCustomerInstanceIdFromIdValueStatusConstants } from './get-customer-instance-id-from-id-value-status.constants';

export interface IGetCustomerInstanceIdFromIdValueResponse
  extends IStatusResponse<GetCustomerInstanceIdFromIdValueStatusConstants> {
  customerInstanceId: number;
}
