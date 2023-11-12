import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number/customer-by-phone-number.dto';
import { CustomersService } from './customers.service';
import { CRMGetCustomerDto } from './get-customer/crm-get-customer.dto';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ICRMGetCustomerResponse } from './get-customer/crm-get-customer-response.interface';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number/customer-by-phone-number-response.interface';

@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post('crmCustomer')
  @UseFilters(new HttpExceptionFilter())
  crmCustomer(
    @Body() dto: CRMGetCustomerDto,
  ): Promise<ICRMGetCustomerResponse> {
    return this.customerService.crmCustomer(dto);
  }

  @Post('byPhoneNumber')
  @UseFilters(new HttpExceptionFilter())
  byPhoneNumber(
    @Body() dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    return this.customerService.byPhoneNumber(dto);
  }
}
