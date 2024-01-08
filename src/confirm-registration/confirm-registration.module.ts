import { Module } from '@nestjs/common';
import { AbaRegisterModule } from 'src/aba-register-flow/aba-register.module';
import { ConfirmRegistrationController } from './confirm-registration.controller';
import { ConfirmRegistrationService } from './confirm-registration.service';

@Module({
  imports: [AbaRegisterModule],
  controllers: [ConfirmRegistrationController],
  providers: [ConfirmRegistrationService],
  exports: [],
})
export class ConfirmRegistrationModule {}
