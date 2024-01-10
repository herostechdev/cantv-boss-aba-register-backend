import { Module } from '@nestjs/common';
import { AbaRegisterCancelAbaInstallationService } from './step-4/dependencies/cancel-aba-installation/cancel-aba-installation.service';
import { AbaRegisterController } from './aba-register.controller';
import { AbaRegisterConfirmRegistrationService } from './step-4/confirm-registration/aba-register-confirm-registration.service';
import { AbaRegisterCustomerExistsService } from './step-2/dependencies/customer-exists/aba-register-customer-exists.service';
import { AbaRegisterGetAbaPlanForKenanService } from './step-4/dependencies/get-aba-plan-for-kenan/aba-register-get-aba-plan-for-kenan.service';
import { AbaRegisterGetAndRegisterQualifOfServiceService } from './step-2/dependencies/get-and-register-qualif-of-service/aba-register-get-and-register-qualif-of-service.service';
import { AbaRegisterGetCSIdAndPlanNameFromLoginService } from './step-4/dependencies/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.service';
import { AbaRegisterGetDslAreaCodesService } from './step-2/dependencies/get-dsl-area-codes/aba-register-get-dsl-area-codes.service';
import { AbaRegisterGetGroupAccessFromLoginService } from './step-1/login/aba-register-get-group-access-from-login.service';
import { AbaRegisterGetLegalDocumentsService } from './step-4/get-legal-documents/aba-register-get-legal-documents.service';
import { AbaRegisterGetOrderIdFromAbaSalesService } from './step-2/get-order-id-from-aba-sales/aba-register-get-order-id-from-aba-sales.service';
import { AbaRegisterGetStateFromSerialService } from './step-4/get-state-from-serial/aba-register-get-state-from-serial.service';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterISGActionAllowedService } from './step-1/login/aba-register-isg-action-allowed.service';
import { AbaRegisterIsPrepaidVoiceLineService } from './step-2/dependencies/is-prepaid-voice-line/aba-register-is-prepaid-voice-line.service';
import { AbaRegisterIsReservedLoginService } from './step-4/dependencies/is-reserved-login/is-reserved-login.service';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
import { AbaRegisterPlansByCustomerClassService } from './step-3/plans-by-customer-class/plans-by-customer-class.service';
import { AbaRegisterService } from './step-4/dependencies/aba-register/aba-register.service';
import { AbaRegisterValidateCustomerService } from './step-2/validate-customer/aba-register-validate-customer.service';
import { EncryptionModule } from 'src/system/infrastructure/security/encryption/encryption.module';
import { FunctionsRawModule } from 'src/raw/functions/functions-raw.module';
import { StoredProceduresRawModule } from 'src/raw/stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [EncryptionModule, FunctionsRawModule, StoredProceduresRawModule],
  controllers: [AbaRegisterController],
  providers: [
    AbaRegisterCancelAbaInstallationService,
    AbaRegisterConfirmRegistrationService,
    AbaRegisterService,
    AbaRegisterCustomerExistsService,
    AbaRegisterGetAbaPlanForKenanService,
    AbaRegisterGetAndRegisterQualifOfServiceService,
    AbaRegisterGetCSIdAndPlanNameFromLoginService,
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
    AbaRegisterPlansByCustomerClassService,
    AbaRegisterValidateCustomerService,
  ],
  exports: [
    AbaRegisterService,
    AbaRegisterCustomerExistsService,
    AbaRegisterGetAndRegisterQualifOfServiceService,
    AbaRegisterIsPrepaidVoiceLineService,
  ],
})
export class AbaRegisterModule {}
