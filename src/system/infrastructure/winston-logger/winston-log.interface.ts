export interface IWinstonLog {
  label: string;
  timestamp: string;
  level: string;
  clazz: string;
  method: string;
  command: string;
  phoneNumber: string;
  message: string;
  input: string;
  response: string;
  exception: string;
  exceptionCode: string;
  stack: any;
  innerException: any;
}
