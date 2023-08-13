import { Column, Entity, ManyToOne } from 'typeorm';
import { ItemEntity } from '../entities/entities/item-entity';
import { ISetting } from './setting.interface';
import { TreeGroup } from '../tree-groups/tree-group.entity';
import { SettingFieldType } from './setting-field-type.constants';

@Entity()
export class Setting extends ItemEntity implements ISetting {
  @Column({
    type: 'enum',
    enum: SettingFieldType,
    nullable: true,
    default: SettingFieldType.UNKNOWN,
  })
  fieldType: SettingFieldType;

  @Column({ length: 250, nullable: true, default: null })
  stringValue: string;

  @Column({ type: 'int', nullable: true, default: null })
  intValue: number;

  @Column({ type: 'double', nullable: true, default: null })
  doubleValue: number;

  @Column({ type: 'float', nullable: true, default: null })
  floatValue: number;

  @Column({ type: 'decimal', nullable: true, default: null })
  decimalValue: number;

  @Column({ type: 'boolean', nullable: true, default: null })
  booleanValue: boolean;

  @Column({ type: 'date', nullable: true, default: null })
  dateValue: Date;

  @Column({ type: 'json', nullable: true, default: null })
  jsonValue: any;

  @Column('simple-array')
  arrayValue: string[];

  @ManyToOne(() => TreeGroup, (entity) => entity.settings)
  treeGroup?: TreeGroup;
}
