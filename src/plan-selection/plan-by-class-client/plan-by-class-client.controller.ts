import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { PlanByClassClientService } from './plan-by-class-client.service';
import { PlanByClassClientRequestDto } from './plan-by-class-client-request.dto';
import { IPlanByClassClientRawResponse } from './plan-by-class-client-raw-response.interface';

@Controller({
  path: 'getPlanByClassClient',
  version: '1',
})
export class PlanByClassClientController {
  constructor(private readonly service: PlanByClassClientService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: PlanByClassClientRequestDto,
  ): Promise<IPlanByClassClientRawResponse> {
    return this.service.getPlanByClassClient(dto);
  }
}
