import { Controller } from '@nestjs/common';
import { CreateLogDto } from './create-log.dto';
import { EntityCrudController } from '../entities/controllers/entity-crud-controller';
import { Log } from './log.entity';
import { LogsCRUDService } from './logs-crud.service';
import { UpdateLogDto } from './update-log.dto';

@Controller({
  path: 'logs',
  version: '1',
})
export class LogsCrudController extends EntityCrudController<
  Log,
  CreateLogDto,
  UpdateLogDto
> {
  constructor(protected service: LogsCRUDService) {
    super(service);
  }
}
