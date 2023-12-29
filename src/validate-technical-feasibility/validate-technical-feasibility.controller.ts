import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';
import { ValidateTechnicalFeasibilityData } from './validate-technical-feasibility-data';

@Controller({
  path: 'abaRegister',
  version: '1',
})
export class ValidateTechnicalFeasibilityController {
  constructor(private readonly service: ValidateTechnicalFeasibilityService) {}

  @Post('validateTechnicalFeasibility')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ValidateTechnicalFeasibility(
    @Body() dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<ValidateTechnicalFeasibilityData> {
    return this.service.validateTechnicalFeasibility(dto);
  }
}
