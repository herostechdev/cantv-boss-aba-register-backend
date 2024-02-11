import { GetDSLAreaCodesStatusConstants } from './get-dsl-area-codes-status.constants';
import { IStatusResponse } from 'src/boss/status-response.interface';

export interface IGetDSLAreaCodesResponse
  extends IStatusResponse<GetDSLAreaCodesStatusConstants> {
  areaCodes: string[];
}
