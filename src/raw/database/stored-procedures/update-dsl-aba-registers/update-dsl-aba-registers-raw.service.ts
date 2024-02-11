import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss/boss.constants';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersException } from './update-dsl-aba-registers.exception';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers-request.dto';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers-status.constants';

@Injectable()
export class UpdateDslAbaRegistersRawService extends OracleExecuteStoredProcedureRawService<
  UpdateDslAbaRegistersRequestDto,
  IUpdateDslAbaRegistersResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(
      BossConstants.ABA_PACKAGE,
      BossConstants.UPDATE_DSL_ABA_REGISTERS,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: UpdateDslAbaRegistersRequestDto): any {
    return {
      iAreaCode: OracleHelper.stringBindIn(dto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(dto.phoneNumber, 7),
      iRegisterStatus: OracleHelper.stringBindIn(dto.registerStatus, 16),

      status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IUpdateDslAbaRegistersResponse {
    const response = {
      status: (OracleHelper.getParameterValue(result, 'status') ??
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
