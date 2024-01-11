import { Injectable } from '@nestjs/common';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/dependencies/customer-exists/aba-register-customer-exists.service';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
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
      const data = this.initizializeResponse();
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

  private initizializeResponse(): AbaRegisterValidateCustomerData {
    const data = new AbaRegisterValidateCustomerData();
    data.requestDto = null;
    data.clientExistsResponse = null;
    data.getAllValuesFromClientValuesResponse = null;
    data.getClientClassNameFromIdValueResponse = null;
    data.getClientInstanceIdFromIdValueResponse = null;
    data.getFirstLetterFromABARequestResponse = null;
    data.getDebtFromClientResponse = null;
    data.updateDslABARegistersResponse = null;
    return data;
  }
}
