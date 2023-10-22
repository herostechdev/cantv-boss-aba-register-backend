import { IStatusResponse } from 'src/responses/status-response.interface';
import { VerifiyContractByPhoneStatusConstants } from './verify-contract-by-phone-status.constants';

export type IVerifiyContractByPhoneResponse =
  IStatusResponse<VerifiyContractByPhoneStatusConstants>;
