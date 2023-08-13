import {
  IsString,
  MinLength,
  MaxLength,
  IsObject,
  IsOptional,
} from 'class-validator';
import { UpdateItemDto } from '../dtos/update/update-item.dto';
import { UpdateTreeGroupDto } from '../tree-groups/update-tree-group.dto';

export class UpdateSettingDto extends UpdateItemDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  value: string;

  @IsObject()
  @IsOptional()
  treeGroup: UpdateTreeGroupDto;
}
