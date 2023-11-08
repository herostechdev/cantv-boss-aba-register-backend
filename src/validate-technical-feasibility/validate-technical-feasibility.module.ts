import { Module } from '@nestjs/common';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';
import { GetDHCPDataModule } from 'src/get-dhcp-data/get-dhcp-data.module';

@Module({
  imports: [GetDHCPDataModule],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [ValidateTechnicalFeasibilityService],
  exports: [],
})
export class ValidateTechnicalFeasibilityModule {}
