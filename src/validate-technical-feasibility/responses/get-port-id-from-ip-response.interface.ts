import { IStatusNumberResponse } from 'src/responses/status-number-response.interface';

export interface IGetPortIdFromIpResponse extends IStatusNumberResponse {
  dslamportId: number;
}
