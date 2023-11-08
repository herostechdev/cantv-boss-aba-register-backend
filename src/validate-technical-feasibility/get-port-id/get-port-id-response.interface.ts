import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetPortIdStatusConstants } from './get-port-id-status.constants';

export interface IGetPortIdResponse
  extends IStatusResponse<GetPortIdStatusConstants> {
  portId: number;
}
