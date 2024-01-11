import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { DateTime } from 'luxon';
import { BossConstants } from 'src/boss/boss.constants';
import { IInsertDslAbaRegistersResponse } from './insert-dsl-aba-registers-response.interface';
import { InsertDslAbaRegisterException } from './insert-dsl-aba-register.exception';
import { InsertDslAbaRegisterStatusConstants } from './insert-dsl-aba-register-status.constants';
import { InsertDslAbaRegistersRequestDto } from './insert-dsl-aba-registers-request.dto';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

@Injectable()
export class InsertDslAbaRegistersRawService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: InsertDslAbaRegistersRequestDto,
    dbConnection?: Connection,
  ): Promise<IInsertDslAbaRegistersResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.ABA_PACKAGE,
        BossConstants.INSERT_DSL_ABA_REGISTERS,
        this.getParameters(dto),
      );
      const response = this.getResponse(result);
      switch (response.status) {
        case InsertDslAbaRegisterStatusConstants.SUCCESSFULL:
          return response;
        case InsertDslAbaRegisterStatusConstants.ERROR:
          throw new InsertDslAbaRegisterException();
        default:
          throw new InsertDslAbaRegisterException();
      }
    } catch (error) {
      super.exceptionHandler(error, `${JSON.stringify(dto)}`);
    } finally {
      await this.closeConnection(ValidationHelper.isDefined(dbConnection));
    }
  }

  private getParameters(dto: InsertDslAbaRegistersRequestDto): any {
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

  private getResponse(result: any): IInsertDslAbaRegistersResponse {
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
  ): Promise<IInsertDslAbaRegistersResponse> {
    try {
      return await this.execute(dto);
    } catch (error) {}
  }
}
