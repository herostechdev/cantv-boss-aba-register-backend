import { Global, Module } from '@nestjs/common';
import { AbaRegisterController } from './aba-register.controller';
import { AbaRegisterIsIPAllowedService } from './step-1/aba-register-is-ip-allowed.service';

@Global()
@Module({
  imports: [],
  controllers: [AbaRegisterController],
  providers: [AbaRegisterIsIPAllowedService],
  exports: [],
})
export class AbaRegisterModule {}
