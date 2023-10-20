import { IStatusNumberResponse } from 'src/responses/status-number-response.interface';

export interface IIsOccupiedPortResponse extends IStatusNumberResponse {
  result: number;
}
