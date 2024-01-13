import { IStatusResponse } from 'src/boss/status-response.interface';
import { ReverseAbaRegisterStatusConstants } from './reverse-aba-register-status.constants';

export type IReverseAbaRegisterResponse =
  IStatusResponse<ReverseAbaRegisterStatusConstants>;
