import { IsIpAllowedStatusConstants } from './is-ip-allowed-status.constants';
import { IStatusResponse } from 'src/boss/status-response.interface';

export interface IIsIPAllowedResponse
  extends IStatusResponse<IsIpAllowedStatusConstants> {
  expireDate: string;
}
