import { IStatusResponse } from 'src/responses/status-response.interface';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers-status.constants';

export type IUpdateDslAbaRegistersResponse =
  IStatusResponse<UpdateDslAbaRegistersStatusConstants>;
