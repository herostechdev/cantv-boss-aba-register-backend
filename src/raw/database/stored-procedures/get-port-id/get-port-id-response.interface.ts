import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetPortIdStatusConstants } from './get-port-id-status.constants';

export interface IGetPortIdResponse
  extends IStatusResponse<GetPortIdStatusConstants> {
  portId: number;
}
