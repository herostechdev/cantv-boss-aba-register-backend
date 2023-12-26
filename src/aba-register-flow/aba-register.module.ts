import { Global, Module } from '@nestjs/common';
import { AbaRegisterController } from './aba-register.controller';
import { AbaRegisterGetGroupAccessFromLoginService } from './step-1/login/aba-register-get-group-access-from-login.service';
import { AbaRegisterGetOrderIdFromAbaSalesService } from './step-2/get-order-id-from-aba-sales/aba-register-get-order-id-from-aba-sales.service';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterISGActionAllowedService } from './step-1/login/aba-register-isg-action-allowed.service';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
import { EncryptionModule } from 'src/system/infrastructure/security/encryption/encryption.module';

@Global()
@Module({
  imports: [EncryptionModule],
  controllers: [AbaRegisterController],
  providers: [
    AbaRegisterGetGroupAccessFromLoginService,
    AbaRegisterGetOrderIdFromAbaSalesService,
    AbaRegisterISGActionAllowedService,
    AbaRegisterIsIPAllowedService,
    AbaRegisterLoginService,
  ],
  exports: [],
})
export class AbaRegisterModule {}
