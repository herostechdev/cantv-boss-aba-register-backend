import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { AbaRegisterPayAbaInstallationService } from '../../dependencies/pay-aba-installation/pay-aba-installation.service';
import { AbaRegisterCreateAndProvisioningCustomerService } from '../../dependencies/create-and-provisioning-customer/create-and-provisioning-customer.service';
import { AbaRegisterCreateAndProvisioningMasterAccountService } from '../../dependencies/create-and-provisioning-master-account/create-and-provisioning-master-account.service';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterGetCSIdAndPlanNameFromLoginService } from '../../dependencies/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.service';
import { AbaRegisterGetAbaPlanForKenanService } from '../../dependencies/get-aba-plan-for-kenan/aba-register-get-aba-plan-for-kenan.service';
import { AbaRegisterIsReservedLoginService } from '../../dependencies/is-reserved-login/is-reserved-login.service';
import { AbaRegisterMailService } from 'src/aba-register-flow/dependencies/mail/aba-register-mail.service';
import { AbaRegisterService } from 'src/aba-register-flow/dependencies/aba-register/aba-register.service';
import { AbaRegisterConfirmRegistrationRequestDto } from './aba-register-confirm-registration-request.dto';
import { BossFlowService } from 'src/boss-flows/boss-flow.service';
import { IAbaRegisterConfirmRegistrationResponse } from './aba-register-confirm-registration-response.interface';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { CreateAndProvisioningCustomerStatusConstants } from '../../../raw/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-status.constants';
import { CreateAndProvisioningMasterAccountStatusConstants } from '../../../raw/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-status.constants';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
import { Error10041Exception } from 'src/exceptions/error-1004-1.exception';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class AbaRegisterConfirmRegistrationService extends BossFlowService<
  AbaRegisterConfirmRegistrationRequestDto,
  IAbaRegisterConfirmRegistrationResponse
