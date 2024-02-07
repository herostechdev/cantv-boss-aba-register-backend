import { IException } from '../custom-exceptions/exception.interface';

export interface IExceptionResponse {
  message: string;
  code: string;
  name: string;
  guid: string;
  command: string;
  timestamp: string;
  httpStatusCode: number;
  path: string;
  stack?: string;
  innerException?: IException;
}
