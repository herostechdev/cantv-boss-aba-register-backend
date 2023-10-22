import { Module } from '@nestjs/common';
import { ConfirmRegistrationController } from './confirm-registration.controller';
import { ConfirmRegistrationService } from './confirm-registration.service';
import { ValidateClientModule } from 'src/validate-client/validate-client.module';

@Module({
  imports: [ValidateClientModule],
  controllers: [ConfirmRegistrationController],
  providers: [ConfirmRegistrationService],
  exports: [],
})
export class ConfirmRegistrationModule {}
