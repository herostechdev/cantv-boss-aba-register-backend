import { AbaRegisterLoginRequestDto } from './aba-register-login-request.dto';
import { IGetGroupAccessFromLoginResponse } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-response.interface';
import { IISGActionAllowedResponse } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed-response.interface';

export class AbaRegisterLoginData {
  requestDto: AbaRegisterLoginRequestDto;
  getGroupAccessFromLoginResponse: IGetGroupAccessFromLoginResponse;
  isgActionAllowedResponse: IISGActionAllowedResponse;
}
