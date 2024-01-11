import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
// import DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';

import { IWinstonLog } from './winston-log.interface';
import { IAbaRegisterWinstonErrorLogInputData } from './aba-register-winston-error-log-input-data.interface';
import { IAbaRegisterWinstonLogInputData } from './aba-register-winston-log-input-data.interface';
import { StringBuilder } from '../helpers/string.builder';
import { WinstonLogConstants } from './winston-log.constants';
import { BossHelper } from 'src/boss/boss.helper';

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
    this.logger.log(WinstonLogConstants.INFO, data.message, this.getMeta(data));
  }

  public warn(data: IAbaRegisterWinstonLogInputData): void {
    this.logger.log(WinstonLogConstants.WARN, data.message, this.getMeta(data));
  }

  public debug(data: IAbaRegisterWinstonLogInputData): void {
    this.logger.log(
      WinstonLogConstants.DEBUG,
      data.message,
      this.getMeta(data),
    );
  }

  public error(data: IAbaRegisterWinstonErrorLogInputData): void {
    const metadata = this.getMeta(data);
    metadata.error = data.error;
    this.logger.log(WinstonLogConstants.ERROR, data.message, metadata);
  }

  private getMeta(data: IAbaRegisterWinstonLogInputData): any {
    return {
      phoneNumber: data.phoneNumber,
      clazz: data.clazz,
      method: data.method,
      input: data.input,
      response: data.response,
    };
  }

  private getLogger(): winston.Logger {
    return createLogger({
      // format: winston.format.json(),
      format: combine(
        label({ label: BossHelper.applicationName }),
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

  private stringFormat(info: winston.Logform.TransformableInfo): string {
    return new StringBuilder()
      .append(`[${info.label}]`)
      .append(`${info.timestamp}`)
      .append(`${info.level.toUpperCase()}`)
      .append(this.getClazzMethod(info.metadata))
      .append(this.getPhoneNumber(info.metadata?.phoneNumber))
      .append(this.getMessage(info.message, info.metadata?.error))
      .append(this.getInput(info.metadata?.input))
      .append(this.getResponse(info.metadata?.response))
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
    return error?.message ?? message ?? WinstonLogConstants.UNKNOWN;
  }

  private getInput(input?: any): string {
    if (!input) return null;
    return `| INPUT: ${JSON.stringify(input)}`;
  }

  private getResponse(response?: any): string {
    if (!response) return null;
    return `| RESPONSE: ${JSON.stringify(response)}`;
  }

  private getExceptionName(exception?: any): string {
    if (!exception || (!exception.name && !exception.code)) return null;
    const code = exception.code ? `( ${exception.code} )` : '';
    return `| EXCEPTION: ${exception.name ?? ''} ${code}`.trim();
  }

  private getStack(exception?: any): string {
    if (!exception || !exception.stack) return null;
    return `| STACK: ${JSON.stringify(exception.stack ?? '')}`.trim();
  }

  private getInnerException(exception?: any): string {
    if (!exception || !exception.innerException) return null;
    return `| INNER_EXCEPTION: ${JSON.stringify(
      exception.innerException ?? '',
    )}`.trim();
  }

  private objectFormat(info: winston.Logform.TransformableInfo): IWinstonLog {
    return {
      label: info.label,
      timestamp: info.timestamp,
      level: info.level,
      clazz: info.metadata?.clazz,
      method: info.metadata?.method,
      message: info.message,
      input: info.metadata?.input,
      response: info.metadata?.response,
      exception: info.metadata?.error?.name,
      exceptionCode: info.metadata?.error?.code,
      stack: info.metadata?.error?.stack,
      innerException: info.metadata?.error?.innerException,
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
  //     filename: path.join(
  //       process.env.LOG_FOLDER,
  //       `${BossHelper.applicationName}-%DATE%.log`,
  //     ),
  //     datePattern: 'YYYY-MM-DD-HH',
  //     zippedArchive: true,
  //     maxSize: '50m',
  //     maxFiles: '14d',
  //   });
  // }
}
