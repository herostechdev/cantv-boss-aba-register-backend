import { IISGActionAllowedResponse } from './get-group-access-from-login-response.interface';
import { IGetGroupAccessFromLoginResponse } from './isg-action-allowed-response.interface';
import { LoginRequestDto } from './login-request.dto';

export class LoginData {
  requestDto: LoginRequestDto;
  getGroupAccessFromLoginResponse: IGetGroupAccessFromLoginResponse;
  isgActionAllowedResponse: IISGActionAllowedResponse;
}
