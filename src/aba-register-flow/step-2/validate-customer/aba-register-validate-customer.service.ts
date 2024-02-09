import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterValidateCustomerRequestDto } from './aba-register-validate-customer-request.dto';
import { IAbaRegisterValidateCustomerResponse } from './aba-register-validate-customer-response.interface';
import { BossConstants } from 'src/boss/boss.constants';
import { BossFlowService } from 'src/boss-flows/boss-flow.service';
import { BossHelper } from 'src/boss/boss.helper';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
import { Error1002Exception } from 'src/exceptions/error-1002.exception';
import { Error30101Exception } from 'src/exceptions/error-3010-1.exception';
import { GetAllValuesFromCustomerValuesRawService } from 'src/raw/stored-procedures/get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAllValuesFromCustomerValuesStatusConstants } from '../../../raw/stored-procedures/get-all-values-from-customer-values/get-all-values-from-customer-values-status.constants';
import { GetCustomerClassNameFromIdValueRawService } from 'src/raw/stored-procedures/get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRawService } from 'src/raw/stored-procedures/get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueStatusConstants } from '../../../raw/stored-procedures/get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-status.constants';
import { GetDebtFromCustomerRawService } from 'src/raw/stored-procedures/get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDebtFromCustomerStatusConstants } from '../../../raw/stored-procedures/get-debt-from-customer/get-debt-from-customer-status.constants';
import { GetFirstLetterFromABARequestRawService } from 'src/raw/stored-procedures/get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetFirstLetterFromABARequestStatusConstants } from '../../../raw/stored-procedures/get-first-letter-from-aba-request/get-first-letter-from-aba-request-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class AbaRegisterValidateCustomerService extends BossFlowService<
  AbaRegisterValidateCustomerRequestDto,
  IAbaRegisterValidateCustomerResponse
