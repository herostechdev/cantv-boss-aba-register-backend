import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AbaRegisterGetOrderIdFromAbaSalesService } from './step-2/get-order-id-from-aba-sales/aba-register-get-order-id-from-aba-sales.service';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterLoginRequestDto } from './step-1/login/aba-register-login-request.dto';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
import { GetOrderIdFromABASalesRequestDto } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-request.dto';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IGetOrderIdFromABASalesResponse } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-response.interface';
import { IIsIPAllowedResponse } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-response.interface';
import { IsIPAllowedRequestDto } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-request.dto';

@Controller({
  path: 'abaRegister',
  version: '1',
})
export class AbaRegisterController {
  constructor(
    private readonly abaRegisterGetOrderIdFromAbaSalesService: AbaRegisterGetOrderIdFromAbaSalesService,
    private readonly abaRegisterIsIPAllowedService: AbaRegisterIsIPAllowedService,
    private readonly abaRegisterLoginService: AbaRegisterLoginService,
  ) {}

  @Post('getOrderIdFromAbaSales')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getOrderIdFromAbaSales(
    @Body() dto: GetOrderIdFromABASalesRequestDto,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    return this.abaRegisterGetOrderIdFromAbaSalesService.execute(dto);
  }

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
