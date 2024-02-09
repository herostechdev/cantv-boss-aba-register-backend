import { Module } from '@nestjs/common';
import { DatabaseFunctionsRawController } from './database-functions-raw.controller';
import { GetAbaPlanForKenanRawService } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';
import { StoredProceduresRawModule } from 'src/raw/stored-procedures/stored-procedures-raw.module';
import { GetDSLCentralCoIdByDSLAMPortIdRawService } from './get-dsl-central-coid-by-dslam-port-id/get-dsl-central-coid-by-dslam-port-id-raw.service';

@Module({
  imports: [StoredProceduresRawModule],
  controllers: [DatabaseFunctionsRawController],
  providers: [
    GetAbaPlanForKenanRawService,
    GetDSLCentralCoIdByDSLAMPortIdRawService,
  ],
  exports: [
    GetAbaPlanForKenanRawService,
    GetDSLCentralCoIdByDSLAMPortIdRawService,
  ],
})
export class DatabaseFunctionsRawModule {}
