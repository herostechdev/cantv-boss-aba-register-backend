import { ABARegisterStatusConstants } from './aba-register-status.constants';
import { IStatusResponse } from 'src/responses/status-response.interface';

export type IABARegisterResponse = IStatusResponse<ABARegisterStatusConstants>;
