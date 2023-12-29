import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ConfirmRegistrationService } from './confirm-registration.service';
import { ConfirmRegistrationData } from './confirm-registration-data';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';

@Controller({
  path: 'abaRegister',
  version: '1',
})
export class ConfirmRegistrationController {
  constructor(private readonly service: ConfirmRegistrationService) {}

  @Post('confirmRegistration')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: ConfirmRegistrationRequestDto,
  ): Promise<ConfirmRegistrationData> {
    return this.service.confirmRegistrationFlow(dto);
  }
}
