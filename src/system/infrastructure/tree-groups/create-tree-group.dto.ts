import { IsArray, IsObject, IsOptional } from 'class-validator';
import { CreateItemDto } from 'src/system/infrastructure/dtos/create/create-item.dto';

export class CreateTreeGroupDto extends CreateItemDto {
  @IsObject()
  @IsOptional()
  parent?: CreateTreeGroupDto;

  @IsArray()
  @IsOptional()
  children: CreateTreeGroupDto[];
}
