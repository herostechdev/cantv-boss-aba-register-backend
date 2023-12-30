import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { DSLAuditLogsRequestDto } from './dsl-audit-logs-request.dto';
import { DSLAuditLogsService } from './dsl-audit-logs.service';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IDSLAuditLogsResponse } from './dsl-audit-logs-response.interface';

@Controller({
  path: 'dslAuditLogs',
  version: '1',
})
export class DSLAuditLogsController {
  constructor(private readonly service: DSLAuditLogsService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  DSLAuditLogs(
    @Body() dto: DSLAuditLogsRequestDto,
  ): Promise<IDSLAuditLogsResponse> {
    return this.service.log(dto);
  }
}
