import { CreateAndProvisioningCustomerStatusConstants } from './create-and-provisioning-customer-status.constants';
import { IStatusResponse } from 'src/responses/status-response.interface';

export type ICreateAndProvisioningCustomerResponse =
  IStatusResponse<CreateAndProvisioningCustomerStatusConstants>;
