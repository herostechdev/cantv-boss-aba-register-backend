import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetDataFromRequestsStatusConstants } from './get-data-from-requests-status.constants';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export interface IGetDataFromRequestsResponse
  extends IPhoneNumber,
    IStatusResponse<GetDataFromRequestsStatusConstants> {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
}
