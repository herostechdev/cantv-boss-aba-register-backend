import { GetCSIdAndPlanNameFromLoginStatusConstants } from './get-csid-and-plan-name-from-login-status.constants';
import { IStatusResponse } from 'src/boss/status-response.interface';

export interface IGetCSIdAndPlanNameFromLoginResponse
  extends IStatusResponse<GetCSIdAndPlanNameFromLoginStatusConstants> {
  customerServiceId: number;
  planName: string;
}
