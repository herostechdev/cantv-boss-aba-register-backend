import { Module } from '@nestjs/common';
import { ValidateCustomerController } from 'src/validate-client/validate-customer.controller';
import { ValidateCustomerService } from 'src/validate-client/validate-customer.service';

@Module({
  imports: [],
  controllers: [ValidateCustomerController],
  providers: [ValidateCustomerService],
  exports: [],
})
export class ClientExistsModule {}
