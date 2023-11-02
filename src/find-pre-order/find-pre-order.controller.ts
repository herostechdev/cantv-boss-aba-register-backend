import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { FindPreOrderService } from './find-pre-order.service';
import { FindPreOrderRequestDto } from './find-pre-order-request.dto';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IFindPreOrderResponse } from './find-pre-order-response.interface';

@Controller({
  path: 'FindPreOrder',
  version: '1',
})
export class FindPreOrderController {
  constructor(private readonly service: FindPreOrderService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  FindPreOrder(
    @Body() dto: FindPreOrderRequestDto,
  ): Promise<IFindPreOrderResponse> {
    return this.service.FindPreOrder(dto);
  }
}
