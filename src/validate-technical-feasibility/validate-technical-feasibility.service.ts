import { Injectable } from '@nestjs/common';
import { GetABADataFromRequestsException } from './get-aba-data-from-requests.exception';
import { GetAndRegisterQualifOfServiceException } from './get-and-register-qualif-of-service.exception';
import { GetDownstreamFromPlanException } from './get-downstream-from-plan.exception';
import { IGetABADataFromRequestsResponse } from './get-aba-data-from-requests-response.interface';
import { InsertDslAbaRegisterConstants } from './insert-dsl-aba-register.constants';
import { InsertDslAbaRegisterException } from './insert-dsl-aba-register.exception';
import { IsAPrepaidVoiceLineException } from './is-a-prepaid-voice-line.exception';
import { IValidateTechnicalFeasibilityResponse } from './validate-technical-feasibility-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';
import { VerifyContractByPhoneException } from './verify-contract-by-phone.exception';

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
      await this.getAndRegisterQualifOfService(dto);
      await this.verifyContractByPhone(dto);
      await this.getDataFromRequests(dto);
      await this.getDownstreamFromPlan(dto);
      await this.getABADataFromRequests(dto);
      return null;
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
    try {
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
    } catch (error) {
      if (!(error instanceof IsAPrepaidVoiceLineException)) {
        throw new IsAPrepaidVoiceLineException();
      }
    }
  }

  private async getAndRegisterQualifOfService(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<void> {
    try {
      const parameters = {
        i_clientserviceid: OracleHelper.numberBindOut(dto.clientServiceId),
        i_areacode: OracleHelper.stringBindIn(dto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 256),
        o_qualifpossible: OracleHelper.stringBindOut(),
        o_modemstatus: OracleHelper.stringBindOut(),
        o_maxdownstream: OracleHelper.stringBindOut(),
        o_maxupstream: OracleHelper.stringBindOut(),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        null,
        OracleConstants.GET_AND_REGISTER_QUALIF_OF_SERVICE,
        parameters,
      );
      const isPrepaid = result?.outBinds?.isPrepago ?? 1;
      const status = result?.outBinds?.oStatus ?? 1;
      if (isPrepaid == 1 || status == 1) {
        throw new GetAndRegisterQualifOfServiceException();
      }
    } catch (error) {
      if (!(error instanceof GetAndRegisterQualifOfServiceException)) {
        throw new GetAndRegisterQualifOfServiceException();
      }
    }
  }

  private async verifyContractByPhone(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<void> {
    try {
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(dto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 256),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.VERIFY_CONTRACT_BY_PHONE,
        parameters,
      );
      const status = result?.outBinds?.oStatus ?? 1;
      if (status != 0) {
        throw new VerifyContractByPhoneException();
      }
    } catch (error) {
      if (!(error instanceof VerifyContractByPhoneException)) {
        throw new VerifyContractByPhoneException();
      }
    }
  }

  // TODO: Pendiente definición de STORED PROCEDURE
  private async getDataFromRequests(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<void> {
    try {
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(dto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 256),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_DATA_FROM_REQUESTS,
        parameters,
      );
      const status = result?.outBinds?.oStatus ?? 1;
      if (status != 0) {
        throw new VerifyContractByPhoneException();
      }
    } catch (error) {
      if (!(error instanceof VerifyContractByPhoneException)) {
        throw new VerifyContractByPhoneException();
      }
    }
  }

  private async getDownstreamFromPlan(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<void> {
    try {
      const parameters = {
        i_planname: OracleHelper.stringBindIn(dto.areaCode, 32),
        o_downstream: OracleHelper.stringBindOut(32),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        null,
        OracleConstants.GET_DOWNSTREAM_FROM_PLAN,
        parameters,
      );
      const downstream = result?.outBinds?.o_downstream ?? 1;
      const status = result?.outBinds?.o_status ?? 1;
      if (status != 0) {
        throw new GetDownstreamFromPlanException();
      }
    } catch (error) {
      if (!(error instanceof GetDownstreamFromPlanException)) {
        throw new GetDownstreamFromPlanException();
      }
    }
  }

  private async getABADataFromRequests(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<IGetABADataFromRequestsResponse> {
    try {
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(dto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 256),
        o_id: OracleHelper.tableOfStringBindOut(532),
        o_firstname: OracleHelper.tableOfStringBindOut(532),
        o_lastname: OracleHelper.tableOfStringBindOut(532),
        o_email: OracleHelper.tableOfStringBindOut(532),
        o_phonenumber: OracleHelper.tableOfStringBindOut(532),
        o_address1: OracleHelper.tableOfStringBindOut(532),
        o_address2: OracleHelper.tableOfStringBindOut(532),
        o_city: OracleHelper.tableOfStringBindOut(532),
        o_state: OracleHelper.tableOfStringBindOut(532),
        Status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_ABA_DATA_FROM_REQUESTS,
        parameters,
      );
      const response: IGetABADataFromRequestsResponse = {
        id: OracleHelper.getFirstItem(result, 'o_id'),
        firstname: OracleHelper.getFirstItem(result, 'o_firstname'),
        lastname: OracleHelper.getFirstItem(result, 'o_lastname'),
        email: OracleHelper.getFirstItem(result, 'o_email'),
        phonenumber: OracleHelper.getFirstItem(result, 'o_phonenumber'),
        address1: OracleHelper.getFirstItem(result, 'o_address1'),
        address2: OracleHelper.getFirstItem(result, 'o_address2'),
        city: OracleHelper.getFirstItem(result, 'o_city'),
        state: OracleHelper.getFirstItem(result, 'o_state'),
        status: result?.outBinds?.Status,
      };
      if (response.status != 0) {
        throw new GetABADataFromRequestsException();
      }
      return response;
    } catch (error) {
      if (!(error instanceof GetABADataFromRequestsException)) {
        throw new GetABADataFromRequestsException();
      }
    }
  }
}
