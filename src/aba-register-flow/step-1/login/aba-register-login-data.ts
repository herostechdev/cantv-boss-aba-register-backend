import { IGetGroupAccessFromLoginResponse } from 'src/raw/database/stored-procedures/get-group-access-from-login/get-group-access-from-login-response.interface';
import { IISGActionAllowedResponse } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-response.interface';
import { AbaRegisterLoginRequestDto } from './aba-register-login-request.dto';

export class AbaRegisterLoginData {
  requestDto: AbaRegisterLoginRequestDto;
  getGroupAccessFromLoginResponse: IGetGroupAccessFromLoginResponse;
  isgActionAllowedResponse: IISGActionAllowedResponse;
}
