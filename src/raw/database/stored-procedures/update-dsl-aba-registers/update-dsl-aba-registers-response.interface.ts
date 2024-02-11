import { IStatusResponse } from 'src/boss/status-response.interface';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers-status.constants';

export type IUpdateDslAbaRegistersResponse =
  IStatusResponse<UpdateDslAbaRegistersStatusConstants>;
