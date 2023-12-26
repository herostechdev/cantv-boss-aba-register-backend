import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetGroupAccessFromLoginStatusConstants } from './get-group-access-from-login-status.constants';

export interface IGetGroupAccessFromLoginResponse
  extends IStatusResponse<GetGroupAccessFromLoginStatusConstants> {
  password: string;
  accessGroup: string;
}
