import { Injectable } from '@nestjs/common';
import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { Error1003Exception } from 'src/exceptions/error-1003.exception';
import { Error30041Exception } from 'src/exceptions/error-3004-1.exception';
import { Error30055Exception } from 'src/exceptions/error-3005-5.exception';
import { Error30092Exception } from 'src/exceptions/error-3009-2.exception';
import { ErrorSearchingASAPException } from './exceptions/error-searching-asap.exception ';
import { GetPortIdFromIpExecutionException } from './exceptions/get-port-id-from-ip-execution.exception';
import { GetABADataFromRequestsException } from './exceptions/get-aba-data-from-requests.exception';
import { GetAndRegisterQualifOfServiceException } from './exceptions/get-and-register-qualif-of-service.exception';
import { GetDownstreamFromPlanException } from './exceptions/get-downstream-from-plan.exception';
import { GetPortIdFromIpBadIpFormatException } from './exceptions/get-port-id-from-ip-bad-ip-format.exception';
import { GetPortIdFromIpConstants } from './constants/get-port-id-from-ip.constants';
import { GetPortIdFromIpDSLAMDataNotFoundException } from './exceptions/get-port-id-from-ip-dslam-data-not-found.exception';
import { GetValidVPIException } from './exceptions/get-valid-vpi.exception';
import { IGetInfoFromABARequestsResponse } from './responses/get-info-from-aba-requests-response.interface';
import { IGetABADataResponse } from './responses/get-aba-data-response.interface';
import { IGetABADataFromRequestsResponse } from './responses/get-aba-data-from-requests-response.interface';
import { IGetDownstreamFromPlanResponse } from './responses/get-downstream-from-plan-response.interface';
import { IGetPortIdFromIpResponse } from './responses/get-port-id-from-ip-response.interface';
import { IIsValidIpAddressResponse } from './responses/is-valid-ip-address-response.interface';
import { InsertDslAbaRegisterConstants } from './constants/insert-dsl-aba-register.constants';
import { InsertDslAbaRegisterException } from './exceptions/insert-dsl-aba-register.exception';
import { IsAPrepaidVoiceLineException } from './exceptions/is-a-prepaid-voice-line.exception';
import { IIsOccupiedPortResponse } from './responses/is-occupied-port-response.interface';
import { IsOccupiedPortConstants } from './constants/is-occupied-port.constants';
import { IsOccupiedPortInternalErrorException } from './exceptions/is-occupied-port-internal-error.exception';
import { IsOccupiedPortTherIsNoDataException } from './exceptions/is-occupied-port-there-is-no-data.exception';
import { IsValidIpAddressConstants } from './constants/is-valid-ip-address.constants';
import { IValidateTechnicalFeasibilityResponse } from './validate-technical-feasibility-response.interface';
import { IVerifiyContractByPhoneResponse } from './responses/verify-contract-by-phone-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { TheClientAlreadyHasABAServiceException } from './exceptions/the-client-already-has-aba-service.exception';
import { ValidateTechnicalFeasibilityData } from './validate-technical-feasibility-data';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { VerifyContractByPhoneException } from './exceptions/verify-contract-by-phone.exception';
import { GetABADataConstants } from './constants/get-aba-data.constants';
import { GetABADataExecutionErrorException } from './exceptions/get-aba-data-execution-error.exception';
import { GetABADataTherIsNoDataException } from './exceptions/get-aba-data-there-is-no-data.exception';

