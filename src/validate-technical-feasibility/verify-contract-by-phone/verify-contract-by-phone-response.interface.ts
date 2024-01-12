import { IStatusResponse } from 'src/boss/status-response.interface';
import { VerifiyContractByPhoneStatusConstants } from './verify-contract-by-phone-status.constants';

export type IVerifiyContractByPhoneResponse =
  IStatusResponse<VerifiyContractByPhoneStatusConstants>;
