import { Injectable } from '@nestjs/common';
import { ClientExistsStatusConstants } from './client-exists/client-exists-status.constants';
import { ClientExistsInternalErrorException } from './client-exists/client-exists-internal-error.exception';
import { ClientExistsThereIsNoDataException } from './client-exists/client-exists-there-is-no-data.exception';
import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { GetAllValuesFromClientValuesStatusConstants } from './get-all-values-from-client-values/get-all-values-from-client-values-status.constants';
import { GetAllValuesFromClientvaluesInternalErrorException } from './get-all-values-from-client-values/get-all-values-from-client-values-internal-error.exception';
import { GetFirstLetterFromABARequestStatusConstants } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-status.constants';
import { GetFirstLetterFromABARequestInternalErrorException } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-internal-error.exception';
import { GetFirstLetterFromABARequestThereIsNoDataException } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-there-is-no-data.exception';
import { IClientExistsResponse } from './client-exists/client-exists-response.interface';
import { IGetAllValuesFromClientValuesResponse } from './get-all-values-from-client-values/get-all-values-from-client-values-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ValidateClientData } from './validate-client-data';
import { ValidateClientRequestDto } from './validate-client-request.dto';
import { GetClientClassNameFromIdValueInternalErrorException } from './get-client-class-name-from-id-value/get-client-class-name-from-id-value-internal-error.exception';
import { GetClientClassNameFromIdValueThereIsNoDataException } from './get-client-class-name-from-id-value/get-client-class-name-from-id-value-there-is-no-data.exception';
import { IGetClientClassNameFromIdValueResponse } from './get-client-class-name-from-id-value/get-client-class-name-from-id-value-response.interface';
import { GetClientClassNameFromIdValueStatusConstants } from './get-client-class-name-from-id-value/get-client-class-name-from-id-value-status.constants';
import { Error1002Exception } from 'src/exceptions/error-1002.exception';
import { Error30101Exception } from 'src/exceptions/error-3010-1.exception';
import { IGetClientInstanceIdFromIdValueResponse } from './get-client-instance-id-from-id-value/get-client-instance-id-from-id-value-response.interface';
import { GetClientInstanceIdFromIdValueStatusConstants } from './get-client-instance-id-from-id-value/get-client-instance-id-from-id-value-status.constants';
import { GetClientInstanceIdFromIdValueInternalErrorException } from './get-client-instance-id-from-id-value/get-client-instance-id-from-id-value-internal-error.exception';
import { GetClientInstanceIdFromIdValueThereIsNoDataException } from './get-client-instance-id-from-id-value/get-client-instance-id-from-id-value-there-is-no-data.exception';
import { GetDebtFromClientStatusConstants } from './get-debt-from-client/get-debt-from-client-status.constants';
import { IGetDebtFromClientResponse } from './get-debt-from-client/get-debt-from-client-response.interface';
import { GetDebtFromClientInternalErrorException } from './get-debt-from-client/get-debt-from-client-internal-error.exception';
import { GetDebtFromClientThereIsNoDataException } from './get-debt-from-client/get-debt-from-client-there-is-no-data.exception';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers/update-dsl-aba-registers-status.constants';
import { UpdateDslAbaRegistersInternalErrorException } from './update-dsl-aba-registers/update-dsl-aba-registers-internal-error.exception';

