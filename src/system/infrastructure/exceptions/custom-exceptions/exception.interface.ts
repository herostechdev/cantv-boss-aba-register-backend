import { v4 as uuidv4 } from 'uuid';

export interface IException extends Error {
  code: string;
  guid: string;
  innerException?: IException;
}

export function isException(
  exception: Error | IException,
): exception is IException {
  return 'code' in exception;
}

export function toIException(exception: any): IException {
  if (!exception || isException(exception)) return exception;
  return {
    name: 'InnerException',
    code: '',
    guid: uuidv4(),
    message: JSON.stringify(exception),
  };
}
