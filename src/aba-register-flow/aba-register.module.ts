import { Module } from '@nestjs/common';
import { AbaRegisterController } from './aba-register.controller';
import { AbaRegisterGetAndRegisterQualifOfServiceService } from './step-2/get-and-register-qualif-of-service/get-and-register-qualif-of-service.service';
import { AbaRegisterGetDslAreaCodesService } from './step-2/get-dsl-area-codes/aba-register-get-dsl-area-codes.service';
import { AbaRegisterGetGroupAccessFromLoginService } from './step-1/login/aba-register-get-group-access-from-login.service';
import { AbaRegisterGetLegalDocumentsService } from './step-4/get-legal-documents/aba-register-get-legal-documents.service';
import { AbaRegisterGetOrderIdFromAbaSalesService } from './step-2/get-order-id-from-aba-sales/aba-register-get-order-id-from-aba-sales.service';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterISGActionAllowedService } from './step-1/login/aba-register-isg-action-allowed.service';
import { AbaRegisterIsPrepaidVoiceLineService } from './step-2/is-prepaid-voice-line/aba-register-is-prepaid-voice-line.service';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
import { EncryptionModule } from 'src/system/infrastructure/security/encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  controllers: [AbaRegisterController],
  providers: [
    AbaRegisterGetAndRegisterQualifOfServiceService,
    AbaRegisterGetDslAreaCodesService,
    AbaRegisterGetGroupAccessFromLoginService,
    AbaRegisterGetLegalDocumentsService,
    AbaRegisterGetOrderIdFromAbaSalesService,
    AbaRegisterISGActionAllowedService,
    AbaRegisterIsIPAllowedService,
    AbaRegisterIsPrepaidVoiceLineService,
    AbaRegisterLoginService,
  ],
  exports: [
    AbaRegisterGetAndRegisterQualifOfServiceService,
    AbaRegisterIsPrepaidVoiceLineService,
  ],
})
export class AbaRegisterModule {}
