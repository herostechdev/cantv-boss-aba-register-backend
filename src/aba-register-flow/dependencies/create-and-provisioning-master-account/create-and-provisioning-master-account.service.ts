import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { BillingException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/billing.exception';
import { ContactAdministratorException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/contact-administrator.exception';
import { CreateAndProvisioningMasterAccountRequestDto } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-request.dto';
import { CreateAndProvisioningMasterAccountStatusConstants } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-status.constants';
import { CreateAndProvisioningMasterAccountRawService } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-mater-account-raw.service';
import { CreateAndProvisioningMasterAccountThereIsNoDataException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/create-and-provisioning-master-account-there-is-no-data.exception';
import { CreateAndProvisioningMasterAccountException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/create-and-provisioning-master-account.exception';
import { CreateUserInstanceException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/create-user-instance.exception';
import { CreatingAccountStatementException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-account-statement.exception';
import { CreatingBillingChargeException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-billing-charge.exception';
import { CreatingContractException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-contract.exception';
import { CreatingDiscountException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-discount.exception';
import { CreatingHostingChargeException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-hosting-charge.exception';
import { CreatingMasterAccountException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-master-account.exception';
import { CreatingPaymentInstanceException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-payment-instance.exception';
import { CreatingSubaccountException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/creating-subaccount.exception';
import { ICreateAndProvisioningMasterAccountResponse } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/create-and-provisioning-master-account-response.interface';
import { LoginAlreadyExistsException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/login-already-exists.exception';
import { ObtainingInstanceFromAttributeListException } from 'src/raw/database/stored-procedures/create-and-provisioning-master-account/exceptions/obtaining-instance-from-attribute-list.exception';

@Injectable()
export class AbaRegisterCreateAndProvisioningMasterAccountService extends AbaRegisterExecuteService<
  CreateAndProvisioningMasterAccountRequestDto,
  ICreateAndProvisioningMasterAccountResponse
> {
  constructor(
    protected readonly rawService: CreateAndProvisioningMasterAccountRawService,
  ) {
    super(
      AbaRegisterCreateAndProvisioningMasterAccountService.name,
      'Creando y aprovisionando el cliente',
      rawService,
    );
  }

  protected processResponse(
    response: ICreateAndProvisioningMasterAccountResponse,
  ): ICreateAndProvisioningMasterAccountResponse {
    switch (response.status) {
      case CreateAndProvisioningMasterAccountStatusConstants.SUCCESSFULL:
        return response;
      case CreateAndProvisioningMasterAccountStatusConstants.ERROR:
        throw new CreateAndProvisioningMasterAccountException();
      case CreateAndProvisioningMasterAccountStatusConstants.LOGIN_ALREADY_EXISTS:
        throw new LoginAlreadyExistsException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATE_USER_INSTANCE_ERROR:
        throw new CreateUserInstanceException();
      case CreateAndProvisioningMasterAccountStatusConstants.OBTAINING_INSTANCE_FROM_ATTRIBUTE_LIST_ERROR:
        throw new ObtainingInstanceFromAttributeListException();
      case CreateAndProvisioningMasterAccountStatusConstants.BILLING_ERROR:
        throw new BillingException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_MASTER_ACCOUNT_ERROR:
        throw new CreatingMasterAccountException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_ACCOUNT_STATEMENT_ERROR:
        throw new CreatingAccountStatementException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_BILLING_CHARGE_ERROR:
        throw new CreatingBillingChargeException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_HOSTING_CHARGE_ERROR:
        throw new CreatingHostingChargeException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_SUBACCOUNT_ERROR:
        throw new CreatingSubaccountException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_PAYMENT_INSTANCE_ERROR:
        throw new CreatingPaymentInstanceException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_CONTRACT_ERROR:
        throw new CreatingContractException();
      case CreateAndProvisioningMasterAccountStatusConstants.THERE_IS_NO_DATA_ERROR:
        throw new CreateAndProvisioningMasterAccountThereIsNoDataException();
      case CreateAndProvisioningMasterAccountStatusConstants.CONTACT_ADMINISTRATOR_ERROR:
        throw new ContactAdministratorException();
      case CreateAndProvisioningMasterAccountStatusConstants.CREATING_DISCOUNT_ERROR:
        throw new CreatingDiscountException();
      default:
        throw new CreateAndProvisioningMasterAccountException();
    }
  }
}
