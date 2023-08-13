import { IsInt, IsDate, IsOptional, IsString } from 'class-validator';
import { IEntityId } from '../../entities/interfaces/entity-id.interface';

export class CreateEntityDto implements IEntityId {
  @IsString()
  id: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsInt()
  @IsOptional()
  version?: number;
}
