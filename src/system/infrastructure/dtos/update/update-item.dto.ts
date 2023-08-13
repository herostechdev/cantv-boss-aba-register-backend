import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { UpdateEntityDto } from './update-entity.dto';

export class UpdateItemDto extends UpdateEntityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  enabled: boolean;
}
