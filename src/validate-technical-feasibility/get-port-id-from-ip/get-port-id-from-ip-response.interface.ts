import { IStatusResponse } from 'src/responses/status-number-response.interface';
import { GetPortIdFromIpConstants } from './get-port-id-from-ip.constants';

export interface IGetPortIdFromIpResponse
  extends IStatusResponse<GetPortIdFromIpConstants> {
  dslamportId: number;
}
