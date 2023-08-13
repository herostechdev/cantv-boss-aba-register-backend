import { IsArray, IsInt, IsOptional, Min } from 'class-validator';
import { ICollectionRequest } from './collection-request.interface';

export class CollectionRequestDto implements ICollectionRequest {
  @IsInt()
  @IsOptional()
  @Min(0)
  offset?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  limit?: number;

  @IsArray()
  @IsOptional()
  filterFields?: string[];
}
