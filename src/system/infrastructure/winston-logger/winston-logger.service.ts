import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import * as path from 'path';

import { IWinstonLog } from './winston-log.interface';
import { IAbaRegisterWinstonErrorLogInputData } from './aba-register-winston-error-log-input-data.interface';
import { IAbaRegisterWinstonLogInputData } from './aba-register-winston-log-input-data.interface';
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

  public info(data: IAbaRegisterWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.INFO, data.message, {
      phoneNumber: data.phoneNumber,
      data: data.data,
      clazz: data.clazz,
      method: data.method,
    });
  }

  public warn(data: IAbaRegisterWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.WARN, data.message, {
      phoneNumber: data.phoneNumber,
      data: data.data,
      clazz: data.clazz,
      method: data.method,
    });
  }

  public debug(data: IAbaRegisterWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.DEBUG, data.message, {
      phoneNumber: data.phoneNumber,
      data: data.data,
      clazz: data.clazz,
      method: data.method,
    });
  }

  public error(data: IAbaRegisterWinstonErrorLogInputData): void {
    this.logger.log(WinstonLogConstants.ERROR, data.message, {
      phoneNumber: data.phoneNumber,
      data: data.data,
      clazz: data.clazz,
      method: data.method,
      error: data.error,
    });
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
    return new StringBuilder()
      .append(`[${info.label}]`)
      .append(`${info.timestamp}`)
      .append(`${info.level.toUpperCase()}`)
      .append(this.getClazzMethod(info.metadata))
      .append(this.getPhoneNumber(info.metadata?.phoneNumber))
      .append(this.getMessage(info.message, info.metadata?.error))
      .append(this.getData(info.metadata?.data))
      .append(this.getExceptionName(info.metadata?.error))
      .append(this.getStack(info.metadata?.error))
      .append(this.getInnerException(info.metadata?.error))
      .toString('  ');
  }

  private getClazzMethod(metadata: any): string {
    if (!metadata || !metadata.clazz) return null;
    const method = metadata.method ? `.${metadata.method}` : '';
    return `[${metadata.clazz}${method}]`;
  }

  private getPhoneNumber(phoneNumber?: string): string {
    return `[${phoneNumber ?? WinstonLogConstants.UNKNOWN}]`;
  }

  private getMessage(message?: string, error?: any): string {
    return error?.message && !message
      ? error.message
      : message ?? WinstonLogConstants.UNKNOWN;
  }

  private getData(data?: any): string {
    if (!data) return null;
    return `| Data: ${JSON.stringify(data)}`;
  }

  private getExceptionName(exception?: any): string {
    if (!exception || (!exception.name && !exception.code)) return null;
    const code = exception.code ? `( ${exception.code} )` : '';
    return `| Exception: ${exception.name ?? ''} ${code}`.trim();
  }

  private getStack(exception?: any): string {
    if (!exception || !exception.stack) return null;
    return `| Stack: ${JSON.stringify(exception.stack ?? '')}`.trim();
  }

  private getInnerException(exception?: any): string {
    if (!exception || !exception.innerException) return null;
    return `| InnerException: ${JSON.stringify(
      exception.innerException ?? '',
    )}`.trim();
  }

  private objectFormat(info: winston.Logform.TransformableInfo): IWinstonLog {
    return {
      label: info.label,
      timestamp: info.timestamp,
      clazz: info.metadata?.clazz,
      method: info.metadata?.method,
      level: info.level,
      data: info.metadata?.data,
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
}
