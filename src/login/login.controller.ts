import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ILoginResponse } from './login-response.interface';
import { LoginService } from './login.service';
import { LoginRequestDto } from './login-request.dto';

@Controller({
  path: 'login',
  version: '1',
})
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  checkIP(@Body() dto: LoginRequestDto): Promise<ILoginResponse> {
    return this.service.login(dto);
  }
}
