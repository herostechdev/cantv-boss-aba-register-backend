import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { GetDHCPDataRawService } from './get-dhcp-data/get-dhcp-data-raw.service';
import { GetDHCPDataRequestDto } from './get-dhcp-data/get-dhcp-data-request.dto';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IGetDHCPDataResponse } from './get-dhcp-data/get-dhcp-data-response.interface';

@Controller({
  path: 'raw/bossApi',
  version: '1',
})
export class BossApiRawController {
  constructor(private readonly getDHCPDataRawService: GetDHCPDataRawService) {}

  @Post('getDHCPData')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDHCPData(
    @Body() dto: GetDHCPDataRequestDto,
  ): Promise<IGetDHCPDataResponse> {
    return this.getDHCPDataRawService.execute(dto);
  }
}
