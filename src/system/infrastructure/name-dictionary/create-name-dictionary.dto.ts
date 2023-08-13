import {
  IsString,
  MinLength,
  MaxLength,
  IsObject,
  IsOptional,
} from 'class-validator';
import { CreateEntityDto } from '../dtos/create/create-entity.dto';
import { CreateTreeGroupDto } from '../tree-groups/create-tree-group.dto';

export class CreateNameDictionaryDto extends CreateEntityDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  value: string;

  @IsObject()
  @IsOptional()
  createTreeGroupDto?: CreateTreeGroupDto;
}
