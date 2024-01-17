import { IsString } from 'class-validator';
import { IIpAddress } from './ip-address.interface';

export class IpAddressDto implements IIpAddress {
  @IsString()
  ipAddress: string;
}
