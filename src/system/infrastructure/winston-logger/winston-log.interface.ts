export interface IWinstonLog {
  label: string;
  timestamp: string;
  clazz: string;
  method: string;
  level: string;
  bindingData: string;
  message: string;
  error: any;
  stack: any;
}
