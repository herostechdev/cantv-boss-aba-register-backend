import {
  IsString,
  MinLength,
  MaxLength,
  IsObject,
  IsOptional,
} from 'class-validator';
import { UpdateEntityDto } from '../dtos/update/update-entity.dto';
import { UpdateTreeGroupDto } from '../tree-groups/update-tree-group.dto';

export class UpdateNameDictionaryDto extends UpdateEntityDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  value: string;

  @IsObject()
  @IsOptional()
  updateTreeGroupDto?: UpdateTreeGroupDto;
}
