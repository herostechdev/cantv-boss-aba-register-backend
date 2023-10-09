import { Module } from '@nestjs/common';
import { FindPreOrderController } from './find-pre-order.controller';
import { FindPreOrderService } from './find-pre-order.service';

@Module({
  imports: [],
  controllers: [FindPreOrderController],
  providers: [FindPreOrderService],
  exports: [],
})
export class FindPreOrderModule {}
