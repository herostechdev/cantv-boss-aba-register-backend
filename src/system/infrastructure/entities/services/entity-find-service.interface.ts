import { EntityId } from '../entities/entity-id';
import { ICollectionRequest } from '../../dtos/collections/collection-request.interface';
import { ICollectionResponse } from '../../dtos/collections/collection-response.interface';

export interface IEntityFindService<ENTITY_ID extends EntityId> {
  find(dto?: ICollectionRequest): Promise<ICollectionResponse<ENTITY_ID>>;

  findAndCount(
    dto?: ICollectionRequest,
  ): Promise<ICollectionResponse<ENTITY_ID>>;

  findById(id: string): Promise<ENTITY_ID>;

  exists(id: string): Promise<void>;
}
