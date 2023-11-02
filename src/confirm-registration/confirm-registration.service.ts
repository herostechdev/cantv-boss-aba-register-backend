import { Injectable } from '@nestjs/common';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { ConfirmRegistrationData } from './confirm-registration-data';
import { CreateAndProvisioningCustomerStatusConstants } from './create-and-provisioning-customer/create-and-provisioning-customer-status.constants';
import { CreateAndProvisioningCustomerInternalErrorException } from './create-and-provisioning-customer/create-and-provisioning-customer-internal-error.exception';
import { CreateAndProvisioningMasterActStatusConstants } from './create-and-provisioning-master-act/create-and-provisioning-master-act-status.constants';
import { CreateAndProvisioningMasterActInternalErrorException } from './create-and-provisioning-master-act/create-and-provisioning-master-act-internal-error.exception';
import { CustomerExistsService } from 'src/customer-exists/customer-exists.service';
import { CustomerExistsStatusConstants } from 'src/customer-exists/customer-exists-status.constants';
import { Error10022Exception } from 'src/exceptions/error-1002-2.exception';
import { Error10041Exception } from 'src/exceptions/error-1004-1.exception';
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
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { IABARegisterResponse } from './aba-register/aba-register-response.interface';
import { ABARegisterStatusConstants } from './aba-register/aba-register-status.constants';
import { ABARegisterInternalErrorException } from './aba-register/aba-register-internal-error.exception';
import { ABARegisterThereIsNoDataException } from './aba-register/aba-register-there-is-no-data.exception';
import { ABARegisterOccupiedPortException } from './aba-register/aba-register-occupied-port.exception';
import { ICancelABAInstallationResponse } from './cancel-aba-installation/cancel-aba-installation-response.interface';
import { CancelABAInstallationStatusConstants } from './cancel-aba-installation/cancel-aba-installation-status.constants';
import { CancelABAInstallationInternalErrorException } from './cancel-aba-installation/cancel-aba-installation-internal-error.exception';
import { CancelABAInstallationThereIsNoDataException } from './cancel-aba-installation/cancel-aba-installation-there-is-no-data.exception';
import { CancelABAInstallationOccupiedPortException } from './cancel-aba-installation/cancel-aba-installation-occupied-port.exception';

