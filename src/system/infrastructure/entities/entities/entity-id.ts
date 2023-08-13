import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { IEntityId } from '../interfaces/entity-id.interface';

export abstract class EntityId implements IEntityId {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;
  @PrimaryColumn({ type: 'varchar', length: 36 })
  @Generated('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @VersionColumn()
  version?: number;
}
