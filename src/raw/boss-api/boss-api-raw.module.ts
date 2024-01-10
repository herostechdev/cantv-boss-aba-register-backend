import { Module } from '@nestjs/common';
import { BossApiController } from './boss-api-raw.controller';
import { GetDHCPDataRawService } from './get-dhcp-data/get-dhcp-data-raw.service';
import { HttpModule } from '@nestjs/axios';
import { StoredProceduresRawModule } from '../stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [HttpModule, StoredProceduresRawModule],
  controllers: [BossApiController],
  providers: [GetDHCPDataRawService],
  exports: [GetDHCPDataRawService],
})
export class BossApiModule {}
