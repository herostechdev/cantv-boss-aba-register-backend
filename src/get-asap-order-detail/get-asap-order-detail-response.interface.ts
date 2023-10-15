import { ISOAPCommonResponse } from 'src/soap/requests/soap-common-response.interface';

export interface IGetASAPOrderDetailResponse extends ISOAPCommonResponse {
  status: string;
}
