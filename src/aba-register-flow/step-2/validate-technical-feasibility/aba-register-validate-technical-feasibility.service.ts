import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { AbaRegisterCheckIpService } from 'src/aba-register-flow/dependencies/check-ip/check-ip.service';
import { AbaRegisterDeleteOrderService } from 'src/aba-register-flow/dependencies/delete-order/delete-order.service';
import { AbaRegisterIsPrepaidVoiceLineService } from 'src/aba-register-flow/dependencies/is-prepaid-voice-line/aba-register-is-prepaid-voice-line.service';
import { AbaRegisterGetAbaDataFromRequestsService } from 'src/aba-register-flow/dependencies/get-aba-data-from-requests/get-aba-data-from-requests.service';
import { AbaRegisterGetAbaDataService } from 'src/aba-register-flow/dependencies/get-aba-data/get-aba-data.service';
import { AbaRegisterGetAndRegisterQualifOfServiceService } from 'src/aba-register-flow/dependencies/get-and-register-qualif-of-service/aba-register-get-and-register-qualif-of-service.service';
import { AbaRegisterGetDataFromDSLAMPortIdRequestService } from 'src/aba-register-flow/dependencies/get-data-from-dslam-port-id/get-data-from-dslam-port-id.service';
import { AbaRegisterGetDownstreamFromPlanService } from 'src/aba-register-flow/dependencies/get-downstream-from-plan/get-downstream-from-plan.service';
import { AbaRegisterIsValidIpAddressService } from 'src/aba-register-flow/dependencies/is-valid-ip-address/is-valid-ip-address.service';
import { AbaRegisterValidateTechnicalFeasibilityRequestDto } from './aba-register-validate-technical-feasibility-request.dto';
import { AbaRegisterVerifyContractByPhoneService } from 'src/aba-register-flow/dependencies/verify-contract-by-phone/verify-contract-by-phone.service';
import { BossConstants } from 'src/boss/boss.constants';
import { BossFlowService } from 'src/boss-flows/boss-flow.service';
import { BossHelper } from 'src/boss/boss.helper';
import { DSLAuditLogsRawService } from 'src/raw/stored-procedures/dsl-audit-logs/dsl-audit-logs-raw.service';
import { Error30092Exception } from 'src/exceptions/error-3009-2.exception';
import { ErrorInsertingIABAFromRegisterException } from './exceptions/error-inserting-iaba-from-register.exception';
import { GetPortIdFromIpExecutionException } from '../../../validate-technical-feasibility/get-port-id-from-ip/get-port-id-from-ip-execution.exception';
import { GetAbaDataConstants } from '../../../raw/stored-procedures/get-aba-data/get-aba-data.constants';
import { GetAbaDataFromRequestsRawService } from '../../../raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-raw.service';
import { GetASAPOrderDetailService } from 'src/raw/pic/get-asap-order-detail/get-asap-order-detail.service';
import { GetDataFromDSLAMPortIdStatusConstants } from '../../../raw/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id-status.constants';
import { GetDHCPDataRawService } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-raw.service';
import { GetPortIdFromIpBadIpFormatException } from '../../../validate-technical-feasibility/get-port-id-from-ip/get-port-id-from-ip-bad-ip-format.exception';
import { GetPortIdFromIpConstants } from '../../../validate-technical-feasibility/get-port-id-from-ip/get-port-id-from-ip.constants';
import { GetPortIdStatusConstants } from '../../../validate-technical-feasibility/get-port-id/get-port-id-status.constants';
import { GetPortIdException } from '../../../validate-technical-feasibility/get-port-id/get-port-id.exception';
import { IAbaRegisterValidateTechnicalFeasibilityResponse } from './aba-register-validate-technical-feasibility-response.interface';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from '../../../raw/stored-procedures/update-dsl-aba-registers/get-dsl-central-co-id-by-dslam-port-id-response.interface';
import { IGetDHCPDataResponse } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-response.interface';
import { IGetPortIdFromIpResponse } from '../../../validate-technical-feasibility/get-port-id-from-ip/get-port-id-from-ip-response.interface';
import { IGetPortIdResponse } from '../../../validate-technical-feasibility/get-port-id/get-port-id-response.interface';
import { IIsOccupiedPortResponse } from '../../../validate-technical-feasibility/Is-occupied-port/is-occupied-port-response.interface';
import { InsertDslAbaRegistersRawService } from 'src/raw/stored-procedures/insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { IReadIABAOrderResponse } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-response.interface';
import { IsOccupiedPortConstants } from '../../../validate-technical-feasibility/Is-occupied-port/is-occupied-port.constants';
import { IsOccupiedPortInternalErrorException } from '../../../validate-technical-feasibility/Is-occupied-port/is-occupied-port-internal-error.exception';
import { IsOccupiedPortTherIsNoDataException } from '../../../validate-technical-feasibility/Is-occupied-port/is-occupied-port-there-is-no-data.exception';
import { IsValidIpAddressStatusConstants } from 'src/raw/stored-procedures/is-valid-ip-address/is-valid-ip-address-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ReadIABAOrderErrorCodeConstants } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-error_code.constants';
import { ReadIABAOrderGeneralDatabaseErrorException } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-general-database-error.exception';
import { ReadIABAOrderAssignedPortException } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-assigned-port.exception';
import { ReadIABAOrderOrderExistsException } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-order-exists.exception';
import { ReadIABAOrderOrderIsOldException } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-order-is-old.exception';
import { ReadIABAOrderTheOrderAlreadyExistsInBossException } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-the-order-already-exists-in-boss.exception';
import { TheClientAlreadyHasABAServiceException } from './exceptions/the-client-already-has-aba-service.exception';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterValidateTechnicalFeasibilityService extends BossFlowService<
  AbaRegisterValidateTechnicalFeasibilityRequestDto,
  IAbaRegisterValidateTechnicalFeasibilityResponse
