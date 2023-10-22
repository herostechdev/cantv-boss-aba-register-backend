import { Module } from '@nestjs/common';
import { ValidateCustomerController } from './validate-customer.controller';
import { ValidateCustomerService } from './validate-customer.service';
import { ClientExistsModule } from 'src/client-exists/client-exists.module';

@Module({
  imports: [ClientExistsModule],
  controllers: [ValidateCustomerController],
  providers: [ValidateCustomerService],
  exports: [],
})
export class ValidateCustomerModule {}
