import { GetABADataConstants } from './get-aba-data.constants';

export interface IGetABADataResponse {
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
  status: GetABADataConstants;
}
