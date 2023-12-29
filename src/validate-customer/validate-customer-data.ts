import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';
import { IGetAllValuesFromCustomerValuesResponse } from '../raw/stored-procedures/get-all-values-from-customer-values/get-all-values-from-customer-values-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from '../raw/stored-procedures/get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetDebtFromCustomerResponse } from './get-debt-from-client/get-debt-from-customer-response.interface';
import { IGetFirstLetterFromABARequestResponse } from '../raw/stored-procedures/get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IUpdateDslAbaRegistersResponse } from '../raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { ValidateCustomerRequestDto } from './validate-customer-request.dto';

export class ValidateCustomerData {
  requestDto: ValidateCustomerRequestDto;
  clientExistsResponse: ICustomerExistsResponse;
  getAllValuesFromClientValuesResponse: IGetAllValuesFromCustomerValuesResponse;
  getClientClassNameFromIdValueResponse: IGetCustomerClassNameFromIdValueResponse;
  getClientInstanceIdFromIdValueResponse: IGetCustomerInstanceIdFromIdValueResponse;
  getFirstLetterFromABARequestResponse: IGetFirstLetterFromABARequestResponse;
  getDebtFromClientResponse: IGetDebtFromCustomerResponse;
  updateDslABARegistersResponse: IUpdateDslAbaRegistersResponse;
}
