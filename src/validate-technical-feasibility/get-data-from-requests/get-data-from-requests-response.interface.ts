import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetDataFromRequestsStatusConstants } from './get-data-from-requests-status.constants';

export interface IGetDataFromRequestsResponse
  extends IStatusResponse<GetDataFromRequestsStatusConstants> {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
}
