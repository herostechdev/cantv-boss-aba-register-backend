import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateEntityDto } from '../dtos/create/create-entity.dto';

export class CreateLogDto extends CreateEntityDto {
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  label?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
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
