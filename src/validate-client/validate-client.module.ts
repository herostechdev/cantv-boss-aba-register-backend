import { Global, Module } from '@nestjs/common';
import { ValidateTechnicalFeasibilityController } from './validate-client.controller';
import { ValidateTechnicalFeasibilityService } from './validate-client.service';

@Global()
@Module({
  imports: [],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [ValidateTechnicalFeasibilityService],
  exports: [],
})
export class ValidateTechnicalFeasibilityModule {}
