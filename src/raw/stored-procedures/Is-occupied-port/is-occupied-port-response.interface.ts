import { IStatusResponse } from 'src/boss/status-response.interface';
import { IsOccupiedPortStatusConstants } from './is-occupied-port-status.constants';

export interface IIsOccupiedPortResponse
  extends IStatusResponse<IsOccupiedPortStatusConstants> {
  result: number;
}
