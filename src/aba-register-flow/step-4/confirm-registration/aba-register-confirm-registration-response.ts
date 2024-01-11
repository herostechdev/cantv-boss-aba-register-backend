import { AbaRegisterConfirmRegistrationRequestDto } from './aba-register-confirm-registration-request.dto';
import { IAbaRegisterResponse } from '../../../raw/stored-procedures/aba-register/aba-register-response.interface';
import { ICancelABAInstallationResponse } from '../../../raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-response.interface';
import { ICreateAndProvisioningCustomerResponse } from '../../../raw/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterAccountResponse } from '../../../raw/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-response.interface';
import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';
import { IGetAbaPlanForKenanResponse } from '../../../raw/functions/get-aba-plan-for-kenan/get-aba-plan-for-kenan-response.interface';
import { IGetCSIdAndPlanNameFromLoginResponse } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-response.interface';
// import { IInsertModifyCustomerAttributeResponse } from '../../../confirm-registration/insert-modify-customer-attribute/insert-modify-customer-attribute-response.interface';
import { IIsReservedLoginResponse } from '../../../raw/stored-procedures/is-reserved-login/is-reserved-login-response.interface';

export class AbaRegisterConfirmRegistrationResponse {
  requestDto: AbaRegisterConfirmRegistrationRequestDto;
  getAbaPlanForKenanResponse: IGetAbaPlanForKenanResponse;
  customerExistsResponse: ICustomerExistsResponse;
  createAndProvisioningCustomerResponse: ICreateAndProvisioningCustomerResponse;
  createAndProvisioningMasterAccountResponse: ICreateAndProvisioningMasterAccountResponse;
  // insertModifyCustomerAttributeResponse: IInsertModifyCustomerAttributeResponse;
  isReservedLoginResponse: IIsReservedLoginResponse;
  abaRegisterResponse: IAbaRegisterResponse;
  cancelABAInstallationResponse: ICancelABAInstallationResponse;
  getCSIdAndPlanNameFromLoginResponse: IGetCSIdAndPlanNameFromLoginResponse;
}
