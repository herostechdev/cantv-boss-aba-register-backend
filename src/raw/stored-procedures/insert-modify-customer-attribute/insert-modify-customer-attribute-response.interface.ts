import { IStatusResponse } from 'src/responses/status-response.interface';
import { InsertModifyCustomerAttributeStatusConstants } from './insert-modify-customer-attribute-status.constants';

export type IInsertModifyCustomerAttributeResponse =
  IStatusResponse<InsertModifyCustomerAttributeStatusConstants>;
