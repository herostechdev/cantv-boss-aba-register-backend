import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetPortIdFromIpStatusConstants } from './get-port-id-from-ip-status.constants';

export interface IGetPortIdFromIpResponse
  extends IStatusResponse<GetPortIdFromIpStatusConstants> {
  dslamportId: number;
}
