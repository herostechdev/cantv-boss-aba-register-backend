import { Global, Module } from '@nestjs/common';
import { StoredProceduresRawController } from './stored-procedures-raw.controller';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';

@Global()
@Module({
  imports: [],
  controllers: [StoredProceduresRawController],
  providers: [IsIPAllowedRawService],
  exports: [IsIPAllowedRawService],
})
export class StoredproceduresRawModule {}
