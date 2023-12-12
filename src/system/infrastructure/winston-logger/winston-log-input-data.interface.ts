export interface IWinstonLogInputData {
  message: string;
  data?: string;
  clazz: string;
  method?: string;
  error?: any;
  stack?: any;
}
