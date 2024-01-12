import { IStatusResponse } from 'src/boss/status-response.interface';
import { AbaRegisterLoginStatusConstants } from './aba-register-login.constans';

export type IAbaRegisterLoginResponse =
  IStatusResponse<AbaRegisterLoginStatusConstants>;
