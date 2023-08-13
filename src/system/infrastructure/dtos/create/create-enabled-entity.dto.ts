import { IsBoolean } from 'class-validator';
import { CreateEntityDto } from './create-entity.dto';

export class CreateEnabledEntityDto extends CreateEntityDto {
  @IsBoolean()
  enabled: boolean;
}
