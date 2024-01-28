import { IStatusResponse } from 'src/boss/status-response.interface';
import { IsValidIpAddressStatusConstants } from './is-valid-ip-address-status.constants';

export type IIsValidIpAddressResponse =
  IStatusResponse<IsValidIpAddressStatusConstants>;
