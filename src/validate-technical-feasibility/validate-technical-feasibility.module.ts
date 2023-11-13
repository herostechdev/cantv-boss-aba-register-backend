import { Module } from '@nestjs/common';
import { GetABADataFromRequestsService } from './get-aba-data-from-requests/get-aba-data-from-requests.service';
import { GetASAPOrderDetailModule } from 'src/get-asap-order-detail/get-asap-order-detail.module';
import { GetDHCPDataModule } from 'src/get-dhcp-data/get-dhcp-data.module';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';

@Module({
  imports: [GetASAPOrderDetailModule, GetDHCPDataModule],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [
    GetABADataFromRequestsService,
    ValidateTechnicalFeasibilityService,
  ],
  exports: [GetABADataFromRequestsService],
})
export class ValidateTechnicalFeasibilityModule {}
