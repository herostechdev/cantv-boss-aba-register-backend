import { Injectable } from '@nestjs/common';
import { AbaRegisterCancelAbaInstallationService } from '../dependencies/cancel-aba-installation/cancel-aba-installation.service';
import { AbaRegisterCreateAndProvisioningCustomerService } from '../dependencies/create-and-provisioning-customer/create-and-provisioning-customer.service';
import { AbaRegisterCreateAndProvisioningMasterAccountService } from '../dependencies/create-and-provisioning-master-account/create-and-provisioning-master-account.service';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/step-2/dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterGetCSIdAndPlanNameFromLoginService } from '../dependencies/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.service';
import { AbaRegisterGetAbaPlanForKenanService } from '../dependencies/get-aba-plan-for-kenan/aba-register-get-aba-plan-for-kenan.service';
import { AbaRegisterIsReservedLoginService } from '../dependencies/is-reserved-login/is-reserved-login.service';
import { AbaRegisterService } from 'src/aba-register-flow/step-4/dependencies/aba-register/aba-register.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
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
        true,
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
            true,
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

  // private async getPlanAbaForKenan(
  //   data: AbaRegisterConfirmRegistrationData,
  // ): Promise<IGetAbaPlanForKenanResponse> {
  //   const parameters = {
  //     abaplan: OracleHelper.stringBindIn(data.requestDto.technicalPlanName),
  //     result: OracleHelper.stringBindOut(),
  //   };
  //   const result = await super.executeFunction(
  //     BossConstants.GET_ABA_PLAN_FOR_KENAN,
  //     null,
  //     parameters,
  //   );
  //   const response: IGetAbaPlanForKenanResponse = {
  //     planCode: result?.outBinds?.result,
  //   };
  //   return response;
  // }

  // private async createAndProvisioningCustomer(
  //   data: AbaRegisterConfirmRegistrationResponse,
  // ): Promise<ICreateAndProvisioningCustomerResponse> {
  //   const parameters = {
  //     CLASSNAME: OracleHelper.stringBindIn(data.requestDto.customerClassName),
  //     ATTRVALUES: OracleHelper.stringBindIn(data.requestDto.attributeValues),
  //     IDATTRIBUTE: OracleHelper.stringBindIn(
  //       BossHelper.getIdentificationDocumentType(
  //         data.requestDto.customerClassName,
  //       ),
  //     ),
  //     IDVALUE: OracleHelper.stringBindIn(
  //       data.requestDto.customerIdentificationDocument,
  //     ),
  //     LOGIN: OracleHelper.stringBindIn(
  //       BossHelper.getAutomaticCustomerUserName(
  //         data.requestDto.areaCode,
  //         data.requestDto.phoneNumber,
  //         data.requestDto.customerIdentificationDocument,
  //       ),
  //     ),
  //     PASSWORD: OracleHelper.stringBindIn(BossConstants.NOT_AVAILABLE),
  //     PLAN: OracleHelper.stringBindIn(data.requestDto.technicalPlanName), // PlansByClassClient.O_PLANDESIRED
  //     PAYCLASS: OracleHelper.stringBindIn(BossConstants.CANTV_BILLING),
  //     PAYATTRVALUES: OracleHelper.stringBindIn(
  //       BossHelper.getKeyPhoneNumber({
  //         areaCode: data.requestDto.areaCode,
  //         phoneNumber: data.requestDto.phoneNumber,
  //       }),
  //     ),
  //     DISCOUNTCATEGORY: OracleHelper.stringBindIn(BossConstants.NORMAL),
  //     TAXCATEGORY: OracleHelper.stringBindIn(BossConstants.NORMAL),
  //     SERVICETYPENAME: OracleHelper.stringBindIn(BossConstants.INTERNET_ACCESS),
  //     USERCLASSNAME: OracleHelper.stringBindIn(BossConstants.USERS),
  //     USERVALUES: OracleHelper.stringBindIn(data.requestDto.attributeValues),
  //     DIRECTION1: OracleHelper.stringBindIn(data.requestDto.customerAddress1),
  //     DIRECTION2: OracleHelper.stringBindIn(data.requestDto.customerAddress2),
  //     CITY: OracleHelper.stringBindIn(data.requestDto.customerCity),
  //     STATE: OracleHelper.stringBindIn(data.requestDto.customerState),
  //     ZIPCODE: OracleHelper.stringBindIn(data.requestDto.zipCode),
  //     COUNTRY: OracleHelper.stringBindIn(BossConstants.VENEZUELA),
  //     CREATEDBY: OracleHelper.stringBindIn(BossConstants.REGISTER),
  //     PAYINST: OracleHelper.stringBindIn(null),
  //     STATUS: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.SIGS_PACKAGE,
  //     BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
  //     parameters,
  //   );
  //   const response: ICreateAndProvisioningCustomerResponse = {
  //     status: (OracleHelper.getFirstItem(result, 'STATUS') ??
  //       CreateAndProvisioningCustomerStatusConstants.ERROR) as CreateAndProvisioningCustomerStatusConstants,
  //   };
  //   switch (response.status) {
  //     case CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL:
  //       return response;
  //     case CreateAndProvisioningCustomerStatusConstants.ERROR:
  //       throw new CreateAndProvisioningCustomerException(result);
  //     default:
  //       throw new CreateAndProvisioningCustomerException(result);
  //   }
  // }

  // private async createAndProvisioningMasterAccount(
  //   data: AbaRegisterConfirmRegistrationResponse,
  //   dbConnection?: Connection,
  // ): Promise<ICreateAndProvisioningMasterAccountResponse> {
  //   const parameters = {
  //     CLASSNAME: OracleHelper.stringBindIn(data.requestDto.customerClassName),
  //     IDATTRIBUTE: OracleHelper.stringBindIn(
  //       BossHelper.getIdentificationDocumentType(
  //         data.requestDto.customerClassName,
  //       ),
  //     ),
  //     IDVALUE: OracleHelper.stringBindIn(
  //       data.requestDto.customerIdentificationDocument,
  //     ),
  //     LOGIN: OracleHelper.stringBindIn(
  //       BossHelper.getAutomaticCustomerUserName(
  //         data.requestDto.areaCode,
  //         data.requestDto.phoneNumber,
  //         data.requestDto.customerIdentificationDocument,
  //       ),
  //     ),
  //     PASSWORD: OracleHelper.stringBindIn(BossConstants.NOT_AVAILABLE),
  //     PLAN: OracleHelper.stringBindIn(data.requestDto.technicalPlanName), // PlansByClassClient.O_PLANDESIRED
  //     PAYCLASS: OracleHelper.stringBindIn(BossConstants.CANTV_BILLING),
  //     ATTRVALUES: OracleHelper.stringBindIn(
  //       BossHelper.getKeyPhoneNumber({
  //         areaCode: data.requestDto.areaCode,
  //         phoneNumber: data.requestDto.phoneNumber,
  //       }),
  //     ),
  //     DISCOUNTCATEGORYDSC: OracleHelper.stringBindIn(BossConstants.NORMAL),
  //     TAXCATEGORYDSC: OracleHelper.stringBindIn(BossConstants.NORMAL),
  //     SERVICETYPENAME: OracleHelper.stringBindIn(BossConstants.INTERNET_ACCESS),
  //     USERCLASSNAME: OracleHelper.stringBindIn(BossConstants.USERS),
  //     USERVALUES: OracleHelper.stringBindIn(data.requestDto.attributeValues),
  //     DIRECTION1: OracleHelper.stringBindIn(data.requestDto.customerAddress1),
  //     DIRECTION2: OracleHelper.stringBindIn(
  //       data.requestDto.customerAddress2 ?? BossConstants.NOT_AVAILABLE,
  //     ),
  //     CITY: OracleHelper.stringBindIn(data.requestDto.customerCity),
  //     STATE: OracleHelper.stringBindIn(data.requestDto.customerState),
  //     ZIPCODE: OracleHelper.stringBindIn(data.requestDto.zipCode),
  //     COUNTRY: OracleHelper.stringBindIn(BossConstants.VENEZUELA),
  //     CREATEDBY: OracleHelper.stringBindIn(BossConstants.REGISTER),
  //     PAYINST: OracleHelper.stringBindIn(null),
  //     STATUS: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.SIGS_PACKAGE,
  //     BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
  //     parameters,
  //     dbConnection,
  //     true,
  //   );
  //   const response: ICreateAndProvisioningMasterAccountResponse = {
  //     status: (OracleHelper.getFirstItem(result, 'STATUS') ??
  //       CreateAndProvisioningMasterAccountStatusConstants.ERROR) as CreateAndProvisioningMasterAccountStatusConstants,
  //   };
  //   switch (response.status) {
  //     case CreateAndProvisioningMasterAccountStatusConstants.SUCCESSFULL:
  //       return response;
  //     case CreateAndProvisioningMasterAccountStatusConstants.ERROR:
  //       throw new CreateAndProvisioningMasterAccountException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.LOGIN_ALREADY_EXISTS:
  //       throw new LoginAlreadyExistsException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATE_USER_INSTANCE_ERROR:
  //       throw new CreateUserInstanceException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.OBTAINING_INSTANCE_FROM_ATTRIBUTE_LIST_ERROR:
  //       throw new ObtainingInstanceFromAttributeListException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.BILLING_ERROR:
  //       throw new BillingException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_MASTER_ACCOUNT_ERROR:
  //       throw new CreatingMasterAccountException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_ACCOUNT_STATEMENT_ERROR:
  //       throw new CreatingAccountStatementException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_BILLING_CHARGE_ERROR:
  //       throw new CreatingBillingChargeException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_HOSTING_CHARGE_ERROR:
  //       throw new CreatingHostingChargeException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_SUBACCOUNT_ERROR:
  //       throw new CreatingSubaccountException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_PAYMENT_INSTANCE_ERROR:
  //       throw new CreatingPaymentInstanceException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_CONTRACT_ERROR:
  //       throw new CreatingContractException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.THERE_IS_NO_DATA_ERROR:
  //       throw new CreateAndProvisioningMasterAccountThereIsNoDataException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CONTACT_ADMINISTRATOR_ERROR:
  //       throw new ContactAdministratorException();
  //     case CreateAndProvisioningMasterAccountStatusConstants.CREATING_DISCOUNT_ERROR:
  //       throw new CreatingDiscountException();
  //     default:
  //       throw new CreateAndProvisioningMasterAccountException();
  //   }
  // }

  // private async insertModifyCustomerAttribute(
  //   className: string,
  //   attributeName: string,
  //   attributeValue: string,
  // ): Promise<IInsertModifyCustomerAttributeResponse> {
  //   const parameters = {
  //     i_classname: OracleHelper.stringBindIn(className),
  //     i_attrname: OracleHelper.stringBindIn(attributeName),
  //     i_attrvalue: OracleHelper.stringBindIn(attributeValue),
  //     status: OracleHelper.tableOfStringBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.BOSS_PACKAGE,
  //     BossConstants.INSERT_MODIFY_CUSTOMER_ATTRIBUTE,
  //     parameters,
  //   );
  //   const response: IInsertModifyCustomerAttributeResponse = {
  //     status: (OracleHelper.getFirstItem(result, 'status') ??
  //       InsertModifyCustomerAttributeStatusConstants.INTERNAL_ERROR) as InsertModifyCustomerAttributeStatusConstants,
  //   };
  //   switch (response.status) {
  //     case InsertModifyCustomerAttributeStatusConstants.SUCCESSFULL:
  //       return response;
  //     case InsertModifyCustomerAttributeStatusConstants.INTERNAL_ERROR:
  //       throw new InsertModifyCustomerAttributeInternalErrorException();
  //     default:
  //       throw new InsertModifyCustomerAttributeInternalErrorException();
  //   }
  // }

  // private async isReservedLogin(
  //   data: AbaRegisterConfirmRegistrationResponse,
  // ): Promise<IIsReservedLoginResponse> {
  //   const parameters = {
  //     sz_Login: OracleHelper.stringBindIn(
  //       BossHelper.getAutomaticCustomerUserName(
  //         data.requestDto.areaCode,
  //         data.requestDto.phoneNumber,
  //         data.requestDto.customerIdentificationDocument,
  //       ),
  //     ),
  //     l_result: OracleHelper.numberBindOut(),
  //     o_status: OracleHelper.numberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.IS_RESERVED_LOGIN,
  //     parameters,
  //   );
  //   const response: IIsReservedLoginResponse = {
  //     result: result?.outBinds?.l_result,
  //     status: (result?.outBinds?.o_status ??
  //       IsReservedLoginStatusConstants.ERROR) as IsReservedLoginStatusConstants,
  //   };
  //   switch (response.status) {
  //     case IsReservedLoginStatusConstants.SUCCESSFULL:
  //       return response;
  //     case IsReservedLoginStatusConstants.ERROR:
  //       throw new IsReservedLoginException();
  //     case IsReservedLoginStatusConstants.THERE_IS_NO_DATA:
  //       throw new IsReservedLoginThereIsNoDataException();
  //     default:
  //       throw new IsReservedLoginException();
  //   }
  // }

  // private async abaRegister(
  //   data: ConfirmRegistrationData,
  // ): Promise<IAbaRegisterResponse> {
  //   const parameters = {
  //     abadslamportid: OracleHelper.stringBindIn(
  //       data.requestDto.installerLogin,
  //       32,
  //     ),
  //     abaclientserviceid: OracleHelper.stringBindIn(null),
  //     abaattrvalues: OracleHelper.stringBindIn(null),
  //     tstatus: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.ABA_REGISTER,
  //     parameters,
  //   );

  //   const response: IAbaRegisterResponse = {
  //     status: (OracleHelper.getFirstItem(result, 'tstatus') ??
  //       AbaRegisterStatusConstants.ERROR) as AbaRegisterStatusConstants,
  //   };
  //   switch (response.status) {
  //     case AbaRegisterStatusConstants.SUCCESSFULL:
  //       return response;
  //     case AbaRegisterStatusConstants.ERROR:
  //       throw new ABARegisterException();
  //     case AbaRegisterStatusConstants.THERE_IS_NO_DATA:
  //       throw new Error10023Exception();
  //     default:
  //       throw new ABARegisterException();
  //   }
  // }

  // private async cancelABAInstallation(
  //   data: AbaRegisterConfirmRegistrationData,
  // ): Promise<ICancelABAInstallationResponse> {
  //   const parameters = {
  //     contractlogin: OracleHelper.stringBindIn(
  //       BossHelper.getAutomaticCustomerUserName(
  //         data.requestDto.areaCode,
  //         data.requestDto.phoneNumber,
  //         data.requestDto.customerIdentificationDocument,
  //       ),
  //       32,
  //     ),
  //     installerlogin: OracleHelper.stringBindIn(
  //       data.requestDto.installerLogin,
  //       32,
  //     ),
  //     status: OracleHelper.tableOfNumberBindOut(),
  //   };
  //   const result = await super.executeStoredProcedure(
  //     BossConstants.ACT_PACKAGE,
  //     BossConstants.CANCEL_ABA_INSTALLATION,
  //     parameters,
  //   );
  //   const response: ICancelABAInstallationResponse = {
  //     status: (result?.outBinds?.status ??
  //       CancelABAInstallationStatusConstants.ERROR) as CancelABAInstallationStatusConstants,
  //   };
  //   switch (response.status) {
  //     case CancelABAInstallationStatusConstants.SUCCESSFULL:
  //       return response;
  //     case CancelABAInstallationStatusConstants.ERROR:
  //       throw new CancelABAInstallationException();
  //     case CancelABAInstallationStatusConstants.THERE_IS_NO_DATA:
  //       throw new CancelABAInstallationThereIsNoDataException();
  //     default:
  //       throw new CancelABAInstallationException();
  //   }
  // }
}
