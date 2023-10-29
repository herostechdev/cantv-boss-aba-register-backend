import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { GetStateFromSerialService } from './get-state-from-serial.service';
import { GetStateFromSerialRequestDto } from './get-state-from-serial-request.dto';
import { IGetStateFromSerialResponse } from './get-state-from-serial-response.interface';

@Controller({
  path: 'getGetStateFromSerial',
  version: '1',
})
export class GetStateFromSerialController {
  constructor(private readonly service: GetStateFromSerialService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: GetStateFromSerialRequestDto,
  ): Promise<IGetStateFromSerialResponse> {
    return this.service.getGetStateFromSerial(dto);
  }
}
