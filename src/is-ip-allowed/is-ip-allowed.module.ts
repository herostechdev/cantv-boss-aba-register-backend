import { Module } from '@nestjs/common';
import { IsIPAllowedController } from './is-ip-allowed.controller';
import { IsIPAllowedService } from './is-ip-allowed.service';

@Module({
  imports: [],
  controllers: [IsIPAllowedController],
  providers: [IsIPAllowedService],
  exports: [],
})
export class IsIPAllowedModule {}
