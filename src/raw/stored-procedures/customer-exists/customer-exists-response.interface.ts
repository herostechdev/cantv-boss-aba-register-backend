import { IStatusResponse } from 'src/responses/status-response.interface';
import { CustomerExistsStatusConstants } from './customer-exists-status.constants';

export interface ICustomerExistsResponse
  extends IStatusResponse<CustomerExistsStatusConstants> {
  customerClassName: string;
}
