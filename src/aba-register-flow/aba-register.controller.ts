import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterLoginRequestDto } from './step-1/login/aba-register-login-request.dto';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
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
    private readonly abaRegisterLoginService: AbaRegisterLoginService,
  ) {}

  @Post('isIpAllowed')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isIPAllowed(
    @Body() dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedResponse> {
    return this.abaRegisterIsIPAllowedService.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpCodeConstants.HTTP_204_NO_CONTENT)
  @UseFilters(new HttpExceptionFilter())
  login(@Body() dto: AbaRegisterLoginRequestDto): Promise<void> {
    return this.abaRegisterLoginService.execute(dto);
  }
}
