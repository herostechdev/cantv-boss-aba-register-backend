import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateTreeGroupDto } from './create-tree-group.dto';
import { ItemCrudService } from '../entities/services/item-crud-service';
import { TreeGroup } from './tree-group.entity';
import { UpdateTreeGroupDto } from './update-tree-group.dto';

@Injectable()
export class TreeGroupsService extends ItemCrudService<
  TreeGroup,
  CreateTreeGroupDto,
  UpdateTreeGroupDto
> {
  constructor(
    @InjectRepository(TreeGroup)
    protected repository: TreeRepository<TreeGroup>,
  ) {
    super(repository);
    // logService.context = CatalogsService.name;
  }

  customCreate(entity: CreateTreeGroupDto): Promise<TreeGroup> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  protected async customUpdate(
    id: string,
    entity: UpdateTreeGroupDto,
  ): Promise<void> {
    await this.repository.update(id, entity);
  }
}
