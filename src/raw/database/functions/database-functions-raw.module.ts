import { Module } from '@nestjs/common';
import { DatabaseFunctionsRawController } from './database-functions-raw.controller';
import { GetAbaPlanForKenanRawService } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';
import { GetDSLCentralCoIdByDSLAMPortIdRawService } from './get-dsl-central-coid-by-dslam-port-id/get-dsl-central-coid-by-dslam-port-id-raw.service';
import { GetValidVPIRawService } from './get-valid-vpi/get-valid-vpi-raw.service';
import { StoredProceduresRawModule } from 'src/raw/stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [StoredProceduresRawModule],
  controllers: [DatabaseFunctionsRawController],
  providers: [
    GetAbaPlanForKenanRawService,
    GetDSLCentralCoIdByDSLAMPortIdRawService,
    GetValidVPIRawService,
  ],
  exports: [
    GetAbaPlanForKenanRawService,
    GetDSLCentralCoIdByDSLAMPortIdRawService,
    GetValidVPIRawService,
  ],
})
export class DatabaseFunctionsRawModule {}
