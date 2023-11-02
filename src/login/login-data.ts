import { LoginRequestDto } from './login-request.dto';

export class LoginData {
  requestDto: LoginRequestDto;
  getGroupAccessFromLoginResponse: IGetGroupAccessFromLoginResponse;
  isgActionAllowedResponse: IISGActionAllowedResponse;
}
