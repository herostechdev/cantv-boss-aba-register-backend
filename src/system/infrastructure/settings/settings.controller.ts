import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { AuthToken } from '../decorators/auth-token.decorator';
import { CreateSettingDto } from './create-setting.dto';
import { EntityCrudController } from '../entities/controllers/entity-crud-controller';
import { HttpExceptionFilter } from '../exceptions/exception-filters/http-exception.filter';
import { Setting } from './setting.entity';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './update-setting.dto';

@Controller({
  path: 'settings',
  version: '1',
})
export class SettingsController extends EntityCrudController<
  Setting,
  CreateSettingDto,
  UpdateSettingDto
> {
  constructor(protected service: SettingsService) {
    super(service);
  }

  @Get('findByName/:name')
  @UseFilters(new HttpExceptionFilter())
  findByName(
    @AuthToken() authToken: string,
    @Param('name') name: string,
  ): Promise<Setting> {
    return this.service.findByName(name);
  }
}
