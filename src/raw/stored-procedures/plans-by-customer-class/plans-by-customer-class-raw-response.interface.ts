import { IStatusResponse } from 'src/responses/status-response.interface';
import { PlansByCustomerClassStatusConstants } from './plans-by-customer-class-status.constants';

export interface IPlansByCustomerClassRawResponse
  extends IStatusResponse<PlansByCustomerClassStatusConstants> {
  plan: string[];
  planDesired: string[];
  shortName: string[];
  monthlyFee: string[];
  downStream: string[];
  limit: string[];
  additionalMB: string[];
}
