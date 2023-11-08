import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetDataFromRequestsStatusConstants } from './get-data-from-requests-status.constants';

export interface IGetDataFromRequestsResponse
  extends IStatusResponse<GetDataFromRequestsStatusConstants> {
  date1: string;
  date2: string;
  date3: string;
  desiredPlan: string;
  descriptionPlan: string;
  medioP: string;
  abaRequestsRow: any;
  abaAcceptedRequestsRow: any;
  abaRequestsRegistersRow: any;
}
