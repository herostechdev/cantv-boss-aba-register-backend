import { Injectable } from '@nestjs/common';
import { Error1003Exception } from 'src/exceptions/error-1003.exception';
import { Error30041Exception } from 'src/exceptions/error-3004-1.exception';
import { Error30055Exception } from 'src/exceptions/error-3005-5.exception';
import { GetPortIdFromIpExecutionException } from './exceptions/get-port-id-from-ip-execution.exception';
import { GetABADataFromRequestsException } from './exceptions/get-aba-data-from-requests.exception';
import { GetAndRegisterQualifOfServiceException } from './exceptions/get-and-register-qualif-of-service.exception';
import { GetDownstreamFromPlanException } from './exceptions/get-downstream-from-plan.exception';
import { GetPortIdFromIpConstants } from './constants/get-port-id-from-ip.constants';
import { IGetInfoFromABARequestsResponse } from './responses/get-info-from-aba-requests-response.interface';
import { IGetABADataFromRequestsResponse } from './responses/get-aba-data-from-requests-response.interface';
import { IGetDownstreamFromPlanResponse } from './responses/get-downstream-from-plan-response.interface';
import { IGetPortIdFromIpResponse } from './responses/get-port-id-from-ip-response.interface';
import { IIsValidIpAddressResponse } from './responses/is-valid-ip-address-response.interface';
import { InsertDslAbaRegisterConstants } from './constants/insert-dsl-aba-register.constants';
import { InsertDslAbaRegisterException } from './exceptions/insert-dsl-aba-register.exception';
import { IsAPrepaidVoiceLineException } from './exceptions/is-a-prepaid-voice-line.exception';
import { IsValidIpAddressConstants } from './constants/is-valid-ip-address.constants';
import { IValidateTechnicalFeasibilityResponse } from './validate-technical-feasibility-response.interface';
import { IVerifiyContractByPhoneResponse } from './responses/verify-contract-by-phone-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';
import { VerifyContractByPhoneException } from './exceptions/verify-contract-by-phone.exception';
import { GetPortIdFromIpDSLAMDataNotFoundException } from './exceptions/get-port-id-from-ip-dslam-data-not-found.exception';
import { GetPortIdFromIpBadIpFormatException } from './exceptions/get-port-id-from-ip-bad-ip-format.exception';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { ValidateTechnicalFeasibilityData } from './validate-technical-feasibility-data';
import { GetValidVPIException } from './exceptions/get-valid-vpi.exception';

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
      const data = new ValidateTechnicalFeasibilityData();
      data.requestDto = dto;
      await super.connect();
      data.insertDslAbaRegistersResponse = await this.insertDslAbaRegisters(
        data,
      );
      await this.isPrepaidVoiceLine(data);
      await this.getAndRegisterQualifOfService(data);
      data.verifyContractByPhoneResponse = await this.verifyContractByPhone(
        data,
      );
      data.getInfoFromABARequestsResponse = await this.GetInfoFromABARequests(
        data,
      );
      data.getDownstreamFromPlanResponse = await this.getDownstreamFromPlan(
        data,
      );
      data.getABADataFromRequestsResponse = await this.getABADataFromRequests(
        data,
      );
      if (data.verifyContractByPhoneResponse.status == 0) {
        throw new VerifyContractByPhoneException();
      }
      data.isValidIpAddressResponse = await this.IsValidIpAddress(data);
      data.getPortidFromIpResponse = await this.getPortidFromIp(data);
      if (
        ValidationHelper.isDefined(data.getPortidFromIpResponse.dslamportId)
      ) {
      } else {
        await this.getPortIdFlow(data);
      }
      return null;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async insertDslAbaRegisters(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<number> {
    const parameters = {
      iAreaCode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber, 7),
      iRegisterDate: OracleHelper.dateBindIn(data.requestDto.registerDate),
      iRegisterStatus: OracleHelper.stringBindIn(
        data.requestDto.registerStatus,
        16,
      ),
      iLoginInstall: OracleHelper.stringBindIn(
        data.requestDto.loginInstall,
        32,
      ),
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
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    try {
      const parameters = {
        Abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
        abaphonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          16,
        ),
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
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    try {
      const parameters = {
        i_clientserviceid: OracleHelper.numberBindIn(data.requestDto.orderId),
        i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          256,
        ),
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
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IVerifiyContractByPhoneResponse> {
    try {
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          256,
        ),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.VERIFY_CONTRACT_BY_PHONE,
        parameters,
      );
      const status = result?.outBinds?.oStatus ?? 1;
      // if (status != 0) {
      //   throw new VerifyContractByPhoneException();
      // }
      return {
        status: status,
      };
    } catch (error) {
      // if (!(error instanceof VerifyContractByPhoneException)) {
      //   throw new VerifyContractByPhoneException();
      // }
      throw new VerifyContractByPhoneException();
    }
  }

  private async GetInfoFromABARequests(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetInfoFromABARequestsResponse> {
    try {
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          256,
        ),
        sz_Fecha1: OracleHelper.stringBindOut(10),
        sz_Fecha2: OracleHelper.stringBindOut(10),
        sz_Fecha3: OracleHelper.stringBindOut(10),
        sz_PlanDesired: OracleHelper.stringBindOut(32),
        sz_PlanDescription: OracleHelper.stringBindOut(256),
        sz_MedioP: OracleHelper.stringBindOut(32),
        abarequests_row: OracleHelper.stringBindOut(10),
        abaacceptedrequests_row: OracleHelper.stringBindOut(10),
        abarequestsregistes_row: OracleHelper.stringBindOut(10),
        Status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.GET_INFO_FROM_ABA_REQUESTS,
        parameters,
      );
      const status = result?.outBinds?.oStatus ?? 1;
      if (status != 0) {
        throw new VerifyContractByPhoneException();
      }
      return {
        date1: result?.outBinds?.sz_Fecha1,
        date2: result?.outBinds?.sz_Fecha2,
        date3: result?.outBinds?.sz_Fecha3,
        desiredPlan: result?.outBinds?.sz_PlanDesired,
        descriptionPlan: result?.outBinds?.sz_PlanDescription,
        medioP: result?.outBinds?.sz_MedioP,
        abaRequestsRow: result?.outBinds?.abarequests_row,
        abaAcceptedRequestsRow: result?.outBinds?.abaacceptedrequests_row,
        abaRequestsRegistersRow: result?.outBinds?.abarequestsregistes_row,
        status: result?.outBinds?.Status,
      };
    } catch (error) {
      if (!(error instanceof VerifyContractByPhoneException)) {
        throw new VerifyContractByPhoneException();
      }
    }
  }

  private async getDownstreamFromPlan(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDownstreamFromPlanResponse> {
    try {
      const parameters = {
        i_planname: OracleHelper.stringBindIn(data.requestDto.areaCode, 32),
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
      return {
        downstream: downstream,
        status: status,
      };
    } catch (error) {
      if (!(error instanceof GetDownstreamFromPlanException)) {
        throw new GetDownstreamFromPlanException();
      }
    }
  }

  private async getABADataFromRequests(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetABADataFromRequestsResponse> {
    try {
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
        i_phonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          256,
        ),
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

  private async IsValidIpAddress(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IIsValidIpAddressResponse> {
    try {
      const parameters = {
        abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
        abaphonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          16,
        ),
        abaipaddress: OracleHelper.stringBindIn(data.requestDto.ipAddress, 15),
        Status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.IS_VALID_IP_ADDRESS,
        parameters,
      );
      const status = (result?.outBinds?.status ??
        IsValidIpAddressConstants.ERROR_1003) as IsValidIpAddressConstants;
      switch (status) {
        case IsValidIpAddressConstants.SUCCESSFULL:
          return {
            status: status,
          };
        case IsValidIpAddressConstants.ERROR_1003:
          throw new Error1003Exception();
        case IsValidIpAddressConstants.ERROR_3004_1:
          throw new Error30041Exception();
        case IsValidIpAddressConstants.ERROR_3005_5:
          throw new Error30055Exception();
        case IsValidIpAddressConstants.POOL_RBE_LEASE:
          return {
            status: status,
          };
        default:
          throw new Error1003Exception();
      }
    } catch (error) {
      if (
        !(
          error instanceof Error1003Exception ||
          error instanceof Error30041Exception ||
          error instanceof Error30055Exception
        )
      ) {
        throw new Error1003Exception();
      }
    }
  }

  private async getPortidFromIp(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetPortIdFromIpResponse> {
    try {
      const parameters = {
        i_ipaddress: OracleHelper.stringBindIn(data.requestDto.areaCode, 15),
        o_dslamportid: OracleHelper.numberBindOut(),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_PORT_ID_FROM_IP,
        parameters,
      );
      const dslamportId = result?.outBinds?.o_dslamportid ?? 1;
      const status = (result?.outBinds?.status ??
        GetPortIdFromIpConstants.EXECUTION_ERROR) as GetPortIdFromIpConstants;
      switch (status) {
        case GetPortIdFromIpConstants.SUCCESSFULL:
          return {
            dslamportId: dslamportId,
            status: status,
          };
        case GetPortIdFromIpConstants.EXECUTION_ERROR:
          throw new GetPortIdFromIpExecutionException();
        case GetPortIdFromIpConstants.DSLAM_DATA_NOT_FOUND_FOR_BOSS_PORT:
          throw new GetPortIdFromIpDSLAMDataNotFoundException();
        case GetPortIdFromIpConstants.IP_FORMAT_ERROR:
          throw new GetPortIdFromIpBadIpFormatException();
        default:
          throw new GetPortIdFromIpExecutionException();
      }
    } catch (error) {
      if (
        !(
          error instanceof GetPortIdFromIpExecutionException ||
          error instanceof GetPortIdFromIpDSLAMDataNotFoundException ||
          error instanceof GetPortIdFromIpBadIpFormatException
        )
      ) {
        throw new GetPortIdFromIpExecutionException();
      }
    }
  }

  private async getPortIdFlow(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    const queryDHCPResponse = await this.queryDHCP(data);
    data.getValidVPIResponse = await this.getValidVPI(data);
    const getPortIdResponse = await this.getPortId(data);
    return getPortIdResponse;
  }

  private async queryDHCP(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<any> {
    return null;
  }

  private async getValidVPI(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<number> {
    try {
      const parameters = {
        i_nspip: OracleHelper.stringBindIn(data.requestDto.areaCode, 15),
        // TODO: Investigar y capturar el valor de i_invalidvpi
        i_invalidvpi: OracleHelper.numberBindIn(0),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.UTL_PACKAGE,
        OracleConstants.GET_VALID_VPI,
        parameters,
      );
      // TODO: DETERMINAR COMO SE OBTIENE EL VALOR DE SALIDA:   VPI (Virtual Path Indicator)
      return result?.outBinds?.vpi ?? 0;
    } catch (error) {
      throw new GetValidVPIException();
    }
  }

  private async getPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<any> {
    return null;
  }
}
