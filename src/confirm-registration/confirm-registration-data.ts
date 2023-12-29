import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { IABARegisterResponse } from './aba-register/aba-register-response.interface';
import { ICreateAndProvisioningCustomerResponse } from './create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterActResponse } from './create-and-provisioning-master-act/create-and-provisioning-master-act-response.interface';
import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';
import { IGetPlanABAFromKenanResponse } from './get-plan-aba-from-kenan/get-plan-aba-from-kenan-response.interface';
import { IInsertModifyCustomerAttributeResponse } from './insert-modify-customer-attribute/insert-modify-customer-attribute-response.interface';
import { IIsReservedLoginResponse } from './is-reserved-login/is-reserved-login-response.interface';
import { ICancelABAInstallationResponse } from './cancel-aba-installation/cancel-aba-installation-response.interface';

export class ConfirmRegistrationData {
  requestDto: ConfirmRegistrationRequestDto;
  getPlanAbaFromKenanResponse: IGetPlanABAFromKenanResponse;
  customerExistsResponse: ICustomerExistsResponse;
  createAndProvisioningCustomerResponse: ICreateAndProvisioningCustomerResponse;
  createAndProvisioningMasterActResponse: ICreateAndProvisioningMasterActResponse;
  insertModifyCustomerAttributeResponse: IInsertModifyCustomerAttributeResponse;
  isReservedLoginResponse: IIsReservedLoginResponse;
  abaRegisterResponse: IABARegisterResponse;
  cancelABAInstallationResponse: ICancelABAInstallationResponse;
}
