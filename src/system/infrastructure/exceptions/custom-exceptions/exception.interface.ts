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
