import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { IOracleExecute } from 'src/oracle/oracle-execute.interface';
import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export abstract class AbaRegisterExecuteService<
  DTO extends IPhoneNumber,
  RESPONSE,
> extends OracleFinalExecuteService<DTO, RESPONSE> {
  constructor(
    private readonly className: string,
    private readonly processMessage: string,
    protected readonly rawService: IOracleExecute<DTO, RESPONSE>,
  ) {
    super();
  }

  async execute(
    dto: DTO,
    dbConnection?: Connection,
    autoCommit = false,
  ): Promise<RESPONSE> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: JSON.stringify(dto),
        clazz: this.className,
        method: BossConstants.EXECUTE,
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: this.processMessage,
        input: JSON.stringify(dto),
        clazz: this.className,
        method: BossConstants.EXECUTE,
      });
      const response = await this.rawService.execute(
        dto,
        dbConnection,
        autoCommit,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: JSON.stringify(dto),
        clazz: this.className,
        method: BossConstants.EXECUTE,
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: this.className,
        method: BossConstants.EXECUTE,
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  protected abstract processResponse(response: RESPONSE): RESPONSE;
}
