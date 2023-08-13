import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { SettingsDictionaryBase } from './settings-dictionary-base';

@Injectable()
export class SettingsDictionary extends SettingsDictionaryBase<Setting> {
  constructor(
    @InjectRepository(Setting)
    protected repository: Repository<Setting>,
  ) {
    super(repository);
  }
}
