import { IStatusResponse } from 'src/responses/status-number-response.interface';
import { IsValidIpAddressConstants } from './is-valid-ip-address.constants';

export type IIsValidIpAddressResponse =
  IStatusResponse<IsValidIpAddressConstants>;