@Injectable()
export class ConfirmRegistrationService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly customerExistsService: CustomerExistsService,
  ) {
    super(oracleConfigurationService);
  }

  async confirmRegistration(
    dto: ConfirmRegistrationRequestDto,
  ): Promise<ConfirmRegistrationData> {
    try {
      const data = new ConfirmRegistrationData();
      data.requestDto = dto;
      await super.connect();
      data.getPlanAbaFromKenanResponse = await this.getPlanAbaFromKenan(data);
      data.customerExistsResponse =
        await this.customerExistsService.clientExists(null, null);
      if (
        data.customerExistsResponse.status ===
        CustomerExistsStatusConstants.SUCCESSFULL
      ) {
        data.createAndProvisioningMasterActResponse =
          await this.createAndProvisioningMasterAct(data);
        if (
          data.createAndProvisioningMasterActResponse.status !==
          CreateAndProvisioningMasterActStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception();
        }
      } else {
        data.createAndProvisioningCustomerResponse =
          await this.createAndProvisioningCustomer(data);
        if (
          data.createAndProvisioningCustomerResponse.status !==
          CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL
        ) {
          throw new Error10041Exception();
        }
      }

      // ESTA PARTE DEL FLUJO NO SE VA A INVOCAR (CONSULTAR BPM)
      // // TODO: Determinar  atributos cliente PENDIENTE
      // // TODO: Determinar parámetros del SP insertModifyCustomerAttribute
      // data.insertModifyCustomerAttributeResponse =
      //   await this.insertModifyCustomerAttribute(null, null, null);
      // if (
      //   data.insertModifyCustomerAttributeResponse.status ===
      //   InsertModifyCustomerAttributeStatusConstants.SUCCESSFULL
      // ) {
      //   throw new Error10022Exception();
      // }
      data.isReservedLoginResponse = await this.isReservedLogin(data);
      data.abaRegisterResponse = await this.abaRegister(data);
      data.cancelABAInstallationResponse = await this.cancelABAInstallation(
        data,
      );
      return data;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async getPlanAbaFromKenan(
    data: ConfirmRegistrationData,
  ): Promise<IGetPlanABAFromKenanResponse> {
    const parameters = {
      abaplan: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      abaPlanCode: OracleHelper.stringBindOut(),
    };
    const result = await super.executeStoredProcedure(
      null,
      OracleConstants.GET_PLAN_ABA_FROM_KENAN,
      parameters,
    );
    const response: IGetPlanABAFromKenanResponse = {
      abaPlanCode: result?.outBinds?.abaPlanCode,
    };
    return response;
  }

  // TODO: Determinar origen de los parámetros de entrada
  private async createAndProvisioningCustomer(
    data: ConfirmRegistrationData,
  ): Promise<ICreateAndProvisioningCustomerResponse> {
    const parameters = {
      CLASSNAME: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      ATTRVALUES: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      IDATTRIBUTE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      IDVALUE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      LOGIN: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PASSWORD: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PLAN: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PAYCLASS: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PAYATTRVALUES: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      DISCOUNTCATEGORY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      TAXCATEGORY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      SERVICETYPENAME: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      USERCLASSNAME: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      USERVALUES: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      DIRECTION1: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      DIRECTION2: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      CITY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      STATE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      ZIPCODE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      COUNTRY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      CREATEDBY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PAYINST: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      STATUS: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.SIGS_PACKAGE,
      OracleConstants.CREATE_AND_PROVISIONING_CUSTOMER,
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
        throw new CreateAndProvisioningCustomerInternalErrorException();
      default:
        throw new CreateAndProvisioningCustomerInternalErrorException();
    }
  }

  // TODO: Determinar origen de los parámetros de entrada
  private async createAndProvisioningMasterAct(
    data: ConfirmRegistrationData,
  ): Promise<ICreateAndProvisioningMasterActResponse> {
    const parameters = {
      CLASSNAME: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      IDATTRIBUTE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      IDVALUE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      LOGIN: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PASSWORD: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PLAN: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PAYCLASS: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      ATTRVALUES: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      TAXCATEGORYDSC: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      DISCOUNTCATEGORYDSC: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      SERVICETYPENAME: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      USERCLASSNAME: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      USERVALUES: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      DIRECTION1: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      DIRECTION2: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      CITY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      STATE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      ZIPCODE: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      COUNTRY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      CREATEDBY: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      PAYINST: OracleHelper.stringBindIn(data.requestDto.abaPlan),
      STATUS: OracleHelper.tableOfNumberBindOut(2),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.SIGS_PACKAGE,
      OracleConstants.CREATE_AND_PROVISIONING_MASTER_ACT,
      parameters,
    );
    const response: ICreateAndProvisioningMasterActResponse = {
      status: (OracleHelper.getFirstItem(result, 'STATUS') ??
        CreateAndProvisioningMasterActStatusConstants.INTERNAL_ERROR) as CreateAndProvisioningMasterActStatusConstants,
    };
    switch (response.status) {
      case CreateAndProvisioningMasterActStatusConstants.SUCCESSFULL:
        return response;
      case CreateAndProvisioningMasterActStatusConstants.INTERNAL_ERROR:
        throw new CreateAndProvisioningMasterActInternalErrorException();
      default:
        throw new CreateAndProvisioningMasterActInternalErrorException();
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
      status: OracleHelper.tableOfNumberBindOut(2),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.BOSS_PACKAGE,
      OracleConstants.INSERT_MODIFY_CUSTOMER_ATTRIBUTE,
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
      sz_Login: OracleHelper.stringBindIn(data.requestDto.installerLogin, 32),
      l_result: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.IS_RESERVED_LOGIN,
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

  private async abaRegister(
    data: ConfirmRegistrationData,
  ): Promise<IABARegisterResponse> {
    const parameters = {
      sz_Login: OracleHelper.stringBindIn(data.requestDto.installerLogin, 32),
      l_result: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.ABA_REGISTER,
      parameters,
    );
    const response: IABARegisterResponse = {
      status: (result?.outBinds?.o_status ??
        ABARegisterStatusConstants.INTERNAL_ERROR) as ABARegisterStatusConstants,
    };
    switch (response.status) {
      case ABARegisterStatusConstants.SUCCESSFULL:
        return response;
      case ABARegisterStatusConstants.INTERNAL_ERROR:
        throw new ABARegisterInternalErrorException();
      case ABARegisterStatusConstants.THERE_IS_NO_DATA:
        throw new ABARegisterThereIsNoDataException();
      case ABARegisterStatusConstants.OCCUPIED_PORT:
        throw new ABARegisterOccupiedPortException();
      default:
        throw new ABARegisterInternalErrorException();
    }
  }

  private async cancelABAInstallation(
    data: ConfirmRegistrationData,
  ): Promise<ICancelABAInstallationResponse> {
    const parameters = {
      contractlogin: OracleHelper.stringBindIn(
        data.requestDto.contractLogin,
        32,
      ),
      installerlogin: OracleHelper.stringBindIn(
        data.requestDto.installerLogin,
        32,
      ),
      status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.CANCEL_ABA_INSTALLATION,
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
      case CancelABAInstallationStatusConstants.OCCUPIED_PORT:
        throw new CancelABAInstallationOccupiedPortException();
      default:
        throw new CancelABAInstallationInternalErrorException();
    }
  }
}
