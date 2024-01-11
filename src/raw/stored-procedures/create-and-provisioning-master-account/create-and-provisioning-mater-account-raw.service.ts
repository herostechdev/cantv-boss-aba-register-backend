import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CreateAndProvisioningMasterAccountRequestDto } from './create-and-provisioning-master-account-request.dto';
import { CreateAndProvisioningMasterAccountStatusConstants } from './create-and-provisioning-master-account-status.constants';
import { ICreateAndProvisioningMasterAccountResponse } from './create-and-provisioning-master-account-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class CreateAndProvisioningMasterAccountRawService extends OracleExecuteStoredProcedureRawService<
  CreateAndProvisioningMasterAccountRequestDto,
  ICreateAndProvisioningMasterAccountResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.SIGS_PACKAGE,
      BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(
    dto: CreateAndProvisioningMasterAccountRequestDto,
  ): any {
    return {
      CLASSNAME: OracleHelper.stringBindIn(dto.customerClassName),
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
      ATTRVALUES: OracleHelper.stringBindIn(
        BossHelper.getKeyPhoneNumber({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
        }),
      ),
      DISCOUNTCATEGORYDSC: OracleHelper.stringBindIn(BossConstants.NORMAL),
      TAXCATEGORYDSC: OracleHelper.stringBindIn(BossConstants.NORMAL),
      SERVICETYPENAME: OracleHelper.stringBindIn(BossConstants.INTERNET_ACCESS),
      USERCLASSNAME: OracleHelper.stringBindIn(BossConstants.USERS),
      USERVALUES: OracleHelper.stringBindIn(dto.attributeValues),
      DIRECTION1: OracleHelper.stringBindIn(dto.customerAddress1),
      DIRECTION2: OracleHelper.stringBindIn(
        dto.customerAddress2 ?? BossConstants.NOT_AVAILABLE,
      ),
      CITY: OracleHelper.stringBindIn(dto.customerCity),
      STATE: OracleHelper.stringBindIn(dto.customerState),
      ZIPCODE: OracleHelper.stringBindIn(dto.zipCode),
      COUNTRY: OracleHelper.stringBindIn(BossConstants.VENEZUELA),
      CREATEDBY: OracleHelper.stringBindIn(BossConstants.REGISTER),
      PAYINST: OracleHelper.stringBindIn(null),
      STATUS: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(
    result: any,
  ): ICreateAndProvisioningMasterAccountResponse {
    return {
      status: (OracleHelper.getFirstItem(result, 'STATUS') ??
        CreateAndProvisioningMasterAccountStatusConstants.ERROR) as CreateAndProvisioningMasterAccountStatusConstants,
    };
    // switch (response.status) {
    //   case CreateAndProvisioningMasterAccountStatusConstants.SUCCESSFULL:
    //     return response;
    //   case CreateAndProvisioningMasterAccountStatusConstants.ERROR:
    //     throw new CreateAndProvisioningMasterAccountException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.LOGIN_ALREADY_EXISTS:
    //     throw new LoginAlreadyExistsException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATE_USER_INSTANCE_ERROR:
    //     throw new CreateUserInstanceException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.OBTAINING_INSTANCE_FROM_ATTRIBUTE_LIST_ERROR:
    //     throw new ObtainingInstanceFromAttributeListException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.BILLING_ERROR:
    //     throw new BillingException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_MASTER_ACCOUNT_ERROR:
    //     throw new CreatingMasterAccountException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_ACCOUNT_STATEMENT_ERROR:
    //     throw new CreatingAccountStatementException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_BILLING_CHARGE_ERROR:
    //     throw new CreatingBillingChargeException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_HOSTING_CHARGE_ERROR:
    //     throw new CreatingHostingChargeException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_SUBACCOUNT_ERROR:
    //     throw new CreatingSubaccountException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_PAYMENT_INSTANCE_ERROR:
    //     throw new CreatingPaymentInstanceException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_CONTRACT_ERROR:
    //     throw new CreatingContractException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.THERE_IS_NO_DATA_ERROR:
    //     throw new CreateAndProvisioningMasterAccountThereIsNoDataException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CONTACT_ADMINISTRATOR_ERROR:
    //     throw new ContactAdministratorException();
    //   case CreateAndProvisioningMasterAccountStatusConstants.CREATING_DISCOUNT_ERROR:
    //     throw new CreatingDiscountException();
    //   default:
    //     throw new CreateAndProvisioningMasterAccountException();
    // }
  }
}
