import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { GetPlanDescriptionFromPlanNameService } from './get-plan-description-from-plan-name.service';
import { GetPlanDescriptionFromPlanNameRequestDto } from './get-plan-description-from-plan-name-request.dto';
import { IGetPlanDescriptionFromPlanNameResponse } from './get-plan-description-from-plan-name-response.interface';

@Controller({
  path: 'getPlanDescriptionFromPlanName',
  version: '1',
})
export class GetPlanDescriptionFromPlanNameController {
  constructor(
    private readonly service: GetPlanDescriptionFromPlanNameService,
  ) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: GetPlanDescriptionFromPlanNameRequestDto,
  ): Promise<IGetPlanDescriptionFromPlanNameResponse> {
    return this.service.getPlanDescriptionFromPLanName(dto);
  }
}
