import { Injectable } from '@nestjs/common';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { ConfirmRegistrationData } from './confirm-registration-data';
import { CreateAndProvisioningCustomerStatusConstants } from './create-and-provisioning-customer/create-and-provisioning-customer-status.constants';
import { CreateAndProvisioningCustomerInternalErrorException } from './create-and-provisioning-customer/create-and-provisioning-customer-internal-error.exception';
import { CreateAndProvisioningMasterActStatusConstants } from './create-and-provisioning-master-act/create-and-provisioning-master-act-status.constants';
import { CreateAndProvisioningMasterActInternalErrorException } from './create-and-provisioning-master-act/create-and-provisioning-master-act-internal-error.exception';
import { CustomerExistsService } from 'src/customer-exists/customer-exists.service';
import { CustomerExistsStatusConstants } from 'src/customer-exists/customer-exists-status.constants';
import { ICreateAndProvisioningCustomerResponse } from './create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterActResponse } from './create-and-provisioning-master-act/create-and-provisioning-master-act-response.interface';
import { IGetPlanABAFromKenanResponse } from './get-plan-aba-from-kenan/get-plan-aba-from-kenan-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConstants } from 'src/oracle/oracle.constants';

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
      } else {
        data.createAndProvisioningCustomerResponse =
          await this.createAndProvisioningCustomer(data);
        if (
          data.createAndProvisioningCustomerResponse.status ===
          CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL
        ) {
          // TODO: Determinar  atributos cliente PENDIENTE
        } else {
        }
      }
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
      // TODO: Cómo obtener la respuesta de la ejecución del SP
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

  // TODO: Determinar origen de los campos
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

  // TODO: Determinar origen de los campos
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
}
