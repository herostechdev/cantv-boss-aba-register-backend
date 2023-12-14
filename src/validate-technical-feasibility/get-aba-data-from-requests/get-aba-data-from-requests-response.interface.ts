import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetABADataFromRequestsStatusConstants } from './get-aba-data-from-requests-status.constants';

export interface IGetABADataFromRequestsResponse
  extends IStatusResponse<GetABADataFromRequestsStatusConstants> {
  // date1: string;
  // date2: string;
  // date3: string;
  // desiredPlan: string;
  // descriptionPlan: string;
  // medioP: string;
  // requesterId: number;
  // requesterClassName: string;
  date1: string;
  date2: string;
  date3: string;
  desiredPlan: string;
  descriptionPlan: string;
  medioP: string;
  requesterId: number;
  requesterClassName: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  companyName: string;
}
