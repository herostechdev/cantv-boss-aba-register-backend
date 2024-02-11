import { IGetGroupAccessFromLoginResponse } from 'src/raw/database/stored-procedures/get-group-access-from-login/get-group-access-from-login-response.interface';
import { IISGActionAllowedResponse } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-response.interface';

export interface IAbaRegisterLoginResponse {
  getGroupAccessFromLoginResponse: IGetGroupAccessFromLoginResponse;
  isgActionAllowedResponse: IISGActionAllowedResponse;
}
