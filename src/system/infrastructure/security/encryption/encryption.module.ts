import { Module } from '@nestjs/common';
import { CipherService } from './cipher.service';
import { EncryptionController } from './encryption.controller';
import { HashService } from './hash.service';

@Module({
  imports: [],
  controllers: [EncryptionController],
  providers: [CipherService, HashService],
  exports: [CipherService, HashService],
})
export class EncryptionModule {}
