import { IWinstonCommonLogInputData } from './winston-common-log-input-data.interface';

export interface IAbaRegisterWinstonLogInputData
  extends IWinstonCommonLogInputData {
  phoneNumber: string;
}
