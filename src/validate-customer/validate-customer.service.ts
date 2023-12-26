import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CustomerExistsService } from 'src/customer-exists/customer-exists.service';
import { CustomerExistsStatusConstants } from 'src/customer-exists/customer-exists-status.constants';
import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { Error1002Exception } from 'src/exceptions/error-1002.exception';
import { Error30101Exception } from 'src/exceptions/error-3010-1.exception';
import { GetAllValuesFromClientValuesStatusConstants } from './get-all-values-from-client-values/get-all-values-from-client-values-status.constants';
import { GetAllValuesFromClientvaluesInternalErrorException } from './get-all-values-from-client-values/get-all-values-from-client-values-internal-error.exception';
import { GetCustomerClassNameFromIdValueInternalErrorException } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-internal-error.exception';
import { GetCustomerClassNameFromIdValueStatusConstants } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-status.constants';
import { GetCustomerInstanceIdFromIdValueStatusConstants } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-status.constants';
import { GetCustomerInstanceIdFromIdValueInternalErrorException } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-internal-error.exception';
import { GetDebtFromCustomerInternalErrorException } from './get-debt-from-client/get-debt-from-customer-internal-error.exception';
import { GetDebtFromCustomerStatusConstants } from './get-debt-from-client/get-debt-from-customer-status.constants';
import { GetFirstLetterFromABARequestStatusConstants } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-status.constants';
import { GetFirstLetterFromABARequestInternalErrorException } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-internal-error.exception';
import { IGetAllValuesFromClientValuesResponse } from './get-all-values-from-client-values/get-all-values-from-client-values-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetDebtFromCustomerResponse } from './get-debt-from-client/get-debt-from-customer-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidateCustomerData } from './validate-customer-data';
import { ValidateCustomerRequestDto } from './validate-customer-request.dto';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class ValidateCustomerService extends OracleDatabaseService {
  constructor(
    private readonly clientExistsService: CustomerExistsService,
    private readonly dslAuditLogsService: DSLAuditLogsService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async validateCustomer(
    dto: ValidateCustomerRequestDto,
  ): Promise<ValidateCustomerData> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateCustomerService.name,
        method: 'validateCustomer',
      });
      const data = new ValidateCustomerData();
      data.requestDto = dto;
      await super.connect();
      if (BossHelper.isNaturalPerson(dto.customerClassName)) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getClientClassNameFromIdValue',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getClientClassNameFromIdValueResponse =
          await this.getCustomerClassNameFromIdValue(
            BossHelper.getIdentificationDocumentType(dto.customerClassName),
            dto.customerIdentificationDocument,
          );
        if (
          data.getClientClassNameFromIdValueResponse.status !==
          GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL
        ) {
        }
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getFirstLetterFromABARequest',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getFirstLetterFromABARequestResponse =
          await this.getFirstLetterFromABARequest(data);
        if (
          data.getFirstLetterFromABARequestResponse.status ===
          GetFirstLetterFromABARequestStatusConstants.SUCCESSFULL
        ) {
          data.requestDto.customerIdentificationDocument = `${data.getFirstLetterFromABARequestResponse.firstLetter}${data.requestDto.customerIdentificationDocument}`;
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'clientExists',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.clientExistsResponse = await this.clientExistsService.clientExists(
          {
            attributeName: BossHelper.getIdentificationDocumentType(
              dto.customerClassName,
            ),
            attributeValue: dto.customerIdentificationDocument,
          },
        );
        if (
          data.clientExistsResponse.status ===
          CustomerExistsStatusConstants.SUCCESSFULL
        ) {
          dto.customerClassName = data.clientExistsResponse.customerClassName;
        } else {
          // CANTV informa que no se debe llamar esta API. Solo dejar comentario
          // ValidarRifEnSeniat - URL. Invocar SENIAT para validar SOLO RIF. Si falla ignorar el error y cont.
        }
      }
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getAllValuesFromClientValues',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateCustomerService.name,
        method: 'validateCustomer',
      });
      data.getAllValuesFromClientValuesResponse =
        await this.getAllValuesFromClientValues(
          dto.customerClassName,
          BossHelper.getIdentificationDocumentType(dto.customerClassName),
          dto.customerIdentificationDocument,
        );
      if (
        data.getAllValuesFromClientValuesResponse.status ===
        GetAllValuesFromClientValuesStatusConstants.SUCCESSFULL
      ) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getClientInstanceIdFromIdValue',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getClientInstanceIdFromIdValueResponse =
          await this.getClientInstanceIdFromIdValue(
            BossHelper.getIdentificationDocumentType(dto.customerClassName),
            dto.customerIdentificationDocument,
          );
        if (
          data.getClientInstanceIdFromIdValueResponse.status ===
          GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getDebtFromClient',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateCustomerService.name,
            method: 'validateCustomer',
          });
          data.getDebtFromClientResponse = await this.getDebtFromClient(
            data.getClientInstanceIdFromIdValueResponse.customerInstanceId,
          );
          if (
            data.getDebtFromClientResponse.status ===
            GetDebtFromCustomerStatusConstants.SUCCESSFULL
          ) {
            Wlog.instance.info({
              phoneNumber: BossHelper.getPhoneNumber(dto),
              message: 'updateDslABARegisters',
              input: BossHelper.getPhoneNumber(dto),
              clazz: ValidateCustomerService.name,
              method: 'validateCustomer',
            });
            data.updateDslABARegistersResponse =
              await this.updateDslAbaRegistersRawService.execute({
                areaCode: data.requestDto.areaCode,
                phoneNumber: data.requestDto.phoneNumber,
                registerStatus: BossConstants.NOT_PROCESSED,
              });
            throw new Error30101Exception();
          }
        }
      } else {
        if (
          data.getAllValuesFromClientValuesResponse.status !==
          GetAllValuesFromClientValuesStatusConstants.THERE_IS_NO_DATA
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'updateDslABARegisters',
            input: BossHelper.getPhoneNumber(dto),
            clazz: ValidateCustomerService.name,
            method: 'validateCustomer',
          });
          data.updateDslABARegistersResponse =
            await this.updateDslAbaRegistersRawService.execute({
              areaCode: data.requestDto.areaCode,
              phoneNumber: data.requestDto.phoneNumber,
              registerStatus: BossConstants.NOT_PROCESSED,
            });
          throw new Error1002Exception();
        }
      }
      return data;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: BossHelper.getPhoneNumber(dto),
        clazz: ValidateCustomerService.name,
        method: 'validateCustomer',
        error: error,
      });
      await this.updateDslAbaRegistersRawService.errorUpdate({
        areaCode: dto.areaCode,
        phoneNumber: dto.phoneNumber,
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async callAuditLog(
    data: ValidateCustomerData,
    description: string,
  ): Promise<void> {
    await this.dslAuditLogsService.log({
      areaCode: data.requestDto.areaCode,
      phoneNumber: data.requestDto.phoneNumber,
      orderId: data.requestDto.orderId,
      ipAddress: data.requestDto.ipAddress,
      activationLogin: null,
      webPage: null,
      code: null,
      description: description,
      comments: null,
      planName: null,
    });
  }

  private async getAllValuesFromClientValues(
    className: string,
    attributeName: string,
    value: string,
  ): Promise<IGetAllValuesFromClientValuesResponse> {
    const parameters = {
      classname: OracleHelper.stringBindIn(className),
      attrname: OracleHelper.stringBindIn(attributeName),
      avalue: OracleHelper.stringBindIn(value),
      aname: OracleHelper.tableOfStringBindOut(),
      cltvalue: OracleHelper.tableOfStringBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.SIGS_PACKAGE,
      BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
      parameters,
    );
    const response: IGetAllValuesFromClientValuesResponse = {
      name: result?.outBinds?.aname,
      value: result?.outBinds?.cltvalue,
      status: (result?.outBinds?.status ??
        GetAllValuesFromClientValuesStatusConstants.INTERNAL_ERROR) as GetAllValuesFromClientValuesStatusConstants,
    };
    switch (response.status) {
      case GetAllValuesFromClientValuesStatusConstants.SUCCESSFULL:
        return response;
      case GetAllValuesFromClientValuesStatusConstants.INTERNAL_ERROR:
        throw new GetAllValuesFromClientvaluesInternalErrorException();
      case GetAllValuesFromClientValuesStatusConstants.THERE_IS_NO_DATA:
        return response;
      // throw new ClientExistsThereIsNoDataException();
      default:
        throw new GetAllValuesFromClientvaluesInternalErrorException();
    }
  }

  private async getCustomerClassNameFromIdValue(
    customerAttributeName: string,
    value: string,
  ): Promise<IGetCustomerClassNameFromIdValueResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(value, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(
        customerAttributeName,
        256,
      ),
      sz_Cltclassname: OracleHelper.stringBindOut(1),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE,
      parameters,
    );
    const response: IGetCustomerClassNameFromIdValueResponse = {
      clientClassName: result?.outBinds?.sz_Cltclassname,
      status: (result?.outBinds?.o_status ??
        GetCustomerClassNameFromIdValueStatusConstants.ERROR) as GetCustomerClassNameFromIdValueStatusConstants,
    };
    switch (response.status) {
      case GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL:
        return response;
      case GetCustomerClassNameFromIdValueStatusConstants.ERROR:
        throw new GetCustomerClassNameFromIdValueInternalErrorException();
      case GetCustomerClassNameFromIdValueStatusConstants.THERE_IS_NO_DATA:
        // throw new GetCustomerClassNameFromIdValueThereIsNoDataException();
        return response;
      default:
        throw new GetCustomerClassNameFromIdValueInternalErrorException();
    }
  }

  private async getClientInstanceIdFromIdValue(
    customerAttributeName: string,
    value: string,
  ): Promise<IGetCustomerInstanceIdFromIdValueResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(value, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(
        customerAttributeName,
        256,
      ),
      l_cltinstanceid: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
      parameters,
    );
    const response: IGetCustomerInstanceIdFromIdValueResponse = {
      customerInstanceId: result?.outBinds?.l_cltinstanceid,
      status: (result?.outBinds?.status ??
        GetCustomerInstanceIdFromIdValueStatusConstants.INTERNAL_ERROR) as GetCustomerInstanceIdFromIdValueStatusConstants,
    };
    switch (response.status) {
      case GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL:
        return response;
      case GetCustomerInstanceIdFromIdValueStatusConstants.INTERNAL_ERROR:
        throw new GetCustomerInstanceIdFromIdValueInternalErrorException();
      case GetCustomerInstanceIdFromIdValueStatusConstants.THERE_IS_NO_DATA:
        // throw new GetCustomerInstanceIdFromIdValueThereIsNoDataException();
        return response;
      default:
        throw new GetCustomerInstanceIdFromIdValueInternalErrorException();
    }
  }

  private async getFirstLetterFromABARequest(
    data: ValidateCustomerData,
  ): Promise<IGetFirstLetterFromABARequestResponse> {
    const parameters = {
      sz_Areacode: OracleHelper.stringBindIn(data.requestDto.areaCode, 256),
      s_Phonenumber: OracleHelper.stringBindIn(
        data.requestDto.phoneNumber,
        256,
      ),
      sz_FirstLetter: OracleHelper.stringBindOut(1),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
      parameters,
    );
    const response: IGetFirstLetterFromABARequestResponse = {
      firstLetter: result?.outBinds?.sz_FirstLetter,
      status: (result?.outBinds?.o_status ??
        GetFirstLetterFromABARequestStatusConstants.ERROR) as GetFirstLetterFromABARequestStatusConstants,
    };
    switch (response.status) {
      case GetFirstLetterFromABARequestStatusConstants.SUCCESSFULL:
        return response;
      case GetFirstLetterFromABARequestStatusConstants.ERROR:
        throw new GetFirstLetterFromABARequestInternalErrorException();
      case GetFirstLetterFromABARequestStatusConstants.THERE_IS_NO_DATA:
        // throw new GetFirstLetterFromABARequestThereIsNoDataException();
        return response;
      default:
        throw new GetFirstLetterFromABARequestInternalErrorException();
    }
  }

  private async getDebtFromClient(
    customerInstanceId: number,
  ): Promise<IGetDebtFromCustomerResponse> {
    const parameters = {
      l_cltinstanceid: OracleHelper.numberBindIn(customerInstanceId),
      d_Amount: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_DEBT_FROM_CUSTOMER,
      parameters,
    );
    const response: IGetDebtFromCustomerResponse = {
      amount: result?.outBinds?.d_Amount,
      status: (result?.outBinds?.status ??
        GetDebtFromCustomerStatusConstants.INTERNAL_ERROR) as GetDebtFromCustomerStatusConstants,
    };
    switch (response.status) {
      case GetDebtFromCustomerStatusConstants.SUCCESSFULL:
        return response;
      case GetDebtFromCustomerStatusConstants.INTERNAL_ERROR:
        throw new GetDebtFromCustomerInternalErrorException();
      case GetDebtFromCustomerStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetDebtFromCustomerInternalErrorException();
    }
  }
}
