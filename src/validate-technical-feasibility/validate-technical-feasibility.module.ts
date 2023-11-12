import { Module } from '@nestjs/common';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';
import { GetASAPOrderDetailModule } from 'src/get-asap-order-detail/get-asap-order-detail.module';
import { GetDHCPDataModule } from 'src/get-dhcp-data/get-dhcp-data.module';

@Module({
  imports: [GetASAPOrderDetailModule, GetDHCPDataModule],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [ValidateTechnicalFeasibilityService],
  exports: [],
})
export class ValidateTechnicalFeasibilityModule {}
