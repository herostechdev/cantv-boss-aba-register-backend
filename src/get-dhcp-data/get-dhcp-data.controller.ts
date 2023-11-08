import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { GetDHCPDataRequestDto } from './get-dhcp-data-request.dto';
import { GetDHCPDataService } from './get-dhcp.service';
import { IGetDHCPDataResponse } from './get-dhcp-data-response.interface';

@Controller('v1/dhcp')
export class GetDHCPDataController {
  constructor(protected getDHCPDataService: GetDHCPDataService) {}

  @Post('get')
  @UseFilters(new HttpExceptionFilter())
  getClient(@Body() dto: GetDHCPDataRequestDto): Promise<IGetDHCPDataResponse> {
    return this.getDHCPDataService.get(dto);
  }
}
