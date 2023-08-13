import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateEntityDto } from './create-entity.dto';

export class CreateItemDto extends CreateEntityDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  enabled: boolean;
}
