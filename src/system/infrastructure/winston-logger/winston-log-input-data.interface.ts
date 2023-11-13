export interface IWinstonLogInputData {
  message: string;
  bindingData?: string;
  clazz: string;
  method?: string;
  error?: any;
  stack?: any;
}
