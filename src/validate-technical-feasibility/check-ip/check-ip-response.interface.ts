import { IStatusResponse } from 'src/responses/status-response.interface';
import { CheckIpStatusConstants } from './check-ip-status.constants';

export type ICheckIpResponse = IStatusResponse<CheckIpStatusConstants>;
