import { AbaRegisterConfirmRegistrationRequestDto } from './aba-register-confirm-registration-request.dto';
import { IAbaRegisterResponse } from '../../../raw/stored-procedures/aba-register/aba-register-response.interface';
import { ICreateAndProvisioningCustomerResponse } from '../../../confirm-registration/create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterActResponse } from '../../../confirm-registration/create-and-provisioning-master-act/create-and-provisioning-master-act-response.interface';
import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';
import { IGetAbaPlanForKenanResponse } from '../../../raw/functions/get-aba-plan-for-kenan/get-aba-plan-for-kenan-response.interface';
import { IInsertModifyCustomerAttributeResponse } from '../../../confirm-registration/insert-modify-customer-attribute/insert-modify-customer-attribute-response.interface';
import { IIsReservedLoginResponse } from '../../../confirm-registration/is-reserved-login/is-reserved-login-response.interface';
import { ICancelABAInstallationResponse } from '../../../raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-response.interface';

export class AbaRegisterConfirmRegistrationData {
  requestDto: AbaRegisterConfirmRegistrationRequestDto;
  getAbaPlanForKenanResponse: IGetAbaPlanForKenanResponse;
  customerExistsResponse: ICustomerExistsResponse;
  createAndProvisioningCustomerResponse: ICreateAndProvisioningCustomerResponse;
  createAndProvisioningMasterActResponse: ICreateAndProvisioningMasterActResponse;
  insertModifyCustomerAttributeResponse: IInsertModifyCustomerAttributeResponse;
  isReservedLoginResponse: IIsReservedLoginResponse;
  abaRegisterResponse: IAbaRegisterResponse;
  cancelABAInstallationResponse: ICancelABAInstallationResponse;
}
