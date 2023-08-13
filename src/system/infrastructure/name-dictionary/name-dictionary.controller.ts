import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { AuthToken } from '../decorators/auth-token.decorator';
import { CreateNameDictionaryDto } from './create-name-dictionary.dto';
import { EntityCrudController } from '../entities/controllers/entity-crud-controller';
import { HttpExceptionFilter } from '../exceptions/exception-filters/http-exception.filter';
import { ICollectionResponse } from '../dtos/collections/collection-response.interface';
import { NameDictionary } from './name-dictionary.entity';
import { NameDictionaryService } from './name-dictionary.service';
import { UpdateNameDictionaryDto } from './update-name-dictionary.dto';

@Controller({
  path: 'namesDictionary',
  version: '1',
})
export class NameDictionaryController extends EntityCrudController<
  NameDictionary,
  CreateNameDictionaryDto,
  UpdateNameDictionaryDto
> {
  constructor(protected service: NameDictionaryService) {
    super(service);
  }

  @Get('findByName/:name')
  @UseFilters(new HttpExceptionFilter())
  async findByName(
    @AuthToken() authToken: string,
    @Param('name') name: string,
  ): Promise<NameDictionary> {
    return this.service.findByName(name);
  }

  @Get('findByNames/:names')
  @UseFilters(new HttpExceptionFilter())
  findByNames(
    @AuthToken() authToken: string,
    @Param('names') names: string,
  ): Promise<ICollectionResponse<NameDictionary>> {
    return this.service.findByNames(names.split(','));
  }
}
