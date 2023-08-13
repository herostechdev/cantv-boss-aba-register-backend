import { IItemEntity } from './item-entity.interface';

export interface IItemVersionEntity extends IItemEntity {
  version: number;
}
