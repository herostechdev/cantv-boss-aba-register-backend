import { IStatusResponse } from 'src/boss/status-response.interface';
import { CheckIpStatusConstants } from './check-ip-status.constants';

export type ICheckIpResponse = IStatusResponse<CheckIpStatusConstants>;
