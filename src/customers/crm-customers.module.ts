import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CRMCustomersController } from './crm-customers.controller';
import { CRMCustomersService } from './crm-customers.service';
import { CRMGetCustomersService } from './get-customer/crm-get-customers.service';
import { CRMGetCustomerRequestPayloadService } from './get-customer/crm-get-customer-request-payload.service';

@Module({
  imports: [HttpModule],
  controllers: [CRMCustomersController],
  providers: [
    CRMCustomersService,
    CRMGetCustomersService,
    CRMGetCustomerRequestPayloadService,
  ],
  exports: [CRMCustomersService],
})
export class CRMCustomersModule {}
