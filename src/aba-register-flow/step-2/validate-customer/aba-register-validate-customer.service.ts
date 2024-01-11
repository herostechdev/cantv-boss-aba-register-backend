import { Injectable } from '@nestjs/common';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/dependencies/customer-exists/aba-register-customer-exists.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
// import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { Error1002Exception } from 'src/exceptions/error-1002.exception';
import { Error30101Exception } from 'src/exceptions/error-3010-1.exception';
import { GetAllValuesFromCustomerValuesRawService } from 'src/raw/stored-procedures/get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAllValuesFromCustomerValuesStatusConstants } from '../../../raw/stored-procedures/get-all-values-from-customer-values/get-all-values-from-customer-values-status.constants';
import { GetCustomerClassNameFromIdValueRawService } from 'src/raw/stored-procedures/get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerClassNameFromIdValueStatusConstants } from '../../../raw/stored-procedures/get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-status.constants';
import { GetCustomerInstanceIdFromIdValueRawService } from 'src/raw/stored-procedures/get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueStatusConstants } from '../../../raw/stored-procedures/get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-status.constants';
import { GetDebtFromCustomerRawService } from 'src/raw/stored-procedures/get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDebtFromCustomerStatusConstants } from '../../../raw/stored-procedures/get-debt-from-customer/get-debt-from-customer-status.constants';
import { GetFirstLetterFromABARequestRawService } from 'src/raw/stored-procedures/get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetFirstLetterFromABARequestStatusConstants } from '../../../raw/stored-procedures/get-first-letter-from-aba-request/get-first-letter-from-aba-request-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { AbaRegisterValidateCustomerData } from './aba-register-validate-customer-data';
import { AbaRegisterValidateCustomerRequestDto } from './aba-register-validate-customer-request.dto';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterValidateCustomerService extends OracleDatabaseService {
  constructor(
    private readonly abaRegisterCustomerExistsService: AbaRegisterCustomerExistsService,
    // private readonly dslAuditLogsService: DSLAuditLogsService,
    private readonly getAllValuesFromCustomerValuesRawService: GetAllValuesFromCustomerValuesRawService,
    private readonly getCustomerClassNameFromIdValueRawService: GetCustomerClassNameFromIdValueRawService,
    private readonly getCustomerInstanceIdFromIdValueRawService: GetCustomerInstanceIdFromIdValueRawService,
    private readonly getDebtFromCustomerRawService: GetDebtFromCustomerRawService,
    private readonly getFirstLetterFromABARequestRawService: GetFirstLetterFromABARequestRawService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async validate(
    dto: AbaRegisterValidateCustomerRequestDto,
  ): Promise<AbaRegisterValidateCustomerData> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterValidateCustomerService.name,
        method: 'validateCustomer',
      });
      const data = new AbaRegisterValidateCustomerData();
      data.requestDto = dto;
      await super.connect();
      if (BossHelper.isNaturalPerson(dto.customerClassName)) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getClientClassNameFromIdValue',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getClientClassNameFromIdValueResponse =
          await this.getCustomerClassNameFromIdValueRawService.execute({
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            customerAttributeName: BossHelper.getIdentificationDocumentType(
              dto.customerClassName,
            ),
            value: dto.customerIdentificationDocument,
          });
        if (
          data.getClientClassNameFromIdValueResponse.status !==
          GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL
        ) {
        }
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getFirstLetterFromABARequest',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getFirstLetterFromABARequestResponse =
          await this.getFirstLetterFromABARequestRawService.execute({
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
          });
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
          clazz: AbaRegisterValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.clientExistsResponse =
          await this.abaRegisterCustomerExistsService.execute(
            {
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              attributeName: BossHelper.getIdentificationDocumentType(
                dto.customerClassName,
              ),
              attributeValue: dto.customerIdentificationDocument,
            },
            this.dbConnection,
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
        clazz: AbaRegisterValidateCustomerService.name,
        method: 'validateCustomer',
      });
      data.getAllValuesFromClientValuesResponse =
        await this.getAllValuesFromCustomerValuesRawService.execute({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
          className: dto.customerClassName,
          attributeName: BossHelper.getIdentificationDocumentType(
            dto.customerClassName,
          ),
          value: BossHelper.getIdentificationDocument(
            dto.customerIdentificationDocument,
          ),
        });
      if (
        data.getAllValuesFromClientValuesResponse.status ===
        GetAllValuesFromCustomerValuesStatusConstants.SUCCESSFULL
      ) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'getClientInstanceIdFromIdValue',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterValidateCustomerService.name,
          method: 'validateCustomer',
        });
        data.getClientInstanceIdFromIdValueResponse =
          await this.getCustomerInstanceIdFromIdValueRawService.execute({
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            customerAttributeName: BossHelper.getIdentificationDocumentType(
              dto.customerClassName,
            ),
            value: BossHelper.getIdentificationDocument(
              dto.customerIdentificationDocument,
            ),
          });
        if (
          data.getClientInstanceIdFromIdValueResponse.status ===
          GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'getDebtFromClient',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateCustomerService.name,
            method: 'validateCustomer',
          });
          data.getDebtFromClientResponse =
            await this.getDebtFromCustomerRawService.execute({
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              customerInstanceId:
                data.getClientInstanceIdFromIdValueResponse.customerInstanceId,
            });
          if (
            data.getDebtFromClientResponse.status ===
              GetDebtFromCustomerStatusConstants.SUCCESSFULL &&
            data.getDebtFromClientResponse.amount > BossConstants.ZERO
          ) {
            Wlog.instance.info({
              phoneNumber: BossHelper.getPhoneNumber(dto),
              message: 'updateDslABARegisters',
              input: BossHelper.getPhoneNumber(dto),
              clazz: AbaRegisterValidateCustomerService.name,
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
          GetAllValuesFromCustomerValuesStatusConstants.THERE_IS_NO_DATA
        ) {
          Wlog.instance.info({
            phoneNumber: BossHelper.getPhoneNumber(dto),
            message: 'updateDslABARegisters',
            input: BossHelper.getPhoneNumber(dto),
            clazz: AbaRegisterValidateCustomerService.name,
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
        clazz: AbaRegisterValidateCustomerService.name,
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

  // private async callAuditLog(
  //   data: ValidateCustomerData,
  //   description: string,
  // ): Promise<void> {
  //   await this.dslAuditLogsService.log({
  //     areaCode: data.requestDto.areaCode,
  //     phoneNumber: data.requestDto.phoneNumber,
  //     orderId: data.requestDto.orderId,
  //     ipAddress: data.requestDto.ipAddress,
  //     activationLogin: null,
  //     webPage: null,
  //     code: null,
  //     description: description,
  //     comments: null,
  //     planName: null,
  //   });
  // }

  // private async getAllValuesFromCustomerValues(
  //   className: string,
  //   attributeName: string,
  //   value: string,
  // ): Promise<IGetAllValuesFromCustomerValuesResponse> {
  //   const parameters = {
  //     classname: OracleHelper.stringBindIn(className),
  //     attrname: OracleHelper.stringBindIn(attributeName),
  //     avalue: OracleHelper.stringBindIn(value),
  //     aname: OracleHelper.tableOfStringBindOut(),
  //     cltvalue: OracleHelper.tableOfStringBindOut(),
  //     status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.SIGS_PACKAGE,
  //     BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
  //     parameters,
  //   );
  //   const response: IGetAllValuesFromCustomerValuesResponse = {
  //     name: OracleHelper.getFirstItem(result, 'aname'),
  //     value: OracleHelper.getFirstItem(result, 'cltvalue'),
  //     status: (result?.outBinds?.status ??
  //       GetAllValuesFromCustomerValuesStatusConstants.INTERNAL_ERROR) as GetAllValuesFromCustomerValuesStatusConstants,
  //   };
  //   switch (response.status) {
  //     case GetAllValuesFromCustomerValuesStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetAllValuesFromCustomerValuesStatusConstants.INTERNAL_ERROR:
  //       throw new GetAllValuesFromCustomerValuesException();
  //     case GetAllValuesFromCustomerValuesStatusConstants.THERE_IS_NO_DATA:
  //       return response;
  //     // throw new ClientExistsThereIsNoDataException();
  //     default:
  //       throw new GetAllValuesFromCustomerValuesException();
  //   }
  // }

  // private async getCustomerClassNameFromIdValue(
  //   customerAttributeName: string,
  //   value: string,
  // ): Promise<IGetCustomerClassNameFromIdValueResponse> {
  //   const parameters = {
  //     sz_IdValue: OracleHelper.stringBindIn(value, 256),
  //     sz_Cltattributename: OracleHelper.stringBindIn(
  //       customerAttributeName,
  //       256,
  //     ),
  //     sz_Cltclassname: OracleHelper.stringBindOut(1),
  //     o_status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE,
  //     parameters,
  //   );
  //   const response: IGetCustomerClassNameFromIdValueResponse = {
  //     customerClassName: result?.outBinds?.sz_Cltclassname,
  //     status: (result?.outBinds?.o_status ??
  //       GetCustomerClassNameFromIdValueStatusConstants.ERROR) as GetCustomerClassNameFromIdValueStatusConstants,
  //   };
  //   switch (response.status) {
  //     case GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetCustomerClassNameFromIdValueStatusConstants.ERROR:
  //       throw new GetCustomerClassNameFromIdValueException();
  //     case GetCustomerClassNameFromIdValueStatusConstants.THERE_IS_NO_DATA:
  //       return response;
  //     default:
  //       throw new GetCustomerClassNameFromIdValueException();
  //   }
  // }

  // private async getClientInstanceIdFromIdValue(
  //   customerAttributeName: string,
  //   value: string,
  // ): Promise<IGetCustomerInstanceIdFromIdValueResponse> {
  //   const parameters = {
  //     sz_IdValue: OracleHelper.stringBindIn(value, 256),
  //     sz_Cltattributename: OracleHelper.stringBindIn(
  //       customerAttributeName,
  //       256,
  //     ),
  //     l_cltinstanceid: OracleHelper.numberBindOut(),
  //     status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
  //     parameters,
  //   );
  //   const response: IGetCustomerInstanceIdFromIdValueResponse = {
  //     customerInstanceId: result?.outBinds?.l_cltinstanceid,
  //     status: (result?.outBinds?.status ??
  //       GetCustomerInstanceIdFromIdValueStatusConstants.ERROR) as GetCustomerInstanceIdFromIdValueStatusConstants,
  //   };
  //   switch (response.status) {
  //     case GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetCustomerInstanceIdFromIdValueStatusConstants.ERROR:
  //       throw new GetCustomerInstanceIdFromIdValueException();
  //     case GetCustomerInstanceIdFromIdValueStatusConstants.THERE_IS_NO_DATA:
  //       // throw new GetCustomerInstanceIdFromIdValueThereIsNoDataException();
  //       return response;
  //     default:
  //       throw new GetCustomerInstanceIdFromIdValueException();
  //   }
  // }

  // private async getFirstLetterFromABARequest(
  //   data: ValidateCustomerData,
  // ): Promise<IGetFirstLetterFromABARequestResponse> {
  //   const parameters = {
  //     sz_Areacode: OracleHelper.stringBindIn(data.requestDto.areaCode),
  //     s_Phonenumber: OracleHelper.stringBindIn(data.requestDto.phoneNumber),
  //     sz_FirstLetter: OracleHelper.stringBindOut(),
  //     o_status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
  //     parameters,
  //   );
  //   const response: IGetFirstLetterFromABARequestResponse = {
  //     firstLetter: result?.outBinds?.sz_FirstLetter,
  //     status: (result?.outBinds?.o_status ??
  //       GetFirstLetterFromABARequestStatusConstants.ERROR) as GetFirstLetterFromABARequestStatusConstants,
  //   };
  //   switch (response.status) {
  //     case GetFirstLetterFromABARequestStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetFirstLetterFromABARequestStatusConstants.ERROR:
  //       throw new GetFirstLetterFromABARequestInternalErrorException();
  //     case GetFirstLetterFromABARequestStatusConstants.THERE_IS_NO_DATA:
  //       // throw new GetFirstLetterFromABARequestThereIsNoDataException();
  //       return response;
  //     default:
  //       throw new GetFirstLetterFromABARequestInternalErrorException();
  //   }
  // }

  // private async getDebtFromClient(
  //   customerInstanceId: number,
  // ): Promise<IGetDebtFromCustomerResponse> {
  //   const parameters = {
  //     l_cltinstanceid: OracleHelper.numberBindIn(customerInstanceId),
  //     d_Amount: OracleHelper.numberBindOut(),
  //     status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.GET_DEBT_FROM_CUSTOMER,
  //     parameters,
  //   );
  //   const response: IGetDebtFromCustomerResponse = {
  //     amount: result?.outBinds?.d_Amount,
  //     status: (result?.outBinds?.status ??
  //       GetDebtFromCustomerStatusConstants.ERROR) as GetDebtFromCustomerStatusConstants,
  //   };
  //   switch (response.status) {
  //     case GetDebtFromCustomerStatusConstants.SUCCESSFULL:
  //       return response;
  //     case GetDebtFromCustomerStatusConstants.ERROR:
  //       throw new GetDebtFromCustomerException();
  //     case GetDebtFromCustomerStatusConstants.THERE_IS_NO_DATA:
  //       return response;
  //     default:
  //       throw new GetDebtFromCustomerException();
  //   }
  // }
}
