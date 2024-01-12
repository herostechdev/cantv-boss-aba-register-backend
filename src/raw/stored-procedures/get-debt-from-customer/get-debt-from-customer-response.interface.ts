import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetDebtFromCustomerStatusConstants } from './get-debt-from-customer-status.constants';

export interface IGetDebtFromCustomerResponse
  extends IStatusResponse<GetDebtFromCustomerStatusConstants> {
  amount: number;
}
