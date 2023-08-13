import { Entity, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { ItemEntity } from 'src/system/infrastructure/entities/entities/item-entity';
import { Log } from '../loggers/log.entity';
import { NameDictionary } from '../name-dictionary/name-dictionary.entity';
import { SecuritySetting } from '../security/settings/security-setting.entity';
import { Setting } from '../settings/setting.entity';

@Entity()
@Tree('materialized-path')
export class TreeGroup extends ItemEntity {
  @TreeParent()
  parent?: TreeGroup;

  @TreeChildren()
  children?: TreeGroup[];

  @OneToMany(() => Log, (entity) => entity.treeGroup)
  logs?: Log[];

  @OneToMany(() => NameDictionary, (entity) => entity.treeGroup)
  nameDictionaries?: NameDictionary[];

  @OneToMany(() => Setting, (entity) => entity.treeGroup)
  settings?: Setting[];

  @OneToMany(() => SecuritySetting, (entity) => entity.treeGroup)
  securitySettings?: SecuritySetting[];
}
