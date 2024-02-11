import { IStatusResponse } from 'src/boss/status-response.interface';
import { InsertModifyCustomerAttributeStatusConstants } from './insert-modify-customer-attribute-status.constants';

export type IInsertModifyCustomerAttributeResponse =
  IStatusResponse<InsertModifyCustomerAttributeStatusConstants>;
