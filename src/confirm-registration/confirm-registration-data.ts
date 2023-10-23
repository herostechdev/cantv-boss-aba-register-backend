import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { ICreateAndProvisioningCustomerResponse } from './create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterActResponse } from './create-and-provisioning-master-act/create-and-provisioning-master-act-response.interface';
import { ICustomerExistsResponse } from 'src/customer-exists/customer-exists-response.interface';
import { IGetPlanABAFromKenanResponse } from './get-plan-aba-from-kenan/get-plan-aba-from-kenan-response.interface';

export class ConfirmRegistrationData {
  requestDto: ConfirmRegistrationRequestDto;
  getPlanAbaFromKenanResponse: IGetPlanABAFromKenanResponse;
  customerExistsResponse: ICustomerExistsResponse;
  createAndProvisioningCustomerResponse: ICreateAndProvisioningCustomerResponse;
  createAndProvisioningMasterActResponse: ICreateAndProvisioningMasterActResponse;
}
