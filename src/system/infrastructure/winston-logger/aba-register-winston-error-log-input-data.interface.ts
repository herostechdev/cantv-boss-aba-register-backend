import { IAbaRegisterWinstonLogInputData } from './aba-register-winston-log-input-data.interface';
import { IWinstonErrorLogInputData } from './winston-error-log-input-data.interface';

export interface IAbaRegisterWinstonErrorLogInputData
  extends IAbaRegisterWinstonLogInputData,
    IWinstonErrorLogInputData {}
