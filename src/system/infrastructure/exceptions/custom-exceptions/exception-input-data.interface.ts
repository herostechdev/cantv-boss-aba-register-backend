import { HttpExceptionOptions } from '@nestjs/common';
import { IException } from './exception.interface';

export interface IExceptionInputData {
  objectOrError?: string | object | any;
  code?: string;
  guid?: string;
  descriptionOrOptions?: string | HttpExceptionOptions;
  innerException?: IException;
}
