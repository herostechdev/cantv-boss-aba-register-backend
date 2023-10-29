import { Module } from '@nestjs/common';
import { GetStateFromSerialController } from './get-state-from-serial.controller';
import { GetStateFromSerialService } from './get-state-from-serial.service';

@Module({
  controllers: [GetStateFromSerialController],
  providers: [GetStateFromSerialService],
  exports: [],
})
export class GetStateFromSerialModule {}
