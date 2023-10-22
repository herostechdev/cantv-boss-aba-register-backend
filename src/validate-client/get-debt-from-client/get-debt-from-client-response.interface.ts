import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetDebtFromClientStatusConstants } from './get-debt-from-client-status.constants';

export interface IGetDebtFromClientResponse
  extends IStatusResponse<GetDebtFromClientStatusConstants> {
  clientInstanceId: number;
}
