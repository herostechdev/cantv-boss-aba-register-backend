import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetDownstreamFromPlanStatusConstants } from './get-downstream-from-plan-status.constants';

export interface IGetDownstreamFromPlanResponse
  extends IStatusResponse<GetDownstreamFromPlanStatusConstants> {
  downstream: string;
}
