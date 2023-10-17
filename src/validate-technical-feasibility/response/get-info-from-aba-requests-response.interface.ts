import { IStatusNumberResponse } from 'src/responses/status-number-response.interface';

export interface IGetInfoFromABARequestsResponse extends IStatusNumberResponse {
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
