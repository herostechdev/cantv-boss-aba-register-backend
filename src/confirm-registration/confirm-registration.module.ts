import { Module } from '@nestjs/common';
import { ConfirmRegistrationController } from './confirm-registration.controller';
import { ConfirmRegistrationService } from './confirm-registration.service';

@Module({
  imports: [],
  controllers: [ConfirmRegistrationController],
  providers: [ConfirmRegistrationService],
  exports: [],
})
export class ConfirmRegistrationModule {}
