import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetInfoFromABARequestsStatusConstants } from './get-info-from-aba-requests-status.constants';

export interface IGetInfoFromABARequestsResponse
  extends IStatusResponse<GetInfoFromABARequestsStatusConstants> {
  date1: string;
  date2: string;
  date3: string;
  desiredPlan: string;
  descriptionPlan: string;
  medioP: string;
  abaRequestsRow: string;
  abaAcceptedRequestsRow: string;
  abaRequestsRegistersRow: string;
}
