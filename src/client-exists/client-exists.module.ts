import { Module } from '@nestjs/common';
import { ValidateClientController } from 'src/validate-client/validate-client.controller';
import { ValidateClientService } from 'src/validate-client/validate-client.service';

@Module({
  imports: [],
  controllers: [ValidateClientController],
  providers: [ValidateClientService],
  exports: [],
})
export class ClientExistsModule {}
