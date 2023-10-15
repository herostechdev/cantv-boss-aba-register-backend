import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { GetOrderIdFromABASalesService } from './get-order-id-from-aba-sales.service';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales-request.dto';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales-response.interface';

@Controller({
  path: 'GetOrderIdFromABASales',
  version: '1',
})
export class GetOrderIdFromABASalesController {
  constructor(private readonly service: GetOrderIdFromABASalesService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_204_NO_CONTENT)
  @UseFilters(new HttpExceptionFilter())
  GetOrderIdFromABASales(
    @Body() dto: GetOrderIdFromABASalesRequestDto,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    return this.service.GetOrderIdFromABASales(dto);
  }
}
