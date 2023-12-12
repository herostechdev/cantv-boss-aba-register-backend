export interface IWinstonLog {
  label: string;
  timestamp: string;
  clazz: string;
  method: string;
  level: string;
  data: string;
  message: string;
  error: any;
  stack: any;
}
