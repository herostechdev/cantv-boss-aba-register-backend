import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityId } from '../entities/entities/entity-id';
import { TreeGroup } from '../tree-groups/tree-group.entity';

@Entity()
export class Log extends EntityId {
  @Column({ length: 10, nullable: false })
  level: string;

  @Column({ length: 100, nullable: false })
  label: string;

  @Column({ nullable: false })
  timestamp: Date;

  @Column({ length: 255, nullable: false })
  message: string;

  @Column({ type: 'text', nullable: true, default: null })
  extraContent?: string;

  @Column({ nullable: true, default: null })
  statusCode?: number;

  @Column({ length: 100, nullable: true, default: null })
  exceptionName?: string;

  @Column({ type: 'text', nullable: true, default: null })
  stackTrace?: string;

  @ManyToOne(() => TreeGroup, (entity) => entity.logs)
  treeGroup?: TreeGroup;
}
