import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetClientInstanceIdFromIdValueStatusConstants } from './get-client-instance-id-from-id-value-status.constants';

export interface IGetClientInstanceIdFromIdValueResponse
  extends IStatusResponse<GetClientInstanceIdFromIdValueStatusConstants> {
  clientInstanceId: number;
}
