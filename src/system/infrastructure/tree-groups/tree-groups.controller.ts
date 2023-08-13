import { Controller } from '@nestjs/common';
import { EntityCrudController } from 'src/system/infrastructure/entities/controllers/entity-crud-controller';
import { CreateTreeGroupDto } from './create-tree-group.dto';
import { TreeGroup } from './tree-group.entity';
import { TreeGroupsService } from './tree-groups.service';
import { UpdateTreeGroupDto } from './update-tree-group.dto';

@Controller({
  path: 'treeGroups',
  version: '1',
})
export class TreeGroupsController extends EntityCrudController<
  TreeGroup,
  CreateTreeGroupDto,
  UpdateTreeGroupDto
> {
  constructor(protected service: TreeGroupsService) {
    super(service);
  }
}
