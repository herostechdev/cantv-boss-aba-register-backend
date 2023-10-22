import { IStatusResponse } from 'src/responses/status-response.interface';
import { ClientExistsStatusConstants } from './client-exists-status.constants';

export type IClientExistsResponse =
  IStatusResponse<ClientExistsStatusConstants>;
