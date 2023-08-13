import { Column, Entity } from 'typeorm';
import { EntityId } from './entity-id';
import { IEnabledEntityId } from '../interfaces/enabled-entity-id.interface';

@Entity()
export class EnabledEntity extends EntityId implements IEnabledEntityId {
  @Column({ nullable: false, default: true })
  enabled: boolean;
}
