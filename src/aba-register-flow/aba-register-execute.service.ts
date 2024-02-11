import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss/boss.constants';
import { IOracleExecute } from 'src/oracle/oracle-execute.interface';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';
import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';

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
    this.wlog.dto = dto;
    try {
      this.wlog.info(BossConstants.START);
      this.wlog.info(this.processMessage);
      const response = await this.rawService.execute(
        dto,
        dbConnection,
        autoCommit,
      );
      this.processResponse(response);
      this.wlog.info(BossConstants.END);
      return response;
    } catch (error) {
      this.wlog.error(error);
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  protected abstract processResponse(response: RESPONSE): RESPONSE;
}
