import { Module } from '@nestjs/common';
import { ValidateCustomerController } from './validate-customer.controller';
import { ValidateCustomerService } from './validate-customer.service';

@Module({
  imports: [],
  controllers: [ValidateCustomerController],
  providers: [ValidateCustomerService],
  exports: [],
})
export class ValidateCustomerModule {}
