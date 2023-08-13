import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLogDto } from './create-log.dto';
import { EntityCrudService } from '../entities/services/entity-crud-service';
import { Log } from './log.entity';
import { UpdateLogDto } from './update-log.dto';

@Injectable()
export class LogsCRUDService extends EntityCrudService<
  Log,
  CreateLogDto,
  UpdateLogDto
> {
  constructor(
    @InjectRepository(Log)
    protected readonly repository: Repository<Log>,
  ) {
    super(repository);
  }

  protected customCreate(entity: CreateLogDto): Promise<Log> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  protected async customUpdate(
    id: string,
    updated: UpdateLogDto,
  ): Promise<void> {
    await this.repository.update(id, updated);
  }

  async customDeleteRequestInfo(
    codSolicitud: number,
    transactionalEntityManager: EntityManager,
  ): Promise<any> {
    try {
      const result = transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from('log')
        .where('processId = :id', { id: codSolicitud })
        .execute();
      return result;
    } catch (error) {
      this.exceptionHandler(error);
    }
  }
}
