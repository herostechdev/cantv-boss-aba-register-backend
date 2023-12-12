import { Global, Module } from '@nestjs/common';
import { UpdateDslAbaRegistersController } from './update-dsl-aba-registers.controller';
import { UpdateDslAbaRegistersService } from './update-dsl-aba-registers.service';

@Global()
@Module({
  imports: [],
  controllers: [UpdateDslAbaRegistersController],
  providers: [UpdateDslAbaRegistersService],
  exports: [UpdateDslAbaRegistersService],
})
export class UpdateDslAbaRegistersModule {}
