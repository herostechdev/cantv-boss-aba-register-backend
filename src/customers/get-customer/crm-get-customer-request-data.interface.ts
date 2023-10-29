import { ISOAPRequestData } from 'src/soap/requests/soap-request-data.interface';
import { ICRMGetCustomerRequestBody } from './crm-get-customer-request-body.interface';

export type ICRMGetCustomerRequestData = ISOAPRequestData<
  ICRMGetCustomerRequestBody,
  void
>;
