import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { IsIPAllowedRequestDto } from './is-ip-allowed-request.dto';
import { IsIPAllowedService } from './is-ip-allowed.service';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IIsIPAllowedRestrictedResponse } from './is-ip-allowed-response.interface';

@Controller({
  path: 'isIPAllowed',
  version: '1',
})
export class IsIPAllowedController {
  constructor(private readonly service: IsIPAllowedService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isIPAllowed(
    @Body() dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedRestrictedResponse> {
    return this.service.isIPAllowedFlow(dto);
  }
}
