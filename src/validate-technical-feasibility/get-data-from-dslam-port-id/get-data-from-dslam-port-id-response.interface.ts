import { GetDataFromDSLAMPortIdStatusConstants } from './get-data-from-dslam-port-id-status.constants';

export interface IGetDataFromDSLAMPortIdResponse {
  abarack: number;
  abadslamposition: string;
  abaslot: number;
  abaport: number;
  abaad: string;
  abapairad: string;
  abaprovider: string;
  abasistema: string;
  status: GetDataFromDSLAMPortIdStatusConstants;
}
