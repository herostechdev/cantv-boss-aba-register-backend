import { Module } from '@nestjs/common';
import { ConfirmRegistrationController } from './confirm-registration.controller';
import { ConfirmRegistrationService } from './confirm-registration.service';
import { ValidateCustomerModule } from 'src/validate-client/validate-customer.module';

@Module({
  imports: [ValidateCustomerModule],
  controllers: [ConfirmRegistrationController],
  providers: [ConfirmRegistrationService],
  exports: [],
})
export class ConfirmRegistrationModule {}
