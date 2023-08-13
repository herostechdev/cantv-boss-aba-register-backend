import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryFiltersService } from './query-filters.service';

// TODO: exception management
export const QueryFilters = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const service = new QueryFiltersService();
    const query = request.query['q'];
    return service.get(query);
  },
);
