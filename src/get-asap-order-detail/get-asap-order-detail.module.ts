import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetASAPOrderDetailController } from './get-asap-order-detail.controller';
import { GetASAPOrderDetailService } from './get-asap-order-detail.service';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail-payload.service';

@Module({
  imports: [HttpModule],
  controllers: [GetASAPOrderDetailController],
  providers: [GetASAPOrderDetailService, GetASAPOrderDetailPayloadService],
  exports: [GetASAPOrderDetailService],
})
export class GetASAPOrderDetailModule {}
