import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import * as path from 'path';

import { IWinstonLog } from './winston-log.interface';
import { IWinstonLogInputData } from './winston-log-input-data.interface';
import { StringBuilder } from '../helpers/string.builder';
import { WinstonLogConstants } from './winston-log.constants';
// import DailyRotateFile from 'winston-daily-rotate-file';

export class Wlog {
  private static _instance: Wlog;
  private readonly logger: winston.Logger;

  public static get instance(): Wlog {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    this.logger = this.getLogger();
  }

  private getLogger(): winston.Logger {
    return createLogger({
      // format: winston.format.json(),
      format: combine(
        label({ label: this.applicationName }),
        timestamp(),
        format.metadata({
          fillExcept: ['message', 'level', 'timestamp', 'label'],
        }),
        printf((info) => this.stringFormat(info)),
      ),
      transports: [
        this.getCombinedFileTransport(),
        this.getErrorFileTransport(),
        // this.getDailyRotateFileTransport(),
      ],
    });
  }

  private get applicationName(): string {
    return process.env.APP_NAME ?? WinstonLogConstants.APPLICATION_NAME;
  }

  private stringFormat(info: winston.Logform.TransformableInfo): string {
    const rowLog = new StringBuilder();
    rowLog.append(`[${info.label}]`);
    rowLog.append(`${info.timestamp}`);
    if (info.metadata.clazz) {
      const method = info.metadata.method ? `.${info.metadata.method}` : '';
      rowLog.append(`[${info.metadata.clazz}${method}]`);
    }
    rowLog.append(`${info.level.toUpperCase()}`);
    if (info.metadata.bindingData) {
      rowLog.append(`${info.metadata.bindingData}  |`);
    }
    rowLog.append(`${info.message}`);
    if (info.metadata.error) {
      rowLog.append(`${info.metadata.error}`);
      if (info.metadata.error.stack) {
        rowLog.append(`${info.metadata.error.stack}`);
      }
    }
    return rowLog.toString();
  }

  private objectFormat(info: winston.Logform.TransformableInfo): IWinstonLog {
    return {
      label: info.label,
      timestamp: info.timestamp,
      clazz: info.metadata?.clazz,
      method: info.metadata?.method,
      level: info.level,
      bindingData: info.metadata?.bindingData,
      message: info.message,
      error: info.metadata?.error,
      stack: info.metadata?.error.stack,
    };
  }

  private getCombinedFileTransport(): winston.transport {
    return new transports.File({
      filename: path.join(
        process.env.LOG_FOLDER,
        WinstonLogConstants.COMBINED_LOG_FILE_NAME,
      ),
      level: WinstonLogConstants.DEBUG,
    });
  }

  private getErrorFileTransport(): winston.transport {
    return new transports.File({
      filename: path.join(
        process.env.LOG_FOLDER,
        WinstonLogConstants.ERROR_LOG_FILE_NAME,
      ),
      level: WinstonLogConstants.ERROR,
    });
  }

  // private getDailyRotateFileTransport(): DailyRotateFile {
  //   return new DailyRotateFile({
  //     filename: path.join(process.env.LOG_FOLDER, 'BossAbaRegister-%DATE%.log'),
  //     datePattern: 'YYYY-MM-DD-HH',
  //     zippedArchive: true,
  //     maxSize: '100m',
  //     maxFiles: '30d',
  //   });
  // }

  public info(data: IWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.INFO, data.message, {
      bindingData: data.bindingData,
      clazz: data.clazz,
      method: data.method,
    });
  }

  public warn(data: IWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.WARN, data.message, {
      bindingData: data.bindingData,
      clazz: data.clazz,
      method: data.method,
    });
  }

  public debug(data: IWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.DEBUG, data.message, {
      bindingData: data.bindingData,
      clazz: data.clazz,
      method: data.method,
    });
  }

  public error(data: IWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.ERROR, data.message, {
      bindingData: data.bindingData,
      clazz: data.clazz,
      method: data.method,
      error: data.error,
      stack: data.stack,
    });
  }
}
