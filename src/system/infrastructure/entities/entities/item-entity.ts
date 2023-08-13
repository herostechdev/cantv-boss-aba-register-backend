import { Column, Entity, Index } from 'typeorm';
import { EntityId } from './entity-id';
import { IItemEntity } from '../interfaces/item-entity.interface';

@Entity()
@Index(['name'], { unique: true })
export class ItemEntity extends EntityId implements IItemEntity {
  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ length: 1000, nullable: true, default: null })
  description?: string;

  @Column({ nullable: false, default: true })
  enabled: boolean;
}
