import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AbaRegisterIsIPAllowedService } from './step-1/aba-register-is-ip-allowed.service';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IIsIPAllowedResponse } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed-response.interface';
import { IsIPAllowedRequestDto } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed-request.dto';

@Controller({
  path: 'abaRegister',
  version: '1',
})
export class AbaRegisterController {
  constructor(
    private readonly abaRegisterIsIPAllowedService: AbaRegisterIsIPAllowedService,
  ) {}

  @Post('isIpAllowed')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isIPAllowed(
    @Body() dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedResponse> {
    return this.abaRegisterIsIPAllowedService.execute(dto);
  }
}
