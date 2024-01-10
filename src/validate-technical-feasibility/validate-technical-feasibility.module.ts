import { Module } from '@nestjs/common';
import { AbaRegisterModule } from 'src/aba-register-flow/aba-register.module';
import { BossApiModule } from 'src/raw/boss-api/boss-api-raw.module';
import { GetABADataFromRequestsService } from './get-aba-data-from-requests/get-aba-data-from-requests.service';
import { PICModule } from 'src/raw/pic/pic.module';
import { StoredProceduresRawModule } from 'src/raw/stored-procedures/stored-procedures-raw.module';
import { ValidateTechnicalFeasibilityController } from './validate-technical-feasibility.controller';
import { ValidateTechnicalFeasibilityService } from './validate-technical-feasibility.service';

@Module({
  imports: [
    AbaRegisterModule,
    BossApiModule,
    PICModule,
    StoredProceduresRawModule,
  ],
  controllers: [ValidateTechnicalFeasibilityController],
  providers: [
    GetABADataFromRequestsService,
    ValidateTechnicalFeasibilityService,
  ],
  exports: [GetABADataFromRequestsService],
})
export class ValidateTechnicalFeasibilityModule {}
