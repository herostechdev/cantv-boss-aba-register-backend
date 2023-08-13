import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UpdateEntityDto } from '../dtos/update/update-entity.dto';

export class UpdateLogDto extends UpdateEntityDto {
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @IsOptional()
  label?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  extraContent?: string;

  @IsInt()
  @IsOptional()
  statusCode?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  exceptionName?: string;

  @IsString()
  @IsOptional()
  stackTrace?: string;
}
