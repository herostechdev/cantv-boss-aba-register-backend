import { IStatusResponse } from 'src/boss/status-response.interface';
import { VerifyContractByPhoneStatusConstants } from './verify-contract-by-phone-status.constants';

export type IVerifyContractByPhoneResponse =
  IStatusResponse<VerifyContractByPhoneStatusConstants>;
