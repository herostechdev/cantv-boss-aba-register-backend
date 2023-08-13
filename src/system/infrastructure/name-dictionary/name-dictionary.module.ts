import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameDictionaryController } from './name-dictionary.controller';
import { NameDictionary } from './name-dictionary.entity';
import { NameDictionaryService } from './name-dictionary.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([NameDictionary])],
  controllers: [NameDictionaryController],
  providers: [NameDictionaryService],
  exports: [NameDictionaryService],
})
export class NameDictionaryModule {}
