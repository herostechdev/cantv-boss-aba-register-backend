import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetPortIdFromIpConstants } from './get-port-id-from-ip.constants';

export interface IGetPortIdFromIpResponse
  extends IStatusResponse<GetPortIdFromIpConstants> {
  dslamportId: number;
}
