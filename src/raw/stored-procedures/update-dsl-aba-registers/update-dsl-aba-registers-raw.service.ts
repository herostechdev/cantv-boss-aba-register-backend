import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersException } from './update-dsl-aba-registers.exception';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers-request.dto';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers-status.constants';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

@Injectable()
export class UpdateDslAbaRegistersRawService
  extends OracleDatabaseService
  implements
    IOracleRawExecute<
      UpdateDslAbaRegistersRequestDto,
      IUpdateDslAbaRegistersResponse
    >
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: UpdateDslAbaRegistersRequestDto,
    dbConnection?: Connection,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.ABA_PACKAGE,
        BossConstants.UPDATE_DSL_ABA_REGISTERS,
        this.getParameters(dto),
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

  async errorUpdate(
    dto: UpdateDslAbaRegistersRequestDto,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    try {
      return await this.execute(dto);
    } catch (error) {}
  }

  getParameters(dto: UpdateDslAbaRegistersRequestDto): any {
    return {
      iAreaCode: OracleHelper.stringBindIn(dto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(dto.phoneNumber, 7),
      iRegisterStatus: OracleHelper.stringBindIn(dto.registerStatus, 16),

      status: OracleHelper.numberBindOut(),
    };
  }

  getResponse(result: any): IUpdateDslAbaRegistersResponse {
    return {
      status: (result?.outBinds?.status ??
        UpdateDslAbaRegistersStatusConstants.ERROR) as UpdateDslAbaRegistersStatusConstants,
    };
  }
}
