import { IsOptional, IsBoolean } from 'class-validator';
import { UpdateEntityDto } from './update-entity.dto';

export class UpdateEnabledEntityDto extends UpdateEntityDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
