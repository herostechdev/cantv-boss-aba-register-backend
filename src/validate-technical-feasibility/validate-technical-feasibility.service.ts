import { Injectable } from '@nestjs/common';
import { InsertDslAbaRegisterConstants } from './insert-dsl-aba-register.constants';
import { InsertDslAbaRegisterException } from './insert-dsl-aba-register.exception';
import { IsAPrepaidVoiceLineException } from './is-a-prepaid-voice-line.exception';
import { IValidateTechnicalFeasibilityResponse } from './validate-technical-feasibility-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';

@Injectable()
export class ValidateTechnicalFeasibilityService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async ValidateTechnicalFeasibility(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<IValidateTechnicalFeasibilityResponse> {
    try {
      await super.connect();
      const insertDslAbaRegistersResponse = await this.insertDslAbaRegisters(
        dto,
      );
      await this.isPrepaidVoiceLine(dto);
      const response = {
        orderId: OracleHelper.getFirstItem(result, 'str_orderid'),
        status: OracleHelper.getFirstItem(result, 'str_status'),
      };
      return response;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async insertDslAbaRegisters(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<number> {
    const parameters = {
      iAreaCode: OracleHelper.stringBindIn(dto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(dto.phoneNumber, 7),
      iRegisterDate: OracleHelper.dateBindIn(dto.registerDate),
      iRegisterStatus: OracleHelper.stringBindIn(dto.registerStatus, 16),
      iLoginInstall: OracleHelper.stringBindIn(dto.loginInstall, 32),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ABA_PACKAGE,
      OracleConstants.INSERT_DSL_ABA_REGISTERS,
      parameters,
    );
    const status = (result?.outBinds?.status ??
      InsertDslAbaRegisterConstants.INTERNAL_ERROR) as InsertDslAbaRegisterConstants;
    switch (status) {
      case InsertDslAbaRegisterConstants.SUCCESSFULL:
        return status;
      case InsertDslAbaRegisterConstants.INTERNAL_ERROR:
      case InsertDslAbaRegisterConstants.THERE_IS_NO_DATA:
      case InsertDslAbaRegisterConstants.REGISTERRED:
      default:
        throw new InsertDslAbaRegisterException();
    }
  }

  private async isPrepaidVoiceLine(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<void> {
    const parameters = {
      Abaareacode: OracleHelper.stringBindIn(dto.areaCode, 3),
      abaphonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 16),
      isPrepago: OracleHelper.numberBindOut(),
      oStatus: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.IS_PREPAID,
      parameters,
    );
    const isPrepaid = result?.outBinds?.isPrepago ?? 1;
    const status = result?.outBinds?.oStatus ?? 1;
    if (isPrepaid == 1 || status == 1) {
      throw new IsAPrepaidVoiceLineException();
    }
  }
}
