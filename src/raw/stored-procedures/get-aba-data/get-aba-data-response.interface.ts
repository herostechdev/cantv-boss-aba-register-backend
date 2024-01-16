import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetAbaDataConstants } from './get-aba-data.constants';

export interface IGetAbaDataResponse
  extends IStatusResponse<GetAbaDataConstants> {
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
