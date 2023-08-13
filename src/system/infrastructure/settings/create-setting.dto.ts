import { IsString, MinLength, MaxLength, IsObject } from 'class-validator';
import { CreateItemDto } from '../dtos/create/create-item.dto';
import { CreateTreeGroupDto } from '../tree-groups/create-tree-group.dto';

export class CreateSettingDto extends CreateItemDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  value: string;

  @IsObject()
  treeGroup: CreateTreeGroupDto;
}
