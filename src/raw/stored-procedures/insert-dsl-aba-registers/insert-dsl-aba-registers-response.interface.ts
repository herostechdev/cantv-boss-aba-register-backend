import { IStatusResponse } from 'src/boss/status-response.interface';
import { InsertDslAbaRegisterStatusConstants } from './insert-dsl-aba-register-status.constants';

export type IInsertDslAbaRegistersResponse =
  IStatusResponse<InsertDslAbaRegisterStatusConstants>;
