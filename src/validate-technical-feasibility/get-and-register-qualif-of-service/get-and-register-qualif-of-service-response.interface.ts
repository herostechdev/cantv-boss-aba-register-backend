import { IStatusResponse } from 'src/responses/status-number-response.interface';
import { GetAndRegisterQualifOfServiceStatusConstants } from './get-and-register-qualif-of-service-status.constants';

export interface IGetAndRegisterQualifOfServiceResponse
  extends IStatusResponse<GetAndRegisterQualifOfServiceStatusConstants> {
  qualifpossible: string;
  modemstatus: string;
  maxdownstream: string;
  maxupstream: string;
}