@Injectable()
export class ValidateClientService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly dslAuditLogsService: DSLAuditLogsService,
  ) {
    super(oracleConfigurationService);
  }

  async validateClient(
    dto: ValidateClientRequestDto,
  ): Promise<ValidateClientData> {
    try {
      const data = new ValidateClientData();
      data.requestDto = dto;
      await super.connect();
      // TODO: Validar condición: Si IDENTIFICADOR DE CLIENTE ES CEDULA
      if ('Validar condición: Si IDENTIFICADOR DE CLIENTE ES CEDULA') {
        // TODO: Determinar que información se envía
        data.getClientClassNameFromIdValueResponse =
          await this.getClientClassNameFromIdValue(null, null);
        if (
          data.getClientClassNameFromIdValueResponse.status !==
          GetClientClassNameFromIdValueStatusConstants.SUCCESSFULL
        ) {
          // TODO: qué significa: Actualizar en la información de clientes en memoria en el frontend el campo de clase NATURAL
          // TODO: Eliminar los ceros a la izquierda del Campo Identificador de Cliente
          // TODO: Cuál es el Campo Identificador de Cliente
        }
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
        data.clientExistsResponse = await this.clientExists(data);
        // TODO: VALIDAR CONDICIÓN: ClientExists tiene datos
        if (data.clientExistsResponse) {
          // TODO: En qué consiste: Clase de Cliente igual a resultado de Procedimiento53
        } else {
          // TODO: En qué consiste: Calcular Clase de Cliente con Datos de PreOrden
          // TODO: ValidarRifEnSeniat - URL. Invocar SENIAT para validar SOLO RIF. Si falla ignorar el error y cont.
        }
      }
      // TODO: Cuáles son los datos para invocar el SP GetAllValuesFromCltvalues
      data.getAllValuesFromClientValuesResponse =
        await this.getAllValuesFromClientValues(null, null, null);
      if (
        data.getAllValuesFromClientValuesResponse.status ===
        GetAllValuesFromClientValuesStatusConstants.SUCCESSFULL
      ) {
        // TODO: Cuáles son los datos para invocar el SP GetCltInstanceidFromIdValue
        data.getClientInstanceIdFromIdValueResponse =
          await this.getClientInstanceIdFromIdValue(null, null);
        if (
          data.getClientInstanceIdFromIdValueResponse.status ===
          GetClientInstanceIdFromIdValueStatusConstants.SUCCESSFULL
        ) {
          // TODO: Cuáles son los datos para invocar el SP GetDebtFromClient
          data.getDebtFromClientResponse = await this.getDebtFromClient(
            null,
            null,
          );
          if (
            data.getDebtFromClientResponse.status ===
            GetDebtFromClientStatusConstants.SUCCESSFULL
          ) {
            // TODO: UpdateDSLAbaRegister a NO PROCESADO
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
          data.updateDslABARegistersResponse = await this.updateDslABARegisters(
            data,
          );
          throw new Error1002Exception();
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
    data: ValidateClientData,
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
      OracleConstants.SIGS_PACKAGE,
      OracleConstants.GET_ALL_VALUES_FROM_CLIENT_VALUES,
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
  private async getClientClassNameFromIdValue(
    idValue: string,
    clientAttributeName: string,
  ): Promise<IGetClientClassNameFromIdValueResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(idValue, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(clientAttributeName, 256),
      sz_Cltclassname: OracleHelper.stringBindOut(1),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.GET_CLIENT_CLASS_NAME_FROM_ID_VALUE,
      parameters,
    );
    const response: IGetClientClassNameFromIdValueResponse = {
      clientClassName: result?.outBinds?.sz_Cltclassname,
      status: (result?.outBinds?.o_status ??
        GetClientClassNameFromIdValueStatusConstants.ERROR) as GetClientClassNameFromIdValueStatusConstants,
    };
    switch (response.status) {
      case GetClientClassNameFromIdValueStatusConstants.SUCCESSFULL:
        return response;
      case GetClientClassNameFromIdValueStatusConstants.ERROR:
        throw new GetClientClassNameFromIdValueInternalErrorException();
      case GetClientClassNameFromIdValueStatusConstants.THERE_IS_NO_DATA:
        throw new GetClientClassNameFromIdValueThereIsNoDataException();
      default:
        throw new GetClientClassNameFromIdValueInternalErrorException();
    }
  }

  // TODO: Determinar origen del parámetro: idValue
  // TODO: Determinar origen del parámetro: attributeName
  private async getClientInstanceIdFromIdValue(
    idValue: string,
    clientAttributeName: string,
  ): Promise<IGetClientInstanceIdFromIdValueResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(idValue, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(clientAttributeName, 256),
      l_cltinstanceid: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.GET_CLIENT_INSTANCE_ID_FROM_ID_VALUE,
      parameters,
    );
    const response: IGetClientInstanceIdFromIdValueResponse = {
      clientInstanceId: result?.outBinds?.l_cltinstanceid,
      status: (result?.outBinds?.status ??
        GetClientInstanceIdFromIdValueStatusConstants.INTERNAL_ERROR) as GetClientInstanceIdFromIdValueStatusConstants,
    };
    switch (response.status) {
      case GetClientInstanceIdFromIdValueStatusConstants.SUCCESSFULL:
        return response;
      case GetClientInstanceIdFromIdValueStatusConstants.INTERNAL_ERROR:
        throw new GetClientInstanceIdFromIdValueInternalErrorException();
      case GetClientInstanceIdFromIdValueStatusConstants.THERE_IS_NO_DATA:
        throw new GetClientInstanceIdFromIdValueThereIsNoDataException();
      default:
        throw new GetClientInstanceIdFromIdValueInternalErrorException();
    }
  }

  private async clientExists(
    data: ValidateClientData,
  ): Promise<IClientExistsResponse> {
    const parameters = {
      //TODO: Determinar origen del parámetro: sz_attributename
      sz_attributename: OracleHelper.stringBindIn(null),
      //TODO: Determinar origen del parámetro: sz_attributevalue
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      null,
      OracleConstants.CLIENT_EXISTS,
      parameters,
    );
    const response: IClientExistsResponse = {
      status: (result?.outBinds?.status ??
        ClientExistsStatusConstants.INTERNAL_ERROR) as ClientExistsStatusConstants,
    };
    switch (response.status) {
      case ClientExistsStatusConstants.SUCCESSFULL:
        return response;
      case ClientExistsStatusConstants.INTERNAL_ERROR:
        throw new ClientExistsInternalErrorException();
      case ClientExistsStatusConstants.THERE_IS_NO_DATA:
        throw new ClientExistsThereIsNoDataException();
      default:
        throw new ClientExistsInternalErrorException();
    }
  }

  private async getFirstLetterFromABARequest(
    data: ValidateClientData,
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
      OracleConstants.ACT_PACKAGE,
      OracleConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
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
        throw new GetFirstLetterFromABARequestThereIsNoDataException();
      default:
        throw new GetFirstLetterFromABARequestInternalErrorException();
    }
  }

  // TODO: Determinar origen del parámetro: idValue
  // TODO: Determinar origen del parámetro: attributeName
  private async getDebtFromClient(
    idValue: string,
    clientAttributeName: string,
  ): Promise<IGetDebtFromClientResponse> {
    const parameters = {
      sz_IdValue: OracleHelper.stringBindIn(idValue, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(clientAttributeName, 256),
      l_cltinstanceid: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.GET_DEBT_FROM_CLIENT,
      parameters,
    );
    const response: IGetDebtFromClientResponse = {
      clientInstanceId: result?.outBinds?.l_cltinstanceid,
      status: (result?.outBinds?.status ??
        GetDebtFromClientStatusConstants.INTERNAL_ERROR) as GetDebtFromClientStatusConstants,
    };
    switch (response.status) {
      case GetDebtFromClientStatusConstants.SUCCESSFULL:
        return response;
      case GetDebtFromClientStatusConstants.INTERNAL_ERROR:
        throw new GetDebtFromClientInternalErrorException();
      case GetDebtFromClientStatusConstants.THERE_IS_NO_DATA:
        throw new GetDebtFromClientThereIsNoDataException();
      default:
        throw new GetDebtFromClientInternalErrorException();
    }
  }

  private async updateDslABARegisters(
    data: ValidateClientData,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    const parameters = {
      iAreaCode: OracleHelper.stringBindIn(data.requestDto.areaCode, 3),
      iPhoneNumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber, 7),
      // TODO: Determinar origen del campo: iRegisterStatus
      iRegisterStatus: OracleHelper.stringBindIn(null, 16),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.GET_DEBT_FROM_CLIENT,
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
