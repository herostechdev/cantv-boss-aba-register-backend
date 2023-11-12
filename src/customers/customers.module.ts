import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CRMCustomersService } from './crm-customer/crm-customers.service';
import { CRMCustomerRequestPayloadService } from './crm-customer/crm-customer-request-payload.service';
import { CustomerByPhoneNumberRequestPayloadService } from './customer-by-phone-number/customer-by-phone-number-request-payload.service';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';

@Module({
  imports: [HttpModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CRMCustomersService,
    CRMCustomerRequestPayloadService,
    CustomerByPhoneNumberService,
    CustomerByPhoneNumberRequestPayloadService,
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
