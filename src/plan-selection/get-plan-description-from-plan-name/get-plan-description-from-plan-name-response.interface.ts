import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetPlanDescriptionFromPlanNameStatusConstants } from './get-plan-description-from-plan-name-status.constants';

export interface IGetPlanDescriptionFromPlanNameResponse
  extends IStatusResponse<GetPlanDescriptionFromPlanNameStatusConstants> {
  name: string;
  description: string;
}
