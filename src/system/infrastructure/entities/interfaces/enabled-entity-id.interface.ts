import { IEntityId } from './entity-id.interface';

export interface IEnabledEntityId extends IEntityId {
  enabled: boolean;
}