> {
  constructor(
    private readonly abaRegisterCustomerExistsService: AbaRegisterCustomerExistsService,
    private readonly getAllValuesFromCustomerValuesRawService: GetAllValuesFromCustomerValuesRawService,
    private readonly getCustomerClassNameFromIdValueRawService: GetCustomerClassNameFromIdValueRawService,
    private readonly getCustomerInstanceIdFromIdValueRawService: GetCustomerInstanceIdFromIdValueRawService,
    private readonly getDebtFromCustomerRawService: GetDebtFromCustomerRawService,
    private readonly getFirstLetterFromABARequestRawService: GetFirstLetterFromABARequestRawService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService, updateDslAbaRegistersRawService);
    super.className = AbaRegisterValidateCustomerService.name;
    super.methodName = BossConstants.VALIDATE_METHOD;
  }

  async validate(
    dto: AbaRegisterValidateCustomerRequestDto,
  ): Promise<IAbaRegisterValidateCustomerResponse> {
    super.infoLog(BossConstants.START);
    this.initialize(dto);
    const dbConnection = await super.connect();
    try {
      if (BossHelper.isNaturalPerson(dto.customerClassName)) {
        await this.getCustomerClassNameFromIdValue(dbConnection);
        // if (
        //   this.response.getCustomerClassNameFromIdValueResponse.status !==
        //   GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL
        // ) {
        // }
        await this.getFirstLetterFromABARequest(dbConnection);
        if (
          this.response.getFirstLetterFromABARequestResponse.status ===
          GetFirstLetterFromABARequestStatusConstants.SUCCESSFULL
        ) {
          this.response.requestDto.customerIdentificationDocument = `${this.response.getFirstLetterFromABARequestResponse.firstLetter}${this.response.requestDto.customerIdentificationDocument}`;
        }
      } else {
        await this.customerExists(dbConnection);
        if (
          this.response.customerExistsResponse.status ===
          CustomerExistsStatusConstants.SUCCESSFULL
        ) {
          dto.customerClassName =
            this.response.customerExistsResponse.customerClassName;
        } else {
          // CANTV informa que no se debe llamar esta API. Solo dejar comentario
          // ValidarRifEnSeniat - URL. Invocar SENIAT para validar SOLO RIF. Si falla ignorar el error y cont.
        }
      }
      await this.getAllValuesFromCustomerValues(dbConnection);
      if (
        this.response.getAllValuesFromCustomerValuesResponse.status ===
        GetAllValuesFromCustomerValuesStatusConstants.SUCCESSFULL
      ) {
        await this.getCustomerInstanceIdFromIdValue(dbConnection);
        if (
          this.response.getCustomerInstanceIdFromIdValueResponse.status ===
          GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL
        ) {
          await this.getDebtFromCustomer(dbConnection);
          if (
            this.response.getDebtFromCustomerResponse.status ===
              GetDebtFromCustomerStatusConstants.SUCCESSFULL &&
            this.response.getDebtFromCustomerResponse.amount >
              BossConstants.ZERO
          ) {
            throw new Error30101Exception(BossConstants.GET_DEBT_FROM_CUSTOMER);
          }
        }
      } else {
        if (
          this.response.getAllValuesFromCustomerValuesResponse.status !==
          GetAllValuesFromCustomerValuesStatusConstants.THERE_IS_NO_DATA
        ) {
          throw new Error1002Exception(
            BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
          );
        }
      }
      super.infoLog(BossConstants.END);
      return this.response;
    } catch (error) {
      super.errorLog(error);
      await this.updateDslABARegistersWithNotProcessedValue(dbConnection);
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection(dbConnection, true);
    }
  }

  private initialize(dto: AbaRegisterValidateCustomerRequestDto): void {
    this.dto = dto;
    this.response = {
      requestDto: dto,
      customerExistsResponse: null,
      getAllValuesFromCustomerValuesResponse: null,
      getCustomerClassNameFromIdValueResponse: null,
      getCustomerInstanceIdFromIdValueResponse: null,
      getFirstLetterFromABARequestResponse: null,
      getDebtFromCustomerResponse: null,
      updateDslABARegistersResponse: null,
    };
  }

  private async getCustomerClassNameFromIdValue(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getClientClassNameFromIdValue');
    this.response.getCustomerClassNameFromIdValueResponse =
      await this.getCustomerClassNameFromIdValueRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          customerAttributeName: BossHelper.getIdentificationDocumentType(
            this.dto.customerClassName,
          ),
          value: this.dto.customerIdentificationDocument,
        },
        dbConnection,
      );
  }

  private async getFirstLetterFromABARequest(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getFirstLetterFromABARequest');
    this.response.getFirstLetterFromABARequestResponse =
      await this.getFirstLetterFromABARequestRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
        },
        dbConnection,
      );
  }

  private async customerExists(dbConnection: Connection): Promise<void> {
    super.infoLog('customerExists');
    this.response.customerExistsResponse =
      await this.abaRegisterCustomerExistsService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          attributeName: BossHelper.getIdentificationDocumentType(
            this.dto.customerClassName,
          ),
          attributeValue: BossHelper.getIdentificationDocument(
            this.dto.customerIdentificationDocument,
          ),
        },
        dbConnection,
      );
  }

  private async getAllValuesFromCustomerValues(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getAllValuesFromCustomerValues');
    this.response.getAllValuesFromCustomerValuesResponse =
      await this.getAllValuesFromCustomerValuesRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          className: this.dto.customerClassName,
          attributeName: BossHelper.getIdentificationDocumentType(
            this.dto.customerClassName,
          ),
          value: BossHelper.getIdentificationDocument(
            this.dto.customerIdentificationDocument,
          ),
        },
        dbConnection,
      );
  }

  private async getCustomerInstanceIdFromIdValue(
    dbConnection: Connection,
  ): Promise<void> {
    super.infoLog('getCustomerInstanceIdFromIdValue');
    this.response.getCustomerInstanceIdFromIdValueResponse =
      await this.getCustomerInstanceIdFromIdValueRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          customerAttributeName: BossHelper.getIdentificationDocumentType(
            this.dto.customerClassName,
          ),
          value: BossHelper.getIdentificationDocument(
            this.dto.customerIdentificationDocument,
          ),
        },
        dbConnection,
      );
  }

  private async getDebtFromCustomer(dbConnection: Connection): Promise<void> {
    super.infoLog('getDebtFromCustomer');
    this.response.getDebtFromCustomerResponse =
      await this.getDebtFromCustomerRawService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          customerInstanceId:
            this.response.getCustomerInstanceIdFromIdValueResponse
              .customerInstanceId,
        },
        dbConnection,
      );
  }

  private async updateDslABARegistersWithNotProcessedValue(
    dbConnection: Connection,
  ): Promise<void> {
    this.response.updateDslABARegistersResponse =
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
}
