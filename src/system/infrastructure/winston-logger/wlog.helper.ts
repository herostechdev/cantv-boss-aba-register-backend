import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { IAbaRegisterWinstonErrorLogInputData } from './aba-register-winston-error-log-input-data.interface';
import { IAbaRegisterWinstonLogInputData } from './aba-register-winston-log-input-data.interface';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';
import { Wlog } from './winston-logger.service';

export class WLogHelper {
  constructor(
    private _className?: string,
    private _methodName?: string,
    private _dto?: IPhoneNumber,
  ) {}

  set dto(value: IPhoneNumber) {
    this._dto = value;
  }

  set className(value: string) {
    this._className = value;
  }

  set methodName(value: string) {
    this._methodName = value;
  }

  info(message: string): void {
    Wlog.instance.info(this.getLogPayload(message));
  }

  warn(message: string): void {
    Wlog.instance.warn(this.getLogPayload(message));
  }

  debug(message: string): void {
    Wlog.instance.debug(this.getLogPayload(message));
  }

  error(error: any): void {
    Wlog.instance.error(this.getErrorLogPayload(error));
  }

  private getLogPayload(message: string): IAbaRegisterWinstonLogInputData {
    return {
      phoneNumber: BossHelper.getPhoneNumber(this._dto),
      message: message,
      input: this._dto,
      clazz: this._className ?? BossConstants.UNKNOWN,
      method: this._methodName ?? BossConstants.UNKNOWN,
    };
  }

  private getErrorLogPayload(error: any): IAbaRegisterWinstonErrorLogInputData {
    return {
      ...this.getLogPayload(null),
      error: error,
    };
  }
}
