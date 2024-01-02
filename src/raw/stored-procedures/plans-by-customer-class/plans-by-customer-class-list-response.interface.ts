import { IPlansByCustomerClassResponse } from './plans-by-customer-class-response.interface';
import { PlansByCustomerClassStatusConstants } from './plans-by-customer-class-status.constants';
import { ICollectionResponse } from 'src/system/infrastructure/dtos/collections/collection-response.interface';

export interface IPlansByCustomerClassListResponse
  extends ICollectionResponse<IPlansByCustomerClassResponse> {
  status: PlansByCustomerClassStatusConstants;
}
