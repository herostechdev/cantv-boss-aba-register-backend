import { IStatusResponse } from 'src/responses/status-response.interface';
import { GetClientClassNameFromIdValueStatusConstants } from './get-client-class-name-from-id-value-status.constants';

export interface IGetClientClassNameFromIdValueResponse
  extends IStatusResponse<GetClientClassNameFromIdValueStatusConstants> {
  clientClassName: string;
}
