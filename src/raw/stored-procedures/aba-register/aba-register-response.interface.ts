import { AbaRegisterStatusConstants } from './aba-register-status.constants';
import { IStatusResponse } from 'src/boss/status-response.interface';

export type IAbaRegisterResponse = IStatusResponse<AbaRegisterStatusConstants>;
