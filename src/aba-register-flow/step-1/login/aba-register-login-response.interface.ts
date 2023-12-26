import { IStatusResponse } from 'src/responses/status-response.interface';
import { AbaRegisterLoginActionStatusConstants } from './aba-register-login.constans';

export type IAbaRegisterLoginResponse =
  IStatusResponse<AbaRegisterLoginActionStatusConstants>;
