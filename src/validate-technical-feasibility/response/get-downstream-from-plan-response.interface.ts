import { IStatusNumberResponse } from 'src/responses/status-number-response.interface';

export interface IGetDownstreamFromPlanResponse extends IStatusNumberResponse {
  downstream: string;
}
