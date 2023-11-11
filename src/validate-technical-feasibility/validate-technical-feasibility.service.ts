import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { CheckIpExecutionErrorException } from './check-ip/check-ip-execution-error.exception';
import { CheckIpStatusConstants } from './check-ip/check-ip-status.constants';
import { DeleteOrderStatusConstants } from './delete-order/delete-order-status.constants';
import { DeleteOrderExecutionErrorException } from './delete-order/delete-order-execution-error.exception';
import { DeleteOrderThereIsNoDataException } from './delete-order/delete-order-there-is-no-data.exception';
import { DeleteOrderThePortIsOccupiedByAnotherContractException } from './delete-order/delete-order-the-is-occupied-by-another-contract.exception';
import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { Error1003Exception } from 'src/exceptions/error-1003.exception';
import { Error30031Exception } from 'src/exceptions/error-3003-1.exception';
import { Error30032Exception } from 'src/exceptions/error-3003-2.exception';
import { Error30041Exception } from 'src/exceptions/error-3004-1.exception';
import { Error30055Exception } from 'src/exceptions/error-3005-5.exception';
import { Error30092Exception } from 'src/exceptions/error-3009-2.exception';
import { ErrorInsertingIABAFromRegisterException } from './exceptions/error-inserting-iaba-from-register.exception';
import { ErrorSearchingASAPException } from './exceptions/error-searching-asap.exception ';
import { GetPortIdFromIpExecutionException } from './get-port-id-from-ip/get-port-id-from-ip-execution.exception';
import { GetABADataConstants } from './get-aba-data/get-aba-data.constants';
import { GetABADataExecutionErrorException } from './get-aba-data/get-aba-data-execution-error.exception';
import { GetABADataFromRequestsException } from './get-aba-data-from-requests/get-aba-data-from-requests.exception';
import { GetABADataFromRequestsStatusConstants } from './get-aba-data-from-requests/get-aba-data-from-requests-status.constants';
import { GetAndRegisterQualifOfServiceException } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service.exception';
import { GetAndRegisterQualifOfServiceStatusConstants } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-status.constants';
import { GetDataFromDSLAMPortIdExecutionErrorException } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-execution-error.exception';
import { GetDataFromDSLAMPortIdStatusConstants } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-status.constants';
import { GetDataFromDSLAMPortIdThereIsNoDataException } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-there-is-no-data.exception';
import { GetDataFromRequestsStatusConstants } from './get-data-from-requests/get-data-from-requests-status.constants';
import { GetDataFromRequestsException } from './get-data-from-requests/get-data-from-requests.exception';
import { GetDHCPDataService } from 'src/get-dhcp-data/get-dhcp.service';
import { GetDownstreamFromPlanException } from './get-downstream-from-plan/get-downstream-from-plan.exception';
import { GetDownstreamFromPlanStatusConstants } from './get-downstream-from-plan/get-downstream-from-plan-status.constants';
import { GetInfoFromABARequestsException } from './get-info-from-aba-requests/get-info-from-aba-requests.exception';
import { GetInfoFromABARequestsStatusConstants } from './get-info-from-aba-requests/get-info-from-aba-requests-status.constants';
import { GetPortIdFromIpBadIpFormatException } from './get-port-id-from-ip/get-port-id-from-ip-bad-ip-format.exception';
import { GetPortIdFromIpConstants } from './get-port-id-from-ip/get-port-id-from-ip.constants';
import { GetPortIdFromIpDSLAMDataNotFoundException } from './get-port-id-from-ip/get-port-id-from-ip-dslam-data-not-found.exception';
import { GetPortIdStatusConstants } from './get-port-id/get-port-id-status.constants';
import { GetPortIdException } from './get-port-id/get-port-id.exception';
import { ICheckIpResponse } from './check-ip/check-ip-response.interface';
import { IDeleteOrderResponse } from './delete-order/delete-order-response.interface';
import { IGetInfoFromABARequestsResponse } from './get-info-from-aba-requests/get-info-from-aba-requests-response.interface';
import { IGetABADataResponse } from './get-aba-data/get-aba-data-response.interface';
import { IGetABADataFromRequestsResponse } from './get-aba-data-from-requests/get-aba-data-from-requests-response.interface';
import { IGetAndRegisterQualifOfServiceResponse } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';
import { IGetDataFromDSLAMPortIdResponse } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-response.interface';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from './get-dsl-central-co-id-by-dslam-port-id/get-dsl-central-co-id-by-dslam-port-id-response.interface';
import { IGetDHCPDataResponse } from 'src/get-dhcp-data/get-dhcp-data-response.interface';
import { IGetDownstreamFromPlanResponse } from './get-downstream-from-plan/get-downstream-from-plan-response.interface';
import { IGetPortIdFromIpResponse } from './get-port-id-from-ip/get-port-id-from-ip-response.interface';
import { IGetDataFromRequestsResponse } from './get-data-from-requests/get-data-from-requests-response.interface';
import { IGetPortIdResponse } from './get-port-id/get-port-id-response.interface';
import { IIsPrepaidVoiceLineResponse } from './is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IIsValidIpAddressResponse } from './is-valid-ip-address/is-valid-ip-address-response.interface';
import { InsertDslAbaRegisterConstants } from './insert-dsl-aba-registers/insert-dsl-aba-register.constants';
import { InsertDslAbaRegisterException } from './insert-dsl-aba-registers/insert-dsl-aba-register.exception';
import { InsertDslAbaRegisterThereIsNoDataException } from './insert-dsl-aba-registers/insert-dsl-aba-registers-there-is-no-data.exception';
import { IsPrepaidVoiceLineException } from './is-prepaid-voice-line/is-a-prepaid-voice-line.exception';
import { IsPrepaidVoiceLineIsPrepaidConstants } from './is-prepaid-voice-line/is-prepaid-voice-line-is-prepaid.constants';
import { IIsOccupiedPortResponse } from './Is-occupied-port/is-occupied-port-response.interface';
import { IReadIABAOrderResponse } from './read-iaba-order/read-iaba-order-response.interface';
import { IsOccupiedPortConstants } from './Is-occupied-port/is-occupied-port.constants';
import { IsOccupiedPortInternalErrorException } from './Is-occupied-port/is-occupied-port-internal-error.exception';
import { IsOccupiedPortTherIsNoDataException } from './Is-occupied-port/is-occupied-port-there-is-no-data.exception';
import { IsPrepaidVoiceLineStatusConstants } from './is-prepaid-voice-line/is-prepaid-voice-line-status.constants';
import { IsValidIpAddressConstants } from './is-valid-ip-address/is-valid-ip-address.constants';
import { IVerifiyContractByPhoneResponse } from './verify-contract-by-phone/verify-contract-by-phone-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ReadIABAOrderErrorCodeConstants } from './read-iaba-order/read-iaba-order-error_code.constants';
import { ReadIABAOrderGeneralDatabaseEerrorException } from './read-iaba-order/read-iaba-order-general-database-error.exception';
import { TheClientAlreadyHasABAServiceException } from './exceptions/the-client-already-has-aba-service.exception';
import { TheRecordAlreadyExistsException } from './insert-dsl-aba-registers/insert-dsl-aba-registers-the-record-already-exists.exception';
import { ValidateTechnicalFeasibilityData } from './validate-technical-feasibility-data';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { VerifyContractByPhoneException } from './verify-contract-by-phone/verify-contract-by-phone.exception';
import { VerifiyContractByPhoneStatusConstants } from './verify-contract-by-phone/verify-contract-by-phone-status.constants';
import { GetDataFromRequestsThereIsNoDataException } from './get-data-from-requests/get-data-from-requests-there-is-no-data.exception';
import { GetDownstreamFromPlanThereIsNoDataException } from './get-downstream-from-plan/get-downstream-from-plan-there-is-no-data.exception';

