import { Module } from '@nestjs/common';
import { ConfirmRegistrationController } from './confirm-registration.controller';
import { ConfirmRegistrationService } from './confirm-registration.service';
import { CustomerExistsModule } from 'src/customer-exists/customer-exists.module';

@Module({
  imports: [CustomerExistsModule],
  controllers: [ConfirmRegistrationController],
  providers: [ConfirmRegistrationService],
  exports: [],
})
export class ConfirmRegistrationModule {}
