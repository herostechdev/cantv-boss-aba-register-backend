import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetAllValuesFromClientValuesStatusConstants } from './get-all-values-from-client-values-status.constants';

export interface IGetAllValuesFromClientValuesResponse
  extends IStatusResponse<GetAllValuesFromClientValuesStatusConstants> {
  name: string;
  value: string;
}
