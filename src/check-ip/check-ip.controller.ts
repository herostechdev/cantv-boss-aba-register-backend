import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { CheckIpRequestDto } from './check-ip-request.dto';
import { CheckIpService } from './check-ip.service';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ICheckIpResponse } from './check-ip-response.interface';

@Controller({
  path: 'checkIp',
  version: '1',
})
export class CheckIpController {
  constructor(private readonly service: CheckIpService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_204_NO_CONTENT)
  @UseFilters(new HttpExceptionFilter())
  checkIP(@Body() dto: CheckIpRequestDto): Promise<ICheckIpResponse> {
    return this.service.checkIp(dto);
  }
}
