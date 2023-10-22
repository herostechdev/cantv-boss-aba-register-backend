import { Module } from '@nestjs/common';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';

@Module({
  imports: [],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [ValidateTechnicalFeasibilityService],
  exports: [],
})
export class ValidateTechnicalFeasibilityModule {}
