import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetAbaDataFromRequestsStatusConstants } from './get-aba-data-from-requests-status.constants';

export interface IGetAbaDataFromRequestsResponse
  extends IStatusResponse<GetAbaDataFromRequestsStatusConstants> {
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
