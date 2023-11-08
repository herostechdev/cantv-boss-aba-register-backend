import { Module } from '@nestjs/common';
import { ValidateCustomerController } from './validate-customer.controller';
import { ValidateCustomerService } from './validate-customer.service';
import { CustomerExistsModule } from 'src/customer-exists/customer-exists.module';
import { GetOrderIdFromABASalesModule } from 'src/get-order-id-from-aba-sales/get-order-id-from-aba-sales.module';

@Module({
  imports: [CustomerExistsModule, GetOrderIdFromABASalesModule],
  controllers: [ValidateCustomerController],
  providers: [ValidateCustomerService],
  exports: [],
})
export class ValidateCustomerModule {}