@Injectable()
export class ValidateTechnicalFeasibilityService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly dslAuditLogsService: DSLAuditLogsService,
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
        data.isOccupiedPortResponse = await this.IsOccupiedPort(data);
        // TODO: Verificar el proceso BPM porque hay discrepancias entre lo que devuelve el SP vs lo que se comprueba en el IF.
        if (data.isOccupiedPortResponse.result === 999999) {
          await this.getPortIdFlow(data);
        } else {
          await this.rbeDoesNotExist(data);
          data.snacomDllResponse = await this.snacomDll(data);
        }
      } else {
        await this.getPortIdFlow(data);
      }
      data.getABADataResponse = await this.getABAData(data);
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
    data.queryDHCPResponse = await this.queryDHCP(data);
    data.getValidVPIResponse = await this.getValidVPI(data);
    data.getPortIdResponse = await this.getPortId(data);
    // TODO: CONSIDERAR SI LA RESPUESTA DEL SP getPortId tiene múltiples campos
    if (ValidationHelper.isDefined(data.getPortIdResponse)) {
      await this.dslAuditLogsService.log({
        areaCode: data.requestDto.areaCode,
        phoneNumber: data.requestDto.phoneNumber,
        orderId: data.requestDto.orderId,
        ipAddress: data.requestDto.ipAddress,
        activationLogin: null,
        webPage: null,
        code: null,
        description: 'Se obtuvo exitosamente el ID del Puerto',
        comments: null,
        planName: null,
      });
      if (data.isValidIpAddressResponse.status === 5) {
        await this.rbeDoesNotExist(data);
      } else {
        // SNACOM.DLL (dada Orden IABA) CONSUMIR SERVICIO PIC (Por definir)
        data.snacomDllResponse = await this.snacomDll(data);
      }
    } else {
      throw new Error30092Exception();
    }
  }

  private async rbeDoesNotExist(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    await this.dslAuditLogsService.log({
      areaCode: data.requestDto.areaCode,
      phoneNumber: data.requestDto.phoneNumber,
      orderId: data.requestDto.orderId,
      ipAddress: data.requestDto.ipAddress,
      activationLogin: null,
      webPage: null,
      code: null,
      description: 'RBE no existe',
      comments: null,
      planName: null,
    });
  }

  // TODO: Identificar y desarrollar servicio en el PIC
  // SNACOM.DLL (dada Orden IABA) CONSUMIR SERVICIO PIC (Por definir)
  private async snacomDll(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<any> {
    // TODO: copiar respuesta a: ValidateTechnicalFeasibilityData
    const response: any = null;
    if (
      // [5199, 9406, 9500, 9408, 400, 530, 7, 030, 399].includes(response.status)
      [
        '5199',
        '9406',
        '9500',
        '9408',
        '400',
        '530',
        '7',
        '030',
        '399',
      ].includes(response.status)
    ) {
      throw new ErrorSearchingASAPException();
    }
    return response;
  }

  // TODO: Invoke query dhcp service.
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

  // TODO: FALTA ESPECIFICACIÓN DEL STP: GetPortId
  private async getPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<any> {
    try {
      const parameters = {
        l_portid: OracleHelper.numberBindIn(data.requestDto.orderId),
        i_invalidvpi: OracleHelper.numberBindIn(0),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.UTL_PACKAGE,
        OracleConstants.GET_PORT_ID,
        parameters,
      );
      // TODO: DETERMINAR COMO SE OBTIENE EL VALOR DE SALIDA:   VPI (Virtual Path Indicator)
      return result?.outBinds?.vpi ?? 0;
    } catch (error) {
      throw new GetValidVPIException();
    }
  }

  private async IsOccupiedPort(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IIsOccupiedPortResponse> {
    try {
      const parameters = {
        i_nspip: OracleHelper.stringBindIn(data.requestDto.areaCode, 15),
        l_result: OracleHelper.numberBindOut(),
        o_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.IS_OCCUPIED_PORT,
        parameters,
      );
      const response: IIsOccupiedPortResponse = {
        result: result?.outBinds?.l_result ?? OracleConstants.OCCUPIED_PORT,
        status: (result?.outBinds?.status ??
          IsOccupiedPortConstants.INTERNAL_ERROR) as IsOccupiedPortConstants,
      };
      switch (response.status) {
        case GetPortIdFromIpConstants.SUCCESSFULL:
          return response;
        case IsOccupiedPortConstants.INTERNAL_ERROR:
          throw new IsOccupiedPortInternalErrorException();
        case IsOccupiedPortConstants.THERE_IS_NO_DATA:
          throw new IsOccupiedPortTherIsNoDataException();
        default:
          throw new IsOccupiedPortInternalErrorException();
      }
    } catch (error) {
      throw new IsOccupiedPortInternalErrorException();
    }
  }

  private async getABAData(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetABADataResponse> {
    try {
      const parameters = {
        abaorderid: OracleHelper.stringBindIn(
          String(data.requestDto.orderId),
          12,
        ),
        abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
        abaphonenumber: OracleHelper.stringBindIn(
          data.requestDto.phoneNumber,
          16,
        ),
        abaipaddress: OracleHelper.stringBindIn(data.requestDto.ipAddress, 99),
        abadslamportid: OracleHelper.tableOfNumberBindOut(),
        abancc: OracleHelper.tableOfStringBindOut(532),
        abaclienttype: OracleHelper.tableOfStringBindOut(532),
        abaorderdate: OracleHelper.tableOfStringBindOut(532),
        abaad: OracleHelper.tableOfStringBindOut(532),
        abaparad: OracleHelper.tableOfStringBindOut(532),
        abaslot: OracleHelper.tableOfNumberBindOut(),
        abaport: OracleHelper.tableOfNumberBindOut(),
        abarack: OracleHelper.tableOfNumberBindOut(),
        abaposition: OracleHelper.tableOfNumberBindOut(),
        abavci: OracleHelper.tableOfNumberBindOut(),
        abacontractid: OracleHelper.tableOfNumberBindOut(),
        Status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.GET_ABA_DATA,
        parameters,
      );
      const response: IGetABADataResponse = {
        abadslamportid: OracleHelper.getFirstItem(result, 'abadslamportid'),
        abancc: OracleHelper.getFirstItem(result, 'abancc'),
        abaclienttype: OracleHelper.getFirstItem(result, 'abaclienttype'),
        abaorderdate: OracleHelper.getFirstItem(result, 'abaorderdate'),
        abaad: OracleHelper.getFirstItem(result, 'abaad'),
        abaparad: OracleHelper.getFirstItem(result, 'abaparad'),
        abaslot: OracleHelper.getFirstItem(result, 'abaslot'),
        abaport: OracleHelper.getFirstItem(result, 'abaport'),
        abarack: OracleHelper.getFirstItem(result, 'abarack'),
        abaposition: OracleHelper.getFirstItem(result, 'abaposition'),
        abavci: OracleHelper.getFirstItem(result, 'abavci'),
        abacontractid: OracleHelper.getFirstItem(result, 'abacontractid'),
        status: (result?.outBinds?.status ??
          GetABADataConstants.EXECUTION_ERROR) as GetABADataConstants,
      };
      switch (response.status) {
        case GetABADataConstants.SUCCESSFULL:
          return response;
        case GetABADataConstants.EXECUTION_ERROR:
          throw new GetABADataExecutionErrorException();
        case GetABADataConstants.THERE_IS_NO_DATA:
          throw new GetABADataTherIsNoDataException();
        default:
          throw new GetABADataExecutionErrorException();
      }
    } catch (error) {
      throw new GetABADataExecutionErrorException();
    }
  }
}
