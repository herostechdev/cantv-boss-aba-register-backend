import { Module } from '@nestjs/common';
import { AbaRegisterPayAbaInstallationService } from './dependencies/pay-aba-installation/pay-aba-installation.service';
import { AbaRegisterCheckIpService } from './dependencies/check-ip/check-ip.service';
import { AbaRegisterConfirmRegistrationService } from './step-4/confirm-registration/aba-register-confirm-registration.service';
import { AbaRegisterController } from './aba-register.controller';
import { AbaRegisterCreateAndProvisioningCustomerService } from './dependencies/create-and-provisioning-customer/create-and-provisioning-customer.service';
import { AbaRegisterCreateAndProvisioningMasterAccountService } from './dependencies/create-and-provisioning-master-account/create-and-provisioning-master-account.service';
import { AbaRegisterCustomerExistsService } from './dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterDeleteOrderService } from './dependencies/delete-order/delete-order.service';
import { AbaRegisterGetAbaDataFromRequestsService } from './dependencies/get-aba-data-from-requests/get-aba-data-from-requests.service';
import { AbaRegisterGetAbaDataService } from './dependencies/get-aba-data/get-aba-data.service';
import { AbaRegisterGetAbaPlanForKenanService } from './dependencies/get-aba-plan-for-kenan/aba-register-get-aba-plan-for-kenan.service';
import { AbaRegisterGetAndRegisterQualifOfServiceService } from './dependencies/get-and-register-qualif-of-service/aba-register-get-and-register-qualif-of-service.service';
import { AbaRegisterGetCSIdAndPlanNameFromLoginService } from './dependencies/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.service';
import { AbaRegisterGetDataFromDSLAMPortIdRequestService } from './dependencies/get-data-from-dslam-port-id/get-data-from-dslam-port-id.service';
import { AbaRegisterGetDownstreamFromPlanService } from './dependencies/get-downstream-from-plan/get-downstream-from-plan.service';
import { AbaRegisterGetDslAreaCodesService } from './dependencies/get-dsl-area-codes/aba-register-get-dsl-area-codes.service';
import { AbaRegisterGetGroupAccessFromLoginService } from './step-1/login/aba-register-get-group-access-from-login.service';
import { AbaRegisterGetLegalDocumentsService } from './step-4/get-legal-documents/aba-register-get-legal-documents.service';
import { AbaRegisterGetOrderIdFromAbaSalesService } from './step-2/get-order-id-from-aba-sales/aba-register-get-order-id-from-aba-sales.service';
import { AbaRegisterGetStateFromSerialService } from './step-4/get-state-from-serial/aba-register-get-state-from-serial.service';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterISGActionAllowedService } from './step-1/login/aba-register-isg-action-allowed.service';
import { AbaRegisterIsPrepaidVoiceLineService } from './dependencies/is-prepaid-voice-line/aba-register-is-prepaid-voice-line.service';
import { AbaRegisterIsReservedLoginService } from './dependencies/is-reserved-login/is-reserved-login.service';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
import { AbaRegisterMailService } from './dependencies/mail/aba-register-mail.service';
import { AbaRegisterPlansByCustomerClassService } from './step-3/plans-by-customer-class/plans-by-customer-class.service';
import { AbaRegisterService } from './dependencies/aba-register/aba-register.service';
import { AbaRegisterValidateCustomerService } from './step-2/validate-customer/aba-register-validate-customer.service';
import { AbaRegisterValidateTechnicalFeasibilityService } from './step-2/validate-technical-feasibility/aba-register-validate-technical-feasibility.service';
import { AbaRegisterVerifyContractByPhoneService } from './dependencies/verify-contract-by-phone/verify-contract-by-phone.service';
import { BossApiModule } from 'src/raw/boss-api/boss-api-raw.module';
import { DatabaseFunctionsRawModule } from 'src/raw/database/functions/database-functions-raw.module';
import { EncryptionModule } from 'src/system/infrastructure/security/encryption/encryption.module';
import { MailModule } from 'src/system/infrastructure/mail/mail.module';
import { PICModule } from 'src/raw/pic/pic.module';
import { StoredProceduresRawModule } from 'src/raw/stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [
    BossApiModule,
    EncryptionModule,
    DatabaseFunctionsRawModule,
    MailModule,
    PICModule,
    StoredProceduresRawModule,
  ],
  controllers: [AbaRegisterController],
  providers: [
    AbaRegisterPayAbaInstallationService,
    AbaRegisterCheckIpService,
    AbaRegisterConfirmRegistrationService,
    AbaRegisterCreateAndProvisioningCustomerService,
    AbaRegisterCreateAndProvisioningMasterAccountService,
    AbaRegisterCustomerExistsService,
    AbaRegisterDeleteOrderService,
    AbaRegisterGetDownstreamFromPlanService,
    AbaRegisterGetAbaDataService,
    AbaRegisterGetAbaDataFromRequestsService,
    AbaRegisterGetAbaPlanForKenanService,
    AbaRegisterGetAndRegisterQualifOfServiceService,
    AbaRegisterGetCSIdAndPlanNameFromLoginService,
    AbaRegisterGetDataFromDSLAMPortIdRequestService,
    AbaRegisterGetDslAreaCodesService,
    AbaRegisterGetGroupAccessFromLoginService,
    AbaRegisterGetLegalDocumentsService,
    AbaRegisterGetOrderIdFromAbaSalesService,
    AbaRegisterGetStateFromSerialService,
    AbaRegisterISGActionAllowedService,
    AbaRegisterIsIPAllowedService,
    AbaRegisterIsPrepaidVoiceLineService,
    AbaRegisterIsReservedLoginService,
    AbaRegisterLoginService,
    AbaRegisterMailService,
    AbaRegisterPlansByCustomerClassService,
    AbaRegisterService,
    AbaRegisterValidateCustomerService,
    AbaRegisterValidateTechnicalFeasibilityService,
    AbaRegisterVerifyContractByPhoneService,
  ],
  exports: [
    AbaRegisterGetAndRegisterQualifOfServiceService,
    AbaRegisterIsPrepaidVoiceLineService,
  ],
})
export class AbaRegisterModule {}
