import { IsArray, IsObject, IsOptional } from 'class-validator';
import { UpdateItemDto } from 'src/system/infrastructure/dtos/update/update-item.dto';

export class UpdateTreeGroupDto extends UpdateItemDto {
  @IsObject()
  @IsOptional()
  parent?: UpdateTreeGroupDto;

  @IsArray()
  @IsOptional()
  children: UpdateTreeGroupDto[];
}
