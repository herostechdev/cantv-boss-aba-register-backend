import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import * as path from 'path';
import { WinstonLogConstants } from './winston-log.constants';
import { StringBuilder } from '../helpers/string.builder';
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
        label({ label: WinstonLogConstants.APPLICATION_NAME }),
        timestamp(),
        format.metadata({
          fillExcept: ['message', 'level', 'timestamp', 'label'],
        }),
        printf((info) => this.logFormat(info)),
      ),
      transports: [
        this.getCombinedFileTransport(),
        this.getErrorFileTransport(),
        // this.getDailyRotateFileTransport(),
      ],
    });
  }

  private logFormat(info: winston.Logform.TransformableInfo): string {
    const rowLog = new StringBuilder();
    rowLog.append(`[${info.label}] ${info.timestamp}`);
    if (info.metadata.clazz) {
      const method = info.metadata.method ? `.${info.metadata.method}` : '';
      rowLog.append(`  [${info.metadata.clazz}${method}]`);
    }
    rowLog.append(`  ${info.level.toUpperCase()}  ${info.message}`);
    if (info.metadata.error) {
      rowLog.append(`  ${info.metadata.error}`);
      if (info.metadata.error.stack) {
        rowLog.append(`  ${info.metadata.error.stack}`);
      }
    }
    return rowLog.toString();
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

  public info(message: string, clazz: string, method: string): void {
    this.logger.log(WinstonLogConstants.INFO, message, {
      clazz: clazz,
      method: method,
    });
  }

  public warn(message: string, clazz: string, method: string): void {
    this.logger.log(WinstonLogConstants.WARNING, message, {
      clazz: clazz,
      method: method,
    });
  }

  public debug(message: string, clazz: string, method: string): void {
    this.logger.log(WinstonLogConstants.DEBUG, message, {
      clazz: clazz,
      method: method,
    });
  }

  public error(message: string, clazz: string, method: string): void {
    this.logger.log(WinstonLogConstants.ERROR, message, {
      clazz: clazz,
      method: method,
    });
  }
}
