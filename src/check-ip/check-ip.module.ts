import { Module } from '@nestjs/common';
import { CheckIpController } from './check-ip.controller';
import { CheckIpService } from './check-ip.service';

@Module({
  imports: [],
  controllers: [CheckIpController],
  providers: [CheckIpService],
  exports: [],
})
export class CheckIpModule {}
