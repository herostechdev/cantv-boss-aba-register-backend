import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number/customer-by-phone-number.dto';
import { CRMCustomersService } from './crm-customers.service';
import { CRMGetCustomerDto } from './get-customer/crm-get-customer.dto';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ICRMGetCustomerResponse } from './get-customer/crm-get-customer-response.interface';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number/customer-by-phone-number-response.interface';

@Controller('v1/customers')
export class CRMCustomersController {
  constructor(
    private readonly customerService: CRMCustomersService,
    private readonly customerByPhoneNumberService: CustomerByPhoneNumberService,
  ) {}

  @Post('getCRMCustomer')
  @UseFilters(new HttpExceptionFilter())
  getCustomer(
    @Body() dto: CRMGetCustomerDto,
  ): Promise<ICRMGetCustomerResponse> {
    return this.customerService.getCustomer(dto);
  }

  @Post('byPhoneNumber')
  @UseFilters(new HttpExceptionFilter())
  getByPhoneNumber(
    @Body() dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    return this.customerByPhoneNumberService.get(dto);
  }
}
