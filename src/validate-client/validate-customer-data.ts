import { ICustomerExistsResponse } from 'src/customer-exists/customer-exists-response.interface';
import { IGetAllValuesFromClientValuesResponse } from './get-all-values-from-client-values/get-all-values-from-client-values-response.interface';
import { IGetClientClassNameFromIdValueResponse } from './get-client-class-name-from-id-value/get-client-class-name-from-id-value-response.interface';
import { IGetClientInstanceIdFromIdValueResponse } from './get-client-instance-id-from-id-value/get-client-instance-id-from-id-value-response.interface';
import { IGetDebtFromClientResponse } from './get-debt-from-client/get-debt-from-client-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { ValidateCustomerRequestDto } from './validate-customer-request.dto';

export class ValidateCustomerData {
  requestDto: ValidateCustomerRequestDto;
  clientExistsResponse: ICustomerExistsResponse;
  getAllValuesFromClientValuesResponse: IGetAllValuesFromClientValuesResponse;
  getClientClassNameFromIdValueResponse: IGetClientClassNameFromIdValueResponse;
  getClientInstanceIdFromIdValueResponse: IGetClientInstanceIdFromIdValueResponse;
  getFirstLetterFromABARequestResponse: IGetFirstLetterFromABARequestResponse;
  getDebtFromClientResponse: IGetDebtFromClientResponse;
  updateDslABARegistersResponse: IUpdateDslAbaRegistersResponse;
}
