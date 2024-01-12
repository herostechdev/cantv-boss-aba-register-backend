import { Module } from '@nestjs/common';
import { DatabaseFunctionsRawController } from './database-functions-raw.controller';
import { GetAbaPlanForKenanRawService } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';
import { StoredProceduresRawModule } from 'src/raw/stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [StoredProceduresRawModule],
  controllers: [DatabaseFunctionsRawController],
  providers: [GetAbaPlanForKenanRawService],
  exports: [GetAbaPlanForKenanRawService],
})
export class DatabaseFunctionsRawModule {}
