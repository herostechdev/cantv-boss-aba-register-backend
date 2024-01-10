import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetStateFromSerialStatusConstants } from './get-state-from-serial-status.constants';

export interface IGetStateFromSerialResponse
  extends IStatusResponse<GetStateFromSerialStatusConstants> {
  states: any[];
}
