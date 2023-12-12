import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers-response.interface';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers-request.dto';
import { UpdateDslAbaRegistersService } from './update-dsl-aba-registers.service';

@Controller({
  path: 'updateDslAbaRegisters',
  version: '1',
})
export class UpdateDslAbaRegistersController {
  constructor(private readonly service: UpdateDslAbaRegistersService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  UpdateDslAbaRegisters(
    @Body() dto: UpdateDslAbaRegistersRequestDto,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    return this.service.update(dto);
  }
}
