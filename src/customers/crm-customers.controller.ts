import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CRMCustomersService } from './crm-customers.service';
import { CRMGetCustomerDto } from './get-customer/crm-get-customer.dto';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ICRMGetCustomerResponse } from './get-customer/crm-get-customer-response.interface';

@Controller('v1/crm/customers')
export class CRMCustomersController {
  constructor(protected customerService: CRMCustomersService) {}

  @Post('get')
  @UseFilters(new HttpExceptionFilter())
  getClient(@Body() dto: CRMGetCustomerDto): Promise<ICRMGetCustomerResponse> {
    return this.customerService.getCustomer(dto);
  }
}
