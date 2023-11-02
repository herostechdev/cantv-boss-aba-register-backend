import { Module } from '@nestjs/common';
import { CustomerExistsService } from './customer-exists.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomerExistsService],
  exports: [CustomerExistsService],
})
export class CustomerExistsModule {}
