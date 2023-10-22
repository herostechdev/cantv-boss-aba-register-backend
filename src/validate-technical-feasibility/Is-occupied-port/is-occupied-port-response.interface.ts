import { IStatusResponse } from 'src/responses/status-number-response.interface';
import { IsOccupiedPortConstants } from './is-occupied-port.constants';

export interface IIsOccupiedPortResponse
  extends IStatusResponse<IsOccupiedPortConstants> {
  result: number;
}
