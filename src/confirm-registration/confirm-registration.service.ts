import { Injectable } from '@nestjs/common';
import { AbaRegisterCustomerExistsService } from 'src/aba-register-flow/step-2/dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterService } from 'src/aba-register-flow/step-4/dependencies/aba-register/aba-register.service';
import { BillingException } from './create-and-provisioning-master-act/billing.exception';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CancelABAInstallationStatusConstants } from './cancel-aba-installation/cancel-aba-installation-status.constants';
import { CancelABAInstallationInternalErrorException } from './cancel-aba-installation/cancel-aba-installation-internal-error.exception';
import { CancelABAInstallationThereIsNoDataException } from './cancel-aba-installation/cancel-aba-installation-there-is-no-data.exception';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { ConfirmRegistrationData } from './confirm-registration-data';
import { ContactAdministratorException } from './create-and-provisioning-master-act/contact-administrator.exception';
import { CreateAndProvisioningCustomerStatusConstants } from './create-and-provisioning-customer/create-and-provisioning-customer-status.constants';
import { CreateAndProvisioningCustomerInternalErrorException } from './create-and-provisioning-customer/create-and-provisioning-customer-internal-error.exception';
import { CreateAndProvisioningMasterActStatusConstants } from './create-and-provisioning-master-act/create-and-provisioning-master-act-status.constants';
import { CreateAndProvisioningMasterActException } from './create-and-provisioning-master-act/create-and-provisioning-master-act.exception';
import { CreateUserInstanceException } from './create-and-provisioning-master-act/create-user-instance.exception';
import { CreatingAccountStatementException } from './create-and-provisioning-master-act/creating-account-statement.exception';
import { CreatingBillingChargeException } from './create-and-provisioning-master-act/creating-billing-charge.exception';
import { CreatingContractException } from './create-and-provisioning-master-act/creating-contract.exception';
import { CreatingDiscountException } from './create-and-provisioning-master-act/creating-discount.exception';
import { CreatingHostingChargeException } from './create-and-provisioning-master-act/creating-hosting-charge.exception';
import { CreatingMasterAccountException } from './create-and-provisioning-master-act/creating-master-account.exception';
import { CreatingPaymentInstanceException } from './create-and-provisioning-master-act/creating-payment-instance.exception';
import { CreatingSubaccountException } from './create-and-provisioning-master-act/creating-subaccount.exception';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
import { Error10041Exception } from 'src/exceptions/error-1004-1.exception';
import { ICancelABAInstallationResponse } from './cancel-aba-installation/cancel-aba-installation-response.interface';
import { ICreateAndProvisioningCustomerResponse } from './create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterActResponse } from './create-and-provisioning-master-act/create-and-provisioning-master-act-response.interface';
import { IGetPlanABAFromKenanResponse } from './get-plan-aba-from-kenan/get-plan-aba-from-kenan-response.interface';
import { IInsertModifyCustomerAttributeResponse } from './insert-modify-customer-attribute/insert-modify-customer-attribute-response.interface';
import { IIsReservedLoginResponse } from './is-reserved-login/is-reserved-login-response.interface';
import { InsertModifyCustomerAttributeStatusConstants } from './insert-modify-customer-attribute/insert-modify-customer-attribute-status.constants';
import { InsertModifyCustomerAttributeInternalErrorException } from './insert-modify-customer-attribute/insert-modify-customer-attribute-internal-error.exception';
import { IsReservedLoginStatusConstants } from './is-reserved-login/is-reserved-login-status.constants';
import { IsReservedLoginInternalErrorException } from './is-reserved-login/is-reserved-login-internal-error.exception';
import { IsReservedLoginThereIsNoDataException } from './is-reserved-login/is-reserved-login-there-is-no-data.exception';
import { LoginAlreadyExistsException } from './create-and-provisioning-master-act/login-already-exists.exception';
import { ObtainingInstanceFromAttributeListException } from './create-and-provisioning-master-act/obtaining-instance-from-attribute-list.exception';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ThereIsNoDataException } from './create-and-provisioning-master-act/there-is-no-data.exception';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class ConfirmRegistrationService extends OracleDatabaseService {
  constructor(
    private readonly abaRegisterService: AbaRegisterService,
    private readonly abaRegisterCustomerExistsService: AbaRegisterCustomerExistsService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async confirmRegistrationFlow(
    dto: ConfirmRegistrationRequestDto,
  ): Promise<ConfirmRegistrationData> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      const data = new ConfirmRegistrationData();
      data.requestDto = dto;
      await super.connect();
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'getPlanAbaFromKenan',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.getPlanAbaFromKenanResponse = await this.getPlanAbaForKenan(data);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica que el cliente existe',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.customerExistsResponse =
        await this.abaRegisterCustomerExistsService.execute({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
          attributeName: BossHelper.getIdentificationDocumentType(
            data.requestDto.customerClassName,
          ),
          attributeValue: data.requestDto.customerIdentificationDocument,
        });
      if (
        data.customerExistsResponse.status ===
        CustomerExistsStatusConstants.SUCCESSFULL
      ) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'createAndProvisioningMasterAct',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ConfirmRegistrationService.name,
          method: 'confirmRegistrationFlow',
        });
        data.createAndProvisioningMasterActResponse =
          await this.createAndProvisioningMasterAct(data);
        if (
          data.createAndProvisioningMasterActResponse.status !==
          CreateAndProvisioningMasterActStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception();
        }
      } else {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'createAndProvisioningCustomer',
          input: BossHelper.getPhoneNumber(dto),
          clazz: ConfirmRegistrationService.name,
          method: 'confirmRegistrationFlow',
        });
        data.createAndProvisioningCustomerResponse =
          await this.createAndProvisioningCustomer(data);
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
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.isReservedLoginResponse = await this.isReservedLogin(data);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'abaRegister',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.abaRegisterResponse = await this.abaRegisterService.execute({
        areaCode: dto.areaCode,
        phoneNumber: dto.phoneNumber,
        dslamPortId: dto.dslamPortId,
        customerServiceId: dto.customerServiceId,
        attributeValues: dto.attributeValues,
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'cancelABAInstallation',
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      data.cancelABAInstallationResponse = await this.cancelABAInstallation(
        data,
      );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
        method: 'confirmRegistrationFlow',
      });
      return data;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: BossHelper.getPhoneNumber(dto),
        clazz: ConfirmRegistrationService.name,
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
      await this.closeConnection();
    }
  }

  private async getPlanAbaForKenan(
    data: ConfirmRegistrationData,
  ): Promise<IGetPlanABAFromKenanResponse> {
    const parameters = {
      abaplan: OracleHelper.stringBindIn(data.requestDto.technicalPlanName),
      result: OracleHelper.stringBindOut(),
    };
    const result = await super.executeFunction(
      BossConstants.GET_PLAN_ABA_FOR_KENAN,
      null,
      parameters,
    );
    const response: IGetPlanABAFromKenanResponse = {
      abaPlanCode: result?.outBinds?.result,
    };
    return response;
  }

  private async createAndProvisioningCustomer(
    data: ConfirmRegistrationData,
  ): Promise<ICreateAndProvisioningCustomerResponse> {
    const parameters = {
      CLASSNAME: OracleHelper.stringBindIn(data.requestDto.customerClassName),
      ATTRVALUES: OracleHelper.stringBindIn(data.requestDto.attributeValues),
      IDATTRIBUTE: OracleHelper.stringBindIn(
        BossHelper.getIdentificationDocumentType(
          data.requestDto.customerClassName,
        ),
      ),
      IDVALUE: OracleHelper.stringBindIn(
        data.requestDto.customerIdentificationDocument,
      ),
      LOGIN: OracleHelper.stringBindIn(
        BossHelper.getAutomaticCustomerUserName(
          data.requestDto.areaCode,
          data.requestDto.phoneNumber,
          data.requestDto.customerIdentificationDocument,
        ),
      ),
      PASSWORD: OracleHelper.stringBindIn(BossConstants.NOT_AVAILABLE),
      PLAN: OracleHelper.stringBindIn(data.requestDto.technicalPlanName), // PlansByClassClient.O_PLANDESIRED
      PAYCLASS: OracleHelper.stringBindIn(BossConstants.CANTV_BILLING),
      PAYATTRVALUES: OracleHelper.stringBindIn(
        BossHelper.getKeyPhoneNumber({
          areaCode: data.requestDto.areaCode,
          phoneNumber: data.requestDto.phoneNumber,
        }),
      ),
      DISCOUNTCATEGORY: OracleHelper.stringBindIn(BossConstants.NORMAL),
      TAXCATEGORY: OracleHelper.stringBindIn(BossConstants.NORMAL),
      SERVICETYPENAME: OracleHelper.stringBindIn(BossConstants.INTERNET_ACCESS),
      USERCLASSNAME: OracleHelper.stringBindIn(BossConstants.USERS),
      USERVALUES: OracleHelper.stringBindIn(data.requestDto.attributeValues),
      DIRECTION1: OracleHelper.stringBindIn(data.requestDto.customerAddress1),
      DIRECTION2: OracleHelper.stringBindIn(data.requestDto.customerAddress2),
      CITY: OracleHelper.stringBindIn(data.requestDto.customerCity),
      STATE: OracleHelper.stringBindIn(data.requestDto.customerState),
      ZIPCODE: OracleHelper.stringBindIn(data.requestDto.zipCode),
      COUNTRY: OracleHelper.stringBindIn(BossConstants.VENEZUELA),
      CREATEDBY: OracleHelper.stringBindIn(BossConstants.REGISTER),
      PAYINST: OracleHelper.stringBindIn(null),
      STATUS: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.SIGS_PACKAGE,
      BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
      parameters,
    );
    const response: ICreateAndProvisioningCustomerResponse = {
      status: (OracleHelper.getFirstItem(result, 'STATUS') ??
        CreateAndProvisioningCustomerStatusConstants.INTERNAL_ERROR) as CreateAndProvisioningCustomerStatusConstants,
    };
    switch (response.status) {
      case CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL:
        return response;
      case CreateAndProvisioningCustomerStatusConstants.INTERNAL_ERROR:
        throw new CreateAndProvisioningCustomerInternalErrorException(result);
      default:
        throw new CreateAndProvisioningCustomerInternalErrorException(result);
    }
  }

  private async createAndProvisioningMasterAct(
    data: ConfirmRegistrationData,
  ): Promise<ICreateAndProvisioningMasterActResponse> {
    const parameters = {
      CLASSNAME: OracleHelper.stringBindIn(data.requestDto.customerClassName),
      IDATTRIBUTE: OracleHelper.stringBindIn(
        BossHelper.getIdentificationDocumentType(
          data.requestDto.customerClassName,
        ),
      ),
      IDVALUE: OracleHelper.stringBindIn(
        data.requestDto.customerIdentificationDocument,
      ),
      LOGIN: OracleHelper.stringBindIn(
        BossHelper.getAutomaticCustomerUserName(
          data.requestDto.areaCode,
          data.requestDto.phoneNumber,
          data.requestDto.customerIdentificationDocument,
        ),
      ),
      PASSWORD: OracleHelper.stringBindIn(BossConstants.NOT_AVAILABLE),
      PLAN: OracleHelper.stringBindIn(data.requestDto.technicalPlanName), // PlansByClassClient.O_PLANDESIRED
      PAYCLASS: OracleHelper.stringBindIn(BossConstants.CANTV_BILLING),
      ATTRVALUES: OracleHelper.stringBindIn(
        BossHelper.getKeyPhoneNumber({
          areaCode: data.requestDto.areaCode,
          phoneNumber: data.requestDto.phoneNumber,
        }),
      ),
      DISCOUNTCATEGORYDSC: OracleHelper.stringBindIn(BossConstants.NORMAL),
      TAXCATEGORYDSC: OracleHelper.stringBindIn(BossConstants.NORMAL),
      SERVICETYPENAME: OracleHelper.stringBindIn(BossConstants.INTERNET_ACCESS),
      USERCLASSNAME: OracleHelper.stringBindIn(BossConstants.USERS),
      USERVALUES: OracleHelper.stringBindIn(data.requestDto.attributeValues),
      DIRECTION1: OracleHelper.stringBindIn(data.requestDto.customerAddress1),
      DIRECTION2: OracleHelper.stringBindIn(
        data.requestDto.customerAddress2 ?? BossConstants.NOT_AVAILABLE,
      ),
      CITY: OracleHelper.stringBindIn(data.requestDto.customerCity),
      STATE: OracleHelper.stringBindIn(data.requestDto.customerState),
      ZIPCODE: OracleHelper.stringBindIn(data.requestDto.zipCode),
      COUNTRY: OracleHelper.stringBindIn(BossConstants.VENEZUELA),
      CREATEDBY: OracleHelper.stringBindIn(BossConstants.REGISTER),
      PAYINST: OracleHelper.stringBindIn(null),
      STATUS: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.SIGS_PACKAGE,
      BossConstants.CREATE_AND_PROVISIONING_MASTER_ACT,
      parameters,
    );
    const response: ICreateAndProvisioningMasterActResponse = {
      status: (OracleHelper.getFirstItem(result, 'STATUS') ??
        CreateAndProvisioningMasterActStatusConstants.ERROR) as CreateAndProvisioningMasterActStatusConstants,
    };
    switch (response.status) {
      case CreateAndProvisioningMasterActStatusConstants.SUCCESSFULL:
        return response;
      case CreateAndProvisioningMasterActStatusConstants.ERROR:
        throw new CreateAndProvisioningMasterActException();
      case CreateAndProvisioningMasterActStatusConstants.LOGIN_ALREADY_EXISTS:
        throw new LoginAlreadyExistsException();
      case CreateAndProvisioningMasterActStatusConstants.CREATE_USER_INSTANCE_ERROR:
        throw new CreateUserInstanceException();
      case CreateAndProvisioningMasterActStatusConstants.OBTAINING_INSTANCE_FROM_ATTRIBUTE_LIST_ERROR:
        throw new ObtainingInstanceFromAttributeListException();
      case CreateAndProvisioningMasterActStatusConstants.BILLING_ERROR:
        throw new BillingException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_MASTER_ACCOUNT_ERROR:
        throw new CreatingMasterAccountException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_ACCOUNT_STATEMENT_ERROR:
        throw new CreatingAccountStatementException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_BILLING_CHARGE_ERROR:
        throw new CreatingBillingChargeException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_HOSTING_CHARGE_ERROR:
        throw new CreatingHostingChargeException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_SUBACCOUNT_ERROR:
        throw new CreatingSubaccountException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_PAYMENT_INSTANCE_ERROR:
        throw new CreatingPaymentInstanceException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_CONTRACT_ERROR:
        throw new CreatingContractException();
      case CreateAndProvisioningMasterActStatusConstants.THERE_IS_NO_DATA_ERROR:
        throw new ThereIsNoDataException();
      case CreateAndProvisioningMasterActStatusConstants.CONTACT_ADMINISTRATOR_ERROR:
        throw new ContactAdministratorException();
      case CreateAndProvisioningMasterActStatusConstants.CREATING_DISCOUNT_ERROR:
        throw new CreatingDiscountException();
      default:
        throw new CreateAndProvisioningMasterActException();
    }
  }

  private async insertModifyCustomerAttribute(
    className: string,
    attributeName: string,
    attributeValue: string,
  ): Promise<IInsertModifyCustomerAttributeResponse> {
    const parameters = {
      i_classname: OracleHelper.stringBindIn(className),
      i_attrname: OracleHelper.stringBindIn(attributeName),
      i_attrvalue: OracleHelper.stringBindIn(attributeValue),
      status: OracleHelper.tableOfStringBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.BOSS_PACKAGE,
      BossConstants.INSERT_MODIFY_CUSTOMER_ATTRIBUTE,
      parameters,
    );
    const response: IInsertModifyCustomerAttributeResponse = {
      status: (OracleHelper.getFirstItem(result, 'status') ??
        InsertModifyCustomerAttributeStatusConstants.INTERNAL_ERROR) as InsertModifyCustomerAttributeStatusConstants,
    };
    switch (response.status) {
      case InsertModifyCustomerAttributeStatusConstants.SUCCESSFULL:
        return response;
      case InsertModifyCustomerAttributeStatusConstants.INTERNAL_ERROR:
        throw new InsertModifyCustomerAttributeInternalErrorException();
      default:
        throw new InsertModifyCustomerAttributeInternalErrorException();
    }
  }

  private async isReservedLogin(
    data: ConfirmRegistrationData,
  ): Promise<IIsReservedLoginResponse> {
    const parameters = {
      sz_Login: OracleHelper.stringBindIn(
        BossHelper.getAutomaticCustomerUserName(
          data.requestDto.areaCode,
          data.requestDto.phoneNumber,
          data.requestDto.customerIdentificationDocument,
        ),
      ),
      l_result: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.IS_RESERVED_LOGIN,
      parameters,
    );
    const response: IIsReservedLoginResponse = {
      result: result?.outBinds?.l_result,
      status: (result?.outBinds?.o_status ??
        IsReservedLoginStatusConstants.INTERNAL_ERROR) as IsReservedLoginStatusConstants,
    };
    switch (response.status) {
      case IsReservedLoginStatusConstants.SUCCESSFULL:
        return response;
      case IsReservedLoginStatusConstants.INTERNAL_ERROR:
        throw new IsReservedLoginInternalErrorException();
      case IsReservedLoginStatusConstants.THERE_IS_NO_DATA:
        throw new IsReservedLoginThereIsNoDataException();
      default:
        throw new IsReservedLoginInternalErrorException();
    }
  }

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

  private async cancelABAInstallation(
    data: ConfirmRegistrationData,
  ): Promise<ICancelABAInstallationResponse> {
    const parameters = {
      contractlogin: OracleHelper.stringBindIn(
        BossHelper.getAutomaticCustomerUserName(
          data.requestDto.areaCode,
          data.requestDto.phoneNumber,
          data.requestDto.customerIdentificationDocument,
        ),
        32,
      ),
      installerlogin: OracleHelper.stringBindIn(
        data.requestDto.installerLogin,
        32,
      ),
      status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.CANCEL_ABA_INSTALLATION,
      parameters,
    );
    const response: ICancelABAInstallationResponse = {
      status: (result?.outBinds?.status ??
        CancelABAInstallationStatusConstants.INTERNAL_ERROR) as CancelABAInstallationStatusConstants,
    };
    switch (response.status) {
      case CancelABAInstallationStatusConstants.SUCCESSFULL:
        return response;
      case CancelABAInstallationStatusConstants.INTERNAL_ERROR:
        throw new CancelABAInstallationInternalErrorException();
      case CancelABAInstallationStatusConstants.THERE_IS_NO_DATA:
        throw new CancelABAInstallationThereIsNoDataException();
      default:
        throw new CancelABAInstallationInternalErrorException();
    }
  }
}
