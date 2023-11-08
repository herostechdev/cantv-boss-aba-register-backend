import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetDebtFromCustomerStatusConstants } from './get-debt-from-customer-status.constants';

export interface IGetDebtFromCustomerResponse
  extends IStatusResponse<GetDebtFromCustomerStatusConstants> {
  clientInstanceId: number;
}
