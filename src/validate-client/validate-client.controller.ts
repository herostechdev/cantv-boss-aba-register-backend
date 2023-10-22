import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ValidateClientService } from './validate-client.service';
import { ValidateClientData } from './validate-client-data';
import { ValidateClientRequestDto } from './validate-client-request.dto';

@Controller({
  path: 'validateClient',
  version: '1',
})
export class ValidateClientController {
  constructor(private readonly service: ValidateClientService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  validateClient(
    @Body() dto: ValidateClientRequestDto,
  ): Promise<ValidateClientData> {
    return this.service.validateClient(dto);
  }
}
