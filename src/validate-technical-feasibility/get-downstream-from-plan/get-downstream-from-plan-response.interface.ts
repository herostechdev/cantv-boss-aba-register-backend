import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetDownstreamFromPlanStatusConstants } from './get-downstream-from-plan-status.constants';

export interface IGetDownstreamFromPlanResponse
  extends IStatusResponse<GetDownstreamFromPlanStatusConstants> {
  downstream: string;
}
