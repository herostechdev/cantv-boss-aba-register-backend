import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { DateTime } from 'luxon';
import { BossConstants } from 'src/boss/boss.constants';
import { IInsertDslAbaRegistersResponse } from './insert-dsl-aba-registers-response.interface';
import { InsertDslAbaRegisterException } from './insert-dsl-aba-register.exception';
import { InsertDslAbaRegisterStatusConstants } from './insert-dsl-aba-register-status.constants';
import { InsertDslAbaRegistersRequestDto } from './insert-dsl-aba-registers-request.dto';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class InsertDslAbaRegistersRawService extends OracleExecuteStoredProcedureRawService<
  InsertDslAbaRegistersRequestDto,
  IInsertDslAbaRegistersResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(
      BossConstants.ABA_PACKAGE,
      BossConstants.INSERT_DSL_ABA_REGISTERS,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: InsertDslAbaRegistersRequestDto): any {
    const registerDate = DateTime.fromFormat(
      dto.registerDate,
      BossConstants.DEFAULT_DATE_FORMAT,
    ).toJSDate();
    return {
      iAreaCode: OracleHelper.stringBindIn(dto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(dto.phoneNumber, 7),
      iRegisterDate: OracleHelper.dateBindIn(registerDate),
      iRegisterStatus: OracleHelper.stringBindIn(dto.registerStatus, 16),
      iLoginInstall: OracleHelper.stringBindIn(dto.loginInstall, 32),

      status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IInsertDslAbaRegistersResponse {
    const response = {
      status: (result?.outBinds?.status ??
        InsertDslAbaRegisterStatusConstants.ERROR) as InsertDslAbaRegisterStatusConstants,
    };
    switch (response.status) {
      case InsertDslAbaRegisterStatusConstants.SUCCESSFULL:
        return response;
      case InsertDslAbaRegisterStatusConstants.ERROR:
        throw new InsertDslAbaRegisterException();
      default:
        throw new InsertDslAbaRegisterException();
    }
  }

  async errorInsert(
    dto: InsertDslAbaRegistersRequestDto,
    dbConnection?: Connection,
  ): Promise<IInsertDslAbaRegistersResponse> {
    try {
      return await this.execute(dto, dbConnection);
    } catch (error) {}
  }
}
