import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { IAbaRegisterWinstonErrorLogInputData } from 'src/system/infrastructure/winston-logger/aba-register-winston-error-log-input-data.interface';
import { IAbaRegisterWinstonLogInputData } from 'src/system/infrastructure/winston-logger/aba-register-winston-log-input-data.interface';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { WinstonLogTypeConstants } from 'src/system/infrastructure/winston-logger/winston-log-type.constants';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

export abstract class BossFlowService<
  DTO extends IPhoneNumber,
  RESPONSE,
> extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  protected dto: DTO;

  protected response: RESPONSE;

  protected readonly wlog = new WLogHelper();

  // private _className: string;
  // private _methodName: string;

  // protected set className(className: string) {
  //   this._className = className;
  // }

  // protected set methodName(methodName: string) {
  //   this._methodName = methodName;
  // }

  // protected infoLog(message: string): void {
  //   this.log(message, WinstonLogTypeConstants.INFO);
  // }

  // protected warnLog(message: string): void {
  //   this.log(message, WinstonLogTypeConstants.WARNING);
  // }

  // protected debugLog(message: string): void {
  //   this.log(message, WinstonLogTypeConstants.DEBUG);
  // }

  // protected errorLog(error: any): void {
  //   this.log(null, WinstonLogTypeConstants.ERROR, error);
  // }

  // private log(
  //   message: string,
  //   logType: WinstonLogTypeConstants,
  //   error?: any,
  // ): void {
  //   switch (logType) {
  //     case WinstonLogTypeConstants.INFO:
  //       Wlog.instance.info(this.getLogPayload(message));
  //       break;
  //     case WinstonLogTypeConstants.WARNING:
  //       Wlog.instance.warn(this.getLogPayload(message));
  //       break;
  //     case WinstonLogTypeConstants.DEBUG:
  //       Wlog.instance.debug(this.getLogPayload(message));
  //       break;
  //     case WinstonLogTypeConstants.ERROR:
  //       Wlog.instance.error(this.getErrorLogPayload(error));
  //       break;
  //     default:
  //       Wlog.instance.info(this.getLogPayload(message));
  //       break;
  //   }
  // }

  // private getLogPayload(message: string): IAbaRegisterWinstonLogInputData {
  //   return {
  //     phoneNumber: BossHelper.getPhoneNumber(this.dto),
  //     message: message,
  //     input: this.dto,
  //     clazz: this._className ?? BossConstants.UNKNOWN,
  //     method: this._methodName ?? BossConstants.UNKNOWN,
  //   };
  // }

  // private getErrorLogPayload(error: any): IAbaRegisterWinstonErrorLogInputData {
  //   return {
  //     ...this.getLogPayload(null),
  //     error: error,
  //   };
  // }
}
