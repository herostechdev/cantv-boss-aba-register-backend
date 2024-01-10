import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { AbaRegisterIsPrepaidVoiceLineService } from 'src/aba-register-flow/step-2/dependencies/is-prepaid-voice-line/aba-register-is-prepaid-voice-line.service';
import { AbaRegisterGetAndRegisterQualifOfServiceService } from 'src/aba-register-flow/step-2/dependencies/get-and-register-qualif-of-service/aba-register-get-and-register-qualif-of-service.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CheckIpExecutionErrorException } from './check-ip/check-ip-execution-error.exception';
import { CheckIpStatusConstants } from './check-ip/check-ip-status.constants';
import { DeleteOrderStatusConstants } from './delete-order/delete-order-status.constants';
import { DeleteOrderExecutionErrorException } from './delete-order/delete-order-execution-error.exception';
import { DeleteOrderThePortIsOccupiedByAnotherContractException } from './delete-order/delete-order-the-is-occupied-by-another-contract.exception';
import { DSLAuditLogsRawService } from 'src/raw/stored-procedures/dsl-audit-logs/dsl-audit-logs-raw.service';
import { Error1003Exception } from 'src/exceptions/error-1003.exception';
import { Error30031Exception } from 'src/exceptions/error-3003-1.exception';
import { Error30032Exception } from 'src/exceptions/error-3003-2.exception';
import { Error30041Exception } from 'src/exceptions/error-3004-1.exception';
import { Error30043Exception } from 'src/exceptions/error-3004-3.exception';
import { Error30055Exception } from 'src/exceptions/error-3005-5.exception';
import { Error30092Exception } from 'src/exceptions/error-3009-2.exception';
import { ErrorInsertingIABAFromRegisterException } from './exceptions/error-inserting-iaba-from-register.exception';
import { GetPortIdFromIpExecutionException } from './get-port-id-from-ip/get-port-id-from-ip-execution.exception';
import { GetABADataConstants } from './get-aba-data/get-aba-data.constants';
import { GetABADataExecutionErrorException } from './get-aba-data/get-aba-data-execution-error.exception';
import { GetABADataFromRequestsService } from './get-aba-data-from-requests/get-aba-data-from-requests.service';
import { GetASAPOrderDetailService } from 'src/raw/pic/get-asap-order-detail/get-asap-order-detail.service';
import { GetDataFromDSLAMPortIdExecutionErrorException } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-execution-error.exception';
import { GetDataFromDSLAMPortIdStatusConstants } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-status.constants';
import { GetDataFromRequestsStatusConstants } from './get-data-from-requests/get-data-from-requests-status.constants';
import { GetDataFromRequestsException } from './get-data-from-requests/get-data-from-requests.exception';
import { GetDHCPDataRawService } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-raw.service';
import { GetDownstreamFromPlanStatusConstants } from './get-downstream-from-plan/get-downstream-from-plan-status.constants';
import { GetDownstreamFromPlanThereIsNoDataException } from './get-downstream-from-plan/get-downstream-from-plan-there-is-no-data.exception';
import { GetInfoFromABARequestsException } from './get-info-from-aba-requests/get-info-from-aba-requests.exception';
import { GetPortIdFromIpBadIpFormatException } from './get-port-id-from-ip/get-port-id-from-ip-bad-ip-format.exception';
import { GetPortIdFromIpConstants } from './get-port-id-from-ip/get-port-id-from-ip.constants';
import { GetPortIdStatusConstants } from './get-port-id/get-port-id-status.constants';
import { GetPortIdException } from './get-port-id/get-port-id.exception';
import { ICheckIpResponse } from './check-ip/check-ip-response.interface';
import { IDeleteOrderResponse } from './delete-order/delete-order-response.interface';
import { IGetABADataResponse } from './get-aba-data/get-aba-data-response.interface';
import { IGetDataFromDSLAMPortIdResponse } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-response.interface';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from '../raw/stored-procedures/update-dsl-aba-registers/get-dsl-central-co-id-by-dslam-port-id-response.interface';
import { IGetDHCPDataResponse } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-response.interface';
import { IGetDownstreamFromPlanResponse } from './get-downstream-from-plan/get-downstream-from-plan-response.interface';
import { IGetPortIdFromIpResponse } from './get-port-id-from-ip/get-port-id-from-ip-response.interface';
import { IGetDataFromRequestsResponse } from './get-data-from-requests/get-data-from-requests-response.interface';
import { IGetPortIdResponse } from './get-port-id/get-port-id-response.interface';
import { IIsValidIpAddressResponse } from './is-valid-ip-address/is-valid-ip-address-response.interface';
import { IIsOccupiedPortResponse } from './Is-occupied-port/is-occupied-port-response.interface';
import { InsertDslAbaRegistersRawService } from 'src/raw/stored-procedures/insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { IReadIABAOrderResponse } from './read-iaba-order/read-iaba-order-response.interface';
import { IsOccupiedPortConstants } from './Is-occupied-port/is-occupied-port.constants';
import { IsOccupiedPortInternalErrorException } from './Is-occupied-port/is-occupied-port-internal-error.exception';
import { IsOccupiedPortTherIsNoDataException } from './Is-occupied-port/is-occupied-port-there-is-no-data.exception';
import { IsValidIpAddressConstants } from './is-valid-ip-address/is-valid-ip-address.constants';
import { IVerifiyContractByPhoneResponse } from './verify-contract-by-phone/verify-contract-by-phone-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ReadIABAOrderErrorCodeConstants } from './read-iaba-order/read-iaba-order-error_code.constants';
import { ReadIABAOrderGeneralDatabaseErrorException } from './read-iaba-order/read-iaba-order-general-database-error.exception';
import { ReadIABAOrderAssignedPortException } from './read-iaba-order/read-iaba-order-assigned-port.exception';
import { ReadIABAOrderOrderExistsException } from './read-iaba-order/read-iaba-order-order-exists.exception';
import { ReadIABAOrderOrderIsOldException } from './read-iaba-order/read-iaba-order-order-is-old.exception';
import { ReadIABAOrderTheOrderAlreadyExistsInBossException } from './read-iaba-order/read-iaba-order-the-order-already-exists-in-boss.exception';
import { TheClientAlreadyHasABAServiceException } from './exceptions/the-client-already-has-aba-service.exception';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidateTechnicalFeasibilityData } from './validate-technical-feasibility-data';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { VerifyContractByPhoneException } from './verify-contract-by-phone/verify-contract-by-phone.exception';
import { VerifiyContractByPhoneStatusConstants } from './verify-contract-by-phone/verify-contract-by-phone-status.constants';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
import { ASAPOrderStateIsInvalidException } from './exceptions/asap-order-state-is-invalid.exception';

