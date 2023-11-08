import { Module } from '@nestjs/common';
import { GetOrderIdFromABASalesController } from './get-order-id-from-aba-sales.controller';
import { GetOrderIdFromABASalesService } from './get-order-id-from-aba-sales.service';

@Module({
  imports: [],
  controllers: [GetOrderIdFromABASalesController],
  providers: [GetOrderIdFromABASalesService],
  exports: [GetOrderIdFromABASalesService],
})
export class GetOrderIdFromABASalesModule {}
