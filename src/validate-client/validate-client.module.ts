import { Module } from '@nestjs/common';
import { ValidateClientController } from './validate-client.controller';
import { ValidateClientService } from './validate-client.service';
import { ClientExistsService } from './client-exists/client-exists.service';

@Module({
  imports: [],
  controllers: [ValidateClientController],
  providers: [ClientExistsService, ValidateClientService],
  exports: [ClientExistsService],
})
export class ValidateClientModule {}
