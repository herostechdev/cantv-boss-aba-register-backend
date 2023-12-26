import { Module } from '@nestjs/common';
import { AbaRegisterController } from './aba-register.controller';
import { AbaRegisterGetDslAreaCodesService } from './step-2/get-dsl-area-codes/aba-register-get-dsl-area-codes.service';
import { AbaRegisterGetGroupAccessFromLoginService } from './step-1/login/aba-register-get-group-access-from-login.service';
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
    AbaRegisterGetDslAreaCodesService,
    AbaRegisterGetGroupAccessFromLoginService,
    AbaRegisterGetOrderIdFromAbaSalesService,
    AbaRegisterISGActionAllowedService,
    AbaRegisterIsIPAllowedService,
    AbaRegisterIsPrepaidVoiceLineService,
    AbaRegisterLoginService,
  ],
  exports: [AbaRegisterIsPrepaidVoiceLineService],
})
export class AbaRegisterModule {}
