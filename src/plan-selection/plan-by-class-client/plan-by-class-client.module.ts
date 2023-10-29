import { Module } from '@nestjs/common';
import { PlanByClassClientController } from './plan-by-class-client.controller';
import { PlanByClassClientService } from './plan-by-class-client.service';

@Module({
  controllers: [PlanByClassClientController],
  providers: [PlanByClassClientService],
  exports: [],
})
export class PlanByClassClientModule {}
