import { IStatusResponse } from 'src/boss/status-response.interface';
import { IsReservedLoginStatusConstants } from './is-reserved-login-status.constants';

export interface IIsReservedLoginResponse
  extends IStatusResponse<IsReservedLoginStatusConstants> {
  result: number;
}
