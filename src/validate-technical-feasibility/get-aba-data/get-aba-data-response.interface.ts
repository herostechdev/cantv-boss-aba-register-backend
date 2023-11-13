import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetABADataConstants } from './get-aba-data.constants';

export interface IGetABADataResponse
  extends IStatusResponse<GetABADataConstants> {
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
