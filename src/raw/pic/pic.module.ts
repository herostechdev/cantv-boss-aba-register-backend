import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PICController } from './pic.controller';
import { CRMCustomersService } from './crm-customer/crm-customers.service';
import { CRMCustomerRequestPayloadService } from './crm-customer/crm-customer-request-payload.service';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { CustomerByPhoneNumberRequestPayloadService } from './customer-by-phone-number/customer-by-phone-number-request-payload.service';
import { GetASAPOrderDetailService } from './get-asap-order-detail/get-asap-order-detail.service';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail/get-asap-order-detail-payload.service';
import { StoredProceduresRawModule } from '../stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [HttpModule, StoredProceduresRawModule],
  controllers: [PICController],
  providers: [
    CRMCustomersService,
    CRMCustomerRequestPayloadService,
    CustomerByPhoneNumberService,
    CustomerByPhoneNumberRequestPayloadService,
    GetASAPOrderDetailPayloadService,
    GetASAPOrderDetailService,
  ],
  exports: [GetASAPOrderDetailService],
})
export class PICModule {}
