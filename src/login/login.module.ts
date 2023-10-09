import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [],
})
export class LoginModule {}
