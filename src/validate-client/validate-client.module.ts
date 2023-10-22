import { Module } from '@nestjs/common';
import { ValidateClientController } from './validate-client.controller';
import { ValidateClientService } from './validate-client.service';
import { ClientExistsModule } from 'src/client-exists/client-exists.module';

@Module({
  imports: [ClientExistsModule],
  controllers: [ValidateClientController],
  providers: [ValidateClientService],
  exports: [],
})
export class ValidateClientModule {}
