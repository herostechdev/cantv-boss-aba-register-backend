import { Module } from '@nestjs/common';
import { GetPlanDescriptionFromPlanNameController } from './get-plan-description-from-plan-name.controller';
import { GetPlanDescriptionFromPlanNameService } from './get-plan-description-from-plan-name.service';

@Module({
  controllers: [GetPlanDescriptionFromPlanNameController],
  providers: [GetPlanDescriptionFromPlanNameService],
  exports: [],
})
export class GetPlanDescriptionFromPlanNameModule {}
