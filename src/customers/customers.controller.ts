import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number/customer-by-phone-number.dto';
import { CustomersService } from './customers.service';
import { CRMCustomerDto } from './crm-customer/crm-customer.dto';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ICRMCustomerResponse } from './crm-customer/crm-customer-response.interface';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number/customer-by-phone-number-response.interface';

@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post('crmCustomer')
  @UseFilters(new HttpExceptionFilter())
  crmCustomer(@Body() dto: CRMCustomerDto): Promise<ICRMCustomerResponse> {
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
