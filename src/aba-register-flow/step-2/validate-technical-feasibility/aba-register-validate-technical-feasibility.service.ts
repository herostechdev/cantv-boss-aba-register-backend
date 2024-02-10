import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';

import { AbaRegisterCheckIpService } from 'src/aba-register-flow/dependencies/check-ip/check-ip.service';
import { AbaRegisterDeleteOrderService } from 'src/aba-register-flow/dependencies/delete-order/delete-order.service';
import { AbaRegisterIsPrepaidVoiceLineService } from 'src/aba-register-flow/dependencies/is-prepaid-voice-line/aba-register-is-prepaid-voice-line.service';
import { AbaRegisterGetAbaDataFromRequestsService } from 'src/aba-register-flow/dependencies/get-aba-data-from-requests/get-aba-data-from-requests.service';
import { AbaRegisterGetAbaDataService } from 'src/aba-register-flow/dependencies/get-aba-data/get-aba-data.service';
import { AbaRegisterGetAndRegisterQualifOfServiceService } from 'src/aba-register-flow/dependencies/get-and-register-qualif-of-service/aba-register-get-and-register-qualif-of-service.service';
import { AbaRegisterGetDataFromDSLAMPortIdRequestService } from 'src/aba-register-flow/dependencies/get-data-from-dslam-port-id/get-data-from-dslam-port-id.service';
import { AbaRegisterGetDownstreamFromPlanService } from 'src/aba-register-flow/dependencies/get-downstream-from-plan/get-downstream-from-plan.service';
import { AbaRegisterGetDSLCentralCoIdByDSLAMPortIdService } from 'src/aba-register-flow/dependencies/get-dsl-central-coid-by-dslam-port-id/get-dsl-central-coid-by-dslam-port-id.service';
import { AbaRegisterGetPortIdService } from 'src/aba-register-flow/dependencies/get-port-id/get-port-id.service';
import { AbaRegisterGetPortIdFromIpService } from 'src/aba-register-flow/dependencies/get-port-id-from-ip/get-port-id-from-ip.service';
import { AbaRegisterIsOccupiedPortService } from 'src/aba-register-flow/dependencies/Is-occupied-port/Is-occupied-port.service';
import { AbaRegisterIsValidIpAddressService } from 'src/aba-register-flow/dependencies/is-valid-ip-address/is-valid-ip-address.service';
import { AbaRegisterReadIABAOrderService } from 'src/aba-register-flow/dependencies/read-iaba-order/read-iaba-order.service';
import { AbaRegisterValidateTechnicalFeasibilityRequestDto } from './aba-register-validate-technical-feasibility-request.dto';
import { AbaRegisterVerifyContractByPhoneService } from 'src/aba-register-flow/dependencies/verify-contract-by-phone/verify-contract-by-phone.service';
import { ASAPOrderStateIsInvalidException } from './exceptions/asap-order-state-is-invalid.exception';
import { BossConstants } from 'src/boss/boss.constants';
import { BossFlowService } from 'src/boss-flows/boss-flow.service';
import { DSLAuditLogsRawService } from 'src/raw/stored-procedures/dsl-audit-logs/dsl-audit-logs-raw.service';
import { Error30092Exception } from 'src/exceptions/error-3009-2.exception';
import { ErrorInsertingIABAFromRegisterException } from './exceptions/error-inserting-iaba-from-register.exception';
import { GetAbaDataStatusConstants } from 'src/raw/stored-procedures/get-aba-data/get-aba-data-status.constants';
import { GetASAPOrderDetailService } from 'src/raw/pic/get-asap-order-detail/get-asap-order-detail.service';
import { GetDataFromDSLAMPortIdStatusConstants } from '../../../raw/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id-status.constants';
import { GetDHCPDataRawService } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-raw.service';
import { IAbaRegisterValidateTechnicalFeasibilityResponse } from './aba-register-validate-technical-feasibility-response.interface';
import { IGetDHCPDataResponse } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-response.interface';
import { InsertDslAbaRegistersRawService } from 'src/raw/stored-procedures/insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { IsValidIpAddressStatusConstants } from 'src/raw/stored-procedures/is-valid-ip-address/is-valid-ip-address-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ReadIABAOrderStatusConstants } from '../../../raw/stored-procedures/read-iaba-order/read-iaba-order-status.constants';
import { TheClientAlreadyHasABAServiceException } from './exceptions/the-client-already-has-aba-service.exception';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

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
    private readonly abaRegisterGetDSLCentralCoIdByDSLAMPortIdService: AbaRegisterGetDSLCentralCoIdByDSLAMPortIdService,
    private readonly abaRegisterGetPortIdService: AbaRegisterGetPortIdService,
    private readonly abaRegisterGetPortIdFromIpService: AbaRegisterGetPortIdFromIpService,
    private readonly abaRegisterIsOccupiedPortService: AbaRegisterIsOccupiedPortService,
    private readonly abaRegisterIsValidIpAddressService: AbaRegisterIsValidIpAddressService,
    private readonly abaRegisterReadIABAOrderService: AbaRegisterReadIABAOrderService,
    private readonly abaRegisterVerifyContractByPhoneService: AbaRegisterVerifyContractByPhoneService,
    private readonly dslAuditLogsService: DSLAuditLogsRawService,
    private readonly getDHCPDataService: GetDHCPDataRawService,
    private readonly getASAPOrderDetailService: GetASAPOrderDetailService,
    private readonly insertDslAbaRegistersRawService: InsertDslAbaRegistersRawService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService, updateDslAbaRegistersRawService);
    super.className = AbaRegisterValidateTechnicalFeasibilityService.name;
    super.methodName = BossConstants.EXECUTE_METHOD;
  }

  async execute(
    dto: AbaRegisterValidateTechnicalFeasibilityRequestDto,
  ): Promise<IAbaRegisterValidateTechnicalFeasibilityResponse> {
    this.infoLog(BossConstants.START);
    this.initialize(dto);
    const dbConnection = await super.connect();
    try {
      await this.insertDslAbaRegisters(dbConnection);
      await this.isPrepaidVoiceLine(dbConnection);
      await this.getAndRegisterQualifOfService(dbConnection);
      await this.verifyContractByPhone(dbConnection);
      await this.getABADataFromRequests(dbConnection);
      await this.getDownstreamFromPlan(dbConnection);
      await this.isValidIpAddress(dbConnection);
      await this.getPortIdFromIp(dbConnection);
      if (
        ValidationHelper.isDefined(
          this.response.getPortIdFromIpResponse.dslamportId,
        )
      ) {
        await this.isOccupiedPort(dbConnection);
        if (this.response.isOccupiedPortResponse.result > 0) {
          super.infoLog('getPortIdFlow    (1st call)');
          await this.getPortIdFlow(dbConnection, this.response);
        } else {
          super.infoLog('getASAPOrderDetail');
          await this.rbeDoesNotExistLog(dbConnection, this.response);
          await this.setASAPOrderDetail(dbConnection, this.response);
        }
      } else {
        super.infoLog('getPortIdFlow   (2nd call)');
        await this.getPortIdFlow(dbConnection, this.response);
      }
      await this.getABAData(dbConnection);
      if (
        this.response.getABADataResponse.status ===
        GetAbaDataStatusConstants.SUCCESSFULL
      ) {
        if (
          ValidationHelper.isDefined(
            this.response.getABADataResponse.abacontractid,
          )
        ) {
          throw new TheClientAlreadyHasABAServiceException();
        }
        await this.checkIp(dbConnection);
      } else {
        await this.getDataFromDslamPortId(dbConnection);

        if (
          this.response.getDataFromDslamPortIdResponse.status ===
          GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL
        ) {
          super.infoLog('modifyNetworkAccessLog');
          await this.modifyNetworkAccessLog(dbConnection, this.response);
        }
        await this.deleteOrder(dbConnection);
        await this.getDSLCentralCoIdByDSLAMPortId(dbConnection);
        await this.readIABAOrder(dbConnection);

        if (
          this.response.readIABAOrderResponse.status ===
          ReadIABAOrderStatusConstants.SUCCESSFULL
        ) {
          await this.getABAData(dbConnection);
          if (
            this.response.getABADataResponse.status ===
            GetAbaDataStatusConstants.THERE_IS_NO_DATA
          ) {
            throw new ErrorInsertingIABAFromRegisterException();
          }
        } else {
          // if (this.response.deleteOrderResponse.status === 2) {
          //   throw error puerto ocupado
          // }
        }
      }
      return this.response;
    } catch (error) {
      super.errorLog(error);
      await this.updateDslABARegistersWithNotProcessedValue(dbConnection);
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

  private async insertDslAbaRegisters(dbConnection: Connection): Promise<void> {
    super.infoLog('insertDslAbaRegisters');
    this.response.insertDslAbaRegistersResponse =
      await this.insertDslAbaRegistersRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          registerDate: this.dto.registerDate,
          registerStatus: BossConstants.IN_PROGRESS,
        },
        dbConnection,
      );
  }

  private async isPrepaidVoiceLine(dbConnection: Connection): Promise<void> {
    super.infoLog('isPrepaidVoiceLine');
    this.response.isPrepaidVoiceLine =
      await this.abaRegisterIsPrepaidVoiceLineService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        dbConnection,
      );
  }

  private async getAndRegisterQualifOfService(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getAndRegisterQualifOfService');
    this.response.getAndRegisterQualifOfServiceResponse =
      await this.abaRegisterGetAndRegisterQualifOfServiceService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          customerId: null,
        },
        dbConnection,
      );
  }

  private async verifyContractByPhone(dbConnection: Connection): Promise<void> {
    super.infoLog('verifyContractByPhone');
    this.response.verifyContractByPhoneResponse =
      await this.abaRegisterVerifyContractByPhoneService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        dbConnection,
      );
  }

  private async getABADataFromRequests(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getABADataFromRequests');
    this.response.getABADataFromRequestsResponse =
      await this.abaRegisterGetABADataFromRequestsService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        dbConnection,
      );
  }

  private async getDownstreamFromPlan(dbConnection: Connection): Promise<void> {
    super.infoLog('getDownstreamFromPlan');
    this.response.getDownstreamFromPlanResponse =
      await this.abaRegisterGetDownstreamFromPlanService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          desiredPlan: this.response.getABADataFromRequestsResponse.desiredPlan,
        },
        dbConnection,
      );
  }

  private async isOccupiedPort(dbConnection: Connection): Promise<void> {
    super.infoLog('isOccupiedPort');
    this.response.isOccupiedPortResponse =
      await this.abaRegisterIsOccupiedPortService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          portId: this.response.getPortIdFromIpResponse.dslamportId,
        },
        dbConnection,
      );
  }

  private async isValidIpAddress(dbConnection: Connection): Promise<void> {
    super.infoLog('isValidIpAddress');
    this.response.isValidIpAddressResponse =
      await this.abaRegisterIsValidIpAddressService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          ipAddress: this.dto.ipAddress,
        },
        dbConnection,
      );
  }

  private async getPortIdFromIp(dbConnection: Connection): Promise<void> {
    super.infoLog('getPortIdFromIp');
    this.response.getPortIdFromIpResponse =
      await this.abaRegisterGetPortIdFromIpService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          ipAddress: this.dto.ipAddress,
        },
        dbConnection,
      );
  }

  private async getPortId(dbConnection: Connection): Promise<void> {
    super.infoLog('getPortId');
    this.response.getPortIdResponse =
      await this.abaRegisterGetPortIdService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          nsp: this.response.queryDHCPResponse.nsp,
          vci: this.response.queryDHCPResponse.vci,
          vpi: this.response.queryDHCPResponse.vpi,
        },
        dbConnection,
      );
  }

  private async getABAData(dbConnection: Connection): Promise<void> {
    super.infoLog('getABAData');
    this.response.getABADataResponse =
      await this.abaRegisterGetAbaDataService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          ipAddress: this.dto.ipAddress,
          orderId: this.dto.orderId,
        },
        dbConnection,
      );
  }

  private async checkIp(dbConnection: Connection): Promise<void> {
    super.infoLog('checkIp');
    this.response.checkIpResponse =
      await this.abaRegisterCheckIpService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          dslamportId:
            this.response.getPortIdFromIpResponse.dslamportId ??
            this.response.getPortIdResponse.portId,
          loginInstall: this.dto.loginInstall,
        },
        dbConnection,
      );
  }

  private async getDataFromDslamPortId(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getDataFromDslamPortId');
    this.response.getDataFromDslamPortIdResponse =
      await this.abaRegisterGetDataFromDSLAMPortIdRequestService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          dslamPortId:
            this.response.getPortIdFromIpResponse.dslamportId ??
            this.response.getPortIdResponse.portId,
        },
        dbConnection,
      );
  }

  private async deleteOrder(dbConnection: Connection): Promise<void> {
    super.infoLog('deleteOrder');
    this.response.deleteOrderResponse =
      await this.abaRegisterDeleteOrderService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          dslamPortId:
            this.response.getPortIdFromIpResponse.dslamportId ??
            this.response.getPortIdResponse.portId,
        },
        dbConnection,
      );
  }

  private async getDSLCentralCoIdByDSLAMPortId(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getDSLCentralCoIdByDSLAMPortId');
    this.response.getDSLCentralCoIdByDSLAMPortIdResponse =
      await this.abaRegisterGetDSLCentralCoIdByDSLAMPortIdService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          portId:
            this.response.getPortIdFromIpResponse.dslamportId ??
            this.response.getPortIdResponse.portId,
        },
        dbConnection,
      );
  }

  private async readIABAOrder(dbConnection: Connection): Promise<void> {
    super.infoLog('readIABAOrder');
    this.response.readIABAOrderResponse =
      await this.abaRegisterReadIABAOrderService.execute(
        {
          orderIsAtBoss: this.dto.orderIsAtBoss,
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          ncc: this.getValue(
            this.dto.orderIsAtBoss,
            this.response.getABADataResponse.abancc,
            BossConstants.ZEROS_10,
          ),
          orderId: String(this.dto.orderId),
          customerType: this.getValue(
            this.dto.orderIsAtBoss,
            this.response.getABADataResponse.abaclienttype,
            this.response.getABADataResponse.abaclienttype ?? this.dto.lineType,
          ),
          orderDate: this.response.getABADataResponse?.abaorderdate,
          rack: this.getValue(
            this.dto.orderIsAtBoss,
            String(this.response.getABADataResponse.abarack),
            String(this.response.getDataFromDslamPortIdResponse.abarack),
          ),
          position: this.getValue(
            this.dto.orderIsAtBoss,
            String(this.response.getABADataResponse.abaposition),
            this.response.getDataFromDslamPortIdResponse.abadslamposition,
          ),
          dslamSlot: this.getValue(
            this.dto.orderIsAtBoss,
            this.response.getABADataResponse.abaslot,
            this.response.getDataFromDslamPortIdResponse.abaslot,
          ),
          port: this.getValue(
            this.dto.orderIsAtBoss,
            this.response.getABADataResponse.abaport,
            this.response.getDataFromDslamPortIdResponse.abaport,
          ),
          ad: this.getValue(
            this.dto.orderIsAtBoss,
            this.response.getABADataResponse.abaad,
            this.response.getDataFromDslamPortIdResponse.abaad,
          ),
          adPair: this.getValue(
            this.dto.orderIsAtBoss,
            this.response.getABADataResponse.abaparad,
            this.response.getDataFromDslamPortIdResponse.abapairad,
          ),
          office: null,
          createdBy: null,
          provider: this.response.getDataFromDslamPortIdResponse.abaprovider,
          room: BossConstants.ADSL,
          recursive: BossConstants.ZERO,
          system: null,
          centralPortId:
            this.response.getDSLCentralCoIdByDSLAMPortIdResponse.centralPortId,
          executionDate: null,
          isAutoInstallation: this.dto.isAutoInstallation
            ? BossConstants.ONE
            : BossConstants.ZERO,
        },
        dbConnection,
      );
  }

  private getValue<T>(orderIsAtBoss: boolean, value: T, elseValue: T): T {
    return orderIsAtBoss ? value : elseValue;
  }

  private async updateDslABARegistersWithNotProcessedValue(
    dbConnection: Connection,
  ): Promise<void> {
    await this.updateDslAbaRegistersRawService.errorUpdate(
      {
        areaCode: this.dto.areaCode,
        phoneNumber: this.dto.phoneNumber,
        registerStatus: BossConstants.NOT_PROCESSED,
      },
      dbConnection,
      true,
    );
  }

  // ****************************************************************

  private async callAuditLog(
    dbConnection: Connection,
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
      dbConnection,
    );
  }

  private async getPortIdFlow(
    dbConnection: Connection,
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    super.infoLog('queryDHCP');
    data.queryDHCPResponse = await this.queryDHCP(data);
    super.infoLog('getValidVPI');
    data.getValidVPIResponse = await this.getValidVPI(dbConnection, data);
    await this.getPortId(dbConnection);
    if (ValidationHelper.isDefined(data.getPortIdResponse)) {
      super.infoLog('call dslAuditLogs');
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
        await this.rbeDoesNotExistLog(dbConnection, data);
      }
      await this.setASAPOrderDetail(dbConnection, data);
    } else {
      throw new Error30092Exception(BossConstants.GET_PORT_ID);
    }
  }

  private async rbeDoesNotExistLog(
    dbConnection: Connection,
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    await this.callAuditLog(dbConnection, data, 'RBE no existe');
  }

  private async setASAPOrderDetail(
    dbConnection: Connection,
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    data.getASAPOrderDetailResponse =
      await this.getASAPOrderDetailService.execute({
        areaCode: data.requestDto.areaCode,
        phoneNumber: data.requestDto.phoneNumber,
        orderId: String(data.requestDto.orderId),
      });
    if (
      data.getASAPOrderDetailResponse.CTVSTATUSASCODE !==
      BossConstants.ASAP_ORDER_COMRED_STATUS
    ) {
      throw new ASAPOrderStateIsInvalidException();
    }
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
    dbConnection: Connection,
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
      dbConnection,
      BossConstants.GET_VALID_VPI,
      BossConstants.UTL_PACKAGE,
      parameters,
    );
    return result;
  }

  private async modifyNetworkAccessLog(
    dbConnection: Connection,
    data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  ): Promise<void> {
    await this.callAuditLog(dbConnection, data, 'Modificar Red de Acceso');
  }

  // private async readIABAOrder(
  //   dbConnection,
  //   data: IAbaRegisterValidateTechnicalFeasibilityResponse,
  // ): Promise<IReadIABAOrderResponse> {
  //   const dateTimeOrderDate = data?.getABADataResponse?.abaorderdate
  //     ? DateTime.fromFormat(
  //         data?.getABADataResponse?.abaorderdate,
  //         BossConstants.DEFAULT_DATE_FORMAT,
  //       )
  //     : DateTime.now();
  //   const orderDate = dateTimeOrderDate.isValid
  //     ? dateTimeOrderDate.toJSDate()
  //     : null;
  //   const parameters = {
  //     sz_ncc: OracleHelper.stringBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         data.getABADataResponse.abancc,
  //         BossConstants.ZEROS_10,
  //       ),
  //       10,
  //     ),
  //     sz_areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
  //     sz_phonenumber: OracleHelper.stringBindIn(
  //       data.requestDto.phoneNumber,
  //       16,
  //     ),
  //     orderid: OracleHelper.stringBindIn(String(data.requestDto.orderId), 12),

  //     sz_clienttype: OracleHelper.stringBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         data.getABADataResponse.abaclienttype,
  //         data.getABADataResponse.abaclienttype ?? data.requestDto.lineType,
  //       ),
  //     ),

  //     sz_orderdate: OracleHelper.dateBindIn(orderDate),

  //     sz_rack: OracleHelper.stringBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         String(data.getABADataResponse.abarack),
  //         String(data.getDataFromDslamPortIdResponse.abarack),
  //       ),
  //       2,
  //     ),
  //     sz_position: OracleHelper.stringBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         String(data.getABADataResponse.abaposition),
  //         data.getDataFromDslamPortIdResponse.abadslamposition,
  //       ),
  //       2,
  //     ),
  //     n_dslamslot: OracleHelper.numberBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         data.getABADataResponse.abaslot,
  //         data.getDataFromDslamPortIdResponse.abaslot,
  //       ),
  //     ),
  //     n_port: OracleHelper.numberBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         data.getABADataResponse.abaport,
  //         data.getDataFromDslamPortIdResponse.abaport,
  //       ),
  //     ),
  //     sz_ad: OracleHelper.stringBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         data.getABADataResponse.abaad,
  //         data.getDataFromDslamPortIdResponse.abaad,
  //       ),
  //       5,
  //     ),
  //     sz_adpair: OracleHelper.stringBindIn(
  //       this.getValue(
  //         data.requestDto.orderIsAtBoss,
  //         data.getABADataResponse.abaparad,
  //         data.getDataFromDslamPortIdResponse.abapairad,
  //       ),
  //       4,
  //     ),
  //     sz_office: OracleHelper.stringBindIn(null, 10),
  //     sz_createdby: OracleHelper.stringBindIn(null, 8),
  //     sz_provider: OracleHelper.stringBindIn(
  //       data.getDataFromDslamPortIdResponse.abaprovider,
  //       16,
  //     ),
  //     sz_room: OracleHelper.stringBindIn(BossConstants.ADSL, 32),
  //     // n_recursive: OracleHelper.numberBindIn(BossConstants.ZERO),
  //     sz_sistema: OracleHelper.stringBindIn(null),
  //     iCoid: OracleHelper.stringBindIn(
  //       data.getDSLCentralCoIdByDSLAMPortIdResponse.centralPortId,
  //       10,
  //     ),
  //     i_executiondate: OracleHelper.stringBindIn(null),
  //     i_autoinstall: OracleHelper.numberBindIn(
  //       data.requestDto.isAutoInstallation
  //         ? BossConstants.ONE
  //         : BossConstants.ZERO,
  //     ),

  //     l_errorcode: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   await this.setTimestampFormat(dbConnection);
  //   const result = await super.executeStoredProcedure(
  //     dbConnection,
  //     BossConstants.UTL_PACKAGE,
  //     BossConstants.READ_IABA_ORDER,
  //     parameters,
  //   );
  //   const response: IReadIABAOrderResponse = {
  //     errorCode: (OracleHelper.getFirstItem(result, 'l_errorcode') ??
  //       ReadIABAOrderStatusConstants.GENERAL_DATABASE_ERROR) as ReadIABAOrderStatusConstants,
  //   };
  //   switch (response.errorCode) {
  //     case ReadIABAOrderStatusConstants.SUCCESSFULL:
  //       return response;
  //     case ReadIABAOrderStatusConstants.ASSIGNED_PORT:
  //       throw new ReadIABAOrderAssignedPortException();
  //     case ReadIABAOrderStatusConstants.THE_ORDER_EXISTS:
  //       throw new ReadIABAOrderOrderExistsException();
  //     case ReadIABAOrderStatusConstants.THE_ORDER_ID_OLD:
  //       throw new ReadIABAOrderOrderIsOldException();
  //     case ReadIABAOrderStatusConstants.THE_ORDER_ALREADY_EXISTS_IN_BOSS:
  //       throw new ReadIABAOrderTheOrderAlreadyExistsInBossException();
  //     case ReadIABAOrderStatusConstants.GENERAL_DATABASE_ERROR:
  //       throw new ReadIABAOrderGeneralDatabaseErrorException();
  //     default:
  //       throw new ReadIABAOrderGeneralDatabaseErrorException();
  //   }
  // }

  // private getValue<T>(orderIsAtBoss: boolean, value: T, elseValue: T): T {
  //   return orderIsAtBoss ? value : elseValue;
  // }
}
