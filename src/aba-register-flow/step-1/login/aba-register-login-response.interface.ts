import { IStatusResponse } from 'src/responses/status-response.interface';
import { AbaRegisterLoginStatusConstants } from './aba-register-login.constans';

export type IAbaRegisterLoginResponse =
  IStatusResponse<AbaRegisterLoginStatusConstants>;
