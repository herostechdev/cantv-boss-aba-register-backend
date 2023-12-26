import { Module } from '@nestjs/common';
import { ValidateCustomerController } from './validate-customer.controller';
import { ValidateCustomerService } from './validate-customer.service';
import { CustomerExistsModule } from 'src/customer-exists/customer-exists.module';
import { UpdateDslAbaRegistersModule } from 'src/dsl-aba-registers/update-dsl-aba-registers/update-dsl-aba-registers.module';

@Module({
  imports: [CustomerExistsModule, UpdateDslAbaRegistersModule],
  controllers: [ValidateCustomerController],
  providers: [ValidateCustomerService],
  exports: [],
})
export class ValidateCustomerModule {}
