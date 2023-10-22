import { Module } from '@nestjs/common';
import { ValidateCustomerController } from './validate-customer.controller';
import { ValidateCustomerService } from './validate-customer.service';
import { CustomerExistsModule } from 'src/client-exists/customer-exists.module';

@Module({
  imports: [CustomerExistsModule],
  controllers: [ValidateCustomerController],
  providers: [ValidateCustomerService],
  exports: [],
})
export class ValidateCustomerModule {}
