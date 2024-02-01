import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { GetAbaPlanForKenanRawService } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';
import { GetAbaPlanForKenanRequestDto } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-request.dto';
import { HttpCodeConstants } from 'src/system/infrastructure/http/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IGetAbaPlanForKenanResponse } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-response.interface';

@Controller({
  path: 'raw/databaseFunctions',
  version: '1',
})
export class DatabaseFunctionsRawController {
  constructor(
    private readonly getAbaPlanForKenanRawService: GetAbaPlanForKenanRawService,
  ) {}
  @Post('getAbaPlanForKenan')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getAbaPlanForKenan(
    @Body() dto: GetAbaPlanForKenanRequestDto,
  ): Promise<IGetAbaPlanForKenanResponse> {
    return this.getAbaPlanForKenanRawService.execute(dto);
  }
}
