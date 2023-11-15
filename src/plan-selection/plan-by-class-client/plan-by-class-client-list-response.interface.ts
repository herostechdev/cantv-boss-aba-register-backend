import { IPlanByClassClientResponse } from './plan-by-class-client-response.interface';
import { PlanByClassClientStatusConstants } from './plan-by-class-client-status.constants';
import { ICollectionResponse } from 'src/system/infrastructure/dtos/collections/collection-response.interface';

export interface IPlanByClassClientListResponse
  extends ICollectionResponse<IPlanByClassClientResponse> {
  status: PlanByClassClientStatusConstants;
}
