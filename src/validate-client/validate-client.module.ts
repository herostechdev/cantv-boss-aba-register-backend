import { Global, Module } from '@nestjs/common';
import { ValidateClientController } from './validate-client.controller';
import { ValidateClientService } from './validate-client.service';

@Global()
@Module({
  imports: [],
  controllers: [ValidateClientController],
  providers: [ValidateClientService],
  exports: [],
})
export class ValidateClientModule {}
