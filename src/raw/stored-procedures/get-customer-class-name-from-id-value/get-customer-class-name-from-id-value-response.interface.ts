import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetCustomerClassNameFromIdValueStatusConstants } from './get-customer-class-name-from-id-value-status.constants';

export interface IGetCustomerClassNameFromIdValueResponse
  extends IStatusResponse<GetCustomerClassNameFromIdValueStatusConstants> {
  customerClassName: string;
}