> {
  constructor(
    private readonly abaRegisterPayAbaInstallationService: AbaRegisterPayAbaInstallationService,
    private readonly abaRegisterCreateAndProvisioningCustomerService: AbaRegisterCreateAndProvisioningCustomerService,
    private readonly abaRegisterCreateAndProvisioningMasterAccountService: AbaRegisterCreateAndProvisioningMasterAccountService,
    private readonly abaRegisterCustomerExistsService: AbaRegisterCustomerExistsService,
    private readonly abaRegisterGetCSIdAndPlanNameFromLoginService: AbaRegisterGetCSIdAndPlanNameFromLoginService,
    private readonly abaRegisterGetAbaPlanForKenanService: AbaRegisterGetAbaPlanForKenanService,
    private readonly abaRegisterIsReservedLoginService: AbaRegisterIsReservedLoginService,
    private readonly abaRegisterMailService: AbaRegisterMailService,
    private readonly abaRegisterService: AbaRegisterService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService, updateDslAbaRegistersRawService);
    // super.className = AbaRegisterConfirmRegistrationService.name;
    // super.methodName = BossConstants.CONFIRM_METHOD;
    this.wlog.className = AbaRegisterConfirmRegistrationService.name;
    this.wlog.methodName = BossConstants.EXECUTE_METHOD;
  }

  async confirm(
    dto: AbaRegisterConfirmRegistrationRequestDto,
  ): Promise<IAbaRegisterConfirmRegistrationResponse> {
    this.wlog.info(BossConstants.START);
    this.initialize(dto);
    const dbConnection = await super.connect();
    try {
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'getPlanAbaFromKenan',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterConfirmRegistrationService.name,
      //   method: 'confirmRegistrationFlow',
      // });
      // data.getAbaPlanForKenanResponse =
      //   await this.abaRegisterGetAbaPlanForKenanService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //       technicalPlanName: dto.technicalPlanName,
      //     },
      //     dbConnection,
      //   );
      await this.getAbaPlanForKenan(dbConnection);
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'Verifica que el cliente existe',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterConfirmRegistrationService.name,
      //   method: 'confirmRegistrationFlow',
      // });
      // data.customerExistsResponse =
      //   await this.abaRegisterCustomerExistsService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //       attributeName: BossHelper.getIdentificationDocumentType(
      //         data.requestDto.customerClassName,
      //       ),
      //       attributeValue: data.requestDto.customerIdentificationDocument,
      //     },
      //     dbConnection,
      //   );
      await this.customerExists(dbConnection);
      if (
        this.response.customerExistsResponse.status ===
        CustomerExistsStatusConstants.SUCCESSFULL
      ) {
        // Wlog.instance.info({
        //   phoneNumber: BossHelper.getPhoneNumber(dto),
        //   message: 'createAndProvisioningMasterAccount',
        //   input: BossHelper.getPhoneNumber(dto),
        //   clazz: AbaRegisterConfirmRegistrationService.name,
        //   method: 'confirmRegistrationFlow',
        // });
        // data.createAndProvisioningMasterAccountResponse =
        //   await this.abaRegisterCreateAndProvisioningMasterAccountService.execute(
        //     {
        //       areaCode: dto.areaCode,
        //       phoneNumber: dto.phoneNumber,
        //       attributeValues: dto.attributeValues,
        //       customerAddress1: dto.customerAddress1,
        //       customerAddress2: dto.customerAddress2,
        //       customerCity: dto.customerCity,
        //       customerClassName: dto.customerClassName,
        //       customerIdentificationDocument:
        //         dto.customerIdentificationDocument,
        //       customerState: dto.customerState,
        //       technicalPlanName: dto.technicalPlanName,
        //       zipCode: dto.zipCode ?? BossConstants.NOT_AVAILABLE,
        //     },
        //     dbConnection,
        //   );
        await this.createAndProvisioningMasterAccount(dbConnection);
        if (
          this.response.createAndProvisioningMasterAccountResponse.status !==
          CreateAndProvisioningMasterAccountStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception(
            BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
          );
        }
      } else {
        // Wlog.instance.info({
        //   phoneNumber: BossHelper.getPhoneNumber(dto),
        //   message: 'createAndProvisioningCustomer',
        //   input: BossHelper.getPhoneNumber(dto),
        //   clazz: AbaRegisterConfirmRegistrationService.name,
        //   method: 'confirmRegistrationFlow',
        // });
        // data.createAndProvisioningCustomerResponse =
        //   await this.abaRegisterCreateAndProvisioningCustomerService.execute(
        //     {
        //       areaCode: dto.areaCode,
        //       phoneNumber: dto.phoneNumber,
        //       attributeValues: dto.attributeValues,
        //       customerAddress1: dto.customerAddress1,
        //       customerAddress2: dto.customerAddress2,
        //       customerCity: dto.customerCity,
        //       customerClassName: dto.customerClassName,
        //       customerIdentificationDocument:
        //         dto.customerIdentificationDocument,
        //       customerState: dto.customerState,
        //       technicalPlanName: dto.technicalPlanName,
        //       zipCode: dto.zipCode ?? BossConstants.NOT_AVAILABLE,
        //     },
        //     dbConnection,
        //   );
        await this.createAndProvisioningCustomer(dbConnection);
        if (
          this.response.createAndProvisioningCustomerResponse.status !==
          CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception(
            BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
          );
        }
      }
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'isReservedLogin',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterConfirmRegistrationService.name,
      //   method: 'confirmRegistrationFlow',
      // });
      // data.isReservedLoginResponse =
      //   await this.abaRegisterIsReservedLoginService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //       login: BossHelper.getAutomaticCustomerUserName(
      //         dto.areaCode,
      //         dto.phoneNumber,
      //         dto.customerIdentificationDocument,
      //       ),
      //     },
      //     dbConnection,
      //   );
      await this.isReservedLogin(dbConnection);
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'abaRegisterGetCSIdAndPlanNameFromLogin',
      //   input: JSON.stringify(dto),
      //   clazz: AbaRegisterConfirmRegistrationService.name,
      //   method: 'confirmRegistrationFlow',
      // });
      // data.getCSIdAndPlanNameFromLoginResponse =
      //   await this.abaRegisterGetCSIdAndPlanNameFromLoginService.execute(
      //     {
      //       areaCode: dto.areaCode,
      //       phoneNumber: dto.phoneNumber,
      //       login: BossHelper.getAutomaticCustomerUserName(
      //         data.requestDto.areaCode,
      //         data.requestDto.phoneNumber,
      //         data.requestDto.customerIdentificationDocument,
      //       ),
      //     },
      //     dbConnection,
      //   );
      await this.getCSIdAndPlanNameFromLogin(dbConnection);
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'abaRegister',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterConfirmRegistrationService.name,
      //   method: 'confirmRegistrationFlow',
      // });
      // data.abaRegisterResponse = await this.abaRegisterService.execute(
      //   {
      //     areaCode: dto.areaCode,
      //     phoneNumber: dto.phoneNumber,
      //     dslamPortId: dto.dslamPortId,
      //     customerServiceId:
      //       data.getCSIdAndPlanNameFromLoginResponse.customerServiceId,
      //   },
      //   dbConnection,
      //   false,
      // );
      await this.abaRegister(dbConnection);
      if (dto.isAutoInstallation === true) {
        // Wlog.instance.info({
        //   phoneNumber: BossHelper.getPhoneNumber(dto),
        //   message: 'cancelABAInstallation',
        //   input: BossHelper.getPhoneNumber(dto),
        //   clazz: AbaRegisterConfirmRegistrationService.name,
        //   method: 'confirmRegistrationFlow',
        // });
        // data.cancelABAInstallationResponse =
        //   await this.abaRegisterCancelAbaInstallationService.execute(
        //     {
        //       areaCode: dto.areaCode,
        //       phoneNumber: dto.phoneNumber,
        //       customerIdentificationDocument:
        //         dto.customerIdentificationDocument,
        //       installerLogin: dto.installerLogin ?? BossConstants.REGISTER,
        //     },
        //     dbConnection,
        //     false,
        //   );
        await this.payAbaInstallation(dbConnection);
      }
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'updateDslAbaRegistersService',
      //   input: BossHelper.getPhoneNumber(dto),
      //   clazz: AbaRegisterConfirmRegistrationService.name,
      //   method: 'confirmRegistrationFlow',
      // });
      // await this.updateDslAbaRegistersService.execute(
      //   {
      //     areaCode: dto.areaCode,
      //     phoneNumber: dto.phoneNumber,
      //     registerStatus: BossConstants.PROCESSED,
      //   },
      //   dbConnection,
      // );
      await this.updateDslAbaRegistersWithProcessedValue(dbConnection);
      this.wlog.info(BossConstants.END);

      // TODO: send mail notifications
      // TODO: Add mail configurations (enable send mail notifications)
      // await this.sendOkNotification();
      return this.response;
    } catch (error) {
      this.wlog.error(error);
      // TODO: send mail notifications
      // TODO: Add mail configurations (enable send mail notifications)
      // await this.sendNotOkNotification();
      await this.updateDslABARegistersWithNotProcessedValue(dbConnection);
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection(dbConnection, true);
    }
  }

  private initialize(dto: AbaRegisterConfirmRegistrationRequestDto): void {
    this.dto = dto;
    this.response = {
      requestDto: dto,
      getAbaPlanForKenanResponse: null,
      customerExistsResponse: null,
      createAndProvisioningCustomerResponse: null,
      createAndProvisioningMasterAccountResponse: null,
      isReservedLoginResponse: null,
      abaRegisterResponse: null,
      cancelABAInstallationResponse: null,
      getCSIdAndPlanNameFromLoginResponse: null,
    };
  }

  private async getAbaPlanForKenan(dbConnection: Connection): Promise<void> {
    this.wlog.info('getPlanAbaFromKenan');
    this.response.getAbaPlanForKenanResponse =
      await this.abaRegisterGetAbaPlanForKenanService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          technicalPlanName: this.dto.technicalPlanName,
        },
        dbConnection,
      );
  }

  private async customerExists(dbConnection: Connection): Promise<void> {
    this.wlog.info('Verifica que el cliente existe');
    this.response.customerExistsResponse =
      await this.abaRegisterCustomerExistsService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          attributeName: BossHelper.getIdentificationDocumentType(
            this.dto.customerClassName,
          ),
          attributeValue: this.dto.customerIdentificationDocument,
        },
        dbConnection,
      );
  }

  private async createAndProvisioningMasterAccount(
    dbConnection: Connection,
  ): Promise<void> {
    this.wlog.info('createAndProvisioningMasterAccount');
    this.response.createAndProvisioningMasterAccountResponse =
      await this.abaRegisterCreateAndProvisioningMasterAccountService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          attributeValues: this.dto.attributeValues,
          customerAddress1: this.dto.customerAddress1,
          customerAddress2: this.dto.customerAddress2,
          customerCity: this.dto.customerCity,
          customerClassName: this.dto.customerClassName,
          customerIdentificationDocument:
            this.dto.customerIdentificationDocument,
          customerState: this.dto.customerState,
          technicalPlanName: this.dto.technicalPlanName,
          zipCode: this.dto.zipCode ?? BossConstants.NOT_AVAILABLE,
        },
        dbConnection,
      );
  }

  private async createAndProvisioningCustomer(
    dbConnection: Connection,
  ): Promise<void> {
    this.wlog.info('createAndProvisioningCustomer');
    this.response.createAndProvisioningCustomerResponse =
      await this.abaRegisterCreateAndProvisioningCustomerService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          attributeValues: this.dto.attributeValues,
          customerAddress1: this.dto.customerAddress1,
          customerAddress2: this.dto.customerAddress2,
          customerCity: this.dto.customerCity,
          customerClassName: this.dto.customerClassName,
          customerIdentificationDocument:
            this.dto.customerIdentificationDocument,
          customerState: this.dto.customerState,
          technicalPlanName: this.dto.technicalPlanName,
          zipCode: this.dto.zipCode ?? BossConstants.NOT_AVAILABLE,
        },
        dbConnection,
      );
  }

  private async isReservedLogin(dbConnection: Connection): Promise<void> {
    this.wlog.info('isReservedLogin');
    this.response.isReservedLoginResponse =
      await this.abaRegisterIsReservedLoginService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          login: BossHelper.getAutomaticCustomerUserName(
            this.dto.areaCode,
            this.dto.phoneNumber,
            this.dto.customerIdentificationDocument,
          ),
        },
        dbConnection,
      );
  }

  private async getCSIdAndPlanNameFromLogin(
    dbConnection: Connection,
  ): Promise<void> {
    this.wlog.info('abaRegisterGetCSIdAndPlanNameFromLogin');
    this.response.getCSIdAndPlanNameFromLoginResponse =
      await this.abaRegisterGetCSIdAndPlanNameFromLoginService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          login: BossHelper.getAutomaticCustomerUserName(
            this.dto.areaCode,
            this.dto.phoneNumber,
            this.dto.customerIdentificationDocument,
          ),
        },
        dbConnection,
      );
  }

  private async abaRegister(dbConnection: Connection): Promise<void> {
    this.wlog.info('abaRegister');
    this.response.abaRegisterResponse = await this.abaRegisterService.execute(
      {
        areaCode: this.dto.areaCode,
        phoneNumber: this.dto.phoneNumber,
        dslamPortId: this.dto.dslamPortId,
        customerServiceId:
          this.response.getCSIdAndPlanNameFromLoginResponse.customerServiceId,
      },
      dbConnection,
    );
  }

  private async payAbaInstallation(dbConnection: Connection): Promise<void> {
    this.wlog.info('payABAInstallation');
    this.response.cancelABAInstallationResponse =
      await this.abaRegisterPayAbaInstallationService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          customerIdentificationDocument:
            this.dto.customerIdentificationDocument,
          installerLogin: this.dto.installerLogin ?? BossConstants.REGISTER,
        },
        dbConnection,
      );
  }

  private async updateDslAbaRegistersWithProcessedValue(
    dbConnection: Connection,
  ): Promise<void> {
    this.wlog.info('updateDslAbaRegistersService');
    await this.updateDslAbaRegistersRawService.execute(
      {
        areaCode: this.dto.areaCode,
        phoneNumber: this.dto.phoneNumber,
        registerStatus: BossConstants.PROCESSED,
      },
      dbConnection,
    );
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

  private async sendOkNotification(): Promise<void> {
    await this.abaRegisterMailService.okNotification({
      areaCode: this.dto.areaCode,
      phoneNumber: this.dto.phoneNumber,
    });
  }

  private async sendNotOkNotification(): Promise<void> {
    await this.abaRegisterMailService.notOkNotification({
      areaCode: this.dto.areaCode,
      phoneNumber: this.dto.phoneNumber,
    });
  }
}
