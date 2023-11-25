import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { CustomerExistsService } from './customer-exists.service';
import { CustomerExistsRequestDto } from './customer-exists-request.dto';
import { ICustomerExistsResponse } from './customer-exists-response.interface';

@Controller({
  path: 'customerExists',
  version: '1',
})
export class CustomerExistsController {
  constructor(private readonly service: CustomerExistsService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: CustomerExistsRequestDto,
  ): Promise<ICustomerExistsResponse> {
    return this.service.clientExists(dto);
  }
}
