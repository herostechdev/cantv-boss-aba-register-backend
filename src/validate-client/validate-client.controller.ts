import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ValidateTechnicalFeasibilityService } from './validate-client.service';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-client-request.dto';
import { ValidateTechnicalFeasibilityData } from './validate-client-data';

@Controller({
  path: 'validateTechnicalFeasibility',
  version: '1',
})
export class ValidateTechnicalFeasibilityController {
  constructor(private readonly service: ValidateTechnicalFeasibilityService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_204_NO_CONTENT)
  @UseFilters(new HttpExceptionFilter())
  ValidateTechnicalFeasibility(
    @Body() dto: ValidateTechnicalFeasibilityRequestDto,
  ): Promise<ValidateTechnicalFeasibilityData> {
    return this.service.validateTechnicalFeasibility(dto);
  }
}
