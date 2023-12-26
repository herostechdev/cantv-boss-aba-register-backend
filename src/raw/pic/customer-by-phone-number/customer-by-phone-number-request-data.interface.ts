import { ISOAPRequestData } from 'src/soap/requests/soap-request-data.interface';
import { ICustomerByPhoneNumberRequestBody } from './customer-by-phone-number-request-body.interface';

export type ICustomerByPhoneNumberRequestData = ISOAPRequestData<
  ICustomerByPhoneNumberRequestBody,
  void
>;
