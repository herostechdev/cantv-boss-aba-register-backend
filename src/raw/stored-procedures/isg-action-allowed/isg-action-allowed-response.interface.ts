import { ISGActionAllowedStatusConstants } from './isg-action-allowed-status.constants';
import { IStatusResponse } from 'src/responses/status-response.interface';

export type IISGActionAllowedResponse =
  IStatusResponse<ISGActionAllowedStatusConstants>;
