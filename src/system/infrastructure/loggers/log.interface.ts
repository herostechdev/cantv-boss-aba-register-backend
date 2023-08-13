export interface ILog {
  level: string;
  label: string;
  timestamp: number;
  message: string;
  extraContent?: string;
  statusCode?: number;
  exceptionName?: string;
  stackTrace?: string;
}
