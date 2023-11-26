import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetDHCPDataService } from './get-dhcp-data.service';
import { GetDHCPDataController } from './get-dhcp-data.controller';

@Module({
  imports: [HttpModule],
  controllers: [GetDHCPDataController],
  providers: [GetDHCPDataService],
  exports: [GetDHCPDataService],
})
export class GetDHCPDataModule {}
