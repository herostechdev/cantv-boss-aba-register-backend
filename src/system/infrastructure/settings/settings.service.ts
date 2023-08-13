import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateSettingDto } from './create-setting.dto';
import { ItemCrudService } from '../entities/services/item-crud-service';
import { Setting } from './setting.entity';
import { UpdateSettingDto } from './update-setting.dto';

@Injectable()
export class SettingsService extends ItemCrudService<
  Setting,
  CreateSettingDto,
  UpdateSettingDto
> {
  constructor(
    @InjectRepository(Setting)
    protected repository: Repository<Setting>,
  ) {
    super(repository);
    // logService.context = SettingsService.name;
  }

  customCreate(entity: CreateSettingDto): Promise<Setting> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  protected async customUpdate(
    id: string,
    updated: UpdateSettingDto,
  ): Promise<void> {
    await this.repository.update(id, updated);
  }

  async findByName(name: string): Promise<Setting> {
    try {
      const entity = await this.repository.findOneOrFail({
        where: {
          name: name,
        },
      } as FindOneOptions);
      return entity;
    } catch (error) {
      this.exceptionHandler(error, name);
    }
  }
}
