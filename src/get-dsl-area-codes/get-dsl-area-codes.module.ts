import { Module } from '@nestjs/common';
import { GetDSLAreaCodesController } from './get-dsl-area-codes.controller';
import { GetDSLAreaCodesService } from './get-dsl-area-codes.service';

@Module({
  imports: [],
  controllers: [GetDSLAreaCodesController],
  providers: [GetDSLAreaCodesService],
  exports: [GetDSLAreaCodesService],
})
export class GetDSLAreaCodesModule {}
