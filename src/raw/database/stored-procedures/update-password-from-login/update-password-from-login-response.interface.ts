import { IStatusResponse } from 'src/boss/status-response.interface';
import { UpdatePasswordFromLoginStatusConstants } from './update-password-from-login-status.constants';

export type IUpdatePasswordFromLoginResponse =
  IStatusResponse<UpdatePasswordFromLoginStatusConstants>;
