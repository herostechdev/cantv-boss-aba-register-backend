import { IsIpAllowedStatusConstants } from './is-ip-allowed-status.constants';
import { IStatusResponse } from 'src/responses/status-response.interface';

export type IIsIPAllowedRestrictedResponse = Pick<
  IIsIPAllowedResponse,
  'status'
>;

export interface IIsIPAllowedResponse
  extends IStatusResponse<IsIpAllowedStatusConstants> {
  expireDate: string;
}
