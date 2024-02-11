import { AbaRegisterConfirmRegistrationRequestDto } from './aba-register-confirm-registration-request.dto';
import { IAbaRegisterResponse } from '../../../raw/database/stored-procedures/aba-register/aba-register-response.interface';
import { IGetAbaPlanForKenanResponse } from 'src/raw/database/functions/get-aba-plan-for-kenan/get-aba-plan-for-kenan-response.interface';
import { ICreateAndProvisioningCustomerResponse } from 'src/raw/database/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterAccountResponse } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-response.interface';
import { ICustomerExistsResponse } from 'src/raw/database/stored-procedures/customer-exists/customer-exists-response.interface';
import { IGetCSIdAndPlanNameFromLoginResponse } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-response.interface';
import { IIsReservedLoginResponse } from 'src/raw/database/stored-procedures/is-reserved-login/is-reserved-login-response.interface';
import { IPayABAInstallationResponse } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation-response.interface';

export interface IAbaRegisterConfirmRegistrationResponse {
  requestDto: AbaRegisterConfirmRegistrationRequestDto;
  getAbaPlanForKenanResponse: IGetAbaPlanForKenanResponse;
  customerExistsResponse: ICustomerExistsResponse;
  createAndProvisioningCustomerResponse: ICreateAndProvisioningCustomerResponse;
  createAndProvisioningMasterAccountResponse: ICreateAndProvisioningMasterAccountResponse;
  isReservedLoginResponse: IIsReservedLoginResponse;
  abaRegisterResponse: IAbaRegisterResponse;
  cancelABAInstallationResponse: IPayABAInstallationResponse;
  getCSIdAndPlanNameFromLoginResponse: IGetCSIdAndPlanNameFromLoginResponse;
}
