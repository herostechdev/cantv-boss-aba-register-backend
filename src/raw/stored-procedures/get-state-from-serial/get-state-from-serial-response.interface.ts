import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetStateFromSerialStatusConstants } from './get-state-from-serial-status.constants';

export interface IGetStateFromSerialResponse
  extends IStatusResponse<GetStateFromSerialStatusConstants> {
  states: any[];
}
