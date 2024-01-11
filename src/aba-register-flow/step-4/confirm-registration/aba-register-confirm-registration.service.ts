import { Injectable } from '@nestjs/common';
import { AbaRegisterCancelAbaInstallationService } from '../../dependencies/cancel-aba-installation/cancel-aba-installation.service';
import { AbaRegisterCreateAndProvisioningCustomerService } from '../../dependencies/create-and-provisioning-customer/create-and-provisioning-customer.service';
import { AbaRegisterCreateAndProvisioningMasterAccountService } from '../../dependencies/create-and-provisioning-master-account/create-and-provisioning-master-account.service';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterGetCSIdAndPlanNameFromLoginService } from '../../dependencies/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.service';
import { AbaRegisterGetAbaPlanForKenanService } from '../../dependencies/get-aba-plan-for-kenan/aba-register-get-aba-plan-for-kenan.service';
import { AbaRegisterIsReservedLoginService } from '../../dependencies/is-reserved-login/is-reserved-login.service';
import { AbaRegisterService } from 'src/aba-register-flow/dependencies/aba-register/aba-register.service';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { AbaRegisterConfirmRegistrationRequestDto } from './aba-register-confirm-registration-request.dto';
import { AbaRegisterConfirmRegistrationResponse } from './aba-register-confirm-registration-response';
import { CreateAndProvisioningCustomerStatusConstants } from '../../../raw/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-status.constants';
import { CreateAndProvisioningMasterAccountStatusConstants } from '../../../raw/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-status.constants';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
import { Error10041Exception } from 'src/exceptions/error-1004-1.exception';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterConfirmRegistrationService extends OracleDatabaseService {
  constructor(
    private readonly abaRegisterCancelAbaInstallationService: AbaRegisterCancelAbaInstallationService,
    private readonly abaRegisterCreateAndProvisioningCustomerService: AbaRegisterCreateAndProvisioningCustomerService,
    private readonly abaRegisterCreateAndProvisioningMasterAccountService: AbaRegisterCreateAndProvisioningMasterAccountService,
    private readonly abaRegisterCustomerExistsService: AbaRegisterCustomerExistsService,
    private readonly abaRegisterGetCSIdAndPlanNameFromLoginService: AbaRegisterGetCSIdAndPlanNameFromLoginService,
    private readonly abaRegisterGetAbaPlanForKenanService: AbaRegisterGetAbaPlanForKenanService,
    private readonly abaRegisterIsReservedLoginService: AbaRegisterIsReservedLoginService,
    private readonly abaRegisterService: AbaRegisterService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: AbaRegisterConfirmRegistrationRequestDto,
  ): Promise<AbaRegisterConfirmRegistrationResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      const data = new AbaRegisterConfirmRegistrationResponse();
      data.requestDto = dto;
      await super.connect();
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getPlanAbaFromKenan',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.getAbaPlanForKenanResponse =
        await this.abaRegisterGetAbaPlanForKenanService.execute(
          {
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            technicalPlanName: dto.technicalPlanName,
          },
          this.dbConnection,
        );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica que el cliente existe',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.customerExistsResponse =
        await this.abaRegisterCustomerExistsService.execute(
          {
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            attributeName: BossHelper.getIdentificationDocumentType(
              data.requestDto.customerClassName,
            ),
            attributeValue: data.requestDto.customerIdentificationDocument,
          },
          this.dbConnection,
        );
      if (
        data.customerExistsResponse.status ===
        CustomerExistsStatusConstants.SUCCESSFULL
      ) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'createAndProvisioningMasterAccount',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterConfirmRegistrationService.name,
          method: 'confirmRegistrationFlow',
        });
        data.createAndProvisioningMasterAccountResponse =
          await this.abaRegisterCreateAndProvisioningMasterAccountService.execute(
            {
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              attributeValues: dto.attributeValues,
              customerAddress1: dto.customerAddress1,
              customerAddress2: dto.customerAddress2,
              customerCity: dto.customerCity,
              customerClassName: dto.customerClassName,
              customerIdentificationDocument:
                dto.customerIdentificationDocument,
              customerState: dto.customerState,
              technicalPlanName: dto.technicalPlanName,
              zipCode: dto.zipCode,
            },
            this.dbConnection,
          );
        if (
          data.createAndProvisioningMasterAccountResponse.status !==
          CreateAndProvisioningMasterAccountStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception();
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'createAndProvisioningCustomer',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterConfirmRegistrationService.name,
          method: 'confirmRegistrationFlow',
        });
        data.createAndProvisioningCustomerResponse =
          await this.abaRegisterCreateAndProvisioningCustomerService.execute(
            {
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              attributeValues: dto.attributeValues,
              customerAddress1: dto.customerAddress1,
              customerAddress2: dto.customerAddress2,
              customerCity: dto.customerCity,
              customerClassName: dto.customerClassName,
              customerIdentificationDocument:
                dto.customerIdentificationDocument,
              customerState: dto.customerState,
              technicalPlanName: dto.technicalPlanName,
              zipCode: dto.zipCode,
            },
            this.dbConnection,
          );
        if (
          data.createAndProvisioningCustomerResponse.status !==
          CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception();
        }
      }
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'isReservedLogin',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.isReservedLoginResponse =
        await this.abaRegisterIsReservedLoginService.execute(
          {
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            login: BossHelper.getAutomaticCustomerUserName(
              dto.areaCode,
              dto.phoneNumber,
              dto.customerIdentificationDocument,
            ),
          },
          this.dbConnection,
        );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'abaRegisterGetCSIdAndPlanNameFromLogin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.getCSIdAndPlanNameFromLoginResponse =
        await this.abaRegisterGetCSIdAndPlanNameFromLoginService.execute(
          {
            areaCode: dto.areaCode,
            phoneNumber: dto.phoneNumber,
            login: BossHelper.getAutomaticCustomerUserName(
              data.requestDto.areaCode,
              data.requestDto.phoneNumber,
              data.requestDto.customerIdentificationDocument,
            ),
          },
          this.dbConnection,
        );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'abaRegister',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.abaRegisterResponse = await this.abaRegisterService.execute(
        {
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
          dslamPortId: dto.dslamPortId,
          customerServiceId:
            data.getCSIdAndPlanNameFromLoginResponse.customerServiceId,
        },
        this.dbConnection,
        false,
      );
      if (dto.isAutoInstallation === true) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'cancelABAInstallation',
          input: BossHelper.getPhoneNumber(dto),
          clazz: AbaRegisterConfirmRegistrationService.name,
          method: 'confirmRegistrationFlow',
        });
        data.cancelABAInstallationResponse =
          await this.abaRegisterCancelAbaInstallationService.execute(
            {
              areaCode: dto.areaCode,
              phoneNumber: dto.phoneNumber,
              customerIdentificationDocument:
                dto.customerIdentificationDocument,
              installerLogin: dto.installerLogin,
            },
            this.dbConnection,
            false,
          );
      }
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'updateDslAbaRegistersService',
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      await this.updateDslAbaRegistersService.execute(
        {
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
          registerStatus: BossConstants.PROCESSED,
        },
        this.dbConnection,
      );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      return data;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: BossHelper.getPhoneNumber(dto),
        clazz: AbaRegisterConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
        error: error,
      });
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: dto.areaCode,
        phoneNumber: dto.phoneNumber,
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      console.log();
      console.log('invoke   closeConnection');
      await this.closeConnection();
    }
  }
}