@Injectable()
export class ValidateTechnicalFeasibilityService extends OracleDatabaseService {
  constructor(
    private readonly getDHCPDataService: GetDHCPDataService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly dslAuditLogsService: DSLAuditLogsService,
  ) {
    super(oracleConfigurationService);
  }

  async validateTechnicalFeasibility(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<ValidateTechnicalFeasibilityData> {
    try {
      const data = new ValidateTechnicalFeasibilityData();
      data.requestDto = dto;
      await super.connect();
      data.insertDslAbaRegistersResponse = await this.insertDslAbaRegisters(
        data,
      );
      data.isPrepaidVoiceLine = await this.isPrepaidVoiceLine(data);
      data.getAndRegisterQualifOfServiceResponse =
        await this.getAndRegisterQualifOfService(data);
      data.verifyContractByPhoneResponse = await this.verifyContractByPhone(
        data,
      );
      data.getDataFromRequestsResponse = await this.getDataFromRequests(data);
      // data.getInfoFromABARequestsResponse = await this.getInfoFromABARequests(
      //   data,
      // );
      data.getDownstreamFromPlanResponse = await this.getDownstreamFromPlan(
        data,
      );
      data.getABADataFromRequestsResponse = await this.getABADataFromRequests(
        data,
      );
      if (data.verifyContractByPhoneResponse.status === 0) {
        throw new VerifyContractByPhoneException();
      }
      data.isValidIpAddressResponse = await this.isValidIpAddress(data);
      data.getPortIdFromIpResponse = await this.getPortIdFromIp(data);
      if (
        ValidationHelper.isDefined(data.getPortIdFromIpResponse.dslamportId)
      ) {
        data.isOccupiedPortResponse = await this.IsOccupiedPort(data);
        if (data.isOccupiedPortResponse.result > 0) {
          await this.getPortIdFlow(data);
        } else {
          await this.rbeDoesNotExistLog(data);
          data.snacomDllResponse = await this.snacomDll(data);
        }
      } else {
        await this.getPortIdFlow(data);
      }
      data.getABADataResponse = await this.getABAData(data);
      if (data.getABADataResponse.status === 0) {
        if (ValidationHelper.isDefined(data.getABADataResponse.abacontractid)) {
          throw new TheClientAlreadyHasABAServiceException();
        } else {
          data.checkIpResponse = await this.checkIp(data);
          // TODO: Revisar las condiciones del flujo porque SOLO contemplan los CheckIpStatusConstants 10 Y 6
          // if(data.checkIpResponse.status === CheckIpStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT)
        }
      } else {
        data.getDataFromDslamPortIdResponse = await this.getDataFromDslamPortId(
          data,
        );
        if (
          data.getDataFromDslamPortIdResponse.status ===
          GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL
        ) {
          await this.modifyNetworkAccessLog(data);
        }
        data.deleteOrderResponse = await this.deleteOrder(data);
        // TODO: Agregar llamada al SP GETDSLCENTRALCOIDBYDSLAMPORTID
        data.getDSLCentralCoIdByDSLAMPortIdResponse =
          await this.getDSLCentralCoIdByDSLAMPortId(data);
        data.readIABAOrderResponse = await this.readIABAOrder(data);
        if (
          data.readIABAOrderResponse.errorCode ===
          ReadIABAOrderErrorCodeConstants.SUCCESSFULL
        ) {
          data.getABADataResponse = await this.getABAData(data);
          if (
            data.getABADataResponse.status !== GetABADataConstants.SUCCESSFULL
          ) {
            throw new ErrorInsertingIABAFromRegisterException();
          }
        } else {
          if (data.deleteOrderResponse.status === 2) {
            // throw error puerto ocupado
          }
        }
      }
      return data;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async callAuditLog(
    data: ValidateTechnicalFeasibilityData,
    description: string,
  ): Promise<void> {
    await this.dslAuditLogsService.log({
      areaCode: data?.requestDto?.areaCode,
      phoneNumber: data?.requestDto?.phoneNumber,
      orderId: data?.requestDto?.orderId,
      ipAddress: data?.requestDto?.ipAddress,
      activationLogin: null,
      webPage: null,
      code: null,
      description: description,
      comments: null,
      planName: null,
    });
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
        throw new InsertDslAbaRegisterException();
      case InsertDslAbaRegisterConstants.THERE_IS_NO_DATA:
        throw new InsertDslAbaRegisterThereIsNoDataException();
      case InsertDslAbaRegisterConstants.REGISTERRED:
        throw new TheRecordAlreadyExistsException();
      default:
        throw new InsertDslAbaRegisterException();
    }
  }

  private async isPrepaidVoiceLine(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IIsPrepaidVoiceLineResponse> {
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
    const response: IIsPrepaidVoiceLineResponse = {
      isPrepaid: (result?.outBinds?.Status ??
        IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_NOT_A_PREPAID_VOICE_LINE) as IsPrepaidVoiceLineIsPrepaidConstants,
      status: (result?.outBinds?.Status ??
        IsPrepaidVoiceLineStatusConstants.ERROR) as IsPrepaidVoiceLineStatusConstants,
    };
    if (
      response.isPrepaid ==
        IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_A_PREPAID_VOICE_LINE ||
      response.status == IsPrepaidVoiceLineStatusConstants.ERROR
    ) {
      throw new IsPrepaidVoiceLineException();
    }
    return response;
  }

  private async getAndRegisterQualifOfService(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetAndRegisterQualifOfServiceResponse> {
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
    const status = (result?.outBinds?.Status ??
      GetAndRegisterQualifOfServiceStatusConstants.ERROR) as GetAndRegisterQualifOfServiceStatusConstants;
    const response: IGetAndRegisterQualifOfServiceResponse = {
      qualifpossible: result?.outBinds?.o_qualifpossible,
      modemstatus: result?.outBinds?.o_modemstatus,
      maxdownstream: result?.outBinds?.o_maxdownstream,
      maxupstream: result?.outBinds?.o_maxupstream,
      status: status,
    };
    switch (status) {
      case GetAndRegisterQualifOfServiceStatusConstants.SUCCESSFULL:
        return response;
      case GetAndRegisterQualifOfServiceStatusConstants.ERROR:
        throw new GetAndRegisterQualifOfServiceException();
      default:
        throw new GetAndRegisterQualifOfServiceException();
    }
  }

  private async verifyContractByPhone(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IVerifiyContractByPhoneResponse> {
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
    const status = (result?.outBinds?.o_status ??
      VerifiyContractByPhoneStatusConstants.ERROR) as VerifiyContractByPhoneStatusConstants;
    const response: IVerifiyContractByPhoneResponse = {
      status: status,
    };
    switch (status) {
      case VerifiyContractByPhoneStatusConstants.SUCCESSFULL:
        return response;
      case VerifiyContractByPhoneStatusConstants.ERROR:
        throw new VerifyContractByPhoneException();
      default:
        throw new VerifyContractByPhoneException();
    }
  }

  // private async getInfoFromABARequests(
  //   data: ValidateTechnicalFeasibilityData,
  // ): Promise<IGetInfoFromABARequestsResponse> {
  //   const parameters = {
  //     i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
  //     i_phonenumber: OracleHelper.stringBindIn(
  //       data.requestDto.phoneNumber,
  //       256,
  //     ),
  //     sz_Fecha1: OracleHelper.stringBindOut(10),
  //     sz_Fecha2: OracleHelper.stringBindOut(10),
  //     sz_Fecha3: OracleHelper.stringBindOut(10),
  //     sz_PlanDesired: OracleHelper.stringBindOut(32),
  //     sz_PlanDescription: OracleHelper.stringBindOut(256),
  //     sz_MedioP: OracleHelper.stringBindOut(32),
  //     abarequests_row: OracleHelper.stringBindOut(10),
  //     abaacceptedrequests_row: OracleHelper.stringBindOut(10),
  //     abarequestsregistes_row: OracleHelper.stringBindOut(10),
  //     Status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     OracleConstants.ACT_PACKAGE,
  //     OracleConstants.GET_INFO_FROM_ABA_REQUESTS,
  //     parameters,
  //   );
  //   const status = (result?.outBinds?.Status ??
  //     GetInfoFromABARequestsStatusConstants.EXECUTION_ERROR) as GetInfoFromABARequestsStatusConstants;
  //   const response: IGetInfoFromABARequestsResponse = {
  //     date1: result?.outBinds?.sz_Fecha1,
  //     date2: result?.outBinds?.sz_Fecha2,
  //     date3: result?.outBinds?.sz_Fecha3,
  //     desiredPlan: result?.outBinds?.sz_PlanDesired,
  //     descriptionPlan: result?.outBinds?.sz_PlanDescription,
  //     medioP: result?.outBinds?.sz_MedioP,
  //     abaRequestsRow: result?.outBinds?.abarequests_row,
  //     abaAcceptedRequestsRow: result?.outBinds?.abaacceptedrequests_row,
  //     abaRequestsRegistersRow: result?.outBinds?.abarequestsregistes_row,
  //     status: status,
  //   };
  //   switch (status) {
  //     case GetInfoFromABARequestsStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetInfoFromABARequestsStatusConstants.EXECUTION_ERROR:
  //       throw new GetInfoFromABARequestsException();
  //     case GetInfoFromABARequestsStatusConstants.THERE_IS_NO_DATA:
  //       return response;
  //     default:
  //       throw new GetInfoFromABARequestsException();
  //   }
  // }
  private async getDataFromRequests(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDataFromRequestsResponse> {
    const parameters = {
      i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
      i_phonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),
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
      OracleConstants.GET_DATA_FROM_REQUESTS,
      parameters,
    );
    const status = (result?.outBinds?.Status ??
      GetDataFromRequestsStatusConstants.EXECUTION_ERROR) as GetDataFromRequestsStatusConstants;
    const response: IGetDataFromRequestsResponse = {
      id: OracleHelper.getFirstItem(result, 'o_id'),
      firstname: OracleHelper.getFirstItem(result, 'o_firstname'),
      lastname: OracleHelper.getFirstItem(result, 'o_lastname'),
      email: OracleHelper.getFirstItem(result, 'o_email'),
      phonenumber: OracleHelper.getFirstItem(result, 'o_phonenumber'),
      address1: OracleHelper.getFirstItem(result, 'o_address1'),
      address2: OracleHelper.getFirstItem(result, 'o_address2'),
      city: OracleHelper.getFirstItem(result, 'o_city'),
      state: OracleHelper.getFirstItem(result, 'o_state'),
      status: status,
    };
    switch (status) {
      case GetDataFromRequestsStatusConstants.SUCCESSFULL:
        return response;
      case GetDataFromRequestsStatusConstants.EXECUTION_ERROR:
        throw new GetDataFromRequestsException();
      case GetDataFromRequestsStatusConstants.THERE_IS_NO_DATA:
        throw new GetDataFromRequestsThereIsNoDataException();
      default:
        throw new GetDataFromRequestsException();
    }
  }

  private async getDownstreamFromPlan(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDownstreamFromPlanResponse> {
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
    const status = (result?.outBinds?.o_status ??
      GetDownstreamFromPlanStatusConstants.INTERNAL_ERROR) as GetDownstreamFromPlanStatusConstants;
    const response: IGetDownstreamFromPlanResponse = {
      downstream: result?.outBinds?.o_downstream ?? 1,
      status: status,
    };
    switch (status) {
      case GetDownstreamFromPlanStatusConstants.SUCCESSFULL:
        return response;
      case GetDownstreamFromPlanStatusConstants.INTERNAL_ERROR:
        throw new GetInfoFromABARequestsException();
      case GetDownstreamFromPlanStatusConstants.THERE_IS_NO_DATA:
        throw new GetDownstreamFromPlanThereIsNoDataException();
      default:
        throw new GetInfoFromABARequestsException();
    }
  }

  private async getABADataFromRequests(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetABADataFromRequestsResponse> {
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
      OracleConstants.GET_ABA_DATA_FROM_REQUESTS,
      parameters,
    );
    const status = (result?.outBinds?.Status ??
      GetABADataFromRequestsStatusConstants.EXECUTION_ERROR) as GetABADataFromRequestsStatusConstants;
    const response: IGetABADataFromRequestsResponse = {
      date1: result?.outBinds?.sz_Fecha1,
      date2: result?.outBinds?.sz_Fecha2,
      date3: result?.outBinds?.sz_Fecha3,
      desiredPlan: result?.outBinds?.sz_PlanDesired,
      descriptionPlan: result?.outBinds?.sz_PlanDescription,
      medioP: result?.outBinds?.sz_MedioP,
      abaRequestsRow: result?.outBinds?.abarequests_row,
      abaAcceptedRequestsRow: result?.outBinds?.abaacceptedrequests_row,
      abaRequestsRegistersRow: result?.outBinds?.abarequestsregistes_row,
      status: status,
    };
    switch (status) {
      case GetABADataFromRequestsStatusConstants.SUCCESSFULL:
        return response;
      case GetABADataFromRequestsStatusConstants.EXECUTION_ERROR:
        throw new GetInfoFromABARequestsException();
      case GetABADataFromRequestsStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetInfoFromABARequestsException();
    }
  }

  private async isValidIpAddress(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IIsValidIpAddressResponse> {
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
    const response: IIsValidIpAddressResponse = {
      status: status,
    };
    switch (status) {
      case IsValidIpAddressConstants.SUCCESSFULL:
        return response;
      case IsValidIpAddressConstants.ERROR_1003:
        throw new Error1003Exception();
      case IsValidIpAddressConstants.ERROR_3004_1:
        throw new Error30041Exception();
      case IsValidIpAddressConstants.ERROR_3005_5:
        throw new Error30055Exception();
      case IsValidIpAddressConstants.POOL_RBE_LEASE:
        return response;
      default:
        throw new Error1003Exception();
    }
  }

  private async getPortIdFromIp(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetPortIdFromIpResponse> {
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
    const response: IGetPortIdFromIpResponse = {
      dslamportId: dslamportId,
      status: status,
    };
    switch (status) {
      case GetPortIdFromIpConstants.SUCCESSFULL:
        return response;
      case GetPortIdFromIpConstants.EXECUTION_ERROR:
        throw new GetPortIdFromIpExecutionException();
      case GetPortIdFromIpConstants.DSLAM_DATA_NOT_FOUND_FOR_BOSS_PORT:
        // throw new GetPortIdFromIpDSLAMDataNotFoundException();
        return response;
      case GetPortIdFromIpConstants.IP_FORMAT_ERROR:
        // throw new GetPortIdFromIpBadIpFormatException();
        return response;
      default:
        throw new GetPortIdFromIpExecutionException();
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
      if (
        data.isValidIpAddressResponse.status ===
        IsValidIpAddressConstants.POOL_RBE_LEASE
      ) {
        await this.rbeDoesNotExistLog(data);
      } else {
        // SNACOM.DLL (dada Orden IABA) CONSUMIR SERVICIO PIC (Por definir)
        data.snacomDllResponse = await this.snacomDll(data);
      }
    } else {
      throw new Error30092Exception();
    }
  }

  private async rbeDoesNotExistLog(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    await this.callAuditLog(data, 'RBE no existe');
  }

  // TODO: Identificar y desarrollar servicio en el PIC. BLOCKING!!!
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

  private queryDHCP(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDHCPDataResponse> {
    return this.getDHCPDataService.get({
      ipAddress: data.requestDto.ipAddress,
    });
  }

  // TODO: Investigar y capturar el valor del parametro de entrada i_invalidvpi
  private async getValidVPI(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<string> {
    const parameters = {
      i_nspip: OracleHelper.stringBindIn(data.requestDto.areaCode, 15),
      i_invalidvpi: OracleHelper.numberBindIn(0),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.UTL_PACKAGE,
      OracleConstants.GET_VALID_VPI,
      parameters,
    );
    return result;
  }

  // TODO: MAPEO DE PARAMETROS DE ENTRADA
  private async getPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetPortIdResponse> {
    const parameters = {
      s_nspip: OracleHelper.stringBindIn(null),
      n_vpi: OracleHelper.numberBindIn(null),
      n_vci: OracleHelper.numberBindIn(null),
      I_ipaddress: OracleHelper.stringBindIn(data.requestDto.ipAddress),
      t_portid: OracleHelper.tableOfNumberBindOut(0),
      status: OracleHelper.tableOfNumberBindOut(0),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.BOSS_PACKAGE,
      OracleConstants.GET_PORT_ID,
      parameters,
    );
    const status = (result?.outBinds?.status ??
      GetPortIdStatusConstants.EXECUTION_ERROR) as GetPortIdStatusConstants;
    const response: IGetPortIdResponse = {
      portId: result?.outBinds?.t_portid,
      status: status,
    };
    switch (status) {
      case GetPortIdStatusConstants.SUCCESSFULL:
        return response;
      case GetPortIdStatusConstants.EXECUTION_ERROR:
        throw new GetPortIdException();
      case GetPortIdStatusConstants.THERE_IS_NO_DATA:
        throw new Error30092Exception();
      default:
        throw new GetPortIdException();
    }
  }

  private async IsOccupiedPort(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IIsOccupiedPortResponse> {
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
      case IsOccupiedPortConstants.SUCCESSFULL:
        return response;
      case IsOccupiedPortConstants.INTERNAL_ERROR:
        throw new IsOccupiedPortInternalErrorException();
      case IsOccupiedPortConstants.THERE_IS_NO_DATA:
        throw new IsOccupiedPortTherIsNoDataException();
      default:
        throw new IsOccupiedPortInternalErrorException();
    }
  }

  private async getABAData(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetABADataResponse> {
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
        return response;
      default:
        throw new GetABADataExecutionErrorException();
    }
  }

  // TODO: Cerificar gestión de errores vs BPM. Hay excepciones que están siendo inhibidas por el flujo en el BPM.
  //TODO: Determinar origen del parámetro: abaportwithcontract
  private async checkIp(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<ICheckIpResponse> {
    const parameters = {
      abadslamportid: OracleHelper.stringBindIn(
        String(data.getPortIdFromIpResponse.dslamportId),
      ),
      abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode),
      abaphonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),
      abauserlogin: OracleHelper.stringBindIn(data.requestDto.loginInstall),
      abaportwithcontract: OracleHelper.numberBindIn(null),
      Status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.BOSS_PACKAGE,
      OracleConstants.CHECK_IP,
      parameters,
    );
    const response: ICheckIpResponse = {
      status: (result?.outBinds?.Status ??
        CheckIpStatusConstants.EXECUTION_ERROR) as CheckIpStatusConstants,
    };
    switch (response.status) {
      case CheckIpStatusConstants.SUCCESSFULL:
        return response;
      case CheckIpStatusConstants.EXECUTION_ERROR:
        throw new CheckIpExecutionErrorException();
      case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PHONE_NUMBER:
        // throw new CheckIpPortNotFoundByPhoneNumberException();
        return response;
      case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PARAMETER:
        throw new Error30032Exception();
      case CheckIpStatusConstants.SUCCESSFULL_BY_BUSSINESS_LOGIC:
        return response;
      case CheckIpStatusConstants.THERE_IS_NOT_CONTRACT_ASSOCIATED_WITH_THE_PORT:
        // throw new CheckIpThereIsNotContractAssociatedWithThePortException();
        return response;
      case CheckIpStatusConstants.THE_PORT_IS_RESERVED:
        // throw new CheckIpThePortIsReservedException();
        return response;
      case CheckIpStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
        throw new Error30031Exception();
      default:
        throw new CheckIpExecutionErrorException();
    }
  }

  private async getDataFromDslamPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDataFromDSLAMPortIdResponse> {
    const parameters = {
      abadslamportid: OracleHelper.stringBindIn(
        String(data.getPortIdFromIpResponse.dslamportId),
      ),
      abarack: OracleHelper.tableOfNumberBindOut(),
      abadslamposition: OracleHelper.tableOfStringBindOut(532),
      abaslot: OracleHelper.tableOfNumberBindOut(),
      abaport: OracleHelper.tableOfNumberBindOut(),
      abaad: OracleHelper.tableOfStringBindOut(532),
      abapairad: OracleHelper.tableOfStringBindOut(532),
      abaprovider: OracleHelper.tableOfStringBindOut(532),
      abasistema: OracleHelper.tableOfStringBindOut(532),
      status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.BOSS_PACKAGE,
      OracleConstants.GET_DATA_FROM_DSLAM_PORT_ID,
      parameters,
    );
    const response: IGetDataFromDSLAMPortIdResponse = {
      abarack: OracleHelper.getFirstItem(result, 'abarack'),
      abadslamposition: OracleHelper.getFirstItem(result, 'abadslamposition'),
      abaslot: OracleHelper.getFirstItem(result, 'abaslot'),
      abaport: OracleHelper.getFirstItem(result, 'abaport'),
      abaad: OracleHelper.getFirstItem(result, 'abaad'),
      abapairad: OracleHelper.getFirstItem(result, 'abapairad'),
      abaprovider: OracleHelper.getFirstItem(result, 'abaprovider'),
      abasistema: OracleHelper.getFirstItem(result, 'abasistema'),
      status: (result?.outBinds?.Status ??
        GetDataFromDSLAMPortIdStatusConstants.EXECUTION_ERROR) as GetDataFromDSLAMPortIdStatusConstants,
    };
    switch (response.status) {
      case GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL:
        return response;
      case GetDataFromDSLAMPortIdStatusConstants.EXECUTION_ERROR:
        throw new GetDataFromDSLAMPortIdExecutionErrorException();
      case GetDataFromDSLAMPortIdStatusConstants.THERE_IS_NO_DATA:
        // throw new GetDataFromDSLAMPortIdThereIsNoDataException();
        return response;
      default:
        throw new GetDataFromDSLAMPortIdExecutionErrorException();
    }
  }

  private async modifyNetworkAccessLog(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    await this.callAuditLog(data, 'Modificar Red de Acceso');
  }

  private async deleteOrder(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IDeleteOrderResponse> {
    const parameters = {
      abadslamportid: OracleHelper.stringBindIn(
        String(data.getPortIdFromIpResponse.dslamportId),
      ),
      Status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.BOSS_PACKAGE,
      OracleConstants.DELETE_ORDER,
      parameters,
    );
    const response: IDeleteOrderResponse = {
      status: (result?.outBinds?.Status ??
        DeleteOrderStatusConstants.EXECUTION_ERROR) as DeleteOrderStatusConstants,
    };
    switch (response.status) {
      case DeleteOrderStatusConstants.SUCCESSFULL:
        return response;
      case DeleteOrderStatusConstants.EXECUTION_ERROR:
        throw new DeleteOrderExecutionErrorException();
      case DeleteOrderStatusConstants.THERE_IS_NO_DATA:
        // throw new DeleteOrderThereIsNoDataException();
        return response;
      case DeleteOrderStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
        // throw new DeleteOrderThePortIsOccupiedByAnotherContractException();
        return response;
      default:
        throw new DeleteOrderExecutionErrorException();
    }
  }

  // TODO: Origen del parámetro l_dslamportid
  private async getDSLCentralCoIdByDSLAMPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDSLCentralCoIdByDSLAMPortIdResponse> {
    const parameters = {
      l_dslamportid: OracleHelper.numberBindIn(null),
      sz_Coid: OracleHelper.stringBindOut(),
    };
    const result = await super.executeStoredProcedure(
      null,
      OracleConstants.GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID,
      parameters,
    );
    const response: IGetDSLCentralCoIdByDSLAMPortIdResponse = {
      coId: result?.outBinds?.sz_Coid,
    };
    return response;
  }

  // TODO: determinar origen del parametro: sz_ncc
  // TODO: determinar origen del parametro: sz_office
  // TODO: determinar origen del parametro: sz_createdby
  // TODO: determinar origen del parametro: sz_room
  // TODO: determinar origen del parametro: n_recursive
  // TODO: determinar origen del parametro: sz_sistema
  // TODO: determinar origen del parametro: iCoid
  // TODO: determinar origen del parametro: i_executiondate
  // TODO: determinar origen del parametro: i_autoinstall
  private async readIABAOrder(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IReadIABAOrderResponse> {
    const orderDate = DateTime.fromFormat(
      data?.getABADataResponse?.abaorderdate,
      'dd/MM/yyyy',
    );
    const parameters = {
      sz_ncc: OracleHelper.stringBindIn(null, 10),
      sz_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
      sz_phonenumber: OracleHelper.stringBindIn(
        data.requestDto.phoneNumber,
        16,
      ),
      orderid: OracleHelper.stringBindIn(String(data.requestDto.orderId), 12),
      sz_clienttype: OracleHelper.stringBindIn(
        data.getABADataResponse.abaclienttype,
        1,
      ),
      sz_orderdate: OracleHelper.dateBindIn(
        orderDate.isValid ? orderDate.toJSDate() : null,
      ),
      sz_rack: OracleHelper.stringBindIn(
        String(data.getDataFromDslamPortIdResponse.abarack),
        2,
      ),
      sz_position: OracleHelper.stringBindIn(
        data.getDataFromDslamPortIdResponse.abadslamposition,
        2,
      ),
      n_dslamslot: OracleHelper.numberBindIn(
        data.getDataFromDslamPortIdResponse.abaslot,
      ),
      n_port: OracleHelper.numberBindIn(
        data.getDataFromDslamPortIdResponse.abaport,
      ),
      sz_ad: OracleHelper.stringBindIn(
        data.getDataFromDslamPortIdResponse.abaad,
        5,
      ),
      sz_adpair: OracleHelper.stringBindIn(
        data.getDataFromDslamPortIdResponse.abapairad,
        4,
      ),
      sz_office: OracleHelper.stringBindIn(null, 10),
      sz_createdby: OracleHelper.stringBindIn(null, 8),
      sz_provider: OracleHelper.stringBindIn(
        data.getDataFromDslamPortIdResponse.abaprovider,
        16,
      ),
      sz_room: OracleHelper.stringBindIn(null, 32),
      n_recursive: OracleHelper.numberBindIn(null),
      sz_sistema: OracleHelper.stringBindIn(null),
      iCoid: OracleHelper.stringBindIn(null, 10),
      i_executiondate: OracleHelper.stringBindIn(null),
      i_autoinstall: OracleHelper.numberBindIn(null),
      l_errorcode: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.UTL_PACKAGE,
      OracleConstants.READ_IABA_ORDER,
      parameters,
    );
    const response: IReadIABAOrderResponse = {
      errorCode: (OracleHelper.getFirstItem(result, 'l_errorcode') ??
        ReadIABAOrderErrorCodeConstants.GENERAL_DATABASE_ERROR) as ReadIABAOrderErrorCodeConstants,
    };
    switch (response.errorCode) {
      case ReadIABAOrderErrorCodeConstants.SUCCESSFULL:
        return response;
      case ReadIABAOrderErrorCodeConstants.ASSIGNED_PORT:
        // throw new ReadIABAOrderAssignedPortException();
        return response;
      case ReadIABAOrderErrorCodeConstants.THE_ORDER_EXISTS:
        // throw new ReadIABAOrderOrderExistsException();
        return response;
      case ReadIABAOrderErrorCodeConstants.THE_ORDER_ID_OLD:
        // throw new ReadIABAOrderOrderIsOldException();
        return response;
      case ReadIABAOrderErrorCodeConstants.THE_ORDER_ALREADY_EXISTS_IN_BOSS:
        // throw new ReadIABAOrderTheOrderAlreadyExistsInBossException();
        return response;
      case ReadIABAOrderErrorCodeConstants.GENERAL_DATABASE_ERROR:
        throw new ReadIABAOrderGeneralDatabaseEerrorException();
      default:
        throw new ReadIABAOrderGeneralDatabaseEerrorException();
    }
  }
}
