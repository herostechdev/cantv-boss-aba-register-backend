import { AbaRegisterValidateCustomerRequestDto } from './aba-register-validate-customer-request.dto';
import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';
import { IGetAllValuesFromCustomerValuesResponse } from '../../../raw/stored-procedures/get-all-values-from-customer-values/get-all-values-from-customer-values-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from '../../../raw/stored-procedures/get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from '../../../raw/stored-procedures/get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetDebtFromCustomerResponse } from '../../../raw/stored-procedures/get-debt-from-customer/get-debt-from-customer-response.interface';
import { IGetFirstLetterFromABARequestResponse } from '../../../raw/stored-procedures/get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IUpdateDslAbaRegistersResponse } from '../../../raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-response.interface';

export class AbaRegisterValidateCustomerResponse {
  requestDto: AbaRegisterValidateCustomerRequestDto;
  customerExistsResponse: ICustomerExistsResponse;
  getAllValuesFromCustomerValuesResponse: IGetAllValuesFromCustomerValuesResponse;
  getCustomerClassNameFromIdValueResponse: IGetCustomerClassNameFromIdValueResponse;
  getCustomerInstanceIdFromIdValueResponse: IGetCustomerInstanceIdFromIdValueResponse;
  getFirstLetterFromABARequestResponse: IGetFirstLetterFromABARequestResponse;
  getDebtFromCustomerResponse: IGetDebtFromCustomerResponse;
  updateDslABARegistersResponse: IUpdateDslAbaRegistersResponse;
}
