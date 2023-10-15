import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { GetASAPOrderDetailService } from './get-asap-order-detail.service';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';

@Controller({
  path: 'getASAPOrderDetail',
  version: '1',
})
export class GetASAPOrderDetailController {
  constructor(protected service: GetASAPOrderDetailService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  getClient(
    @Body() dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    return this.service.getASAPOrderDetail(dto);
  }
}
