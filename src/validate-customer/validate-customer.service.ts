import { Injectable } from '@nestjs/common';
import { CustomerExistsService } from 'src/customer-exists/customer-exists.service';
import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { Error1002Exception } from 'src/exceptions/error-1002.exception';
import { Error30101Exception } from 'src/exceptions/error-3010-1.exception';
import { GetAllValuesFromClientValuesStatusConstants } from './get-all-values-from-client-values/get-all-values-from-client-values-status.constants';
import { GetAllValuesFromClientvaluesInternalErrorException } from './get-all-values-from-client-values/get-all-values-from-client-values-internal-error.exception';
import { GetCustomerClassNameFromIdValueInternalErrorException } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-internal-error.exception';
import { GetCustomerClassNameFromIdValueStatusConstants } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-status.constants';
import { GetCustomerClassNameFromIdValueThereIsNoDataException } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-there-is-no-data.exception';
import { GetCustomerInstanceIdFromIdValueStatusConstants } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-status.constants';
import { GetCustomerInstanceIdFromIdValueInternalErrorException } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-internal-error.exception';
import { GetCustomerInstanceIdFromIdValueThereIsNoDataException } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-there-is-no-data.exception';
import { GetDebtFromCustomerInternalErrorException } from './get-debt-from-client/get-debt-from-customer-internal-error.exception';
import { GetDebtFromCustomerStatusConstants } from './get-debt-from-client/get-debt-from-customer-status.constants';
import { GetDebtFromCustomerThereIsNoDataException } from './get-debt-from-client/get-debt-from-customer-there-is-no-data.exception';
import { GetFirstLetterFromABARequestStatusConstants } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-status.constants';
import { GetFirstLetterFromABARequestInternalErrorException } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-internal-error.exception';
import { GetFirstLetterFromABARequestThereIsNoDataException } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-there-is-no-data.exception';
import { GetOrderIdFromABASalesService } from 'src/get-order-id-from-aba-sales/get-order-id-from-aba-sales.service';
import { IGetAllValuesFromClientValuesResponse } from './get-all-values-from-client-values/get-all-values-from-client-values-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from './get-client-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-client-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetDebtFromCustomerResponse } from './get-debt-from-client/get-debt-from-customer-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers/update-dsl-aba-registers-status.constants';
import { UpdateDslAbaRegistersInternalErrorException } from './update-dsl-aba-registers/update-dsl-aba-registers-internal-error.exception';
import { ValidateCustomerData } from './validate-customer-data';
import { ValidateCustomerRequestDto } from './validate-customer-request.dto';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class ValidateCustomerService extends OracleDatabaseService {
  constructor(
    private readonly clientExistsService: CustomerExistsService,
    private readonly getOrderIdFromABASalesService: GetOrderIdFromABASalesService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly dslAuditLogsService: DSLAuditLogsService,
  ) {
    super(oracleConfigurationService);
  }

  async validateCustomer(
    dto: ValidateCustomerRequestDto,
  ): Promise<ValidateCustomerData> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: ValidateCustomerService.name,
        method: 'validateCustomer',
      });
      const data = new ValidateCustomerData();
      data.requestDto = dto;
      await super.connect();
      // TODO: Validar condición: Si IDENTIFICADOR DE CLIENTE ES CEDULA
      if ('Validar condición: Si IDENTIFICADOR DE CLIENTE ES CEDULA') {
        // TODO: Determinar que información se envía
        Wlog.instance.info({
          message: 'getClientClassNameFromIdValue',
          bindingData: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getClientClassNameFromIdValueResponse =
          await this.getCustomerClassNameFromIdValue(null, null);
        if (
          data.getClientClassNameFromIdValueResponse.status !==
          GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL
        ) {
          // TODO: qué significa: Actualizar en la información de clientes en memoria en el frontend el campo de clase NATURAL
          // TODO: Eliminar los ceros a la izquierda del Campo Identificador de Cliente
          // TODO: Cuál es el Campo Identificador de Cliente
        }
        Wlog.instance.info({
          message: 'getFirstLetterFromABARequest',
          bindingData: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getFirstLetterFromABARequestResponse =
          await this.getFirstLetterFromABARequest(data);
        if (
          data.getFirstLetterFromABARequestResponse.status ===
          GetFirstLetterFromABARequestStatusConstants.SUCCESSFULL
        ) {
          // TODO: Asignar código tipo documento (Procedimiento24.PENDIENTE) al inicio  del identificador del cliente
          // TODO: Cuál es el Campo Identificador de Cliente
        }
      } else {
        // TODO: Determinar origen del parámetro: attributeName
        // TODO: Determinar origen del parámetro: attributeValue
        Wlog.instance.info({
          message: 'clientExists',
          bindingData: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.clientExistsResponse = await this.clientExistsService.clientExists(
          {
            attributeName: null,
            attributeValue: null,
          },
        );
        // TODO: VALIDAR CONDICIÓN: ClientExists tiene datos
        if (data.clientExistsResponse) {
          // TODO: En qué consiste: Clase de Cliente igual a resultado de Procedimiento53
        } else {
          // TODO: En qué consiste: Calcular Clase de Cliente con Datos de PreOrden
          // TODO: ValidarRifEnSeniat - URL. Invocar SENIAT para validar SOLO RIF. Si falla ignorar el error y cont.
        }
      }
      // TODO: Cuáles son los datos para invocar el SP GetAllValuesFromCltvalues
      Wlog.instance.info({
        message: 'getAllValuesFromClientValues',
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: ValidateCustomerService.name,
        method: 'validateCustomer',
      });
      data.getAllValuesFromClientValuesResponse =
        await this.getAllValuesFromClientValues(null, null, null);
      if (
        data.getAllValuesFromClientValuesResponse.status ===
        GetAllValuesFromClientValuesStatusConstants.SUCCESSFULL
      ) {
        // TODO: Cuáles son los datos para invocar el SP GetCltInstanceidFromIdValue
        Wlog.instance.info({
          message: 'getClientInstanceIdFromIdValue',
          bindingData: BossHelper.getPhoneNumber(dto),
          clazz: ValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getClientInstanceIdFromIdValueResponse =
          await this.getClientInstanceIdFromIdValue(null, null);
        if (
          data.getClientInstanceIdFromIdValueResponse.status ===
          GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL
        ) {
          // TODO: Cuáles son los datos para invocar el SP GetDebtFromClient
          Wlog.instance.info({
            message: 'getDebtFromClient',
            bindingData: BossHelper.getPhoneNumber(dto),
            clazz: ValidateCustomerService.name,
            method: 'validateCustomer',
          });
          data.getDebtFromClientResponse = await this.getDebtFromClient(null);
          if (
            data.getDebtFromClientResponse.status ===
            GetDebtFromCustomerStatusConstants.SUCCESSFULL
          ) {
            // TODO: UpdateDSLAbaRegister a NO PROCESADO
            Wlog.instance.info({
              message: 'updateDslABARegisters',
              bindingData: BossHelper.getPhoneNumber(dto),
              clazz: ValidateCustomerService.name,
              method: 'validateCustomer',
            });
            data.updateDslABARegistersResponse =
              await this.updateDslABARegisters(data);
            throw new Error30101Exception();
          }
        }
      } else {
        if (
          data.getAllValuesFromClientValuesResponse.status !==
          GetAllValuesFromClientValuesStatusConstants.THERE_IS_NO_DATA
        ) {
          // TODO: UpdateDSLAbaRegister a NO PROCESADO
          Wlog.instance.info({
            message: 'updateDslABARegisters',
            bindingData: BossHelper.getPhoneNumber(dto),
            clazz: ValidateCustomerService.name,
            method: 'validateCustomer',
          });
          data.updateDslABARegistersResponse = await this.updateDslABARegisters(
            data,
          );
          throw new Error1002Exception();
        }
      }
      return data;
    } catch (error) {
      Wlog.instance.error({
        message: error?.message,
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: ValidateCustomerService.name,
        method: 'validateCustomer',
        error: error,
        stack: error?.stack,
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

  //TODO: Determinar origen del parámetro: classname
  //TODO: Determinar origen del parámetro: attrname
  //TODO: Determinar origen del parámetro: avalue
  private async getAllValuesFromClientValues(
    className: string,
    attributeName: string,
    value: string,
  ): Promise<IGetAllValuesFromClientValuesResponse> {
    const parameters = {
      classname: OracleHelper.stringBindIn(className),
      attrname: OracleHelper.stringBindIn(attributeName),
      avalue: OracleHelper.stringBindIn(value),
      aname: OracleHelper.tableOfStringBindOut(64),
      cltvalue: OracleHelper.tableOfStringBindOut(256),
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

  // TODO: Determinar origen del parámetro: idValue
  // TODO: Determinar origen del parámetro: attributeName
  private async getCustomerClassNameFromIdValue(
    idValue: string,
    clientAttributeName: string,
  ): Promise<IGetCustomerClassNameFromIdValueResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(idValue, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(clientAttributeName, 256),
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

  // TODO: Determinar origen del parámetro: idValue
  // TODO: Determinar origen del parámetro: attributeName
  private async getClientInstanceIdFromIdValue(
    idValue: string,
    clientAttributeName: string,
  ): Promise<IGetCustomerInstanceIdFromIdValueResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(idValue, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(clientAttributeName, 256),
      l_cltinstanceid: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
      parameters,
    );
    const response: IGetCustomerInstanceIdFromIdValueResponse = {
      clientInstanceId: result?.outBinds?.l_cltinstanceid,
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

  // TODO: Determinar origen del parámetro: customerInstanceId
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
        // throw new GetDebtFromCustomerThereIsNoDataException();
        return response;
      default:
        throw new GetDebtFromCustomerInternalErrorException();
    }
  }

  // TODO: Determinar origen del campo: iRegisterStatus
  private async updateDslABARegisters(
    data: ValidateCustomerData,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    const parameters = {
      iAreaCode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber, 7),
      iRegisterStatus: OracleHelper.stringBindIn(null, 16),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ABA_PACKAGE,
      BossConstants.UPDATE_DSL_ABA_REGISTERS,
      parameters,
    );
    const response: IUpdateDslAbaRegistersResponse = {
      status: (result?.outBinds?.status ??
        UpdateDslAbaRegistersStatusConstants.INTERNAL_ERROR) as UpdateDslAbaRegistersStatusConstants,
    };
    switch (response.status) {
      case UpdateDslAbaRegistersStatusConstants.SUCCESSFULL:
        return response;
      case UpdateDslAbaRegistersStatusConstants.INTERNAL_ERROR:
        throw new UpdateDslAbaRegistersInternalErrorException();
      default:
        throw new UpdateDslAbaRegistersInternalErrorException();
    }
  }
}
