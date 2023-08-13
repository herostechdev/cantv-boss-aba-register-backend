import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../exceptions/exception-filters/http-exception.filter';
import { CreateLogDto } from './create-log.dto';
import { LogsService } from './logs.service';

@Controller('v1/logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('/info')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  info(@Body() dto: CreateLogDto): void {
    this.logsService.info(dto);
  }

  @Post('/warn')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  warn(@Body() dto: CreateLogDto): void {
    this.logsService.warn(dto);
  }

  @Post('/error')
  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  error(@Body() dto: CreateLogDto): void {
    this.logsService.error(dto);
  }
}
