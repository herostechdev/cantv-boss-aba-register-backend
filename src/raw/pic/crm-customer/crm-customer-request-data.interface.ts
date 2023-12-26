import { ISOAPRequestData } from 'src/soap/requests/soap-request-data.interface';
import { ICRMCustomerRequestBody } from './crm-customer-request-body.interface';

export type ICRMCustomerRequestData = ISOAPRequestData<
  ICRMCustomerRequestBody,
  void
>;
