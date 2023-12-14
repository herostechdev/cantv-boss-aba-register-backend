import { IWinstonCommonLogInputData } from './winston-common-log-input-data.interface';

export interface IWinstonErrorLogInputData extends IWinstonCommonLogInputData {
  error: any;
}
