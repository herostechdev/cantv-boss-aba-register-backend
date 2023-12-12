import { ICustomerExistsResponse } from 'src/customer-exists/customer-exists-response.interface';
import { IGetAllValuesFromClientValuesResponse } from './get-all-values-from-client-values/get-all-values-from-client-values-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetDebtFromCustomerResponse } from './get-debt-from-client/get-debt-from-customer-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IUpdateDslAbaRegistersResponse } from '../dsl-aba-registers/update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { ValidateCustomerRequestDto } from './validate-customer-request.dto';

export class ValidateCustomerData {
  requestDto: ValidateCustomerRequestDto;
  clientExistsResponse: ICustomerExistsResponse;
  getAllValuesFromClientValuesResponse: IGetAllValuesFromClientValuesResponse;
  getClientClassNameFromIdValueResponse: IGetCustomerClassNameFromIdValueResponse;
  getClientInstanceIdFromIdValueResponse: IGetCustomerInstanceIdFromIdValueResponse;
  getFirstLetterFromABARequestResponse: IGetFirstLetterFromABARequestResponse;
  getDebtFromClientResponse: IGetDebtFromCustomerResponse;
  updateDslABARegistersResponse: IUpdateDslAbaRegistersResponse;
}
