import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PICController } from './pic.controller';
import { CRMCustomersService } from './crm-customer/crm-customers.service';
import { CRMCustomerRequestPayloadService } from './crm-customer/crm-customer-request-payload.service';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { CustomerByPhoneNumberRequestPayloadService } from './customer-by-phone-number/customer-by-phone-number-request-payload.service';

@Module({
  imports: [HttpModule],
  controllers: [PICController],
  providers: [
    CRMCustomersService,
    CRMCustomerRequestPayloadService,
    CustomerByPhoneNumberService,
    CustomerByPhoneNumberRequestPayloadService,
  ],
  exports: [],
})
export class PICModule {}
