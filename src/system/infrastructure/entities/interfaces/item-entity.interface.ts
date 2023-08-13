import { IEntityId } from './entity-id.interface';

export interface IItemEntity extends IEntityId {
  name: string;
  description?: string;
  enabled: boolean;
}
