import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityId } from '../entities/entities/entity-id';
import { TreeGroup } from '../tree-groups/tree-group.entity';

@Entity()
export class NameDictionary extends EntityId {
  @ManyToOne(() => TreeGroup, (entity) => entity.nameDictionaries)
  treeGroup?: TreeGroup;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  value: string;
}
