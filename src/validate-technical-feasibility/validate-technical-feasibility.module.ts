import { Global, Module } from '@nestjs/common';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';

@Global()
@Module({
  imports: [],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [ValidateTechnicalFeasibilityService],
  exports: [],
})
export class ValidateTechnicalFeasibilityModule {}
