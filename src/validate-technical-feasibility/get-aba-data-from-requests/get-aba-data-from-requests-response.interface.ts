import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetABADataFromRequestsConstants } from './get-aba-data-from-requests-status.constants';

export interface IGetABADataFromRequestsResponse
  extends IStatusResponse<GetABADataFromRequestsConstants> {
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
