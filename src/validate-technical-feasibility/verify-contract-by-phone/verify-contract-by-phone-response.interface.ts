import { IStatusResponse } from 'src/responses/status-number-response.interface';
import { VerifiyContractByPhoneStatusConstants } from './verify-contract-by-phone-status.constants';

export type IVerifiyContractByPhoneResponse =
  IStatusResponse<VerifiyContractByPhoneStatusConstants>;