@Injectable()
export class ValidateTechnicalFeasibilityService extends OracleDatabaseService {
  constructor(
    private readonly abaRegisterIsPrepaidVoiceLineService: AbaRegisterIsPrepaidVoiceLineService,
    private readonly abaRegisterGetAndRegisterQualifOfServiceService: AbaRegisterGetAndRegisterQualifOfServiceService,
    private readonly dslAuditLogsService: DSLAuditLogsRawService,
    private readonly getABADataFromRequestsService: GetABADataFromRequestsService,
    private readonly getDHCPDataService: GetDHCPDataRawService,
    private readonly getASAPOrderDetailService: GetASAPOrderDetailService,
    private readonly insertDslAbaRegistersRawService: InsertDslAbaRegistersRawService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async validateTechnicalFeasibility(
    dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<ValidateTechnicalFeasibilityData> {
    console.clear();

    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      const data = new ValidateTechnicalFeasibilityData();
      data.requestDto = dto;
      await super.connect();
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'insertDslAbaRegisters',
        input: JSON.stringify(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.insertDslAbaRegistersResponse =
        await this.insertDslAbaRegistersRawService.execute({
          areaCode: data.requestDto.areaCode,
          phoneNumber: data.requestDto.phoneNumber,
          registerDate: data.requestDto.registerDate,
          registerStatus: BossConstants.IN_PROGRESS,
        });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'isPrepaidVoiceLine',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.isPrepaidVoiceLine =
        await this.abaRegisterIsPrepaidVoiceLineService.execute({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
        });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getAndRegisterQualifOfService',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.getAndRegisterQualifOfServiceResponse =
        await this.abaRegisterGetAndRegisterQualifOfServiceService.execute({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
        });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'verifyContractByPhone',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.verifyContractByPhoneResponse = await this.verifyContractByPhone(
        data,
      );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getABADataFromRequests',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.getABADataFromRequestsResponse =
        await this.getABADataFromRequestsService.getABADataFromRequests(
          dto,
          this.dbConnection,
        );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getDownstreamFromPlan',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.getDownstreamFromPlanResponse = await this.getDownstreamFromPlan(
        data,
      );
      if (data.verifyContractByPhoneResponse.status !== 0) {
        throw new VerifyContractByPhoneException();
      }
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'isValidIpAddress',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.isValidIpAddressResponse = await this.isValidIpAddress(data);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getPortIdFromIp',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.getPortIdFromIpResponse = await this.getPortIdFromIp(data);

      if (
        ValidationHelper.isDefined(data.getPortIdFromIpResponse.dslamportId)
      ) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'IsOccupiedPort',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        data.isOccupiedPortResponse = await this.IsOccupiedPort(data);

        if (data.isOccupiedPortResponse.result > 0) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getPortIdFlow    (1)',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          await this.getPortIdFlow(data);
        } else {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getASAPOrderDetail',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          await this.rbeDoesNotExistLog(data);
          await this.setASAPOrderDetail(data);
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getPortIdFlow   (2)',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        await this.getPortIdFlow(data);
      }

      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getABAData',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      data.getABADataResponse = await this.getABAData(data);

      if (data.getABADataResponse.status === 0) {
        if (ValidationHelper.isDefined(data.getABADataResponse.abacontractid)) {
          throw new TheClientAlreadyHasABAServiceException();
        } else {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'checkIp',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          data.checkIpResponse = await this.checkIp(data);
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getDataFromDslamPortId',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        data.getDataFromDslamPortIdResponse = await this.getDataFromDslamPortId(
          data,
        );
        if (
          data.getDataFromDslamPortIdResponse.status ===
          GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'modifyNetworkAccessLog',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          await this.modifyNetworkAccessLog(data);
        }

        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'deleteOrder',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        data.deleteOrderResponse = await this.deleteOrder(data);

        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getDSLCentralCoIdByDSLAMPortId',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        data.getDSLCentralCoIdByDSLAMPortIdResponse =
          await this.getDSLCentralCoIdByDSLAMPortId(data);
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'readIABAOrder',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        data.readIABAOrderResponse = await this.readIABAOrder(data);

        if (
          data.readIABAOrderResponse.errorCode ===
          ReadIABAOrderErrorCodeConstants.SUCCESSFULL
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getABAData',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
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
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
        error: error,
      });
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async callAuditLog(
    data: ValidateTechnicalFeasibilityData,
    description: string,
  ): Promise<void> {
    await this.dslAuditLogsService.execute({
      areaCode: data?.requestDto?.areaCode,
      phoneNumber: data?.requestDto?.phoneNumber,
      orderId: data?.requestDto?.orderId,
      ipAddress: data?.requestDto?.ipAddress,
      activationLogin: null,
      webPage: null,
      code: null,
      description: description,
      comments: null,
      planName: data.getABADataFromRequestsResponse.desiredPlan,
    });
  }

  // private async insertDslAbaRegisters(
  //   data: ValidateTechnicalFeasibilityData,
  // ): Promise<number> {
  //   const registerDate = DateTime.fromFormat(
  //     data.requestDto.registerDate,
  //     BossConstants.DEFAULT_DATE_FORMAT,
  //   ).toJSDate();
  //   // .toFormat(BossConstants.DEFAULT_DATE_FORMAT);
  //   const parameters = {
  //     iAreaCode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
  //     iPhoneNumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber, 7),
  //     iRegisterDate: OracleHelper.dateBindIn(registerDate),
  //     iRegisterStatus: OracleHelper.stringBindIn(BossConstants.IN_PROGRESS, 16),
  //     iLoginInstall: OracleHelper.stringBindIn(
  //       data.requestDto.loginInstall,
  //       32,
  //     ),
  //     status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ABA_PACKAGE,
  //     BossConstants.INSERT_DSL_ABA_REGISTERS,
  //     parameters,
  //   );
  //   const status = (result?.outBinds?.status ??
  //     InsertDslAbaRegisterConstants.INTERNAL_ERROR) as InsertDslAbaRegisterConstants;
  //   switch (status) {
  //     case InsertDslAbaRegisterConstants.SUCCESSFULL:
  //       return status;
  //     case InsertDslAbaRegisterConstants.INTERNAL_ERROR:
  //       throw new InsertDslAbaRegisterException(result);
  //     case InsertDslAbaRegisterConstants.THERE_IS_NO_DATA:
  //       throw new InsertDslAbaRegisterThereIsNoDataException();
  //     case InsertDslAbaRegisterConstants.REGISTERRED:
  //       throw new TheRecordAlreadyExistsException();
  //     default:
  //       throw new InsertDslAbaRegisterException(result);
  //   }
  // }

  // private async isPrepaidVoiceLine(
  //   data: ValidateTechnicalFeasibilityData,
  // ): Promise<IIsPrepaidVoiceLineResponse> {
  //   const parameters = {
  //     Abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
  //     abaphonenumber: OracleHelper.stringBindIn(
  //       data.requestDto.phoneNumber,
  //       16,
  //     ),
  //     isPrepago: OracleHelper.numberBindOut(),
  //     oStatus: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.IS_PREPAID,
  //     parameters,
  //   );
  //   const response: IIsPrepaidVoiceLineResponse = {
  //     isPrepaid: (result?.outBinds?.isPrepago ??
  //       IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_NOT_A_PREPAID_VOICE_LINE) as IsPrepaidVoiceLineIsPrepaidConstants,
  //     status: (result?.outBinds?.oStatus ??
  //       IsPrepaidVoiceLineStatusConstants.ERROR) as IsPrepaidVoiceLineStatusConstants,
  //   };
  //   if (
  //     response.isPrepaid ==
  //       IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_A_PREPAID_VOICE_LINE ||
  //     response.status == IsPrepaidVoiceLineStatusConstants.ERROR
  //   ) {
  //     throw new IsPrepaidVoiceLineException();
  //   }
  //   return response;
  // }

  // private async getAndRegisterQualifOfService(
  //   data: ValidateTechnicalFeasibilityData,
  // ): Promise<IGetAndRegisterQualifOfServiceResponse> {
  //   const parameters = {
  //     i_clientserviceid: OracleHelper.numberBindIn(null), // Iván indica enviar siempre null 2023-12-11
  //     i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
  //     i_phonenumber: OracleHelper.stringBindIn(
  //       data.requestDto.phoneNumber,
  //       256,
  //     ),
  //     o_qualifpossible: OracleHelper.stringBindOut(),
  //     o_modemstatus: OracleHelper.stringBindOut(),
  //     o_maxdownstream: OracleHelper.stringBindOut(),
  //     o_maxupstream: OracleHelper.stringBindOut(),
  //     o_status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     null,
  //     BossConstants.GET_AND_REGISTER_QUALIF_OF_SERVICE,
  //     parameters,
  //   );
  //   const status = (result?.outBinds?.o_status ??
  //     GetAndRegisterQualifOfServiceStatusConstants.ERROR) as GetAndRegisterQualifOfServiceStatusConstants;
  //   const response: IGetAndRegisterQualifOfServiceResponse = {
  //     qualifpossible: result?.outBinds?.o_qualifpossible,
  //     modemstatus: result?.outBinds?.o_modemstatus,
  //     maxdownstream: result?.outBinds?.o_maxdownstream,
  //     maxupstream: result?.outBinds?.o_maxupstream,
  //     status: status,
  //   };
  //   switch (status) {
  //     case GetAndRegisterQualifOfServiceStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetAndRegisterQualifOfServiceStatusConstants.ERROR:
  //       throw new GetAndRegisterQualifOfServiceException(result);
  //     default:
  //       throw new GetAndRegisterQualifOfServiceException(result);
  //   }
  // }

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
      BossConstants.BOSS_PACKAGE,
      BossConstants.VERIFY_CONTRACT_BY_PHONE,
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

  private async getDataFromRequests(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDataFromRequestsResponse> {
    const parameters = {
      i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
      i_phonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),

      o_id: OracleHelper.tableOfStringBindOut(),
      o_firstname: OracleHelper.tableOfStringBindOut(),
      o_lastname: OracleHelper.tableOfStringBindOut(),
      o_email: OracleHelper.tableOfStringBindOut(),
      o_phonenumber: OracleHelper.tableOfStringBindOut(),
      o_address1: OracleHelper.tableOfStringBindOut(),
      o_address2: OracleHelper.tableOfStringBindOut(),
      o_city: OracleHelper.tableOfStringBindOut(),
      o_state: OracleHelper.tableOfStringBindOut(),
      Status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_DATA_FROM_REQUESTS,
      parameters,
    );
    const status = (OracleHelper.getFirstItem(result, 'Status') ??
      GetDataFromRequestsStatusConstants.EXECUTION_ERROR) as GetDataFromRequestsStatusConstants;
    const response: IGetDataFromRequestsResponse = {
      id: OracleHelper.getFirstItem(result, 'o_id'),
      firstname: OracleHelper.getFirstItem(result, 'o_firstname'),
      lastname: OracleHelper.getFirstItem(result, 'o_lastname'),
      email: OracleHelper.getFirstItem(result, 'o_email'),
      areaCode: data.requestDto.areaCode,
      phoneNumber: OracleHelper.getFirstItem(result, 'o_phonenumber'),
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
        // throw new GetDataFromRequestsThereIsNoDataException();
        return response;
      default:
        throw new GetDataFromRequestsException();
    }
  }

  private async getDownstreamFromPlan(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDownstreamFromPlanResponse> {
    const parameters = {
      i_planname: OracleHelper.stringBindIn(
        data.getABADataFromRequestsResponse.desiredPlan,
        32,
      ),
      o_downstream: OracleHelper.stringBindOut(32),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      null,
      BossConstants.GET_DOWNSTREAM_FROM_PLAN,
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
      BossConstants.BOSS_PACKAGE,
      BossConstants.IS_VALID_IP_ADDRESS,
      parameters,
    );
    const status = (result?.outBinds?.Status ??
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
      i_ipaddress: OracleHelper.stringBindIn(data.requestDto.ipAddress, 15),
      o_dslamportid: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_PORT_ID_FROM_IP,
      parameters,
    );
    const status = (result?.outBinds?.o_status ??
      GetPortIdFromIpConstants.EXECUTION_ERROR) as GetPortIdFromIpConstants;
    const response: IGetPortIdFromIpResponse = {
      dslamportId: result?.outBinds?.o_dslamportid,
      status: status,
    };
    switch (status) {
      case GetPortIdFromIpConstants.SUCCESSFULL:
        return response;
      case GetPortIdFromIpConstants.EXECUTION_ERROR:
        throw new GetPortIdFromIpExecutionException();
      case GetPortIdFromIpConstants.DSLAM_DATA_NOT_FOUND_FOR_BOSS_PORT:
        return response;
      case GetPortIdFromIpConstants.IP_FORMAT_ERROR:
        throw new GetPortIdFromIpBadIpFormatException();
      default:
        throw new GetPortIdFromIpExecutionException();
    }
  }

  private async getPortIdFlow(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    Wlog.instance.info({
      phoneNumber: null,
      message: 'queryDHCP',
      input: null,
      clazz: ValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    data.queryDHCPResponse = await this.queryDHCP(data);

    Wlog.instance.info({
      phoneNumber: null,
      message: 'getValidVPI',
      input: null,
      clazz: ValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    data.getValidVPIResponse = await this.getValidVPI(data);

    Wlog.instance.info({
      phoneNumber: null,
      message: 'getPortId',
      input: null,
      clazz: ValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    data.getPortIdResponse = await this.getPortId(data);

    Wlog.instance.info({
      phoneNumber: null,
      message: 'validaciones validaciones',
      input: null,
      clazz: ValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    if (ValidationHelper.isDefined(data.getPortIdResponse)) {
      await this.dslAuditLogsService.execute({
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
      }
      await this.setASAPOrderDetail(data);
    } else {
      throw new Error30092Exception();
    }
  }

  private async rbeDoesNotExistLog(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    await this.callAuditLog(data, 'RBE no existe');
  }

  private async setASAPOrderDetail(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<void> {
    data.getASAPOrderDetailResponse =
      await this.getASAPOrderDetailService.execute({
        areaCode: data.requestDto.areaCode,
        phoneNumber: data.requestDto.phoneNumber,
        orderId: String(data.requestDto.orderId),
      });

    // if (
    //   data.getASAPOrderDetailResponse.CTVSTATUSASCODE !==
    //   BossConstants.ASAP_ORDER_COMRED_STATUS
    // ) {
    //   throw new ASAPOrderStateIsInvalidException();
    // }
    this.setLinkNetwork(data);
  }

  /**
   * Del campo CTVOBSAS:
   *  BA => Bastidor
   *  SB => SubBastidor
   *  RA => Ranura
   *  PT => Puerto
   *  RE => Regleta
   *  PA => Par
   *  AUD45 => Tecnología de la Central
   *  PI =>
   */
  private setLinkNetwork(data: ValidateTechnicalFeasibilityData): void {
    if (!ValidationHelper.isDefined(data.getASAPOrderDetailResponse.CTVOBSAS)) {
      return;
    }
    data.linkNetworkResponse = {
      BA: null,
      SB: null,
      RA: null,
      PT: null,
      RE: null,
      PA: null,
      AUD45: null,
      PI: null,
    };
    const linkNetworkData = data.getASAPOrderDetailResponse.CTVOBSAS.split(' ');
    for (let index = 0; index < linkNetworkData.length; index += 2) {
      const key = linkNetworkData[index];
      if (data.linkNetworkResponse.hasOwnProperty(key)) {
        data.linkNetworkResponse[linkNetworkData[index]] =
          linkNetworkData[index + 1];
      }
    }
  }

  private queryDHCP(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDHCPDataResponse> {
    return this.getDHCPDataService.execute({
      areaCode: data.requestDto.areaCode,
      phoneNumber: data.requestDto.phoneNumber,
      ipAddress: data.requestDto.ipAddress,
    });
  }

  private async getValidVPI(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<string> {
    const parameters = {
      i_nspip: OracleHelper.stringBindIn(data.queryDHCPResponse.nsp),
      i_invalidvpi: OracleHelper.numberBindIn(
        Number(data.queryDHCPResponse.vpi),
      ),
      result: OracleHelper.numberBindOut(),
    };
    const result = await super.executeFunction(
      BossConstants.GET_VALID_VPI,
      BossConstants.UTL_PACKAGE,
      parameters,
    );
    return result;
  }

  private async getPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetPortIdResponse> {
    const parameters = {
      s_nspip: OracleHelper.stringBindIn(data.queryDHCPResponse.nsp),
      n_vpi: OracleHelper.numberBindIn(Number(data.queryDHCPResponse.vpi)),
      n_vci: OracleHelper.numberBindIn(Number(data.queryDHCPResponse.vci)),

      t_portid: OracleHelper.tableOfNumberBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_PORT_ID,
      parameters,
    );
    const status = (OracleHelper.getFirstItem(result, 'status') ??
      GetPortIdStatusConstants.EXECUTION_ERROR) as GetPortIdStatusConstants;
    const response: IGetPortIdResponse = {
      portId: OracleHelper.getFirstItem(result, 't_portid'),
      status: status,
    };
    switch (status) {
      case GetPortIdStatusConstants.SUCCESSFULL:
        return response;
      case GetPortIdStatusConstants.EXECUTION_ERROR:
        throw new GetPortIdException(result);
      case GetPortIdStatusConstants.THERE_IS_NO_DATA:
        throw new Error30092Exception(result);
      default:
        throw new GetPortIdException(result);
    }
  }

  private async IsOccupiedPort(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IIsOccupiedPortResponse> {
    const parameters = {
      l_portid: OracleHelper.numberBindIn(
        data.getPortIdFromIpResponse.dslamportId,
      ),
      l_result: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.IS_OCCUPIED_PORT,
      parameters,
    );
    const response: IIsOccupiedPortResponse = {
      result: result?.outBinds?.l_result ?? BossConstants.OCCUPIED_PORT,
      status: (result?.outBinds?.o_status ??
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
      abancc: OracleHelper.tableOfStringBindOut(),
      abaclienttype: OracleHelper.tableOfStringBindOut(),
      abaorderdate: OracleHelper.tableOfStringBindOut(),
      abaad: OracleHelper.tableOfStringBindOut(),
      abaparad: OracleHelper.tableOfStringBindOut(),
      abaslot: OracleHelper.tableOfNumberBindOut(),
      abaport: OracleHelper.tableOfNumberBindOut(),
      abarack: OracleHelper.tableOfNumberBindOut(),
      abaposition: OracleHelper.tableOfNumberBindOut(),
      abavci: OracleHelper.tableOfNumberBindOut(),
      abacontractid: OracleHelper.tableOfNumberBindOut(),
      Status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_ABA_DATA,
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
      status: (OracleHelper.getFirstItem(result, 'Status') ??
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

  private async checkIp(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<ICheckIpResponse> {
    const parameters = {
      abadslamportid: OracleHelper.stringBindIn(
        String(
          data.getPortIdFromIpResponse.dslamportId ??
            data.getPortIdResponse.portId,
        ),
      ),
      abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode),
      abaphonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),
      abauserlogin: OracleHelper.stringBindIn(
        data.requestDto.loginInstall ?? BossConstants.REGISTER,
      ),
      abaportwithcontract: OracleHelper.numberBindIn(BossConstants.ZERO),
      Status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.CHECK_IP,
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
        throw new CheckIpExecutionErrorException(result);
      case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PHONE_NUMBER:
        return response;
      case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PARAMETER:
        throw new Error30032Exception();
      case CheckIpStatusConstants.SUCCESSFULL_BY_BUSSINESS_LOGIC:
        return response;
      case CheckIpStatusConstants.THERE_IS_NOT_CONTRACT_ASSOCIATED_WITH_THE_PORT:
        return response;
      case CheckIpStatusConstants.THE_PORT_IS_RESERVED:
        return response;
      case CheckIpStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
        throw new Error30031Exception();
      default:
        throw new CheckIpExecutionErrorException(result);
    }
  }

  private async getDataFromDslamPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDataFromDSLAMPortIdResponse> {
    const parameters = {
      abadslamportid: OracleHelper.numberBindIn(
        data.getPortIdFromIpResponse.dslamportId,
      ),

      abarack: OracleHelper.tableOfStringBindOut(),
      abadslamposition: OracleHelper.tableOfStringBindOut(),
      abaslot: OracleHelper.tableOfNumberBindOut(),
      abaport: OracleHelper.tableOfNumberBindOut(),
      abaad: OracleHelper.tableOfStringBindOut(),
      abapairad: OracleHelper.tableOfStringBindOut(),
      abaprovider: OracleHelper.tableOfStringBindOut(),
      abasistema: OracleHelper.tableOfStringBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_DATA_FROM_DSLAM_PORT_ID,
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
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetDataFromDSLAMPortIdStatusConstants.EXECUTION_ERROR) as GetDataFromDSLAMPortIdStatusConstants,
    };
    switch (response.status) {
      case GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL:
        return response;
      case GetDataFromDSLAMPortIdStatusConstants.EXECUTION_ERROR:
        throw new GetDataFromDSLAMPortIdExecutionErrorException();
      case GetDataFromDSLAMPortIdStatusConstants.THERE_IS_NO_DATA:
        throw new Error30043Exception();
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
      abadslamportid: OracleHelper.numberBindIn(
        data.getPortIdFromIpResponse.dslamportId,
      ),
      Status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.DELETE_ORDER,
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
        return response;
      case DeleteOrderStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
        throw new DeleteOrderThePortIsOccupiedByAnotherContractException();
      default:
        throw new DeleteOrderExecutionErrorException();
    }
  }

  private async getDSLCentralCoIdByDSLAMPortId(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IGetDSLCentralCoIdByDSLAMPortIdResponse> {
    // const parameters = {
    //   i_nspip: OracleHelper.stringBindIn(data.queryDHCPResponse.nsp),
    //   i_invalidvpi: OracleHelper.numberBindIn(
    //     Number(data.queryDHCPResponse.vpi),
    //   ),

    //   result: OracleHelper.numberBindOut(),
    // };

    const parameters = {
      l_dslamportid: OracleHelper.numberBindIn(
        data.getPortIdFromIpResponse.dslamportId ??
          data.getPortIdResponse.portId,
      ),

      result: OracleHelper.stringBindOut(),
    };

    const result = await super.executeFunction(
      BossConstants.GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID,
      // BossConstants.SAC_PACKAGE,
      null,
      parameters,
    );
    const response: IGetDSLCentralCoIdByDSLAMPortIdResponse = {
      coId: result?.outBinds?.result,
    };
    return response;
  }

  private async readIABAOrder(
    data: ValidateTechnicalFeasibilityData,
  ): Promise<IReadIABAOrderResponse> {
    console.log();
    console.log('readIABAOrder', data?.getABADataResponse?.abaorderdate);

    const dateTimeOrderDate = data?.getABADataResponse?.abaorderdate
      ? DateTime.fromFormat(
          data?.getABADataResponse?.abaorderdate,
          BossConstants.DEFAULT_DATE_FORMAT,
        )
      : DateTime.now();
    const orderDate = dateTimeOrderDate.isValid
      ? dateTimeOrderDate.toJSDate()
      : null;
    // const orderDate = new Date('2019-07-24');

    console.log();
    console.log('orderDate', orderDate);

    const parameters = {
      sz_ncc: OracleHelper.stringBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          data.getABADataResponse.abancc,
          '0000000000',
        ),
        10,
      ),
      sz_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
      sz_phonenumber: OracleHelper.stringBindIn(
        data.requestDto.phoneNumber,
        16,
      ),
      orderid: OracleHelper.stringBindIn(String(data.requestDto.orderId), 12),

      sz_clienttype: OracleHelper.stringBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          data.getABADataResponse.abaclienttype,
          data.requestDto.lineType,
        ),
      ),

      sz_orderdate: OracleHelper.dateBindIn(orderDate),

      sz_rack: OracleHelper.stringBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          String(data.getABADataResponse.abarack),
          String(data.getDataFromDslamPortIdResponse.abarack),
        ),
        2,
      ),
      sz_position: OracleHelper.stringBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          String(data.getABADataResponse.abaposition),
          data.getDataFromDslamPortIdResponse.abadslamposition,
        ),
        2,
      ),
      n_dslamslot: OracleHelper.numberBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          data.getABADataResponse.abaslot,
          data.getDataFromDslamPortIdResponse.abaslot,
        ),
      ),
      n_port: OracleHelper.numberBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          data.getABADataResponse.abaport,
          data.getDataFromDslamPortIdResponse.abaport,
        ),
      ),
      sz_ad: OracleHelper.stringBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          data.getABADataResponse.abaad,
          data.getDataFromDslamPortIdResponse.abaad,
        ),
        5,
      ),
      sz_adpair: OracleHelper.stringBindIn(
        this.getValue(
          data.requestDto.orderIsAtBoss,
          data.getABADataResponse.abaparad,
          data.getDataFromDslamPortIdResponse.abapairad,
        ),
        4,
      ),
      sz_office: OracleHelper.stringBindIn(null, 10),
      sz_createdby: OracleHelper.stringBindIn(null, 8),
      sz_provider: OracleHelper.stringBindIn(
        data.getDataFromDslamPortIdResponse.abaprovider,
        16,
      ),
      sz_room: OracleHelper.stringBindIn(BossConstants.ADSL, 32),
      // n_recursive: OracleHelper.numberBindIn(BossConstants.ZERO),
      sz_sistema: OracleHelper.stringBindIn(null),
      iCoid: OracleHelper.stringBindIn(
        data.getDSLCentralCoIdByDSLAMPortIdResponse.coId,
        10,
      ),
      i_executiondate: OracleHelper.stringBindIn(null),
      i_autoinstall: OracleHelper.numberBindIn(
        data.requestDto.isAutoInstallation
          ? BossConstants.ONE
          : BossConstants.ZERO,
      ),

      l_errorcode: OracleHelper.tableOfNumberBindOut(),
    };

    console.log();
    console.log('parameters');
    console.log(parameters);

    console.log();
    console.log('setTimestampFormat');

    await this.setTimestampFormat();

    const result = await super.executeStoredProcedure(
      BossConstants.UTL_PACKAGE,
      BossConstants.READ_IABA_ORDER,
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
        throw new ReadIABAOrderAssignedPortException();
      case ReadIABAOrderErrorCodeConstants.THE_ORDER_EXISTS:
        throw new ReadIABAOrderOrderExistsException();
      case ReadIABAOrderErrorCodeConstants.THE_ORDER_ID_OLD:
        throw new ReadIABAOrderOrderIsOldException();
      case ReadIABAOrderErrorCodeConstants.THE_ORDER_ALREADY_EXISTS_IN_BOSS:
        throw new ReadIABAOrderTheOrderAlreadyExistsInBossException();
      case ReadIABAOrderErrorCodeConstants.GENERAL_DATABASE_ERROR:
        throw new ReadIABAOrderGeneralDatabaseErrorException();
      default:
        throw new ReadIABAOrderGeneralDatabaseErrorException();
    }
  }

  private getValue<T>(orderIsAtBoss: boolean, value: T, elseValue: T): T {
    return orderIsAtBoss ? value : elseValue;
  }
}
