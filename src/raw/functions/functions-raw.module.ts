import { Module } from '@nestjs/common';
import { FunctionsRawController } from './functions-raw.controller';
import { GetAbaPlanForKenanRawService } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';
import { StoredProceduresRawModule } from '../stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [StoredProceduresRawModule],
  controllers: [FunctionsRawController],
  providers: [GetAbaPlanForKenanRawService],
  exports: [GetAbaPlanForKenanRawService],
})
export class FunctionsRawModule {}
