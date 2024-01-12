import { IStatusResponse } from 'src/boss/status-response.interface';
import { CustomerExistsStatusConstants } from './customer-exists-status.constants';

export interface ICustomerExistsResponse
  extends IStatusResponse<CustomerExistsStatusConstants> {
  customerClassName: string;
}
