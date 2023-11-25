import { Module } from '@nestjs/common';
import { CustomerExistsController } from './customer-exists.controller';
import { CustomerExistsService } from './customer-exists.service';

@Module({
  imports: [],
  controllers: [CustomerExistsController],
  providers: [CustomerExistsService],
  exports: [CustomerExistsService],
})
export class CustomerExistsModule {}
