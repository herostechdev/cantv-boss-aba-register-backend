import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateNameDictionaryDto } from './create-name-dictionary.dto';
import { EntityCrudService } from '../entities/services/entity-crud-service';
import { ICollectionResponse } from '../dtos/collections/collection-response.interface';
import { NameDictionary } from './name-dictionary.entity';
import { UpdateNameDictionaryDto } from './update-name-dictionary.dto';

@Injectable()
export class NameDictionaryService extends EntityCrudService<
  NameDictionary,
  CreateNameDictionaryDto,
  UpdateNameDictionaryDto
> {
  constructor(
    @InjectRepository(NameDictionary)
    protected repository: Repository<NameDictionary>,
  ) {
    super(repository);
    // logService.context = NameDictionaryService.name;
  }

  customCreate(entity: CreateNameDictionaryDto): Promise<NameDictionary> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  protected async customUpdate(
    id: string,
    updated: UpdateNameDictionaryDto,
  ): Promise<void> {
    await this.repository.update(id, updated);
  }

  async findByName(name: string): Promise<NameDictionary> {
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

  async findByNames(
    names: string[],
  ): Promise<ICollectionResponse<NameDictionary>> {
    try {
      const [items, count] = await this.repository
        .createQueryBuilder('namesDictionary')
        .where('namesDictionary.name IN (:...names)', { names: names })
        .getManyAndCount();
      return this.getCollectionResponse(items, count);
    } catch (error) {
      this.exceptionHandler(error, name);
    }
  }
}
