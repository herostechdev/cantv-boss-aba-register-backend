import { ISGActionAllowedStatusConstants } from './isg-action-allowed-status.constants';
import { IStatusResponse } from 'src/boss/status-response.interface';

export type IISGActionAllowedResponse =
  IStatusResponse<ISGActionAllowedStatusConstants>;