> {
  constructor(
    private readonly abaRegisterCheckIpService: AbaRegisterCheckIpService,
    private readonly abaRegisterDeleteOrderService: AbaRegisterDeleteOrderService,
    private readonly abaRegisterGetABADataFromRequestsService: AbaRegisterGetAbaDataFromRequestsService,
    private readonly abaRegisterGetAbaDataService: AbaRegisterGetAbaDataService,
    private readonly abaRegisterIsPrepaidVoiceLineService: AbaRegisterIsPrepaidVoiceLineService,
    private readonly abaRegisterGetAndRegisterQualifOfServiceService: AbaRegisterGetAndRegisterQualifOfServiceService,
    private readonly abaRegisterGetDataFromDSLAMPortIdRequestService: AbaRegisterGetDataFromDSLAMPortIdRequestService,
    private readonly abaRegisterGetDownstreamFromPlanService: AbaRegisterGetDownstreamFromPlanService,
    private readonly abaRegisterIsValidIpAddressService: AbaRegisterIsValidIpAddressService,
    private readonly abaRegisterVerifyContractByPhoneService: AbaRegisterVerifyContractByPhoneService,
    private readonly dslAuditLogsService: DSLAuditLogsRawService,
    private readonly getABADataFromRequestsService: GetAbaDataFromRequestsRawService,
    private readonly getDHCPDataService: GetDHCPDataRawService,
    private readonly getASAPOrderDetailService: GetASAPOrderDetailService,
    private readonly insertDslAbaRegistersRawService: InsertDslAbaRegistersRawService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService, updateDslAbaRegistersService);
    super.className = AbaRegisterValidateTechnicalFeasibilityService.name;
    super.methodName = BossConstants.EXECUTE_METHOD;
  }

  async execute(
    dto: AbaRegisterValidateTechnicalFeasibilityRequestDto,
  ): Promise<IAbaRegisterValidateTechnicalFeasibilityResponse> {
    this.initialize(dto);
    try {
      //   Wlog.instance.info({
      //     phoneNumber: BossHelper.getPhoneNumber(dto),
      //     message: BossConstants.START,
      //     input: BossHelper.getPhoneNumber(dto),
      //     clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //     method: 'validateTechnicalFeasibility',
      //   });
      this.infoLog(BossConstants.START);
      // const data = this.initialize(dto);
      // data.requestDto = dto;
      await super.connect();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'insertDslAbaRegisters',
      //   input: JSON.stringify(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.insertDslAbaRegistersResponse =
      //   await this.insertDslAbaRegistersRawService.execute(
      //     {
      //       areaCode: this.response.requestDto.areaCode,
      //       phoneNumber: this.response.requestDto.phoneNumber,
      //       registerDate: this.response.requestDto.registerDate,
      //       registerStatus: BossConstants.IN_PROGRESS,
      //     },
      //     this.dbConnection,
      //   );
      await this.insertDslAbaRegisters();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'isPrepaidVoiceLine',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.isPrepaidVoiceLine =
      //   await this.abaRegisterIsPrepaidVoiceLineService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //     },
      //     this.dbConnection,
      //   );
      await this.isPrepaidVoiceLine();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'getAndRegisterQualifOfService',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.getAndRegisterQualifOfServiceResponse =
      //   await this.abaRegisterGetAndRegisterQualifOfServiceService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //     },
      //     this.dbConnection,
      //   );
      await this.getAndRegisterQualifOfService();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'verifyContractByPhone',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.verifyContractByPhoneResponse =
      //   await this.verifyContractByPhone(this.response);
      await this.verifyContractByPhone();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'getABADataFromRequests',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.getABADataFromRequestsResponse =
      //   await this.abaRegisterGetABADataFromRequestsService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //     },
      //     this.dbConnection,
      //   );
      await this.getABADataFromRequests();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'getDownstreamFromPlan',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.getDownstreamFromPlanResponse =
      //   await this.abaRegisterGetDownstreamFromPlanService.execute({
      //     areaCode: dto.areaCode,
      //     phoneNumber: dto.phoneNumber,
      //     desiredPlan: this.response.getABADataFromRequestsResponse.desiredPlan,
      //   });
      await this.getDownstreamFromPlan();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'isValidIpAddress',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      //   method: 'validateTechnicalFeasibility',
      // });
      // this.response.isValidIpAddressResponse = await this.isValidIpAddress(
      //   this.response,
      // );
      await this.isValidIpAddress();
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getPortIdFromIp',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      this.response.getPortIdFromIpResponse = await this.getPortIdFromIp(
        this.response,
      );

      if (
        ValidationHelper.isDefined(
          this.response.getPortIdFromIpResponse.dslamportId,
        )
      ) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'IsOccupiedPort',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        this.response.isOccupiedPortResponse = await this.IsOccupiedPort(
          this.response,
        );

        if (this.response.isOccupiedPortResponse.result > 0) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getPortIdFlow    (1)',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          await this.getPortIdFlow(this.response);
        } else {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getASAPOrderDetail',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          await this.rbeDoesNotExistLog(this.response);
          await this.setASAPOrderDetail(this.response);
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getPortIdFlow   (2)',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        await this.getPortIdFlow(this.response);
      }

      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getABAData',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
        method: 'validateTechnicalFeasibility',
      });
      this.response.getABADataResponse =
        await this.abaRegisterGetAbaDataService.execute({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
          ipAddress: dto.ipAddress,
          orderId: dto.orderId,
        });

      if (this.response.getABADataResponse.status === 0) {
        if (
          ValidationHelper.isDefined(
            this.response.getABADataResponse.abacontractid,
          )
        ) {
          throw new TheClientAlreadyHasABAServiceException();
        } else {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'checkIp',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          this.response.checkIpResponse =
            await this.abaRegisterCheckIpService.execute({
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              dslamportId:
                this.response.getPortIdFromIpResponse.dslamportId ??
                this.response.getPortIdResponse.portId,
              loginInstall: dto.loginInstall,
            });
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getDataFromDslamPortId',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        this.response.getDataFromDslamPortIdResponse =
          await this.abaRegisterGetDataFromDSLAMPortIdRequestService.execute({
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            dslamPortId:
              this.response.getPortIdFromIpResponse.dslamportId ??
              this.response.getPortIdResponse.portId,
          });
        if (
          this.response.getDataFromDslamPortIdResponse.status ===
          GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'modifyNetworkAccessLog',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          await this.modifyNetworkAccessLog(this.response);
        }

        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'deleteOrder',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        this.response.deleteOrderResponse =
          await this.abaRegisterDeleteOrderService.execute(
            {
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              dslamportId:
                this.response.getPortIdFromIpResponse.dslamportId ??
                this.response.getPortIdResponse.portId,
            },
            this.dbConnection,
          );

        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getDSLCentralCoIdByDSLAMPortId',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        this.response.getDSLCentralCoIdByDSLAMPortIdResponse =
          await this.getDSLCentralCoIdByDSLAMPortId(this.response);
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'readIABAOrder',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
          method: 'validateTechnicalFeasibility',
        });
        this.response.readIABAOrderResponse = await this.readIABAOrder(
          this.response,
        );

        if (
          this.response.readIABAOrderResponse.errorCode ===
          ReadIABAOrderErrorCodeConstants.SUCCESSFULL
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getABAData',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
            method: 'validateTechnicalFeasibility',
          });
          this.response.getABADataResponse =
            await this.abaRegisterGetAbaDataService.execute({
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              ipAddress: dto.ipAddress,
              orderId: dto.orderId,
            });
          if (
            this.response.getABADataResponse.status !==
            GetAbaDataConstants.SUCCESSFULL
          ) {
            throw new ErrorInsertingIABAFromRegisterException();
          }
        } else {
          if (this.response.deleteOrderResponse.status === 2) {
            // throw error puerto ocupado
          }
        }
      }
      return this.response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
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

  private initialize(
    dto: AbaRegisterValidateTechnicalFeasibilityRequestDto,
  ): void {
    this.dto = dto;
    this.response = {
      requestDto: dto,
      insertDslAbaRegistersResponse: null,
      isPrepaidVoiceLine: null,
      getAndRegisterQualifOfServiceResponse: null,
      verifyContractByPhoneResponse: null,
      getDownstreamFromPlanResponse: null,
      getABADataFromRequestsResponse: null,
      isValidIpAddressResponse: null,
      getPortIdFromIpResponse: null,
      queryDHCPResponse: null,
      getValidVPIResponse: null,
      getPortIdResponse: null,
      isOccupiedPortResponse: null,
      getASAPOrderDetailResponse: null,
      linkNetworkResponse: null,
      getABADataResponse: null,
      checkIpResponse: null,
      getDataFromDslamPortIdResponse: null,
      deleteOrderResponse: null,
      readIABAOrderResponse: null,
      getDSLCentralCoIdByDSLAMPortIdResponse: null,
    };
  }

  private async insertDslAbaRegisters(): Promise<void> {
    super.infoLog('insertDslAbaRegisters');
    this.response.insertDslAbaRegistersResponse =
      await this.insertDslAbaRegistersRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          registerDate: this.dto.registerDate,
          registerStatus: BossConstants.IN_PROGRESS,
        },
        this.dbConnection,
      );
  }

  private async isPrepaidVoiceLine(): Promise<void> {
    super.infoLog('isPrepaidVoiceLine');
    this.response.isPrepaidVoiceLine =
      await this.abaRegisterIsPrepaidVoiceLineService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        this.dbConnection,
      );
  }

  private async getAndRegisterQualifOfService(): Promise<void> {
    super.infoLog('getAndRegisterQualifOfService');
    this.response.getAndRegisterQualifOfServiceResponse =
      await this.abaRegisterGetAndRegisterQualifOfServiceService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        this.dbConnection,
      );
  }

  private async verifyContractByPhone(): Promise<void> {
    super.infoLog('verifyContractByPhone');
    this.response.verifyContractByPhoneResponse =
      await this.abaRegisterVerifyContractByPhoneService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        this.dbConnection,
      );
  }

  private async getABADataFromRequests(): Promise<void> {
    super.infoLog('getABADataFromRequests');
    this.response.getABADataFromRequestsResponse =
      await this.abaRegisterGetABADataFromRequestsService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        this.dbConnection,
      );
  }

  private async getDownstreamFromPlan(): Promise<void> {
    super.infoLog('getDownstreamFromPlan');
    this.response.getDownstreamFromPlanResponse =
      await this.abaRegisterGetDownstreamFromPlanService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          desiredPlan: this.response.getABADataFromRequestsResponse.desiredPlan,
        },
        this.dbConnection,
      );
  }

  /*
  private async isValidIpAddress(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
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

*/
  private async isValidIpAddress(): Promise<void> {
    super.infoLog('isValidIpAddress');
    this.response.isValidIpAddressResponse =
      await this.abaRegisterIsValidIpAddressService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          ipAddress: this.dto.ipAddress,
        },
        this.dbConnection,
      );
  }

  // ****************************************************************

  private async callAuditLog(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
    description: string,
  ): Promise<void> {
    await this.dslAuditLogsService.execute(
      {
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
      },
      this.dbConnection,
    );
  }

  // private async verifyContractByPhone(
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<IVerifiyContractByPhoneResponse> {
  //   const parameters = {
  //     i_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
  //     i_phonenumber: OracleHelper.stringBindIn(
  //       data.requestDto.phoneNumber,
  //       256,
  //     ),
  //     o_status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.BOSS_PACKAGE,
  //     BossConstants.VERIFY_CONTRACT_BY_PHONE,
  //     parameters,
  //   );
  //   const status = (result?.outBinds?.o_status ??
  //     VerifiyContractByPhoneStatusConstants.ERROR) as VerifiyContractByPhoneStatusConstants;
  //   const response: IVerifiyContractByPhoneResponse = {
  //     status: status,
  //   };
  //   switch (status) {
  //     case VerifiyContractByPhoneStatusConstants.SUCCESSFULL:
  //       return response;
  //     case VerifiyContractByPhoneStatusConstants.ERROR:
  //       throw new VerifyContractByPhoneException();
  //     default:
  //       throw new VerifyContractByPhoneException();
  //   }
  // }

  // private async getDownstreamFromPlan(
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<IGetDownstreamFromPlanResponse> {
  //   const parameters = {
  //     i_planname: OracleHelper.stringBindIn(
  //       data.getABADataFromRequestsResponse.desiredPlan,
  //       32,
  //     ),
  //     o_downstream: OracleHelper.stringBindOut(32),
  //     o_status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     null,
  //     BossConstants.GET_DOWNSTREAM_FROM_PLAN,
  //     parameters,
  //   );
  //   const status = (result?.outBinds?.o_status ??
  //     GetDownstreamFromPlanStatusConstants.ERROR) as GetDownstreamFromPlanStatusConstants;
  //   const response: IGetDownstreamFromPlanResponse = {
  //     downstream: result?.outBinds?.o_downstream ?? 1,
  //     status: status,
  //   };
  //   switch (status) {
  //     case GetDownstreamFromPlanStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetDownstreamFromPlanStatusConstants.ERROR:
  //       throw new GetInfoFromABARequestsException();
  //     case GetDownstreamFromPlanStatusConstants.THERE_IS_NO_DATA:
  //       throw new GetDownstreamFromPlanThereIsNoDataException();
  //     default:
  //       throw new GetInfoFromABARequestsException();
  //   }
  // }

  private async getPortIdFromIp(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<IGetPortIdFromIpResponse> {
    const parameters = {
      i_ipaddress: OracleHelper.stringBindIn(data.requestDto.ipAddress),
      sz_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode),
      sz_phonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),

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
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    Wlog.instance.info({
      phoneNumber: null,
      message: 'queryDHCP',
      input: null,
      clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    data.queryDHCPResponse = await this.queryDHCP(data);

    Wlog.instance.info({
      phoneNumber: null,
      message: 'getValidVPI',
      input: null,
      clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    data.getValidVPIResponse = await this.getValidVPI(data);

    Wlog.instance.info({
      phoneNumber: null,
      message: 'getPortId',
      input: null,
      clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
      method: 'getPortIdFlow',
    });
    data.getPortIdResponse = await this.getPortId(data);

    Wlog.instance.info({
      phoneNumber: null,
      message: 'validaciones validaciones',
      input: null,
      clazz: AbaRegisterValidateTechnicalFeasibilityService.name,
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
        IsValidIpAddressStatusConstants.POOL_RBE_LEASE
      ) {
        await this.rbeDoesNotExistLog(data);
      }
      await this.setASAPOrderDetail(data);
    } else {
      throw new Error30092Exception();
    }
  }

  private async rbeDoesNotExistLog(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    await this.callAuditLog(data, 'RBE no existe');
  }

  private async setASAPOrderDetail(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
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
  private setLinkNetwork(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): void {
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
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<IGetDHCPDataResponse> {
    return this.getDHCPDataService.execute({
      areaCode: data.requestDto.areaCode,
      phoneNumber: data.requestDto.phoneNumber,
      ipAddress: data.requestDto.ipAddress,
    });
  }

  private async getValidVPI(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
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
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
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
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
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

  // private async getABAData(
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<IGetAbaDataResponse> {
  //   const parameters = {
  //     abaorderid: OracleHelper.stringBindIn(
  //       String(data.requestDto.orderId),
  //       12,
  //     ),
  //     abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
  //     abaphonenumber: OracleHelper.stringBindIn(
  //       data.requestDto.phoneNumber,
  //       16,
  //     ),
  //     abaipaddress: OracleHelper.stringBindIn(data.requestDto.ipAddress, 99),

  //     abadslamportid: OracleHelper.tableOfNumberBindOut(),
  //     abancc: OracleHelper.tableOfStringBindOut(),
  //     abaclienttype: OracleHelper.tableOfStringBindOut(),
  //     abaorderdate: OracleHelper.tableOfStringBindOut(),
  //     abaad: OracleHelper.tableOfStringBindOut(),
  //     abaparad: OracleHelper.tableOfStringBindOut(),
  //     abaslot: OracleHelper.tableOfNumberBindOut(),
  //     abaport: OracleHelper.tableOfNumberBindOut(),
  //     abarack: OracleHelper.tableOfNumberBindOut(),
  //     abaposition: OracleHelper.tableOfNumberBindOut(),
  //     abavci: OracleHelper.tableOfNumberBindOut(),
  //     abacontractid: OracleHelper.tableOfNumberBindOut(),
  //     Status: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.GET_ABA_DATA,
  //     parameters,
  //   );
  //   const response: IGetAbaDataResponse = {
  //     abadslamportid: OracleHelper.getFirstItem(result, 'abadslamportid'),
  //     abancc: OracleHelper.getFirstItem(result, 'abancc'),
  //     abaclienttype: OracleHelper.getFirstItem(result, 'abaclienttype'),
  //     abaorderdate: OracleHelper.getFirstItem(result, 'abaorderdate'),
  //     abaad: OracleHelper.getFirstItem(result, 'abaad'),
  //     abaparad: OracleHelper.getFirstItem(result, 'abaparad'),
  //     abaslot: OracleHelper.getFirstItem(result, 'abaslot'),
  //     abaport: OracleHelper.getFirstItem(result, 'abaport'),
  //     abarack: OracleHelper.getFirstItem(result, 'abarack'),
  //     abaposition: OracleHelper.getFirstItem(result, 'abaposition'),
  //     abavci: OracleHelper.getFirstItem(result, 'abavci'),
  //     abacontractid: OracleHelper.getFirstItem(result, 'abacontractid'),
  //     status: (OracleHelper.getFirstItem(result, 'Status') ??
  //       GetAbaDataConstants.ERROR) as GetAbaDataConstants,
  //   };
  //   switch (response.status) {
  //     case GetAbaDataConstants.SUCCESSFULL:
  //       return response;
  //     case GetAbaDataConstants.ERROR:
  //       throw new GetABADataException();
  //     case GetAbaDataConstants.THERE_IS_NO_DATA:
  //       return response;
  //     default:
  //       throw new GetABADataException();
  //   }
  // }

  // private async checkIp(
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<ICheckIpResponse> {
  //   const parameters = {
  //     abadslamportid: OracleHelper.stringBindIn(
  //       String(
  //         data.getPortIdFromIpResponse.dslamportId ??
  //           data.getPortIdResponse.portId,
  //       ),
  //     ),
  //     abaareacode: OracleHelper.stringBindIn(data.requestDto.areaCode),
  //     abaphonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),
  //     abauserlogin: OracleHelper.stringBindIn(
  //       data.requestDto.loginInstall ?? BossConstants.REGISTER,
  //     ),
  //     abaportwithcontract: OracleHelper.numberBindIn(BossConstants.ZERO),
  //     Status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.BOSS_PACKAGE,
  //     BossConstants.CHECK_IP,
  //     parameters,
  //   );
  //   const response: ICheckIpResponse = {
  //     status: (result?.outBinds?.Status ??
  //       CheckIpStatusConstants.ERROR) as CheckIpStatusConstants,
  //   };
  //   switch (response.status) {
  //     case CheckIpStatusConstants.SUCCESSFULL:
  //       return response;
  //     case CheckIpStatusConstants.ERROR:
  //       throw new CheckIpException(result);
  //     case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PHONE_NUMBER:
  //       return response;
  //     case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PARAMETER:
  //       throw new Error30032Exception();
  //     case CheckIpStatusConstants.SUCCESSFULL_BY_BUSSINESS_LOGIC:
  //       return response;
  //     case CheckIpStatusConstants.THERE_IS_NOT_CONTRACT_ASSOCIATED_WITH_THE_PORT:
  //       return response;
  //     case CheckIpStatusConstants.THE_PORT_IS_RESERVED:
  //       return response;
  //     case CheckIpStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
  //       throw new Error30031Exception();
  //     default:
  //       throw new CheckIpException(result);
  //   }
  // }

  // private async getDataFromDslamPortId(
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<IGetDataFromDSLAMPortIdResponse> {
  //   const parameters = {
  //     abadslamportid: OracleHelper.numberBindIn(
  //       data.getPortIdFromIpResponse.dslamportId,
  //     ),

  //     abarack: OracleHelper.tableOfStringBindOut(),
  //     abadslamposition: OracleHelper.tableOfStringBindOut(),
  //     abaslot: OracleHelper.tableOfNumberBindOut(),
  //     abaport: OracleHelper.tableOfNumberBindOut(),
  //     abaad: OracleHelper.tableOfStringBindOut(),
  //     abapairad: OracleHelper.tableOfStringBindOut(),
  //     abaprovider: OracleHelper.tableOfStringBindOut(),
  //     abasistema: OracleHelper.tableOfStringBindOut(),
  //     status: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.BOSS_PACKAGE,
  //     BossConstants.GET_DATA_FROM_DSLAM_PORT_ID,
  //     parameters,
  //   );
  //   const response: IGetDataFromDSLAMPortIdResponse = {
  //     abarack: OracleHelper.getFirstItem(result, 'abarack'),
  //     abadslamposition: OracleHelper.getFirstItem(result, 'abadslamposition'),
  //     abaslot: OracleHelper.getFirstItem(result, 'abaslot'),
  //     abaport: OracleHelper.getFirstItem(result, 'abaport'),
  //     abaad: OracleHelper.getFirstItem(result, 'abaad'),
  //     abapairad: OracleHelper.getFirstItem(result, 'abapairad'),
  //     abaprovider: OracleHelper.getFirstItem(result, 'abaprovider'),
  //     abasistema: OracleHelper.getFirstItem(result, 'abasistema'),
  //     status: (OracleHelper.getFirstItem(result, 'status') ??
  //       GetDataFromDSLAMPortIdStatusConstants.ERROR) as GetDataFromDSLAMPortIdStatusConstants,
  //   };
  //   switch (response.status) {
  //     case GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetDataFromDSLAMPortIdStatusConstants.ERROR:
  //       throw new GetDataFromDSLAMPortIdException();
  //     case GetDataFromDSLAMPortIdStatusConstants.THERE_IS_NO_DATA:
  //       throw new Error30043Exception();
  //     default:
  //       throw new GetDataFromDSLAMPortIdException();
  //   }
  // }

  private async modifyNetworkAccessLog(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    await this.callAuditLog(data, 'Modificar Red de Acceso');
  }

  // private async deleteOrder(
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<IDeleteOrderResponse> {
  //   const parameters = {
  //     abadslamportid: OracleHelper.numberBindIn(
  //       data.getPortIdFromIpResponse.dslamportId,
  //     ),
  //     Status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.BOSS_PACKAGE,
  //     BossConstants.DELETE_ORDER,
  //     parameters,
  //   );
  //   const response: IDeleteOrderResponse = {
  //     status: (result?.outBinds?.Status ??
  //       DeleteOrderStatusConstants.ERROR) as DeleteOrderStatusConstants,
  //   };
  //   switch (response.status) {
  //     case DeleteOrderStatusConstants.SUCCESSFULL:
  //       return response;
  //     case DeleteOrderStatusConstants.ERROR:
  //       throw new DeleteOrderExecutionErrorException();
  //     case DeleteOrderStatusConstants.THERE_IS_NO_DATA:
  //       return response;
  //     case DeleteOrderStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
  //       throw new DeleteOrderThePortIsOccupiedByAnotherContractException();
  //     default:
  //       throw new DeleteOrderExecutionErrorException();
  //   }
  // }

  private async getDSLCentralCoIdByDSLAMPortId(
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
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
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<IReadIABAOrderResponse> {
    const dateTimeOrderDate = data?.getABADataResponse?.abaorderdate
      ? DateTime.fromFormat(
          data?.getABADataResponse?.abaorderdate,
          BossConstants.DEFAULT_DATE_FORMAT,
        )
      : DateTime.now();
    const orderDate = dateTimeOrderDate.isValid
      ? dateTimeOrderDate.toJSDate()
      : null;
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
          data.getABADataResponse.abaclienttype ?? data.requestDto.lineType,
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
