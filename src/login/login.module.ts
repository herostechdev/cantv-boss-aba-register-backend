import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { EncryptionModule } from 'src/system/infrastructure/security/encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [],
})
export class LoginModule {}
