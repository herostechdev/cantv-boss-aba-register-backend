import { Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { GetDSLAreaCodesService } from './get-dsl-area-codes.service';
import { IGetDSLAreaCodesResponse } from './get-dsl-area-codes-response.interface';

@Controller({
  path: 'getDSLAreaCodes',
  version: '1',
})
export class GetDSLAreaCodesController {
  constructor(private readonly service: GetDSLAreaCodesService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDSLAreaCodes(): Promise<IGetDSLAreaCodesResponse> {
    return this.service.getDSLAreaCodesFlow();
  }
}
