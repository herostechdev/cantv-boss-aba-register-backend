import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ValidateCustomerService } from './validate-customer.service';
import { ValidateCustomerData } from './validate-customer-data';
import { ValidateCustomerRequestDto } from './validate-customer-request.dto';

@Controller({
  path: 'abaRegister',
  version: '1',
})
export class ValidateCustomerController {
  constructor(private readonly service: ValidateCustomerService) {}

  @Post('validateCustomer')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  validateClient(
    @Body() dto: ValidateCustomerRequestDto,
  ): Promise<ValidateCustomerData> {
    return this.service.validateCustomer(dto);
  }
}
