import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CreateAndProvisioningCustomerRequestDto } from './create-and-provisioning-customer-request.dto';
import { CreateAndProvisioningCustomerStatusConstants } from './create-and-provisioning-customer-status.constants';
import { ICreateAndProvisioningCustomerResponse } from './create-and-provisioning-customer-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class CreateAndProvisioningCustomerRawService extends OracleExecuteStoredProcedureRawService<
  CreateAndProvisioningCustomerRequestDto,
  ICreateAndProvisioningCustomerResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.SIGS_PACKAGE,
      BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: CreateAndProvisioningCustomerRequestDto): any {
    return {
      CLASSNAME: OracleHelper.stringBindIn(dto.customerClassName),
      ATTRVALUES: OracleHelper.stringBindIn(dto.attributeValues),
      IDATTRIBUTE: OracleHelper.stringBindIn(
        BossHelper.getIdentificationDocumentType(dto.customerClassName),
      ),
      IDVALUE: OracleHelper.stringBindIn(dto.customerIdentificationDocument),
      LOGIN: OracleHelper.stringBindIn(
        BossHelper.getAutomaticCustomerUserName(
          dto.areaCode,
          dto.phoneNumber,
          dto.customerIdentificationDocument,
        ),
      ),
      PASSWORD: OracleHelper.stringBindIn(BossConstants.NOT_AVAILABLE),
      PLAN: OracleHelper.stringBindIn(dto.technicalPlanName), // PlansByClassClient.O_PLANDESIRED
      PAYCLASS: OracleHelper.stringBindIn(BossConstants.CANTV_BILLING),
      PAYATTRVALUES: OracleHelper.stringBindIn(
        BossHelper.getKeyPhoneNumber({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
        }),
      ),
      DISCOUNTCATEGORY: OracleHelper.stringBindIn(BossConstants.NORMAL),
      TAXCATEGORY: OracleHelper.stringBindIn(BossConstants.NORMAL),
      SERVICETYPENAME: OracleHelper.stringBindIn(BossConstants.INTERNET_ACCESS),
      USERCLASSNAME: OracleHelper.stringBindIn(BossConstants.USERS),
      USERVALUES: OracleHelper.stringBindIn(dto.attributeValues),
      DIRECTION1: OracleHelper.stringBindIn(dto.customerAddress1),
      DIRECTION2: OracleHelper.stringBindIn(dto.customerAddress2),
      CITY: OracleHelper.stringBindIn(dto.customerCity),
      STATE: OracleHelper.stringBindIn(dto.customerState),
      ZIPCODE: OracleHelper.stringBindIn(dto.zipCode),
      COUNTRY: OracleHelper.stringBindIn(BossConstants.VENEZUELA),
      CREATEDBY: OracleHelper.stringBindIn(BossConstants.REGISTER),
      PAYINST: OracleHelper.stringBindIn(null),

      STATUS: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): ICreateAndProvisioningCustomerResponse {
    return {
      status: (OracleHelper.getFirstItem(result, 'STATUS') ??
        CreateAndProvisioningCustomerStatusConstants.ERROR) as CreateAndProvisioningCustomerStatusConstants,
    };
  }
}
