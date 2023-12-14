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
    const rowLog = new StringBuilder();
    rowLog.append(`[${info.label}]`);
    rowLog.append(`${info.timestamp}`);
    rowLog.append(`${info.level.toUpperCase()}`);
    this.addClazzMethod(rowLog, info.metadata);
    this.addPhoneNumber(rowLog, info.metadata?.phoneNumber);
    this.addData(rowLog, info.metadata);
    this.addMessage(rowLog, info.message, info.metadata?.error);
    this.addData(rowLog, info.metadata);
    this.addError(rowLog, info.metadata);
    return rowLog.toString('  ');
  }

  private addPhoneNumber(rowLog: StringBuilder, phoneNumber?: string): void {
    rowLog.append(`[${phoneNumber ?? WinstonLogConstants.UNKNOWN}]`);
  }

  private addMessage(
    rowLog: StringBuilder,
    message?: string,
    error?: any,
  ): void {
    rowLog.append(
      error?.message && !message
        ? error.message
        : message ?? WinstonLogConstants.UNKNOWN,
    );
  }

  private addClazzMethod(rowLog: StringBuilder, metadata: any): void {
    if (!metadata || !metadata.clazz) return;
    const method = metadata.method ? `.${metadata.method}` : '';
    rowLog.append(`[${metadata.clazz}${method}]`);
  }

  private addData(rowLog: StringBuilder, metadata: any): void {
    if (!metadata || !metadata.data) return;
    rowLog.append(`| Data: ${JSON.stringify(metadata.data)}`);
  }

  private addError(rowLog: StringBuilder, metadata: any): void {
    if (!metadata || !metadata.error) return;
    rowLog.append(`${metadata.error}`);
    if (metadata.error.stack) {
      rowLog.append(`| StackTrace: ${JSON.stringify(metadata.error.stack)}`);
    }
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
