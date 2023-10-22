import { IStatusResponse } from 'src/responses/status-response.interface';
import { IsValidIpAddressConstants } from './is-valid-ip-address.constants';

export type IIsValidIpAddressResponse =
  IStatusResponse<IsValidIpAddressConstants>;
