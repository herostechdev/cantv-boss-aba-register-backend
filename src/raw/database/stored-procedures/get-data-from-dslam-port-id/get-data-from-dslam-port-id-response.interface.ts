import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetDataFromDSLAMPortIdStatusConstants } from './get-data-from-dslam-port-id-status.constants';

export interface IGetDataFromDSLAMPortIdResponse
  extends IStatusResponse<GetDataFromDSLAMPortIdStatusConstants> {
  abarack: number;
  abadslamposition: string;
  abaslot: number;
  abaport: number;
  abaad: string;
  abapairad: string;
  abaprovider: string;
  abasistema: string;
}
