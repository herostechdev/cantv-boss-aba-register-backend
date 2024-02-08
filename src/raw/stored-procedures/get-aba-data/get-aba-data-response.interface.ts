import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetAbaDataStatusConstants } from './get-aba-data-status.constants';

export interface IGetAbaDataResponse
  extends IStatusResponse<GetAbaDataStatusConstants> {
  abadslamportid: number;
  abancc: string;
  abaclienttype: string;
  abaorderdate: string;
  abaad: string;
  abaparad: string;
  abaslot: number;
  abaport: number;
  abarack: number;
  abaposition: number;
  abavci: number;
  abacontractid: number;
}
