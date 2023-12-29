import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetAllValuesFromCustomerValuesStatusConstants } from './get-all-values-from-customer-values-status.constants';

export interface IGetAllValuesFromCustomerValuesResponse
  extends IStatusResponse<GetAllValuesFromCustomerValuesStatusConstants> {
  name: string;
  value: string;
}
