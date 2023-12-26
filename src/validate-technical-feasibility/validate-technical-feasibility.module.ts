import { Module } from '@nestjs/common';
import { GetABADataFromRequestsService } from './get-aba-data-from-requests/get-aba-data-from-requests.service';
import { GetDHCPDataModule } from 'src/get-dhcp-data/get-dhcp-data.module';
import { PICModule } from 'src/raw/pic/pic.module';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';

@Module({
  imports: [GetDHCPDataModule, PICModule],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [
    GetABADataFromRequestsService,
    ValidateTechnicalFeasibilityService,
  ],
  exports: [GetABADataFromRequestsService],
})
export class ValidateTechnicalFeasibilityModule {}
