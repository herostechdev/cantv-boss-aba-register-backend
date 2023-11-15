import { IStatusResponse } from 'src/responses/status-response.interface';
import { PlanByClassClientStatusConstants } from './plan-by-class-client-status.constants';

export interface IPlanByClassClientRawResponse
  extends IStatusResponse<PlanByClassClientStatusConstants> {
  plan: string[];
  planDesired: string[];
  shortName: string[];
  monthlyFee: string[];
  downStream: string[];
  limit: string[];
  additionalMB: string[];
}
