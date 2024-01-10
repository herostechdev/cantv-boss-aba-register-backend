import { Module } from '@nestjs/common';
import { FunctionsRawController } from './functions-raw.controller';
import { GetAbaPlanForKenanRawService } from './get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';

@Module({
  imports: [],
  controllers: [FunctionsRawController],
  providers: [GetAbaPlanForKenanRawService],
  exports: [GetAbaPlanForKenanRawService],
})
export class FunctionsRawModule {}
