import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetDHCPDataRawService } from './get-dhcp-data/get-dhcp-data-raw.service';
import { BossApiController } from './boss-api-raw.controller';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [BossApiController],
  providers: [GetDHCPDataRawService],
  exports: [GetDHCPDataRawService],
})
export class BossApiModule {}
