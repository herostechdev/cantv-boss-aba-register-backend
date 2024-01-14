import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss/boss.constants';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersException } from './update-dsl-aba-registers.exception';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers-request.dto';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers-status.constants';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

@Injectable()
export class UpdateDslAbaRegistersRawService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: UpdateDslAbaRegistersRequestDto,
    dbConnection?: Connection,
    autoCommit = false,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.ABA_PACKAGE,
        BossConstants.UPDATE_DSL_ABA_REGISTERS,
        this.getParameters(dto),
        null,
        autoCommit,
      );
      const response = this.getResponse(result);
      switch (response.status) {
        case UpdateDslAbaRegistersStatusConstants.SUCCESSFULL:
          return response;
        case UpdateDslAbaRegistersStatusConstants.ERROR:
          throw new UpdateDslAbaRegistersException();
        default:
          throw new UpdateDslAbaRegistersException();
      }
    } catch (error) {
      super.exceptionHandler(error, `${JSON.stringify(dto)}`);
    } finally {
      await this.closeConnection(ValidationHelper.isDefined(dbConnection));
    }
  }

  private getParameters(dto: UpdateDslAbaRegistersRequestDto): any {
    return {
      iAreaCode: OracleHelper.stringBindIn(dto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(dto.phoneNumber, 7),
      iRegisterStatus: OracleHelper.stringBindIn(dto.registerStatus, 16),

      status: OracleHelper.numberBindOut(),
    };
  }

  private getResponse(result: any): IUpdateDslAbaRegistersResponse {
    const response = {
      status: (result?.outBinds?.status ??
        UpdateDslAbaRegistersStatusConstants.ERROR) as UpdateDslAbaRegistersStatusConstants,
    };
    switch (response.status) {
      case UpdateDslAbaRegistersStatusConstants.SUCCESSFULL:
        return response;
      case UpdateDslAbaRegistersStatusConstants.ERROR:
        throw new UpdateDslAbaRegistersException();
      default:
        throw new UpdateDslAbaRegistersException();
    }
  }

  async errorUpdate(
    dto: UpdateDslAbaRegistersRequestDto,
    dbConnection?: Connection,
    autoCommit = false,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    try {
      return await this.execute(dto, dbConnection, autoCommit);
    } catch (error) {}
  }
}
